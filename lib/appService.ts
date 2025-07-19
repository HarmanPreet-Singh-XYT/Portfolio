'use server'
import { createClient } from './supabase/server'
import { AppDetails, Review, StoreLink, SystemRequirement, Developer, FAQ, VersionHistory, ProjectCardData } from '../types/app'

const supabaseServer = await createClient();
// Get single app with all related data
export async function getApp(appId: string): Promise<AppDetails | null> {
  try {
    // Get main app details
    const { data: appData, error: appError } = await supabaseServer
      .from('app_details')
      .select('*')
      .eq('id', appId)
      .single()

    if (appError || !appData) {
      throw new Error('App not found')
    }

    // Get all related data in parallel
    const [
      cardDetails,
      cardTech,
      buttonsConfig,
      screenshots,
      techStack,
      storeLinks,
      reviews,
      systemReqs,
      developers,
      downloadStats,
      versionHistory,
      permissions,
      faqs,
      supportInfo,
      additionalInfo,
      supportedLanguages,
      legalLinks
    ] = await Promise.all([
      supabaseServer.from('card_details').select('*').eq('app_id', appId).single(),
      supabaseServer.from('card_tech').select('tech').eq('app_id', appId),
      supabaseServer.from('buttons_config').select('*').eq('app_id', appId).single(),
      supabaseServer.from('screenshots').select('url').eq('app_id', appId).order('display_order'),
      supabaseServer.from('tech_stack').select('technology').eq('app_id', appId),
      supabaseServer.from('store_links').select('platform, url').eq('app_id', appId),
      supabaseServer.from('reviews').select('*').eq('app_id', appId).order('date', { ascending: false }),
      supabaseServer.from('system_requirements').select(`
        category,
        system_requirement_details(name, value)
      `).eq('app_id', appId),
      supabaseServer.from('developers').select('*').eq('app_id', appId),
      supabaseServer.from('download_stats').select('*').eq('app_id', appId).single(),
      supabaseServer.from('version_history').select(`
        version,
        release_date,
        version_changes(change_description)
      `).eq('app_id', appId).order('release_date', { ascending: false }),
      supabaseServer.from('permissions').select('permission').eq('app_id', appId),
      supabaseServer.from('faqs').select('question, answer').eq('app_id', appId).order('display_order'),
      supabaseServer.from('support_info').select('*').eq('app_id', appId).single(),
      supabaseServer.from('additional_info').select('*').eq('app_id', appId).single(),
      supabaseServer.from('supported_languages').select('language').eq('app_id', appId),
      supabaseServer.from('legal_links').select('*').eq('app_id', appId).single()
    ])

    // Transform and structure the data
    const appDetails: AppDetails = {
      id: appData.id,
      name: appData.name,
      icon: appData.icon || '',
      isPrivate: appData.is_private,
      headerImage: appData.header_image || '',
      trailerUrl: appData.trailer_url,
      description: appData.description || '',
      demoLink: appData.demo_link,
      shortDescription: appData.short_description || '',
      hasInAppPurchases: appData.has_in_app_purchases,
      
      cardDetails: {
        image: cardDetails.data?.image || '',
        type: cardDetails.data?.type || '',
        title: cardDetails.data?.title || '',
        description: cardDetails.data?.description || '',
        tech: cardTech.data?.map(t => t.tech) || []
      },
      
      buttons: {
        wishlist: buttonsConfig.data?.wishlist || false,
        share: buttonsConfig.data?.share || false,
        demo: buttonsConfig.data?.demo || false
      },
      
      screenshots: screenshots.data?.map(s => s.url) || [],
      techStack: techStack.data?.map(t => t.technology) || [],
      storeLinks: storeLinks.data?.map(s => ({
        platform: s.platform as StoreLink['platform'],
        url: s.url
      })) || [],
      
      reviews: reviews.data?.map(r => ({
        id: r.id,
        userName: r.user_name,
        rating: r.rating,
        title: r.title,
        description: r.description,
        date: r.date
      })) || [],
      
      systemRequirements: systemReqs.data?.map(sr => ({
        category: sr.category,
        requirements: sr.system_requirement_details?.map(d => ({
          name: d.name,
          value: d.value
        })) || []
      })) || [],
      
      developers: developers.data?.map(d => ({
        name: d.name,
        role: d.role,
        avatar: d.avatar,
        bio: d.bio
      })) || [],
      
      downloadStats: downloadStats.data ? {
        total: downloadStats.data.total,
        lastMonth: downloadStats.data.last_month
      } : undefined,
      
      versionHistory: versionHistory.data?.map(v => ({
        version: v.version,
        date: v.release_date,
        changes: v.version_changes?.map(c => c.change_description) || []
      })) || [],
      
      permissions: permissions.data?.map(p => p.permission) || [],
      
      faq: faqs.data?.map(f => ({
        question: f.question,
        answer: f.answer
      })) || [],
      
      support: {
        email: supportInfo.data?.email || '',
        website: supportInfo.data?.website,
        phone: supportInfo.data?.phone
      },
      
      additionalInfo: {
        releaseDate: additionalInfo.data?.release_date || '',
        category: additionalInfo.data?.category || '',
        size: additionalInfo.data?.size || '',
        developer: additionalInfo.data?.developer || '',
        publisher: additionalInfo.data?.publisher || '',
        version: additionalInfo.data?.version || '',
        supportedLanguages: supportedLanguages.data?.map(l => l.language) || []
      },
      
      legalLinks: legalLinks.data ? {
        privacyPolicy: legalLinks.data.privacy_policy,
        termsOfService: legalLinks.data.terms_of_service
      } : undefined
    }

    return appDetails
  } catch (error) {
    console.error('Error fetching app:', error)
    return null
  }
}

export async function getAllApps(): Promise<AppDetails[]> {
  
  try {
    const { data: apps, error } = await supabaseServer
      .from('app_details')
      .select('id')
      

    if (error) throw error
    if (!apps || apps.length === 0) return []

    const detailedApps = await Promise.all(
      apps.map(async app => {
        const details = await getApp(app.id)
        return details
      })
    )

    return detailedApps.filter((app): app is AppDetails => app !== null)
  } catch (error) {
    console.error('Error fetching all apps:', error)
    return []
  }
}

export async function getAppCard(appId: string): Promise<ProjectCardData | null> {
  
  try {
    const [
      { data: appData, error: appError },
      { data: cardData, error: cardError },
      { data: cardTechData },
      { data: storeLinksData },
      { data: reviewsData },
      { data: additionalInfo },
      { data: screenshotsData },
      { data: downloadStats },
      { data: developersData }
    ] = await Promise.all([
      supabaseServer.from('app_details').select('id, is_private, trailer_url, demo_link').eq('id', appId).single(),
      supabaseServer.from('card_details').select('*').eq('app_id', appId).single(),
      supabaseServer.from('card_tech').select('tech').eq('app_id', appId),
      supabaseServer.from('store_links').select('platform').eq('app_id', appId),
      supabaseServer.from('reviews').select('rating').eq('app_id', appId),
      supabaseServer.from('additional_info').select('category, version, size, release_date').eq('app_id', appId).single(),
      supabaseServer.from('screenshots').select('url').eq('app_id', appId).order('display_order'),
      supabaseServer.from('download_stats').select('total').eq('app_id', appId).single(),
      supabaseServer.from('developers').select('name').eq('app_id', appId)
    ])

    if (appError || cardError || !appData || !cardData) {
      throw new Error('Missing core app data')
    }

    const projectCardData: ProjectCardData = {
      id: appData.id,
      isPrivate: appData.is_private,
      trailerUrl: appData.trailer_url,
      demoLink: appData.demo_link || undefined,

      cardDetails: {
        type: cardData.type || '',
        image: cardData.image || '',
        title: cardData.title || '',
        description: cardData.description || '',
        tech: cardTechData?.map(t => t.tech) || []
      },

      storeLinks: storeLinksData?.map(s => ({ platform: s.platform })) || [],
      reviews: reviewsData?.map(r => ({ rating: r.rating })) || [],

      additionalInfo: {
        category: additionalInfo?.category || '',
        version: additionalInfo?.version || '',
        size: additionalInfo?.size || '',
        releaseDate: additionalInfo?.release_date || ''
      },

      downloadStats: downloadStats?.total !== undefined
        ? { total: downloadStats.total }
        : undefined,

      screenshots: screenshotsData?.map(s => s.url) || [],
      developers: developersData?.map(d => ({ name: d.name })) || []
    }

    return projectCardData
  } catch (error) {
    console.error('Error fetching project card:', error)
    return null
  }
}

export async function getAllAppCards(): Promise<ProjectCardData[]> {
  try {
    const { data: apps, error } = await supabaseServer
      .from('app_details')
      .select('id')

    if (error) throw error
    if (!apps || apps.length === 0) return []

    const results = await Promise.all(
      apps.map(app => getAppCard(app.id))
    )

    const validCards = results.filter((card): card is ProjectCardData => card !== null)

    // Sort by release date (newest first)
    return validCards.sort((a, b) => {
      const dateA = new Date(a.additionalInfo.releaseDate || '').getTime()
      const dateB = new Date(b.additionalInfo.releaseDate || '').getTime()
      return dateB - dateA // Descending
    })
  } catch (error) {
    console.error('Error fetching all project cards:', error)
    return []
  }
}


// Create new app
export async function createApp(appData: Partial<AppDetails>): Promise<string | null> {
  
  try {
    const { data: app, error: appError } = await supabaseServer
      .from('app_details')
      .insert({
        id: appData.id,
        name: appData.name,
        icon: appData.icon,
        is_private: appData.isPrivate,
        header_image: appData.headerImage,
        trailer_url: appData.trailerUrl,
        description: appData.description,
        demo_link: appData.demoLink,
        short_description: appData.shortDescription,
        has_in_app_purchases: appData.hasInAppPurchases
      })
      .select('id')
      .single()

    if (appError) throw appError

    const appId = app.id

    // Insert related data
    await Promise.all([
      // Card details
      appData.cardDetails && supabaseServer.from('card_details').insert({
        app_id: appId,
        image: appData.cardDetails.image,
        type: appData.cardDetails.type,
        title: appData.cardDetails.title,
        description: appData.cardDetails.description
      }),

      // Card tech
      appData.cardDetails?.tech && supabaseServer.from('card_tech').insert(
        appData.cardDetails.tech.map(tech => ({ app_id: appId, tech }))
      ),

      // Buttons config
      appData.buttons && supabaseServer.from('buttons_config').insert({
        app_id: appId,
        wishlist: appData.buttons.wishlist,
        share: appData.buttons.share,
        demo: appData.buttons.demo
      }),

      // Screenshots
      appData.screenshots && supabaseServer.from('screenshots').insert(
        appData.screenshots.map((url, index) => ({
          app_id: appId,
          url,
          display_order: index
        }))
      ),

      // Tech stack
      appData.techStack && supabaseServer.from('tech_stack').insert(
        appData.techStack.map(tech => ({ app_id: appId, technology: tech }))
      ),

      // Store links
      appData.storeLinks && supabaseServer.from('store_links').insert(
        appData.storeLinks.map(link => ({
          app_id: appId,
          platform: link.platform,
          url: link.url
        }))
      ),

      // Support info
      appData.support && supabaseServer.from('support_info').insert({
        app_id: appId,
        email: appData.support.email,
        website: appData.support.website,
        phone: appData.support.phone
      }),

      // Additional info
      appData.additionalInfo && supabaseServer.from('additional_info').insert({
        app_id: appId,
        release_date: appData.additionalInfo.releaseDate,
        category: appData.additionalInfo.category,
        size: appData.additionalInfo.size,
        developer: appData.additionalInfo.developer,
        publisher: appData.additionalInfo.publisher,
        version: appData.additionalInfo.version
      }),

      // Supported languages
      appData.additionalInfo?.supportedLanguages && supabaseServer.from('supported_languages').insert(
        appData.additionalInfo.supportedLanguages.map(lang => ({
          app_id: appId,
          language: lang
        }))
      ),

      // Legal links
      appData.legalLinks && supabaseServer.from('legal_links').insert({
        app_id: appId,
        privacy_policy: appData.legalLinks.privacyPolicy,
        terms_of_service: appData.legalLinks.termsOfService
      }),

      // Permissions
      appData.permissions && supabaseServer.from('permissions').insert(
        appData.permissions.map(permission => ({
          app_id: appId,
          permission
        }))
      ),

      // FAQs
      appData.faq && supabaseServer.from('faqs').insert(
        appData.faq.map((faq, index) => ({
          app_id: appId,
          question: faq.question,
          answer: faq.answer,
          display_order: index
        }))
      )
    ])

    return appId
  } catch (error) {
    console.error('Error creating app:', error)
    return null
  }
}

// Update app
export async function updateApp(appId: string, updates: Partial<AppDetails>): Promise<boolean> {
  
  try {
    // Update main app details
    const { error: appError } = await supabaseServer
      .from('app_details')
      .update({
        name: updates.name,
        icon: updates.icon,
        is_private: updates.isPrivate,
        header_image: updates.headerImage,
        trailer_url: updates.trailerUrl,
        description: updates.description,
        demo_link: updates.demoLink,
        short_description: updates.shortDescription,
        has_in_app_purchases: updates.hasInAppPurchases
      })
      .eq('id', appId)

    if (appError) throw appError

    // Update related data as needed
    if (updates.cardDetails) {
      await supabaseServer
        .from('card_details')
        .upsert({
          app_id: appId,
                    image: updates.cardDetails.image,
          type: updates.cardDetails.type,
          title: updates.cardDetails.title,
          description: updates.cardDetails.description
        })

      // Update card tech
      await supabaseServer.from('card_tech').delete().eq('app_id', appId)
      if (updates.cardDetails.tech.length > 0) {
        await supabaseServer.from('card_tech').insert(
          updates.cardDetails.tech.map(tech => ({ app_id: appId, tech }))
        )
      }
    }

    if (updates.buttons) {
      await supabaseServer
        .from('buttons_config')
        .upsert({
          app_id: appId,
          wishlist: updates.buttons.wishlist,
          share: updates.buttons.share,
          demo: updates.buttons.demo
        })
    }

    if (updates.screenshots) {
      await supabaseServer.from('screenshots').delete().eq('app_id', appId)
      if (updates.screenshots.length > 0) {
        await supabaseServer.from('screenshots').insert(
          updates.screenshots.map((url, index) => ({
            app_id: appId,
            url,
            display_order: index
          }))
        )
      }
    }

    if (updates.techStack) {
      await supabaseServer.from('tech_stack').delete().eq('app_id', appId)
      if (updates.techStack.length > 0) {
        await supabaseServer.from('tech_stack').insert(
          updates.techStack.map(tech => ({ app_id: appId, technology: tech }))
        )
      }
    }

    if (updates.storeLinks) {
      await supabaseServer.from('store_links').delete().eq('app_id', appId)
      if (updates.storeLinks.length > 0) {
        await supabaseServer.from('store_links').insert(
          updates.storeLinks.map(link => ({
            app_id: appId,
            platform: link.platform,
            url: link.url
          }))
        )
      }
    }

    if (updates.support) {
      await supabaseServer
        .from('support_info')
        .upsert({
          app_id: appId,
          email: updates.support.email,
          website: updates.support.website,
          phone: updates.support.phone
        })
    }

    if (updates.additionalInfo) {
      await supabaseServer
        .from('additional_info')
        .upsert({
          app_id: appId,
          release_date: updates.additionalInfo.releaseDate,
          category: updates.additionalInfo.category,
          size: updates.additionalInfo.size,
          developer: updates.additionalInfo.developer,
          publisher: updates.additionalInfo.publisher,
          version: updates.additionalInfo.version
        })

      // Update supported languages
      await supabaseServer.from('supported_languages').delete().eq('app_id', appId)
      if (updates.additionalInfo.supportedLanguages?.length > 0) {
        await supabaseServer.from('supported_languages').insert(
          updates.additionalInfo.supportedLanguages.map(lang => ({
            app_id: appId,
            language: lang
          }))
        )
      }
    }

    if (updates.legalLinks) {
      await supabaseServer
        .from('legal_links')
        .upsert({
          app_id: appId,
          privacy_policy: updates.legalLinks.privacyPolicy,
          terms_of_service: updates.legalLinks.termsOfService
        })
    }

    if (updates.permissions) {
      await supabaseServer.from('permissions').delete().eq('app_id', appId)
      if (updates.permissions.length > 0) {
        await supabaseServer.from('permissions').insert(
          updates.permissions.map(permission => ({
            app_id: appId,
            permission
          }))
        )
      }
    }

    if (updates.faq) {
      await supabaseServer.from('faqs').delete().eq('app_id', appId)
      if (updates.faq.length > 0) {
        await supabaseServer.from('faqs').insert(
          updates.faq.map((faq, index) => ({
            app_id: appId,
            question: faq.question,
            answer: faq.answer,
            display_order: index
          }))
        )
      }
    }

    return true
  } catch (error) {
    console.error('Error updating app:', error)
    return false
  }
}

// Delete app
export async function deleteApp(appId: string): Promise<boolean> {
  
  try {
    const { error } = await supabaseServer
      .from('app_details')
      .delete()
      .eq('id', appId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting app:', error)
    return false
  }
}

// Add review
export async function addReview(appId: string, review: Omit<Review, 'id'>): Promise<boolean> {
  
  try {
    const { error } = await supabaseServer
      .from('reviews')
      .insert({
        id: crypto.randomUUID(),
        app_id: appId,
        user_name: review.userName,
        rating: review.rating,
        title: review.title,
        description: review.description,
        date: review.date
      })

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error adding review:', error)
    return false
  }
}

// Add version
export async function addVersion(appId: string, version: VersionHistory): Promise<boolean> {
  
  try {
    const { data, error } = await supabaseServer
      .from('version_history')
      .insert({
        app_id: appId,
        version: version.version,
        release_date: version.date
      })
      .select('id')
      .single()

    if (error) throw error

    if (version.changes.length > 0) {
      await supabaseServer.from('version_changes').insert(
        version.changes.map((change, index) => ({
          version_id: data.id,
          change_description: change,
          display_order: index
        }))
      )
    }

    return true
  } catch (error) {
    console.error('Error adding version:', error)
    return false
  }
}

// Update download stats
export async function updateDownloadStats(appId: string, stats: { total: string | number; lastMonth: string | number }): Promise<boolean> {
  
  try {
    const { error } = await supabaseServer
      .from('download_stats')
      .upsert({
        app_id: appId,
        total: stats.total.toString(),
        last_month: stats.lastMonth.toString()
      })

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating download stats:', error)
    return false
  }
}