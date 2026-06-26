import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { motion } from "motion/react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { trackVisit } from "../lib/api";

const WHATSAPP_CHAT_URL = "https://wa.me/94778280693";

function WhatsAppChatButton() {
  return (
    <a
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Manula D on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_rgba(37,211,102,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_18px_38px_rgba(37,211,102,0.45)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/35 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon fontSize="large" aria-hidden="true" />
      <span className="sr-only">WhatsApp 0778280693</span>
    </a>
  );
}

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    trackVisit(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    let observer: IntersectionObserver | null = null;
    const animationFrame = window.requestAnimationFrame(() => {
      const sections = Array.from(document.querySelectorAll("main section"));
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("section-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -48px 0px" },
      );

      sections.forEach((section, index) => {
        section.classList.add("section-reveal");
        if (section instanceof HTMLElement) {
          section.style.setProperty("--section-delay", `${Math.min(index * 90, 360)}ms`);
        }
        observer?.observe(section);
      });
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <WhatsAppChatButton />
    </div>
  );
}
