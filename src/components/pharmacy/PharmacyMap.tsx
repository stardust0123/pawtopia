export default function PharmacyMap() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-2xl overflow-hidden border shadow-sm">
        <iframe
          title="Cat Pharmacies Map"
          src="https://www.google.com/maps?q=cat+pharmacy+Ho+Chi+Minh+City&output=embed"
          width="100%"
          height="350"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
