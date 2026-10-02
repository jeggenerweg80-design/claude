import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ------------------------------------------------------------------ */
/* shared client behavior                                              */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useVideoManager(reduced: boolean) {
  useEffect(() => {
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[data-autopause]"),
    );
    if (reduced) {
      videos.forEach((v) => v.pause());
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void v.play().catch(() => undefined);
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.15 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [reduced]);
}

/* ------------------------------------------------------------------ */
/* loader — the seam ignites, then the site opens                      */
/* ------------------------------------------------------------------ */

function Loader({ onDone, reduced }: { onDone: () => void; reduced: boolean }) {
  const [fading, setFading] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setFading(true);
      window.setTimeout(onDone, 750);
    };
    const video = document.getElementById("loader-video") as HTMLVideoElement | null;
    video?.addEventListener("ended", finish);
    const safety = window.setTimeout(finish, 6500);
    const skip = () => finish();
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      video?.removeEventListener("ended", finish);
      window.clearTimeout(safety);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone, reduced]);

  if (reduced) return null;

  return (
    <div className={`loader-overlay ${fading ? "is-fading" : ""}`} aria-hidden="true">
      <video
        id="loader-video"
        className="h-full w-full object-cover"
        src="/assets/video-loader.mp4"
        poster="/assets/support-seam-macro.webp"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <p className="eyebrow absolute bottom-10 left-1/2 -translate-x-1/2 opacity-70">
        HeidSec wird initialisiert
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* nav                                                                 */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { href: "#core", label: "Core" },
  { href: "#secapp", label: "SecApp" },
  { href: "#mailguard", label: "MailGuard" },
  { href: "#vault", label: "Vault" },
  { href: "#vpn", label: "VPN" },
  { href: "#suite", label: "Suite" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-electric/15 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src="/assets/logo-monogram.svg" alt="HeidSec Logo" className="h-7 w-7" />
          <span className="font-display text-lg font-semibold tracking-[0.22em] text-frost">
            HEIDSEC
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-mist transition-colors hover:text-electric"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#suite" className="btn-primary px-5! py-2! text-sm">
          Suite sichern
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* sections                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      <video
        data-autopause
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/video-hero.mp4"
        poster="/assets/hero-still.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 md:px-8">
        <p className="eyebrow reveal" style={{ "--reveal-delay": "0ms" } as CSSProperties}>
          HeidSec Security Suite
        </p>
        <h1
          className="reveal mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.04] tracking-tight text-frost md:text-7xl"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          Sicherheit ist
          <br />
          <span className="text-electric text-glow">kein Zufall.</span>
        </h1>
        <p
          className="reveal mt-7 max-w-xl text-lg leading-relaxed text-mist"
          style={{ "--reveal-delay": "240ms" } as CSSProperties}
        >
          HeidSec bündelt SecApp, MailGuard, Vault und VPN in einer Plattform —
          entwickelt für Menschen, die ihre Daten nicht dem Zufall überlassen.
        </p>
        <div
          className="reveal mt-10 flex flex-wrap items-center gap-4"
          style={{ "--reveal-delay": "360ms" } as CSSProperties}
        >
          <a href="#suite" className="btn-primary">
            Suite entdecken
          </a>
          <a href="#core" className="btn-ghost">
            Produkte ansehen
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="h-9 w-[3px] animate-scroll-hint rounded-full bg-electric/80" />
      </div>
    </section>
  );
}

function CoreSection() {
  const points = [
    {
      title: "Eine Engine",
      text: "HeidSec Core bewertet jede Bedrohung zentral — einmal erkannt, überall abgewehrt.",
    },
    {
      title: "Vier Schutzschichten",
      text: "Gerät, Posteingang, Ablage und Verbindung arbeiten als ein System zusammen.",
    },
    {
      title: "Null Lärm",
      text: "Keine Alarmflut, keine Fachchinesisch. Nur klare Entscheidungen, wenn sie zählen.",
    },
  ];
  return (
    <section id="core" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-28 md:px-8 md:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow reveal">HeidSec Core</p>
          <h2 className="reveal mt-5 font-display text-4xl font-bold tracking-tight text-frost md:text-5xl">
            Eine Engine.
            <br />
            Vier Schutzschichten.
          </h2>
          <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-mist">
            Im Zentrum von HeidSec arbeitet eine Analyse-Engine, die jedes Signal
            einmal bewertet und die Erkenntnis sofort in alle Produkte speist —
            vom Smartphone bis zum verschlüsselten Tunnel.
          </p>
          <div className="mt-10 space-y-6">
            {points.map((p, i) => (
              <div
                key={p.title}
                className="reveal flex gap-4"
                style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}
              >
                <div className="mt-2 h-8 w-[3px] shrink-0 animate-seam-pulse rounded-full bg-electric" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-frost">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-mist">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal video-frame">
          <video
            data-autopause
            className="aspect-video w-full object-cover"
            src="/assets/video-core.mp4"
            poster="/assets/plate-core.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}

type Product = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  video: string;
  poster: string;
  cutout?: string;
  cutoutAlt?: string;
  reverse: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "secapp",
    eyebrow: "SecApp",
    title: "Dein Sicherheitszentrum in der Tasche.",
    text: "SecApp scannt dein Smartphone in Echtzeit, prüft Apps und Verbindungen und warnt dich, bevor aus einem Klick ein Problem wird.",
    bullets: ["Echtzeit-Scan aller Apps", "Sofortige Warnung bei Auffälligkeiten", "Status auf einen Blick"],
    video: "/assets/video-secapp.mp4",
    poster: "/assets/plate-secapp.webp",
    cutout: "/assets/cutout-secapp-phone.png",
    cutoutAlt: "SecApp Smartphone",
    reverse: false,
  },
  {
    id: "mailguard",
    eyebrow: "MailGuard",
    title: "Dein Posteingang, befreit.",
    text: "MailGuard hält Phishing, Betrug und schädliche Anhänge fern — bevor sie deinen Posteingang erreichen. Verdächtiges landet lautlos in Quarantäne.",
    bullets: ["Erkennung von Phishing und Betrug", "Lautlose Quarantäne", "Schutz für alle deine Postfächer"],
    video: "/assets/video-mailguard.mp4",
    poster: "/assets/plate-mailguard.webp",
    reverse: true,
  },
  {
    id: "vault",
    eyebrow: "Vault",
    title: "Dein Tresor. Nur deiner.",
    text: "Vault legt Dokumente, Zugänge und Geheimnisse in einen verschlüsselten Raum, zu dem nur du den Schlüssel hältst — auf all deinen Geräten.",
    bullets: ["Verschlüsselte Ablage", "Zugriff nur mit deinem Schlüssel", "Synchron über alle Geräte"],
    video: "/assets/video-vault.mp4",
    poster: "/assets/plate-vault.webp",
    cutout: "/assets/cutout-vault-core.png",
    cutoutAlt: "Vault Kernmechanik",
    reverse: false,
  },
  {
    id: "vpn",
    eyebrow: "VPN",
    title: "Dein verschlüsselter Tunnel.",
    text: "HeidSec VPN kapselt deine Verbindung und macht deinen Standort unsichtbar — im Hotel-WLAN genauso wie zu Hause.",
    bullets: ["Gekapselte Verbindung", "Standort bleibt privat", "Ein Klick — überall geschützt"],
    video: "/assets/video-vpn.mp4",
    poster: "/assets/plate-vpn.webp",
    reverse: true,
  },
];

function ProductSection({ product }: { product: Product }) {
  return (
    <section id={product.id} className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div
        className={`grid items-center gap-12 lg:grid-cols-2 ${
          product.reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="reveal relative">
          <div className="video-frame">
            <video
              data-autopause
              className="aspect-video w-full object-cover"
              src={product.video}
              poster={product.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          {product.cutout && (
            <img
              src={product.cutout}
              alt={product.cutoutAlt ?? ""}
              loading="lazy"
              className="pointer-events-none absolute -bottom-10 -right-4 w-36 drop-shadow-[0_24px_50px_rgba(46,155,255,0.35)] md:-right-8 md:w-48"
            />
          )}
        </div>
        <div>
          <p className="eyebrow reveal">{product.eyebrow}</p>
          <h2 className="reveal mt-5 font-display text-4xl font-bold tracking-tight text-frost md:text-5xl">
            {product.title}
          </h2>
          <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-mist">{product.text}</p>
          <ul className="mt-8 space-y-3">
            {product.bullets.map((b, i) => (
              <li
                key={b}
                className="reveal flex items-center gap-3 text-frost/90"
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              >
                <span className="h-[3px] w-6 rounded-full bg-electric shadow-[0_0_12px_rgba(46,155,255,0.7)]" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SuiteSection() {
  const cards = [
    { img: "/assets/support-phone-detail.webp", name: "SecApp", href: "#secapp", line: "Mobile Schutzschicht" },
    { img: "/assets/support-tunnel-particles.webp", name: "MailGuard", href: "#mailguard", line: "Posteingang unter Kontrolle" },
    { img: "/assets/support-vault-detail.webp", name: "Vault", href: "#vault", line: "Verschlüsselter Raum" },
    { img: "/assets/support-seam-macro.webp", name: "VPN", href: "#vpn", line: "Privater Tunnel" },
  ];
  return (
    <section id="suite" className="relative scroll-mt-24 overflow-hidden py-28 md:py-36">
      <video
        data-autopause
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        src="/assets/video-suite.mp4"
        poster="/assets/plate-suite.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow reveal">HeidSec Suite Ultimate</p>
          <h2 className="reveal mt-5 font-display text-4xl font-bold tracking-tight text-frost md:text-5xl">
            Alles. In einem Abo.
          </h2>
          <p className="reveal mt-6 text-lg leading-relaxed text-mist">
            Vier Produkte, ein Konto, alle deine Geräte. Die Suite Ultimate
            verbindet SecApp, MailGuard, Vault und VPN zur vollständigen
            Schutzschicht — ohne Konfiguration, ohne Lücken.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <a
              key={c.name}
              href={c.href}
              className="card reveal group block overflow-hidden"
              style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
            >
              <div className="overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-frost">{c.name}</h3>
                <p className="mt-1 text-sm text-mist">{c.line}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="reveal mt-12">
          <a href="#cta" className="btn-primary">
            Suite Ultimate sichern
          </a>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="cta" className="relative scroll-mt-24 overflow-hidden">
      <img
        src="/assets/plate-cta.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 py-32 text-center md:py-44">
        <p className="eyebrow reveal">Bereit, wenn du es bist</p>
        <h2 className="reveal mt-6 font-display text-4xl font-bold tracking-tight text-frost md:text-6xl">
          Mach Sicherheit
          <br />
          zur <span className="text-electric text-glow">Gewohnheit.</span>
        </h2>
        <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-mist">
          Starte heute mit der HeidSec Suite Ultimate und decke Gerät,
          Posteingang, Ablage und Verbindung mit einer einzigen Entscheidung ab.
        </p>
        <div className="reveal mt-10">
          <a href="#top" className="btn-primary px-9! py-4! text-base">
            Jetzt Suite sichern
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <img
        src="/assets/plate-footer.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/40" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <a href="#top" className="flex items-center gap-3">
            <img src="/assets/logo-monogram.svg" alt="HeidSec Logo" className="h-8 w-8" />
            <span className="font-display text-lg font-semibold tracking-[0.22em] text-frost">
              HEIDSEC
            </span>
          </a>
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-mist transition-colors hover:text-electric"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <hr className="hairline mt-10" />
        <div className="mt-8 flex flex-col items-start justify-between gap-3 text-sm text-mist/70 md:flex-row md:items-center">
          <p>© 2026 HeidSec. Alle Rechte vorbehalten.</p>
          <p>Impressum · Datenschutz · Kontakt</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

function Index() {
  const reduced = usePrefersReducedMotion();
  const [loaderDone, setLoaderDone] = useState(false);
  useScrollReveal();
  useVideoManager(reduced);

  return (
    <div className="relative">
      {!loaderDone && <Loader onDone={() => setLoaderDone(true)} reduced={reduced} />}
      <Nav />
      <main>
        <Hero />
        <CoreSection />
        {PRODUCTS.map((p) => (
          <ProductSection key={p.id} product={p} />
        ))}
        <SuiteSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
