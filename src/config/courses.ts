// Course Configuration System
// Centralized configuration for all courses and their checkout options

export interface CoursePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  items?: string[];
  type: 'individual' | 'bundle' | 'single';
  featured?: boolean;
  savings?: number;
}

export interface CourseConfig {
  id: string;
  name: string;
  description: string;
  packages: CoursePackage[];
  checkout: {
    requiresPersonalDetails: boolean;
    requiresHorseDetails: boolean;
    paymentMethods: string[];
    accessDuration?: string;
  };
}

// Bronze Challenge Award Configuration
const bronzePackages: CoursePackage[] = [
  {
    id: 'bronze-book-1',
    name: 'Book 1: Knowing Your Horse',
    description: 'Complete with individual certificate',
    price: 30,
    type: 'individual'
  },
  {
    id: 'bronze-book-2',
    name: 'Book 2: Caring for Your Horse',
    description: 'Complete with individual certificate',
    price: 30,
    type: 'individual'
  },
  {
    id: 'bronze-book-3',
    name: 'Book 3: Handling Your Horse',
    description: 'Complete with individual certificate',
    price: 30,
    type: 'individual'
  },
  {
    id: 'bronze-book-4',
    name: 'Book 4: Lungeing Your Horse',
    description: 'Complete with individual certificate',
    price: 30,
    type: 'individual'
  },
  {
    id: 'bronze-complete',
    name: 'Complete Course',
    description: 'All 4 books + All Certificates',
    price: 97,
    items: [
      'All 4 books included',
      '4 Individual Certificates', 
      'BHS Bronze Award Certificate',
      'Save £23 on individual prices',
      '12 weeks access'
    ],
    type: 'bundle',
    featured: true,
    savings: 23
  }
];

// Silver Challenge Award Configuration
const silverPackages: CoursePackage[] = [
  {
    id: 'silver-book-1',
    name: 'Book 1: Knowing Your Horse',
    description: 'Complete with individual certificate',
    price: 30,
    type: 'individual'
  },
  {
    id: 'silver-book-2',
    name: 'Book 2: Caring for Your Horse',
    description: 'Complete with individual certificate',
    price: 30,
    type: 'individual'
  },
  {
    id: 'silver-book-3',
    name: 'Book 3: Handling Your Horse',
    description: 'Complete with individual certificate',
    price: 30,
    type: 'individual'
  },
  {
    id: 'silver-book-4',
    name: 'Book 4: Lungeing Your Horse',
    description: 'Complete with individual certificate',
    price: 30,
    type: 'individual'
  },
  {
    id: 'silver-complete',
    name: 'Complete Course',
    description: 'All 4 books + All Certificates',
    price: 97,
    items: [
      'All 4 books included',
      '4 Individual Certificates', 
      'BHS Silver Award Certificate',
      'Save £23 on individual prices',
      '12 weeks access'
    ],
    type: 'bundle',
    featured: true,
    savings: 23
  }
];

// Course Configurations
export const courseConfigs: Record<string, CourseConfig> = {
  'bronze-challenge': {
    id: 'bronze-challenge',
    name: 'Bronze Challenge Award',
    description: 'BHS Bronze Challenge Award - Build confidence and skills',
    packages: bronzePackages,
    checkout: {
      requiresPersonalDetails: true,
      requiresHorseDetails: false,
      paymentMethods: ['bank-transfer'],
      accessDuration: '12 weeks'
    }
  },
  'silver-challenge': {
    id: 'silver-challenge',
    name: 'Silver Challenge Award',
    description: 'BHS Silver Challenge Award - Advanced horse care and management',
    packages: silverPackages,
    checkout: {
      requiresPersonalDetails: true,
      requiresHorseDetails: false,
      paymentMethods: ['bank-transfer'],
      accessDuration: '12 weeks'
    }
  },
  'stage-1-theory': {
    id: 'stage-1-theory', 
    name: 'BHS Stage 1 Theory',
    description: 'Comprehensive theory preparation for BHS Stage 1',
    packages: [
      {
        id: 'stage-1-theory-complete',
        name: 'Complete Theory Course',
        description: '10 months access to all course materials',
        price: 85,
        type: 'single'
      }
    ],
    checkout: {
      requiresPersonalDetails: true,
      requiresHorseDetails: false,
      paymentMethods: ['bank-transfer'],
      accessDuration: '10 months'
    }
  },
  'stage-2-theory': {
    id: 'stage-2-theory',
    name: 'BHS Stage 2 Theory', 
    description: 'Advanced theory preparation for BHS Stage 2',
    packages: [
      {
        id: 'stage-2-theory-complete',
        name: 'Complete Theory Course',
        description: '10 months access to all course materials',
        price: 97,
        type: 'single'
      }
    ],
    checkout: {
      requiresPersonalDetails: true,
      requiresHorseDetails: false,
      paymentMethods: ['bank-transfer'],
      accessDuration: '10 months'
    }
  }
};

// Helper functions
export const getCourseConfig = (courseId: string): CourseConfig | undefined => {
  return courseConfigs[courseId];
};

export const calculateTotal = (selectedPackages: string[], courseId: string): number => {
  const config = getCourseConfig(courseId);
  if (!config) return 0;
  
  return selectedPackages.reduce((total, packageId) => {
    const pkg = config.packages.find(p => p.id === packageId);
    return total + (pkg?.price || 0);
  }, 0);
};

export const getSelectedPackageDetails = (selectedPackages: string[], courseId: string): CoursePackage[] => {
  const config = getCourseConfig(courseId);
  if (!config) return [];
  
  return selectedPackages
    .map(packageId => config.packages.find(p => p.id === packageId))
    .filter(Boolean) as CoursePackage[];
}; 