interface SeoJsonLdProps {
  data: object
}

/** Renders a single JSON-LD `<script>` block. `data` is always our own typed
 * object from structuredData.ts (never user input); `<` is still escaped so a
 * stray "</script>" inside a string value can't prematurely close the tag. */
function SeoJsonLd({ data }: SeoJsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export default SeoJsonLd
