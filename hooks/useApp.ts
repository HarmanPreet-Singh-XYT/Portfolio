import { useState, useEffect, useCallback } from 'react'
import { addReview as serviceAddReview,updateDownloadStats as serviceUpdateDownloadStats, addVersion as serviceAddVersion,updateApp as serviceUpdateApp,createApp as serviceCreateApp,getApp as serviceGetApp,getAllAppCards as serviceGetAllAppCards,getAllApps as serviceGetAllApps,deleteApp as serviceDeleteApp } from '../lib/appService'
import { AppDetails, ProjectCardData, Review, VersionHistory } from '../types/app'
export const useAppCards = () => {
  const [apps, setApps] = useState<ProjectCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAppCards = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const appCards = await serviceGetAllAppCards()
      setApps(appCards)
    } catch (err) {
      setError('Failed to fetch app cards')
      console.error('Error in useAppCards:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAppCards()
  }, [fetchAppCards])

  return { apps, loading, error, refetch: fetchAppCards }
}
// Hook for fetching all apps
export const useApps = () => {
  const [apps, setApps] = useState<Partial<AppDetails>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApps = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const appsData = await serviceGetAllApps()
      setApps(appsData)
    } catch (err) {
      setError('Failed to fetch apps')
      console.error('Error in useApps:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchApps()
  }, [fetchApps])

  return { apps, loading, error, refetch: fetchApps }
}

// Hook for fetching a single app
export const useApp = (appId: string | undefined) => {
  const [app, setApp] = useState<AppDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApp = useCallback(async () => {
    if (!appId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const appData = await serviceGetApp(appId)
      setApp(appData)
    } catch (err) {
      setError('Failed to fetch app details')
      console.error('Error in useApp:', err)
    } finally {
      setLoading(false)
    }
  }, [appId])

  useEffect(() => {
    fetchApp()
  }, [fetchApp])

  return { app, loading, error, refetch: fetchApp }
}

// Hook for creating an app
export const useCreateApp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdAppId, setCreatedAppId] = useState<string | null>(null)

  const createApp = useCallback(async (appData: Partial<AppDetails>) => {
    try {
      setLoading(true)
      setError(null)
      const appId = await serviceCreateApp(appData)
      if (appId) {
        setCreatedAppId(appId)
        return appId
      } else {
        throw new Error('Failed to create app')
      }
    } catch (err) {
      setError('Failed to create app')
      console.error('Error in useCreateApp:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setCreatedAppId(null)
    setError(null)
  }, [])

  return { createApp, loading, error, createdAppId, reset }
}

// Hook for updating an app
export const useUpdateApp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const updateApp = useCallback(async (appId: string, updates: Partial<AppDetails>) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      const result = await serviceUpdateApp(appId, updates)
      if (result) {
        setSuccess(true)
        return true
      } else {
        throw new Error('Failed to update app')
      }
    } catch (err) {
      setError('Failed to update app')
      console.error('Error in useUpdateApp:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setSuccess(false)
    setError(null)
  }, [])

  return { updateApp, loading, error, success, reset }
}

// Hook for deleting an app
export const useDeleteApp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const deleteApp = useCallback(async (appId: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      const result = await serviceDeleteApp(appId)
      if (result) {
        setSuccess(true)
        return true
      } else {
        throw new Error('Failed to delete app')
      }
    } catch (err) {
      setError('Failed to delete app')
      console.error('Error in useDeleteApp:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setSuccess(false)
    setError(null)
  }, [])

  return { deleteApp, loading, error, success, reset }
}

// Hook for adding a review
export const useAddReview = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const addReview = useCallback(async (appId: string, review: Omit<Review, 'id'>) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      const result = await serviceAddReview(appId, review)
      if (result) {
        setSuccess(true)
        return true
      } else {
        throw new Error('Failed to add review')
      }
    } catch (err) {
      setError('Failed to add review')
      console.error('Error in useAddReview:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setSuccess(false)
    setError(null)
  }, [])

  return { addReview, loading, error, success, reset }
}

// Hook for adding a version
export const useAddVersion = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const addVersion = useCallback(async (appId: string, version: VersionHistory) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      const result = await serviceAddVersion(appId, version)
      if (result) {
        setSuccess(true)
        return true
      } else {
        throw new Error('Failed to add version')
      }
    } catch (err) {
      setError('Failed to add version')
      console.error('Error in useAddVersion:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setSuccess(false)
    setError(null)
  }, [])

  return { addVersion, loading, error, success, reset }
}

// Hook for updating download stats
export const useUpdateDownloadStats = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const updateDownloadStats = useCallback(async (
    appId: string, 
    stats: { total: string | number; lastMonth: string | number }
  ) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      const result = await serviceUpdateDownloadStats(appId, stats)
      if (result) {
        setSuccess(true)
        return true
      } else {
        throw new Error('Failed to update download stats')
      }
    } catch (err) {
      setError('Failed to update download stats')
      console.error('Error in useUpdateDownloadStats:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setSuccess(false)
    setError(null)
  }, [])

  return { updateDownloadStats, loading, error, success, reset }
}