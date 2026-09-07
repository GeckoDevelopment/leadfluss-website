// Rendert strukturierte Daten (JSON-LD) als <script>-Tag im Markup.
// Server-Komponente – wird direkt in Layout/Seiten eingebettet.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify ist sicher; die Daten stammen ausschließlich aus dem Code.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
