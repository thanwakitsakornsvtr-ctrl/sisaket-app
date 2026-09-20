import { attractions } from '../data/attractions'

const SITE_NAME = 'เที่ยวศรีสะเกษ'

function touristAttractionNode(a: (typeof attractions)[number]) {
  return {
    '@type': 'TouristAttraction',
    name: a.name,
    description: a.shortDescription,
    image: a.image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: a.district,
      addressRegion: 'ศรีสะเกษ',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: a.lat,
      longitude: a.lng,
    },
  }
}

/** WebSite + ItemList of every attraction, as a single JSON-LD graph. */
export function buildAttractionsJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        inLanguage: 'th',
        about: 'คู่มือท่องเที่ยวจังหวัดศรีสะเกษ',
      },
      {
        '@type': 'ItemList',
        name: 'สถานที่ท่องเที่ยวแนะนำในจังหวัดศรีสะเกษ',
        itemListElement: attractions.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: touristAttractionNode(a),
        })),
      },
    ],
  }
}

export interface FaqJsonLdEntry {
  question: string
  answer: string
}

/** FAQPage JSON-LD — built lazily so it works once src/data/faq.ts has real content. */
export function buildFaqJsonLd(entries: FaqJsonLdEntry[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  }
}
