import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Dumbbell, ArrowRight, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || "http://localhost:8000/admin";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/packages", label: "Packages" },
    { path: "/gallery", label: "Gallery" },
    { path: "/feedback", label: "Feedback" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-inner shadow-white/5 transition-all group-hover:border-primary/60 group-hover:bg-primary">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black uppercase tracking-normal text-white">
              MANULA<span className="text-primary">D</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isActive(link.path) && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/25"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={ADMIN_URL}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-bold text-white/85 transition-all hover:border-primary hover:text-white"
            >
              <Shield className="h-4 w-4" />
              Admin
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              Join Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="hidden items-center gap-1 md:flex lg:hidden">
            {links.slice(0, 5).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-primary text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition-colors hover:border-primary/60 hover:text-primary md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-black/90 backdrop-blur-xl md:hidden"
          >
            <div className="grid gap-2 p-3">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={ADMIN_URL}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white transition-colors hover:border-primary hover:text-primary"
              >
                <Shield className="h-4 w-4" />
                Admin panel
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-primary hover:text-white"
              >
                Join Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
