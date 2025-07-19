export interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  description: string;
  date: string;
}

export interface StoreLink {
  platform: 'windows' | 'android' | 'ios' | 'web' | 'linux' | 'macos' | 'server' | 'github';
  url: string;
}

export interface SystemRequirement {
  category: string;
  requirements: {
    name: string;
    value: string;
  }[];
}

export interface Developer {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface VersionHistory {
  version: string;
  date: string;
  changes: string[];
}

export interface Buttons {
  wishlist: boolean;
  share: boolean;
  demo: boolean;
}

export interface Card {
  image: string;
  type: string;
  title: string;
  description: string;
  tech: string[];
}

export interface AppDetails {
  id: string;
  name: string;
  cardDetails: Card;
  icon: string;
  buttons: Buttons;
  isPrivate?: boolean;
  headerImage: string;
  trailerUrl?: string;
  screenshots: string[];
  description: string;
  demoLink?: string;
  shortDescription: string;
  techStack: string[];
  storeLinks: StoreLink[];
  reviews: Review[];
  systemRequirements: SystemRequirement[];
  developers?: Developer[];
  downloadStats?: {
    total: number | string;
    lastMonth: number | string;
  };
  versionHistory: VersionHistory[];
  hasInAppPurchases: boolean;
  permissions: string[];
  faq: FAQ[];
  support: {
    email: string;
    website?: string;
    phone?: string;
  };
  additionalInfo: {
    releaseDate: string;
    category: string;
    size: string;
    supportedLanguages: string[];
    developer: string;
    publisher: string;
    version: string;
  };
  legalLinks?: {
    privacyPolicy: string;
    termsOfService?: string;
  };
}
export interface ProjectCardData {
  id: string;
  cardDetails: {
    type: string;
    image: string;
    title: string;
    description: string;
    tech: string[];
  };
  isPrivate?: boolean;
  trailerUrl?: string;
  reviews: {
    rating: number;
  }[];
  storeLinks: {
    platform: string;
  }[];
  additionalInfo: {
    category?: string;
    version?: string;
    size?: string;
    releaseDate: string;
  };
  downloadStats?: {
    total: number | string;
  };
  screenshots: string[];
  developers?: {
    name: string;
  }[];
  demoLink?: string;
}