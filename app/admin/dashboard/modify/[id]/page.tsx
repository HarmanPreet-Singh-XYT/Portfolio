'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useApp, useUpdateApp } from '@/hooks/useApp';
import { AppDetails } from '@/types/app';
import { AppFormBasic } from '@/components/Dashboard/Modify/Basic';
import { MediaAssetsSection } from '@/components/Dashboard/Modify/Media';
import { TechnicalDetailsSection } from '@/components/Dashboard/Modify/Technical';
import { 
  Trash2, 
  Plus, 
  Save, 
  Loader2, 
  ChevronRight,
  Store,
  HelpCircle,
  HeadphonesIcon,
  Shield,
  Globe
} from 'lucide-react';

const emptyAppDetails: AppDetails = {
  id: '',
  name: '',
  cardDetails: {
    image: '',
    type: '',
    title: '',
    description: '',
    tech: [],
  },
  icon: '',
  buttons: {
    wishlist: false,
    share: false,
    demo: false,
  },
  isPrivate: false,
  headerImage: '',
  trailerUrl: '',
  screenshots: [],
  description: '',
  demoLink: '',
  shortDescription: '',
  techStack: [],
  storeLinks: [],
  reviews: [],
  systemRequirements: [],
  developers: [],
  downloadStats: {
    total: '',
    lastMonth: '',
  },
  versionHistory: [],
  hasInAppPurchases: false,
  permissions: [],
  faq: [],
  support: {
    email: '',
    website: '',
    phone: '',
  },
  additionalInfo: {
    releaseDate: '',
    category: '',
    size: '',
    supportedLanguages: [],
    developer: '',
    publisher: '',
    version: '',
  },
  legalLinks: {
    privacyPolicy: '',
    termsOfService: '',
  },
};

const AppUpdateComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const params = useParams<{ id: string }>();
  const [appData, setAppData] = useState<AppDetails>(emptyAppDetails);

  const { app, loading: fetchLoading, error: fetchError, refetch } = useApp(params.id);
  const { loading: updateLoading, error: updateError, success: updateSuccess, reset, updateApp } = useUpdateApp();

  useEffect(() => {
    if (!fetchError && !fetchLoading && app != null) setAppData(app);
  }, [fetchLoading, app, fetchError]);

  const handleInputChange = (path: string, value: any) => {
    setAppData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleArrayAdd = (path: string, item: any) => {
    setAppData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], item];
      return newData;
    });
  };

  const handleArrayRemove = (path: string, index: number) => {
    setAppData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_: any, i: number) => i !== index);
      return newData;
    });
  };

  const handleArrayUpdate = (path: string, index: number, value: any) => {
    setAppData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]][index] = value;
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateApp(appData.id, appData);
      if (updateSuccess) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setError(updateError || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const platformOptions = ['windows', 'android', 'ios', 'web', 'linux', 'macos', 'server', 'github'];
  const categoryOptions = [
  // Core Functional Categories
  'Productivity',
  'Utilities',
  'Tools',
  'Business',
  'Finance',
  'Health',
  'Fitness',
  'Education',
  'Lifestyle',
  'Social',
  'Communication',
  'Shopping',
  'Food & Drink',
  'Travel',
  'Transportation',
  'News',
  'Weather',

  // Creative & Media
  'Photography',
  'Video',
  'Music',
  'Entertainment',
  'Art & Design',
  'Design Tools',
  'Video Editing',
  'Streaming',

  // Development & Technical
  'Development',
  'Developer Tools',
  'DevOps',
  'APIs',
  'Code Editors',
  'Testing',
  'Design + Development',

  // Gaming
  'Games',
  'Action Games',
  'Adventure Games',
  'Puzzle Games',
  'Strategy Games',
  'Simulation Games',
  'Casual Games',
  'Educational Games',

  // Niche & Special Use
  'Finance Tools',
  'Crypto & Blockchain',
  'AR/VR',
  'AI & ML',
  'Security',
  'Privacy',
  'Automation',
  'Remote Work',
  'IoT',
  'Data & Analytics',

  // Community & Experience
  'Events',
  'Dating',
  'Forum / Community',
  'Blogs',
  'Spirituality',
  'Parenting',
  'Pet Care',

  // Platforms / Environment-specific
  'Mobile-Only',
  'Desktop-Only',
  'Cross-Platform',
  'Web App',
  'Server-side',
  'Browser Extensions',

  // Government / Nonprofit
  'Nonprofits',
  'Government',
  'Civic Tech',

  // Internal Use
  'Internal Tools',
  'Beta Tools',
  'Experimental',
]

  const tabs = [
    { value: 'basic', label: 'Basic Info', icon: null },
    { value: 'media', label: 'Media', icon: null },
    { value: 'technical', label: 'Technical', icon: null },
    { value: 'store', label: 'Store', icon: <Store className="w-4 h-4" /> },
    { value: 'support', label: 'Support', icon: <HeadphonesIcon className="w-4 h-4" /> },
    { value: 'legal', label: 'Legal', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Update App
            </h1>
            <p className="text-gray-400">Modify your app details and settings</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || fetchLoading}
            className="group relative px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg 
                     transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {(loading || fetchLoading) ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {fetchLoading ? "Fetching..." : "Updating..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update App
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <p className="text-emerald-400">App updated successfully!</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 p-1 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200
                  whitespace-nowrap
                  ${activeTab === tab.value
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <AppFormBasic 
                  appData={appData} 
                  handleInputChange={handleInputChange} 
                  handleArrayAdd={handleArrayAdd} 
                  handleArrayRemove={handleArrayRemove} 
                />
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                <MediaAssetsSection 
                  appData={appData}  
                  handleInputChange={handleInputChange} 
                  handleArrayAdd={handleArrayAdd} 
                  handleArrayRemove={handleArrayRemove} 
                  handleArrayUpdate={handleArrayUpdate}
                />
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-6">
                <TechnicalDetailsSection 
                  categoryOptions={categoryOptions} 
                  handleArrayAdd={handleArrayAdd} 
                  handleArrayRemove={handleArrayRemove} 
                  handleInputChange={handleInputChange} 
                  appData={appData}
                />
              </div>
            )}

            {activeTab === 'store' && (
              <div className="space-y-6">
                {/* Store Links Card */}
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6
                             hover:border-emerald-500/30 transition-all duration-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Store className="w-5 h-5 text-emerald-400" />
                    Store Links
                  </h3>
                  <div className="space-y-4">
                    {appData.storeLinks.map((link, index) => (
                      <div key={index} className="flex gap-3">
                        <select
                          value={link.platform}
                          onChange={(e) => handleArrayUpdate('storeLinks', index, { ...link, platform: e.target.value })}
                          className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                   focus:border-emerald-500 focus:outline-none transition-colors"
                        >
                          <option value="">Platform</option>
                          {platformOptions.map((platform) => (
                            <option key={platform} value={platform}>
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </option>
                          ))}
                        </select>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleArrayUpdate('storeLinks', index, { ...link, url: e.target.value })}
                          placeholder="Store URL"
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                   placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('storeLinks', index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayAdd('storeLinks', { platform: '', url: '' })}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 
                               border border-gray-700 hover:border-emerald-500/50 rounded-lg transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Add Store Link
                    </button>
                  </div>
                </div>

                {/* FAQ Card */}
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6
                             hover:border-emerald-500/30 transition-all duration-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-400" />
                    FAQ
                  </h3>
                  <div className="space-y-4">
                    {appData.faq.map((faq, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm text-emerald-400 font-medium">FAQ #{index + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleArrayRemove('faq', index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleArrayUpdate('faq', index, { ...faq, question: e.target.value })}
                          placeholder="Question"
                          className="w-full mb-3 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                   placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                        <textarea
                          value={faq.answer}
                          onChange={(e) => handleArrayUpdate('faq', index, { ...faq, answer: e.target.value })}
                          placeholder="Answer"
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                   placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                        />
                      </div>
                    ))}
                    <button                       type="button"
                      onClick={() => handleArrayAdd('faq', { question: '', answer: '' })}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 
                               border border-gray-700 hover:border-emerald-500/50 rounded-lg transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Add FAQ
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                {/* Support Information Card */}
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6
                             hover:border-emerald-500/30 transition-all duration-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <HeadphonesIcon className="w-5 h-5 text-emerald-400" />
                    Support Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-300 mb-2">
                        Support Email
                      </label>
                      <input
                        id="supportEmail"
                        type="email"
                        value={appData.support.email}
                        onChange={(e) => handleInputChange('support.email', e.target.value)}
                        placeholder="support@example.com"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="supportWebsite" className="block text-sm font-medium text-gray-300 mb-2">
                        Support Website
                      </label>
                      <input
                        id="supportWebsite"
                        type="url"
                        value={appData.support.website || ''}
                        onChange={(e) => handleInputChange('support.website', e.target.value)}
                        placeholder="https://support.example.com"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="supportPhone" className="block text-sm font-medium text-gray-300 mb-2">
                        Support Phone
                      </label>
                      <input
                        id="supportPhone"
                        type="tel"
                        value={appData.support.phone || ''}
                        onChange={(e) => handleInputChange('support.phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Download Statistics Card */}
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6
                             hover:border-emerald-500/30 transition-all duration-200">
                  <h3 className="text-xl font-bold mb-6">Download Statistics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="totalDownloads" className="block text-sm font-medium text-gray-300 mb-2">
                        Total Downloads
                      </label>
                      <input
                        id="totalDownloads"
                        value={appData.downloadStats?.total || ''}
                        onChange={(e) => handleInputChange('downloadStats.total', e.target.value)}
                        placeholder="e.g., 1,000,000"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastMonthDownloads" className="block text-sm font-medium text-gray-300 mb-2">
                        Last Month Downloads
                      </label>
                      <input
                        id="lastMonthDownloads"
                        value={appData.downloadStats?.lastMonth || ''}
                        onChange={(e) => handleInputChange('downloadStats.lastMonth', e.target.value)}
                        placeholder="e.g., 50,000"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'legal' && (
              <div className="space-y-6">
                {/* Legal Links Card */}
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6
                             hover:border-emerald-500/30 transition-all duration-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Legal Links
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="privacyPolicy" className="block text-sm font-medium text-gray-300 mb-2">
                        Privacy Policy URL
                      </label>
                      <input
                        id="privacyPolicy"
                        type="url"
                        value={appData.legalLinks?.privacyPolicy || ''}
                        onChange={(e) => handleInputChange('legalLinks.privacyPolicy', e.target.value)}
                        placeholder="https://example.com/privacy"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="termsOfService" className="block text-sm font-medium text-gray-300 mb-2">
                        Terms of Service URL
                      </label>
                      <input
                        id="termsOfService"
                        type="url"
                        value={appData.legalLinks?.termsOfService || ''}
                        onChange={(e) => handleInputChange('legalLinks.termsOfService', e.target.value)}
                        placeholder="https://example.com/terms"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Supported Languages Card */}
                <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6
                             hover:border-emerald-500/30 transition-all duration-200">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    Supported Languages
                  </h3>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {appData.additionalInfo.supportedLanguages.map((lang, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 
                                   rounded-full text-emerald-400 text-sm"
                        >
                          {lang}
                          <button
                            type="button"
                            onClick={() => handleArrayRemove('additionalInfo.supportedLanguages', index)}
                            className="ml-1 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        id="newLanguage"
                        type="text"
                        placeholder="Add language (e.g., English, Spanish)"
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
                                 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const value = (e.target as HTMLInputElement).value.trim();
                            if (value) {
                              handleArrayAdd('additionalInfo.supportedLanguages', value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('newLanguage') as HTMLInputElement;
                          const value = input.value.trim();
                          if (value) {
                            handleArrayAdd('additionalInfo.supportedLanguages', value);
                            input.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg
                                 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Glitch effect styles */}
      {/* <style jsx>{`
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 #00fff9, -0.05em -0.025em 0 #ff00c1,
              0.025em 0.05em 0 #00fff9;
          }
          15% {
            text-shadow: 0.05em 0 0 #00fff9, -0.05em -0.025em 0 #ff00c1,
              0.025em 0.05em 0 #00fff9;
          }
          16% {
            text-shadow: -0.05em -0.025em 0 #00fff9, 0.025em 0.025em 0 #ff00c1,
              -0.05em -0.05em 0 #00fff9;
          }
          49% {
            text-shadow: -0.05em -0.025em 0 #00fff9, 0.025em 0.025em 0 #ff00c1,
              -0.05em -0.05em 0 #00fff9;
          }
          50% {
            text-shadow: 0.025em 0.05em 0 #00fff9, 0.05em 0 0 #ff00c1,
              0 -0.05em 0 #00fff9;
          }
          99% {
            text-shadow: 0.025em 0.05em 0 #00fff9, 0.05em 0 0 #ff00c1,
              0 -0.05em 0 #00fff9;
          }
          100% {
            text-shadow: -0.025em 0 0 #00fff9, -0.025em -0.025em 0 #ff00c1,
              -0.025em -0.05em 0 #00fff9;
          }
        }

        .glitch-text:hover {
          animation: glitch 0.3s infinite;
        }
      `}</style> */}
    </div>
  );
};

export default AppUpdateComponent;