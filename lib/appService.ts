import { supabase } from './supabase'
import { AppDetails, Review, StoreLink, SystemRequirement, Developer, FAQ, VersionHistory } from '../types/app'

export class AppService {
  // Get single app with all related data
  static async getApp(appId: string): Promise<AppDetails | null> {
    try {
      // Get main app details
      const { data: appData, error: appError } = await supabase
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
        supabase.from('card_details').select('*').eq('app_id', appId).single(),
        supabase.from('card_tech').select('tech').eq('app_id', appId),
        supabase.from('buttons_config').select('*').eq('app_id', appId).single(),
        supabase.from('screenshots').select('url').eq('app_id', appId).order('display_order'),
        supabase.from('tech_stack').select('technology').eq('app_id', appId),
        supabase.from('store_links').select('platform, url').eq('app_id', appId),
        supabase.from('reviews').select('*').eq('app_id', appId).order('date', { ascending: false }),
        supabase.from('system_requirements').select(`
          category,
          system_requirement_details(name, value)
        `).eq('app_id', appId),
        supabase.from('developers').select('*').eq('app_id', appId),
        supabase.from('download_stats').select('*').eq('app_id', appId).single(),
        supabase.from('version_history').select(`
          version,
          release_date,
          version_changes(change_description)
        `).eq('app_id', appId).order('release_date', { ascending: false }),
        supabase.from('permissions').select('permission').eq('app_id', appId),
        supabase.from('faqs').select('question, answer').eq('app_id', appId).order('display_order'),
        supabase.from('support_info').select('*').eq('app_id', appId).single(),
        supabase.from('additional_info').select('*').eq('app_id', appId).single(),
        supabase.from('supported_languages').select('language').eq('app_id', appId),
        supabase.from('legal_links').select('*').eq('app_id', appId).single()
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

  static async getAllApps(): Promise<AppDetails[]> {
    try {
      // First, get all app IDs (or you can get ids + minimal data to display quicker loading states)
      const { data: apps, error } = await supabase
        .from('app_details')
        .select('id')
        .eq('is_private', false)

      if (error) throw error

      if (!apps || apps.length === 0) return []

      // Now fetch full details for each app in parallel
      const detailedApps = await Promise.all(
        apps.map(async app => {
          const details = await this.getApp(app.id)
          return details
        })
      )

      // Filter out nulls (if some failed to load)
      return detailedApps.filter((app): app is AppDetails => app !== null)
    } catch (error) {
      console.error('Error fetching all apps:', error)
      return []
    }
  }

  static async getAppCard(appId: string): Promise<{
    id: string
    demoLink: string | null
    storeLinks: { platform: StoreLink['platform']; url: string }[]
    cardDetails: AppDetails['cardDetails']
  } | null> {
    try {
      const [
        { data: appData, error: appError },
        { data: cardData, error: cardError },
        { data: cardTechData },
        { data: storeLinksData }
      ] = await Promise.all([
        supabase.from('app_details').select('id, demo_link').eq('id', appId).single(),
        supabase.from('card_details').select('*').eq('app_id', appId).single(),
        supabase.from('card_tech').select('tech').eq('app_id', appId),
        supabase.from('store_links').select('platform, url').eq('app_id', appId)
      ])

      if (appError || cardError || !appData) {
        throw new Error('App or card details not found')
      }

      return {
        id: appData.id,
        demoLink: appData.demo_link,
        storeLinks: storeLinksData?.map(s => ({
          platform: s.platform as StoreLink['platform'],
          url: s.url
        })) || [],
        cardDetails: {
          image: cardData?.image || '',
          type: cardData?.type || '',
          title: cardData?.title || '',
          description: cardData?.description || '',
          tech: cardTechData?.map(t => t.tech) || []
        }
      }
    } catch (error) {
      console.error('Error fetching app card details:', error)
      return null
    }
  }

  static async getAllAppCards(): Promise<{
    id: string
    demoLink: string | null
    storeLinks: { platform: StoreLink['platform']; url: string }[]
    cardDetails: AppDetails['cardDetails']
  }[]> {
    try {
      // Step 1: Get all public app IDs
      const { data: apps, error } = await supabase
        .from('app_details')
        .select('id')
        .eq('is_private', false)

      if (error) throw error
      if (!apps || apps.length === 0) return []

      // Step 2: Fetch app card data for each app in parallel using getAppCard()
      const results = await Promise.all(
        apps.map(async app => {
          const card = await this.getAppCard(app.id)
          return card
        })
      )

      // Step 3: Filter out null results
      return results.filter(
        (card): card is {
          id: string
          demoLink: string | null
          storeLinks: { platform: StoreLink['platform']; url: string }[]
          cardDetails: AppDetails['cardDetails']
        } => card !== null
      )
    } catch (error) {
      console.error('Error fetching app cards:', error)
      return []
    }
  }


  // Create new app
  static async createApp(appData: Partial<AppDetails>): Promise<string | null> {
    try {
      const { data: app, error: appError } = await supabase
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
        appData.cardDetails && supabase.from('card_details').insert({
          app_id: appId,
          image: appData.cardDetails.image,
          type: appData.cardDetails.type,
          title: appData.cardDetails.title,
          description: appData.cardDetails.description
        }),

        // Card tech
        appData.cardDetails?.tech && supabase.from('card_tech').insert(
          appData.cardDetails.tech.map(tech => ({ app_id: appId, tech }))
        ),

        // Buttons config
        appData.buttons && supabase.from('buttons_config').insert({
          app_id: appId,
          wishlist: appData.buttons.wishlist,
          share: appData.buttons.share,
          demo: appData.buttons.demo
        }),

        // Screenshots
        appData.screenshots && supabase.from('screenshots').insert(
          appData.screenshots.map((url, index) => ({
            app_id: appId,
            url,
            display_order: index
          }))
        ),

        // Tech stack
        appData.techStack && supabase.from('tech_stack').insert(
          appData.techStack.map(tech => ({ app_id: appId, technology: tech }))
        ),

        // Store links
        appData.storeLinks && supabase.from('store_links').insert(
          appData.storeLinks.map(link => ({
            app_id: appId,
            platform: link.platform,
            url: link.url
          }))
        ),

        // Support info
        appData.support && supabase.from('support_info').insert({
          app_id: appId,
          email: appData.support.email,
          website: appData.support.website,
          phone: appData.support.phone
        }),

        // Additional info
        appData.additionalInfo && supabase.from('additional_info').insert({
          app_id: appId,
          release_date: appData.additionalInfo.releaseDate,
          category: appData.additionalInfo.category,
          size: appData.additionalInfo.size,
          developer: appData.additionalInfo.developer,
          publisher: appData.additionalInfo.publisher,
          version: appData.additionalInfo.version
        }),

        // Supported languages
        appData.additionalInfo?.supportedLanguages && supabase.from('supported_languages').insert(
          appData.additionalInfo.supportedLanguages.map(lang => ({
            app_id: appId,
            language: lang
          }))
        ),

        // Legal links
        appData.legalLinks && supabase.from('legal_links').insert({
          app_id: appId,
          privacy_policy: appData.legalLinks.privacyPolicy,
          terms_of_service: appData.legalLinks.termsOfService
        }),

        // Permissions
        appData.permissions && supabase.from('permissions').insert(
          appData.permissions.map(permission => ({
            app_id: appId,
            permission
          }))
        ),

        // FAQs
        appData.faq && supabase.from('faqs').insert(
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
  static async updateApp(appId: string, updates: Partial<AppDetails>): Promise<boolean> {
    try {
      // Update main app details
      const { error: appError } = await supabase
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
        await supabase
          .from('card_details')
          .upsert({
            app_id: appId,
            image: updates.cardDetails.image,
            type: updates.cardDetails.type,
            title: updates.cardDetails.title,
            description: updates.cardDetails.description
          })

        // Update card tech
        await supabase.from('card_tech').delete().eq('app_id', appId)
        if (updates.cardDetails.tech.length > 0) {
          await supabase.from('card_tech').insert(
            updates.cardDetails.tech.map(tech => ({ app_id: appId, tech }))
          )
        }
      }

      if (updates.buttons) {
        await supabase
          .from('buttons_config')
          .upsert({
            app_id: appId,
            wishlist: updates.buttons.wishlist,
            share: updates.buttons.share,
            demo: updates.buttons.demo
          })
      }

      if (updates.screenshots) {
        await supabase.from('screenshots').delete().eq('app_id', appId)
        if (updates.screenshots.length > 0) {
          await supabase.from('screenshots').insert(
            updates.screenshots.map((url, index) => ({
              app_id: appId,
              url,
              display_order: index
            }))
          )
        }
      }

      if (updates.techStack) {
        await supabase.from('tech_stack').delete().eq('app_id', appId)
        if (updates.techStack.length > 0) {
          await supabase.from('tech_stack').insert(
            updates.techStack.map(tech => ({ app_id: appId, technology: tech }))
          )
        }
      }

      if (updates.storeLinks) {
        await supabase.from('store_links').delete().eq('app_id', appId)
        if (updates.storeLinks.length > 0) {
          await supabase.from('store_links').insert(
            updates.storeLinks.map(link => ({
              app_id: appId,
              platform: link.platform,
              url: link.url
            }))
          )
        }
      }

      if (updates.support) {
        await supabase
          .from('support_info')
          .upsert({
            app_id: appId,
            email: updates.support.email,
            website: updates.support.website,
            phone: updates.support.phone
          })
      }

      if (updates.additionalInfo) {
        await supabase
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
        await supabase.from('supported_languages').delete().eq('app_id', appId)
        if (updates.additionalInfo.supportedLanguages?.length > 0) {
          await supabase.from('supported_languages').insert(
            updates.additionalInfo.supportedLanguages.map(lang => ({
              app_id: appId,
              language: lang
            }))
          )
        }
      }

      if (updates.legalLinks) {
        await supabase
          .from('legal_links')
          .upsert({
            app_id: appId,
            privacy_policy: updates.legalLinks.privacyPolicy,
            terms_of_service: updates.legalLinks.termsOfService
          })
      }

      if (updates.permissions) {
        await supabase.from('permissions').delete().eq('app_id', appId)
        if (updates.permissions.length > 0) {
          await supabase.from('permissions').insert(
            updates.permissions.map(permission => ({
              app_id: appId,
              permission
            }))
          )
        }
      }

      if (updates.faq) {
        await supabase.from('faqs').delete().eq('app_id', appId)
        if (updates.faq.length > 0) {
          await supabase.from('faqs').insert(
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
  static async deleteApp(appId: string): Promise<boolean> {
    try {
      const { error } = await supabase
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
  static async addReview(appId: string, review: Omit<Review, 'id'>): Promise<boolean> {
    try {
      const { error } = await supabase
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
  static async addVersion(appId: string, version: VersionHistory): Promise<boolean> {
    try {
      const { data, error } = await supabase
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
        await supabase.from('version_changes').insert(
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
  static async updateDownloadStats(appId: string, stats: { total: string | number; lastMonth: string | number }): Promise<boolean> {
    try {
      const { error } = await supabase
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
}