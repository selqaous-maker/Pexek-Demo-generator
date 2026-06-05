"use client";

interface WhatsAppShareProps {
  client: string;
  business: string;
  url: string;
}

const WHATSAPP_TEMPLATE = `Bonjour {{client}} ! Je suis SARA, l'assistante IA de PEXEK. 👋

J'ai été spécialement configurée pour {{business}} afin de vous montrer comment nous aidons les entreprises marocaines à capturer 87% de leads en plus.

🎯 Testez-moi gratuitement ici (aucune installation nécessaire) :
{{url}}

Au plaisir d'échanger !
— SARA 🤖`;

export default function WhatsAppShare({
  client,
  business,
  url,
}: WhatsAppShareProps) {
  const message = WHATSAPP_TEMPLATE.replace(/{{client}}/g, client)
    .replace(/{{business}}/g, business)
    .replace(/{{url}}/g, url);

  const handleShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      const toast = document.createElement("div");
      toast.className = "toast toast-success";
      toast.textContent = "Message copié dans le presse-papier !";
      document.getElementById("toast-root")?.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-500 hover:to-green-600 transition-all text-sm"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-pexek-card border border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-pexek-cyan/30 transition-all text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        Copier
      </button>
    </div>
  );
}