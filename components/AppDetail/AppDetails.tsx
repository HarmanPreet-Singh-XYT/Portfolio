'use client'
import React,{useRef} from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, 
  Calendar, 
  Download, 
  Globe, 
  Monitor,
  Smartphone,
  ChevronLeft,
  ExternalLink,
  X,
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
  Share2,
  MessageSquare,
  Bug,
  Server,
  PlayCircle,
  HelpCircle,
  ShoppingCart
} from 'lucide-react';
import { apps } from '@/app/appData';
import { sendMailBug, sendMailFeedback, sendMailRating } from '@/app/api/Nodemailer';

type ModalType = 'screenshot' | 'review' | 'feedback' | 'bug' | null;

interface FormData {
  email: string;
  name: string;
  source?: string;
  rating?: number;
  experience?: string;
  comment?: string;
  bugDescription?: string;
}

export default function AppDetails() {
  const { id } = useParams();
  const app = apps.find(a => a.id === id);
  const [activeModal, setActiveModal] = React.useState<ModalType>(null);
  const [activeScreenshot, setActiveScreenshot] = React.useState<number>(0);
  const [isLoading,setIsLoading] = React.useState<true|false>(false);
  const formDataRef = useRef<FormData>({
    email: '',
    name: '',
    rating: 5,
  });
  const [render,setRender] = React.useState<true|false>(false);
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

  const averageRating = app.reviews.reduce((acc, review) => acc + review.rating, 0) / app.reviews.length;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if(activeModal==='bug'){
      const sendMail = formDataRef.current.bugDescription && await sendMailBug(formDataRef.current.name,formDataRef.current.email,formDataRef.current.bugDescription,app.name);
      sendMail ? alert('Thank you for reporting a bug, I will get back to you soon') : alert('Something went wrong, please try again later');
    }else if(activeModal==='feedback'){
      const sendMail = formDataRef.current.experience && await sendMailFeedback(formDataRef.current.name,formDataRef.current.email,formDataRef.current.experience,app.name);
      sendMail ? alert('Thank you for your feedback, I will get back to you soon') : alert('Something went wrong, please try again later');
    }else if(activeModal==='review'){
      const sendMail = (formDataRef.current.experience && formDataRef.current.rating && formDataRef.current.source) && await sendMailRating(formDataRef.current.name,formDataRef.current.email,formDataRef.current.experience,formDataRef.current.rating,formDataRef.current.source,app.name);
      sendMail ? alert('Thank you for your review, I will get back to you soon (It may take some time to get approved)') : alert('Something went wrong, please try again later');
    }
    // Handle form submission based on modal type
    setActiveModal(null);
    setIsLoading(false);
    // Reset form data
    formDataRef.current = { email: '', name: '', rating: 5 };
  };

  const Modal = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg border border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  const ScreenshotModal = () => (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <button
        onClick={() => setActiveModal(null)}
        className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <X size={24} className="text-white" />
      </button>
      
      <button
        onClick={() => setActiveScreenshot(prev => (prev > 0 ? prev - 1 : app.screenshots.length - 1))}
        className="absolute left-4 p-2 hover:bg-gray-800 rounded-full transition-colors bg-gray-900/50"
      >
        <PrevIcon size={24} className="text-white" />
      </button>
      
      <button
        onClick={() => setActiveScreenshot(prev => (prev < app.screenshots.length - 1 ? prev + 1 : 0))}
        className="absolute right-4 p-2 hover:bg-gray-800 rounded-full transition-colors bg-gray-900/50"
      >
        <NextIcon size={24} className="text-white" />
      </button>

      <img
        src={app.screenshots[activeScreenshot]}
        alt={`${app.name} screenshot ${activeScreenshot + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {app.screenshots.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveScreenshot(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === activeScreenshot ? 'bg-white' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );

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
              {/* {app.buttons.wishlist && <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isWishlisted
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                <Heart className={isWishlisted ? 'fill-emerald-400' : ''} size={20} />
                <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
              </button>} */}
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
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveScreenshot(idx);
                      setActiveModal('screenshot');
                    }}
                    className="rounded-xl overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <img
                      src={screenshot}
                      alt={`${app.name} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
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
                  onClick={() => setActiveModal('review')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400
                           hover:bg-emerald-500/20 transition-colors"
                >
                  <Share2 size={18} />
                  <span>Share Review</span>
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

            {/* Feedback & Support */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Feedback & Support</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveModal('feedback')}
                  className="flex items-center justify-between w-full px-6 py-3 rounded-xl 
                           bg-gray-800/50 backdrop-blur-sm border border-gray-700/50
                           hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-emerald-400" />
                    <span>Submit Feedback</span>
                  </div>
                  <ExternalLink size={20} />
                </button>
                <button
                  onClick={() => setActiveModal('bug')}
                  className="flex items-center justify-between w-full px-6 py-3 rounded-xl 
                           bg-gray-800/50 backdrop-blur-sm border border-gray-700/50
                           hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Bug size={20} className="text-emerald-400" />
                    <span>Report a Bug</span>
                  </div>
                  <ExternalLink size={20} />
                </button>
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
                <div className="flex justify-between">
                  <span className="text-gray-400">Support</span>
                  <span>{app.support.email}</span>
                </div>
                {app.support.phone && <div className="flex justify-between">
                  <span className="text-gray-400">Phone</span>
                  <span>{app.support.phone}</span>
                </div>}
                {app.support.website && <div className="flex justify-between">
                  <span className="text-gray-400">Website</span>
                  <span>{app.support.website}</span>
                </div>}
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
      {/* Modals */}
      {activeModal === 'screenshot' && <ScreenshotModal />}

      {activeModal === 'review' && (
        <Modal title="Share Your Review">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                defaultValue={formDataRef.current.name}
                onChange={(e) => formDataRef.current.name = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                defaultValue={formDataRef.current.email}
                onChange={(e) => formDataRef.current.email = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-300 mb-2">
                Where did you download the app?
              </label>
              <select
                id="source"
                defaultValue={formDataRef.current.source}
                onChange={(e) => formDataRef.current.source = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              >
                <option value="">Select source</option>
                <option value="microsoft">Microsoft Store</option>
                <option value="apple">App Store</option>
                <option value="google">Google Play</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => {formDataRef.current.rating = rating; setRender(!render);}}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= (formDataRef.current.rating || 0)
                          ? 'fill-emerald-400 text-emerald-400'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                Share your experience
              </label>
              <textarea
                id="experience"
                defaultValue={formDataRef.current.experience}
                onChange={(e) => formDataRef.current.experience = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white h-32"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg bg-emerald-500 text-white font-semibold
                       hover:bg-emerald-600 transition-colors"
            >
              <Loading/>
              Submit Review
            </button>
          </form>
        </Modal>
      )}

{activeModal === 'feedback' && (
        <Modal title="Submit Feedback">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                defaultValue={formDataRef.current.name}
                onChange={(e) => formDataRef.current.name = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                defaultValue={formDataRef.current.email}
                onChange={(e) => formDataRef.current.email = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                Your Feedback
              </label>
              <textarea
                id="comment"
                defaultValue={formDataRef.current.comment}
                onChange={(e) => formDataRef.current.comment = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white h-32"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg bg-emerald-500 text-white font-semibold
                       hover:bg-emerald-600 transition-colors"
            >
              <Loading/>
              Submit Feedback
            </button>
          </form>
        </Modal>
      )}

{activeModal === 'bug' && (
        <Modal title="Report a Bug">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                defaultValue={formDataRef.current.name}
                onChange={(e) => formDataRef.current.name = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                defaultValue={formDataRef.current.email}
                onChange={(e) => formDataRef.current.email = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="bugDescription" className="block text-sm font-medium text-gray-300 mb-2">
                Describe the Bug
              </label>
              <textarea
                id="bugDescription"
                defaultValue={formDataRef.current.bugDescription}
                onChange={(e) => formDataRef.current.bugDescription = e.target.value}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white h-32"
                required
                placeholder="Please provide as much detail as possible about the bug you encountered..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg bg-emerald-500 text-white font-semibold
                       hover:bg-emerald-600 transition-colors"
            >
              <Loading/>
              Submit Bug Report
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

const Loading = () => {
  return (
    <div className="lds-ring pr-6"><div></div><div></div><div></div><div></div></div>
  )
}