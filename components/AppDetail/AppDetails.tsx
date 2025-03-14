'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Star,
  Calendar,
  Download,
  Monitor,
  Smartphone,
  ChevronLeft,
  ExternalLink,
  Heart,
  Share2,
  PlayCircle,
  MessageSquare,
  AlertTriangle,
  BugPlay,
  Users,
  History,
  HelpCircle,
  ShoppingCart,
  Trophy,
  Globe,
  Server
} from 'lucide-react';
import { apps } from '@/app/appData';

export default function AppDetails() {
  const { id } = useParams();
  const app = apps.find(a => a.id === id);
  const [showRatingPrompt, setShowRatingPrompt] = React.useState(false);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  if (!app) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">App Not Found</h1>
          <Link href="/" className="text-emerald-400 hover:text-emerald-300">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = app.reviews.reduce((acc: any, review: { rating: any; }) => acc + review.rating, 0) / app.reviews.length;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: app.name,
          text: app.shortDescription,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={app.headerImage}
          alt={app.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        
        <div className="container mx-auto px-6 relative h-full flex items-end pb-16">
          <div className="flex items-start gap-8">
            <img 
              src={app.icon}
              alt={`${app.name} icon`}
              className="w-32 h-32 rounded-2xl shadow-lg"
            />
            <div>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
              >
                <ChevronLeft size={20} />
                <span>Back to Apps</span>
              </Link>
              <h1 className="text-5xl font-bold mb-4">{app.name}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating)
                            ? 'fill-emerald-400 text-emerald-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{app.reviews.length!==0 && averageRating.toFixed(1)}</span>
                  <span className="text-gray-400">({app.reviews.length} reviews)</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={20} />
                  <span>{app.additionalInfo.releaseDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {app.buttons.wishlist && <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isWishlisted
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                <Heart className={isWishlisted ? 'fill-emerald-400' : ''} size={20} />
                <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
              </button>}
              {app.buttons.share && <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition-colors"
              >
                <Share2 size={20} />
                <span>Share</span>
              </button>}
              {app.trailerUrl && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition-colors">
                  <PlayCircle size={20} />
                  <span>Watch Trailer</span>
                </button>
              )}
            </div>
            {(app.buttons.demo && app.demoLink) && <a
              href={app.demoLink}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
                       text-black font-semibold hover:from-emerald-600 hover:to-blue-600 
                       transition-all duration-300"
            >
              Try Demo
            </a>}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Trailer */}
            {app.trailerUrl && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Trailer</h2>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={app.trailerUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Screenshots */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {app.screenshots.map((screenshot, idx) => (
                  <img
                    key={idx}
                    src={screenshot}
                    alt={`${app.name} screenshot ${idx + 1}`}
                    className="rounded-xl hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <span className="text-gray-300 leading-relaxed"  dangerouslySetInnerHTML={{ __html: app.description }}></span>
            </div>

            {/* Tech Stack */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {app.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Development Team */}
            {app.developers && <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Development Team</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {app.developers.map((dev, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{dev.name}</h3>
                        <p className="text-emerald-400">{dev.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">{dev.bio}</p>
                  </div>
                ))}
              </div>
            </div>}

            {/* Version History */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Version History</h2>
              <div className="space-y-6">
                {app.versionHistory.map((version, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">Version {version.version}</h3>
                        <p className="text-gray-400">{version.date}</p>
                      </div>
                      {idx === 0 && (
                        <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-400">
                          Latest
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {version.changes.map((change, changeIdx) => (
                        <li key={changeIdx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2"></span>
                          <span className="text-gray-300">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ & Troubleshooting */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">FAQ & Troubleshooting</h2>
              <div className="space-y-4">
                {app.faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                  >
                    <summary className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="text-emerald-400" size={20} />
                        <span className="font-semibold">{item.question}</span>
                      </div>
                    </summary>
                    <p className="mt-4 text-gray-300 pl-9">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <button
                  onClick={() => setShowRatingPrompt(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400"
                >
                  <Star size={20} />
                  <span>Write a Review</span>
                </button>
              </div>
              <div className="space-y-6">
                {app.reviews.map((review) => (
                  <div 
                    key={review.id}
                    className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{review.title}</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-emerald-400 text-emerald-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-400">{review.userName}</span>
                        </div>
                      </div>
                      <span className="text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-300">{review.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Download Stats */}
            {app.downloadStats && <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Download Statistics</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <div className="text-2xl font-bold text-emerald-400">
                    {app.downloadStats.total.toLocaleString()}
                  </div>
                  <div className="text-gray-400">Total Downloads</div>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <div className="text-2xl font-bold text-emerald-400">
                    {app.downloadStats.lastMonth.toLocaleString()}
                  </div>
                  <div className="text-gray-400">Downloads Last Month</div>
                </div>
              </div>
            </div>}

            {/* Download Buttons */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Get the App</h2>
              <div className="space-y-3">
                {app.storeLinks.map((store) => (
                  <a
                    key={store.platform}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-6 py-3 rounded-xl 
                             bg-gray-800/50 backdrop-blur-sm border border-gray-700/50
                             hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      {store.platform === 'windows' && <Monitor size={20} className="text-emerald-400" />}
                      {store.platform === 'server' && <Server size={20} className="text-emerald-400" />}
                      {store.platform === 'web' && <Globe size={20} className="text-emerald-400" />}
                      {store.platform === 'android' && <Smartphone size={20} className="text-emerald-400" />}
                      {store.platform === 'ios' && <Smartphone size={20} className="text-emerald-400" />}
                      <span>Download for {store.platform.charAt(0).toUpperCase() + store.platform.slice(1)}</span>
                    </div>
                    <Download size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* In-App Purchases */}
            {app.hasInAppPurchases && (
              <div className="mb-8 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center gap-3 text-gray-300">
                  <ShoppingCart size={20} className="text-emerald-400" />
                  <span>Includes in-app purchases</span>
                </div>
              </div>
            )}
            {app.permissions.length>0 && (
              <div className="mb-8 px-4 py-6 flex flex-col gap-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                {app.permissions.map((permission,index) => 
                <div key={index} className="flex items-center gap-3 text-gray-300">
                  <Globe size={16} className="text-emerald-400" />
                  <span className='text-sm'>{permission}</span>
                </div>)}
              </div>
            )}

            {/* System Requirements */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">System Requirements</h2>
              {app.systemRequirements.map((category) => (
                <div key={category.category} className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">{category.category}</h3>
                  <div className="space-y-2">
                    {category.requirements.map((req) => (
                      <div key={req.name} className="flex justify-between">
                        <span className="text-gray-400">{req.name}</span>
                        <span>{req.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Support Options */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Support</h2>
              <div className="space-y-3">
                <a
                  href={`mailto:${app.support.email}`}
                  className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 
                           hover:border-emerald-500/50 transition-all duration-300"
                >
                  <MessageSquare size={20} className="text-emerald-400" />
                  <span>Contact Support</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 
                           hover:border-emerald-500/50 transition-all duration-300"
                >
                  <AlertTriangle size={20} className="text-emerald-400" />
                  <span>Submit Feedback</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 
                           hover:border-emerald-500/50 transition-all duration-300"
                >
                  <BugPlay size={20} className="text-emerald-400" />
                  <span>Report a Bug</span>
                </a>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Additional Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Version</span>
                  <span>{app.additionalInfo.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size</span>
                  <span>{app.additionalInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span>{app.additionalInfo.category}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-2">Languages</span>
                  <div className="flex flex-wrap gap-2">
                    {app.additionalInfo.supportedLanguages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-1 rounded-full text-sm bg-gray-800 text-gray-300"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            {app.legalLinks && (app.legalLinks.privacyPolicy || app.legalLinks.termsOfService) && <div>
              <h2 className="text-xl font-bold mb-4">Legal</h2>
              <div className="space-y-3">
                {app.legalLinks.privacyPolicy && <a
                  href={app.legalLinks.privacyPolicy}
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <ExternalLink size={16} />
                  <span>Privacy Policy</span>
                </a>}
                {app.legalLinks.termsOfService && <a
                  href={app.legalLinks.termsOfService}
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <ExternalLink size={16} />
                  <span>Terms of Service</span>
                </a>}
              </div>
            </div>}
          </div>
        </div>
      </div>

      {/* Rating Prompt Modal */}
      {showRatingPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl max-w-lg w-full mx-4">
            <h3 className="text-2xl font-bold mb-6">Rate {app.name}</h3>
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Star size={32} />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Share your experience..."
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white mb-6"
              rows={4}
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowRatingPrompt(false)}
                className="px-6 py-2 rounde d-lg text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 
                         text-black font-semibold hover:from-emerald-600 hover:to-blue-600 
                         transition-all duration-300"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}