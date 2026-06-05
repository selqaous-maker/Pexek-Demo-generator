"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import ConvocoreWidget from "@/components/demo/ConvocoreWidget";
import CountdownTimer from "@/components/demo/CountdownTimer";
import WhatsAppShare from "@/components/demo/WhatsAppShare";

function DemoContent() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get("id") || "demo";
  const client = searchParams.get("client") || "Cher Client";
  const business = searchParams.get("biz") || "votre entreprise";
  const city = searchParams.get("city") || "Casablanca";
  const trialDays = parseInt(searchParams.get("trial") || "7", 10);
  const langParam = searchParams.get("lang") || "fr";
  const platform = searchParams.get("plt") || "convocore";

  const langs = langParam.split(",").map((l) => l.trim().toLowerCase());
  const isArabic = langs.some((l) => l === "ar" || l === "darija");
  const isRtl = isArabic;
  const primaryLang = langs[0] || "fr";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const greetings: Record<string, string> = {
    fr: `Bonjour ${client} 👋`,
    en: `Hello ${client} 👋`,
    ar: `!مرحباً ${client} 👋`,
    darija: `!سلام ${client} 👋`,
  };

  const greeting = isArabic
    ? `!مرحباً ${client} 👋`
    : greetings[primaryLang] || greetings.fr;

  const heroTitleFr = `Never Miss a Lead Again. Meet SARA.`;
  const heroTitleEn = `Never Miss a Lead Again. Meet SARA.`;
  const heroTitle = primaryLang === "en" ? heroTitleEn : heroTitleFr;

  const heroSubFr = `L'assistante IA qui transforme vos visiteurs en clients. Configurée spécialement pour ${business} à ${city}.`;
  const heroSubEn = `The AI assistant that turns visitors into clients. Configured specially for ${business} in ${city}.`;
  const heroSub = primaryLang === "en" ? heroSubEn : heroSubFr;

  const painPoints = [
    {
      icon: "📉",
      titleFr: "Vous perdez des clients chaque jour",
      descFr: "80% des visiteurs quittent votre site sans laisser de contact. Chaque visiteur perdu est un client potentiel qui choisit un concurrent.",
      titleEn: "You lose clients every day",
      descEn: "80% of visitors leave your site without leaving contact. Every lost visitor is a potential client choosing a competitor.",
    },
    {
      icon: "⏰",
      titleFr: "Vos horaires limitent vos ventes",
      descFr: "Si vous ne répondez pas à 2h du matin, un concurrent le fera. Les clients marocains veulent des réponses immédiates, 24h/24 et 7j/7.",
      titleEn: "Your hours limit your sales",
      descEn: "If you don't answer at 2 AM, a competitor will. Moroccan clients want immediate answers, 24/7.",
    },
    {
      icon: "💰",
      titleFr: "Chaque lead non suivi coûte cher",
      descFr: "Un lead non traité dans les 5 premières minutes a 80% de chances de ne jamais aboutir. Vous payez pour des leads que vous ne capturez pas.",
      titleEn: "Every untracked lead costs money",
      descEn: "A lead not handled within the first 5 minutes has 80% chance of never converting. You pay for leads you don't capture.",
    },
    {
      icon: "🤯",
      titleFr: "La gestion manuelle est épuisante",
      descFr: "Répondre aux mêmes questions encore et encore fait perdre un temps précieux à votre équipe. Pendant ce temps, votre entreprise stagne.",
      titleEn: "Manual management is exhausting",
      descEn: "Answering the same questions over and over wastes your team's valuable time. Meanwhile, your business stagnates.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      titleFr: "Connexion Instantanée",
      descFr: "SARA se connecte à votre site web ou page Facebook en 2 minutes. Aucune installation technique complexe.",
      titleEn: "Instant Connection",
      descEn: "SARA connects to your website or Facebook page in 2 minutes. No complex technical setup.",
    },
    {
      step: "02",
      titleFr: "IA Formée sur Mesure",
      descFr: "Nous configurons SARA avec vos produits, vos services et votre ton. Elle parle comme votre meilleur commercial.",
      titleEn: "Custom-Trained AI",
      descEn: "We configure SARA with your products, services, and tone. She talks like your best salesperson.",
    },
    {
      step: "03",
      titleFr: "Capture 24h/24",
      descFr: "SARA engage chaque visiteur, répond à ses questions et collecte ses coordonnées. Même à 3h du matin un dimanche.",
      titleEn: "24/7 Capture",
      descEn: "SARA engages every visitor, answers questions, and collects contact info. Even at 3 AM on a Sunday.",
    },
    {
      step: "04",
      titleFr: "Résultats en Temps Réel",
      descFr: "Recevez chaque lead directement sur WhatsApp avec un résumé complet. Suivez vos performances depuis votre tableau de bord.",
      titleEn: "Real-Time Results",
      descEn: "Receive every lead directly on WhatsApp with a full summary. Track performance from your dashboard.",
    },
  ];

  const testimonials = [
    {
      name: "Karim B.",
      roleFr: "Agent immobilier — Casablanca",
      roleEn: "Real Estate Agent — Casablanca",
      quoteFr:
        "Depuis que SARA gère mes demandes sur WhatsApp, je capture 3× plus de rendez-vous. Mes clients sont stupéfaits par la rapidité des réponses.",
      quoteEn:
        "Since SARA handles my WhatsApp requests, I capture 3× more appointments. My clients are amazed by the response speed.",
    },
    {
      name: "Dr. Nadia E.",
      roleFr: "Clinique dentaire — Rabat",
      roleEn: "Dental Clinic — Rabat",
      quoteFr:
        "Je ne perdais que 40% de mes leads en dehors des heures d'ouverture. Maintenant SARA répond à la place de ma secrétaire la nuit.",
      quoteEn:
        "I was losing 40% of my leads outside business hours. Now SARA answers instead of my secretary at night.",
    },
    {
      name: "Youssef M.",
      roleFr: "Développeur freelance — Marrakech",
      roleEn: "Freelance Developer — Marrakech",
      quoteFr:
        "SARA a changé ma façon de travailler. Je peux me concentrer sur le code pendant qu'elle qualifie mes leads. Indispensable.",
      quoteEn:
        "SARA changed my way of working. I can focus on coding while she qualifies my leads. Essential.",
    },
  ];

  const t = (fr: string, en: string) => {
    if (primaryLang === "en") return en;
    return fr;
  };

  const demoUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `${process.env.NEXT_PUBLIC_BASE_URL || "https://pexek.com"}/demo?id=${agentId}&client=${client}&biz=${encodeURIComponent(business)}&city=${encodeURIComponent(city)}&trial=${trialDays}&lang=${langParam}&plt=${platform}`;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen bg-pexek-navy text-gray-200 font-dm relative overflow-hidden ${
        mounted ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="fixed top-[-200px] right-[-200px] w-[500px] h-[500px] glow-orb glow-orb-cyan" />
      <div className="fixed bottom-[-200px] left-[-200px] w-[600px] h-[600px] glow-orb glow-orb-gold" />

      {/* Convocore Widget */}
      <ConvocoreWidget />

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-pexek-navy/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* SVG Logo */}
          <a href="#" className="flex items-center gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="34"
                height="34"
                rx="8"
                stroke="#00D4FF"
                strokeWidth="2"
                fill="#0A1628"
              />
              <path
                d="M10 26V10h6.5c2.5 0 4.5 1.5 4.5 4.5s-2 4.5-4.5 4.5H14l6 7h-4.5l-5.5-7V26H10z"
                fill="#00D4FF"
              />
              <circle cx="24" cy="12" r="2" fill="#F5C842" />
            </svg>
            <span className="font-syne font-bold text-lg text-white">
              PEXEK
            </span>
          </a>

          <a
            href="#demo-box"
            className="px-4 py-2 bg-pexek-cyan/10 border border-pexek-cyan/30 text-pexek-cyan rounded-lg text-sm font-semibold hover:bg-pexek-cyan/20 transition-all"
          >
            Try SARA Live
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {isArabic && (
            <div className="mb-4 animate-fade-in">
              <span className="inline-block px-4 py-1.5 bg-pexek-gold/10 border border-pexek-gold/20 text-pexek-gold rounded-full text-sm">
                {greeting}
              </span>
            </div>
          )}

          {!isArabic && (
            <div className="mb-4 animate-fade-in">
              <span className="inline-block px-4 py-1.5 bg-pexek-cyan/10 border border-pexek-cyan/20 text-pexek-cyan rounded-full text-sm">
                {greeting}
              </span>
            </div>
          )}

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-syne font-bold text-white leading-tight mb-6 ${
              mounted ? "animate-fade-in" : ""
            } ${isArabic ? "text-right" : ""}`}
          >
            {isArabic ? (
              <>
                <span className="text-pexek-cyan">SARA</span>
                <br />
                تفوّق على المنافسة مع
              </>
            ) : (
              <>
                {heroTitle.split("SARA.")[0]}
                <span className="text-pexek-cyan">SARA</span>.
              </>
            )}
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-dm leading-relaxed ${
              mounted ? "animate-fade-in stagger-1" : ""
            }`}
          >
            {isArabic
              ? `المساعد الذكي الذي يحوّل زوّارك إلى عملاء. تم إعداده خصيصًا لـ ${business} في ${city}.`
              : heroSub}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mt-10 ${
              mounted ? "animate-fade-in stagger-2" : ""
            }`}
          >
            <a
              href="#demo-box"
              className="px-8 py-4 bg-pexek-cyan text-pexek-navy rounded-xl font-semibold text-lg hover:bg-pexek-cyan/90 transition-all hover:shadow-lg hover:shadow-pexek-cyan/20 animate-pulse-glow"
            >
              {t("Lancer la Démo SARA →", "Launch SARA Demo →")}
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-transparent border border-gray-700 text-gray-300 rounded-xl font-semibold text-lg hover:border-pexek-cyan/30 transition-all"
            >
              {t("Voir comment ça marche", "See how it works")}
            </a>
          </div>
        </div>
      </section>

      {/* ===== STATS ROW ===== */}
      <section
        className={`py-12 px-4 max-w-5xl mx-auto ${
          mounted ? "animate-fade-in stagger-3" : ""
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "87%", label: t("Leads en +", "More Leads") },
            { value: "3×", label: t("Rendez-vous", "Appointments") },
            { value: "24/7", label: t("Disponible", "Available") },
            { value: "<2s", label: t("Temps réponse", "Response Time") },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-xl bg-pexek-card/50 border border-gray-800/50 backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-syne font-bold text-pexek-cyan">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1 font-dm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PAIN POINTS ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl font-syne font-bold text-center text-white mb-4 ${
            mounted ? "animate-fade-in" : ""
          }`}
        >
          {t("Le problème", "The Problem")}
        </h2>
        <p
          className={`text-center text-gray-400 mb-12 max-w-2xl mx-auto font-dm ${
            mounted ? "animate-fade-in stagger-1" : ""
          }`}
        >
          {t(
            "Chaque jour sans automation, vous laissez de l'argent sur la table.",
            "Every day without automation, you leave money on the table."
          )}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl bg-pexek-card/60 border border-gray-800/50 hover:border-pexek-cyan/20 transition-all backdrop-blur-sm group ${
                mounted ? `animate-fade-in stagger-${i + 1}` : ""
              }`}
            >
              <div className="text-3xl mb-3">{point.icon}</div>
              <h3 className="text-lg font-syne font-semibold text-white mb-2">
                {t(point.titleFr, point.titleEn)}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-dm">
                {t(point.descFr, point.descEn)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl font-syne font-bold text-center text-white mb-4 ${
            mounted ? "animate-fade-in" : ""
          }`}
        >
          {t("Comment ça marche", "How It Works")}
        </h2>
        <p
          className={`text-center text-gray-400 mb-12 max-w-2xl mx-auto font-dm ${
            mounted ? "animate-fade-in stagger-1" : ""
          }`}
        >
          {t(
            "SARA est opérationnelle en moins de 24h. Voici comment.",
            "SARA is operational in less than 24h. Here's how."
          )}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => (
            <div
              key={i}
              className={`relative p-6 rounded-xl bg-pexek-card/60 border border-gray-800/50 hover:border-pexek-cyan/20 transition-all backdrop-blur-sm ${
                mounted ? `animate-fade-in stagger-${i + 1}` : ""
              }`}
            >
              <div className="text-4xl font-syne font-bold text-pexek-cyan/20 mb-3">
                {step.step}
              </div>
              <h3 className="text-lg font-syne font-semibold text-white mb-2">
                {t(step.titleFr, step.titleEn)}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-dm">
                {t(step.descFr, step.descEn)}
              </p>
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/2 right-[-12px] text-pexek-cyan/30 text-xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== DEMO BOX ===== */}
      <section
        id="demo-box"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"
      >
        <div className="relative rounded-2xl bg-gradient-to-b from-pexek-card to-pexek-navy border border-gray-800/60 p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] glow-orb glow-orb-cyan opacity-30" />

          <div className="relative z-10">
            {/* Online badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-green-400 font-semibold text-sm font-dm">
                {t("SARA est en ligne", "SARA is Online")}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-syne font-bold text-white mb-4">
              {t(
                "Testez SARA gratuitement",
                "Try SARA for Free"
              )}
            </h3>
            <p className="text-gray-400 mb-8 font-dm max-w-lg mx-auto">
              {t(
                "Cliquez sur le bouton ci-dessous pour lancer la démo interactive. SARA vous répondra en temps réel.",
                "Click the button below to launch the interactive demo. SARA will respond to you in real time."
              )}
            </p>

            <button
              onClick={() => {
                // Trigger Convocore widget
                const widgetBtn = document.querySelector(
                  '[data-vg-widget-trigger]'
                ) as HTMLElement;
                if (widgetBtn) {
                  widgetBtn.click();
                } else {
                  // Fallback: scroll to bottom where the widget renders
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }
              }}
              className="px-8 py-4 bg-pexek-cyan text-pexek-navy rounded-xl font-semibold text-lg hover:bg-pexek-cyan/90 transition-all hover:shadow-lg hover:shadow-pexek-cyan/30 animate-pulse-glow"
            >
              {t("Lancer la Démo SARA 🚀", "Launch SARA Demo 🚀")}
            </button>

            <p className="text-xs text-gray-500 mt-4 font-dm">
              {t(
                "Aucune installation nécessaire. La démo fonctionne directement dans votre navigateur.",
                "No installation needed. The demo works directly in your browser."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl font-syne font-bold text-center text-white mb-4 ${
            mounted ? "animate-fade-in" : ""
          }`}
        >
          {t("Ils nous font confiance", "Trusted by")}
        </h2>
        <p
          className={`text-center text-gray-400 mb-12 max-w-2xl mx-auto font-dm ${
            mounted ? "animate-fade-in stagger-1" : ""
          }`}
        >
          {t(
            "Des entreprises marocaines de tous secteurs utilisent SARA au quotidien.",
            "Moroccan companies from all sectors use SARA daily."
          )}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl bg-pexek-card/60 border border-gray-800/50 hover:border-pexek-cyan/20 transition-all backdrop-blur-sm ${
                mounted ? `animate-fade-in stagger-${i + 2}` : ""
              }`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 text-pexek-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 font-dm italic">
                &ldquo;{t(testimonial.quoteFr, testimonial.quoteEn)}&rdquo;
              </p>
              <div>
                <p className="font-syne font-semibold text-white text-sm">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-xs font-dm">
                  {t(testimonial.roleFr, testimonial.roleEn)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-800/50 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="34"
                height="34"
                rx="8"
                stroke="#00D4FF"
                strokeWidth="2"
                fill="#0A1628"
              />
              <path
                d="M10 26V10h6.5c2.5 0 4.5 1.5 4.5 4.5s-2 4.5-4.5 4.5H14l6 7h-4.5l-5.5-7V26H10z"
                fill="#00D4FF"
              />
              <circle cx="24" cy="12" r="2" fill="#F5C842" />
            </svg>
            <span className="font-syne font-bold text-white">PEXEK</span>
          </div>
          <p className="text-gray-500 text-sm font-dm">
            © {new Date().getFullYear()} PEXEK —{" "}
            {t(
              "Automation IA pour entreprises marocaines",
              "AI Automation for Moroccan Businesses"
            )}
          </p>
          <div className="flex gap-4 text-gray-500 text-sm font-dm">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Découvrez SARA — l'assistante IA de PEXEK : ${demoUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pexek-cyan transition-colors"
            >
              {t("Nous contacter", "Contact Us")}
            </a>
          </div>
        </div>
      </footer>

      {/* ===== URGENCY BANNER (fixed bottom) ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-pexek-navy/90 backdrop-blur-md border-t border-gray-800/50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {(trialDays > 0) && (
              <>
                <svg className="w-5 h-5 text-pexek-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-300 font-dm">
                  {t("Essai gratuit : ", "Free Trial: ")}
                </span>
                <CountdownTimer trialDays={trialDays} agentId={agentId} />
              </>
            )}
            {trialDays <= 0 && (
              <span className="text-sm text-pexek-cyan font-dm">
                {t("Accès permanent ✅", "Permanent Access ✅")}
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <WhatsAppShare
              client={client}
              business={business}
              url={demoUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-pexek-navy flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-pexek-cyan/30 border-t-pexek-cyan rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 font-dm">Chargement...</p>
          </div>
        </div>
      }
    >
      <DemoContent />
    </Suspense>
  );
}