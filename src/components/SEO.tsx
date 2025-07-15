import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noindex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  twitterHandle?: string;
  facebookAppId?: string;
  lang?: string;
  robots?: string;
  alternateUrls?: { lang: string; url: string }[];
  breadcrumbData?: object;
  faqData?: object;
  courseData?: object;
  instructorData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = '',
  canonicalUrl = '',
  ogImage = 'https://behorsesavvy.online/DSC_9397.jpg',
  ogType = 'website',
  structuredData,
  noindex = false,
  author = 'Penny Pleasant - BHS Professional Accredited Coach',
  publishedTime,
  modifiedTime,
  articleSection,
  twitterHandle = '@behorsesavvy',
  facebookAppId,
  lang = 'en-GB',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternateUrls = [],
  breadcrumbData,
  faqData,
  courseData,
  instructorData,
}) => {
  const siteUrl = 'https://behorsesavvy.online';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  // Base keywords that should appear on all pages
  const baseKeywords = 'behorsesavvy, penny pleasant, bhs professional accredited coach, equestrian training, horse knowledge, bhs courses, home education horses, pony club training';
  const fullKeywords = keywords ? `${baseKeywords}, ${keywords}` : baseKeywords;
  
  // Default structured data for the organization
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "BeHorseSavvy",
    "alternateName": ["BeHorseSavvy", "Be Horse Savvy"],
    "description": "Professional equestrian training and education with Penny Pleasant, BHS Professional Accredited Coach",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/DSC_9397.jpg`
    },
    "founder": {
      "@type": "Person",
      "name": "Penny Pleasant",
      "jobTitle": "BHS Professional Accredited Coach",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "BHS Professional Accredited Coach"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Pony Club Accredited Trainer"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Pony Club Assessor"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "BSPS Course Builder"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Panel Judge"
        }
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "Penelopepleasant@gmail.com",
      "contactType": "Customer Service"
    }
  };

  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData,
      ...(structuredData ? [structuredData] : []),
      ...(breadcrumbData ? [breadcrumbData] : []),
      ...(faqData ? [faqData] : []),
      ...(courseData ? [courseData] : []),
      ...(instructorData ? [instructorData] : [])
    ]
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : robots} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="copyright" content="© 2024 BeHorseSavvy - Penny Pleasant" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Alternate URLs for different languages */}
      {alternateUrls.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={alt.url} />
      ))}
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${title} - BeHorseSavvy`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BeHorseSavvy" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Article specific tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {articleSection && <meta property="article:section" content={articleSection} />}
      <meta property="article:author" content={author} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - BeHorseSavvy`} />
      
      {/* Facebook App ID */}
      {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}
      
      {/* LinkedIn */}
      <meta property="og:image:secure_url" content={ogImage} />
      <meta name="linkedin:owner" content="BeHorseSavvy" />
      
      {/* Additional meta tags */}
      <meta name="theme-color" content="#1e3a8a" />
      <meta name="msapplication-TileColor" content="#1e3a8a" />
      <meta name="apple-mobile-web-app-title" content="BeHorseSavvy" />
      <meta name="application-name" content="BeHorseSavvy" />
      
      {/* Geo tags */}
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      
      {/* Dublin Core */}
      <meta name="DC.title" content={title} />
      <meta name="DC.description" content={description} />
      <meta name="DC.creator" content={author} />
      <meta name="DC.language" content="en" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.type" content="website" />
      <meta name="DC.coverage" content="Global" />
      <meta name="DC.rights" content="© 2024 BeHorseSavvy - Penny Pleasant" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(combinedStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO; 