import { AlertCircle, CheckCircle2, Loader2, Send, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import Swal from "sweetalert2";
import { getApi, submitFeedback, type ApiPackage } from "../lib/api";

const CONTACT_EMAIL = "manuladamith@gmail.com";

const fallbackPackageOptions = [
  {
    id: "legacy",
    title: "LEGACY",
    duration: "12-Month Transformation Journey",
    price: "Rs. 165,500",
    description: "Designed for individuals who want more than a short-term transformation. This premium coaching experience provides year-round guidance, accountability, and support to help you build a stronger physique and sustainable lifestyle.",
  },
  {
    id: "foundation",
    title: "FOUNDATION",
    duration: "3-Month Coaching Program",
    price: "Rs. 66,500",
    description: "A results-driven coaching experience designed to help you build momentum, establish consistency, and create measurable progress through personalized training and nutrition guidance.",
  },
  {
    id: "elevate",
    title: "ELEVATE",
    duration: "6-Month Coaching Program",
    price: "Rs. 92,500",
    description: "Created for individuals who are serious about maximizing their results through a structured and sustainable approach.",
  },
  {
    id: "elite-monthly",
    title: "ELITE MONTHLY",
    duration: "Monthly Coaching Membership",
    price: "Rs. 28,500",
    description: "A high-support coaching experience designed for individuals who value regular guidance and accountability.",
  },
  {
    id: "nutrition-blueprint",
    title: "NUTRITION BLUEPRINT",
    duration: "One-Time Plan",
    price: "Rs. 16,500",
    description: "A personalized nutrition plan built around your lifestyle, food preferences, and body composition goals.",
  },
  {
    id: "training-blueprint",
    title: "TRAINING BLUEPRINT",
    duration: "One-Time Workout Plan",
    price: "Rs. 16,500",
    description: "A fully customized workout program designed specifically for your fitness level, training experience, available equipment, and physique goals.",
  },
];

function PhoneBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="11" fill="#22C55E" />
      <path
        fill="#FFFFFF"
        d="M16.9 14.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.3 2.4 3.7 5.8 5.1.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.8 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5Z"
      />
    </svg>
  );
}

function GoogleMailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#4285F4" d="M20.5 6.5v11.1c0 .8-.7 1.4-1.5 1.4h-3.1V11.9l4.6-5.4Z" />
      <path fill="#34A853" d="M3.5 6.5v11.1c0 .8.7 1.4 1.5 1.4h3.1v-7.1L3.5 6.5Z" />
      <path fill="#FBBC04" d="M15.9 19V11.9L12 14.8l-3.9-2.9V19h7.8Z" />
      <path fill="#EA4335" d="M3.5 6.5 12 12.9l8.5-6.4V6.4c0-.9-1-1.5-1.8-.9L12 10.5 5.3 5.5c-.8-.6-1.8 0-1.8.9v.1Z" />
    </svg>
  );
}

function InstagramBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FDF497" />
          <stop offset="5%" stopColor="#FDF497" />
          <stop offset="45%" stopColor="#FD5949" />
          <stop offset="60%" stopColor="#D6249F" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="22" height="22" x="1" y="1" rx="6" fill="url(#instagram-gradient)" />
      <path
        fill="#FFFFFF"
        d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 12 8.9a3.1 3.1 0 0 1 0 6.2Zm5-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"
      />
      <path
        fill="#FFFFFF"
        d="M16.1 3.8H7.9a4.1 4.1 0 0 0-4.1 4.1v8.2a4.1 4.1 0 0 0 4.1 4.1h8.2a4.1 4.1 0 0 0 4.1-4.1V7.9a4.1 4.1 0 0 0-4.1-4.1Zm2.5 12.3a2.5 2.5 0 0 1-2.5 2.5H7.9a2.5 2.5 0 0 1-2.5-2.5V7.9a2.5 2.5 0 0 1 2.5-2.5h8.2a2.5 2.5 0 0 1 2.5 2.5v8.2Z"
      />
    </svg>
  );
}

function TikTokBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="11" fill="#050505" />
      <path
        fill="#25F4EE"
        d="M10.7 10.4v-1.1a5 5 0 0 0-.8-.1 4.2 4.2 0 0 0-4.2 4.2 4.1 4.1 0 0 0 1.8 3.4 4.1 4.1 0 0 1-.7-2.3 4.2 4.2 0 0 1 3.9-4.1Z"
      />
      <path
        fill="#25F4EE"
        d="M10.8 15.8a1.9 1.9 0 0 0 1.9-1.9V4.8H15a3.9 3.9 0 0 1-.1-.8h-3.1v9.1a1.9 1.9 0 0 1-2.7 1.7 1.9 1.9 0 0 0 1.7 1Z"
      />
      <path
        fill="#FE2C55"
        d="M15 4.8a3.9 3.9 0 0 0 3.1 3.1V6.8a3.9 3.9 0 0 1-2.3-2H15ZM9.9 12.3a1.9 1.9 0 0 0-.8 3.6 1.9 1.9 0 0 1 1.6-2.9c.3 0 .5 0 .8.1v-2.7a5 5 0 0 0-.8-.1v2.1a2.2 2.2 0 0 0-.8-.1Z"
      />
      <path
        fill="#FE2C55"
        d="M18.1 7.9v2.4a6.7 6.7 0 0 1-3.9-1.2v5.7a4.2 4.2 0 0 1-6.7 3.4 4.2 4.2 0 0 0 7.7-2.4v-5.7a6.7 6.7 0 0 0 3.9 1.2V8c-.3 0-.7-.1-1-.1Z"
      />
      <path
        fill="#FFFFFF"
        d="M14.2 14.8V9.1a6.7 6.7 0 0 0 3.9 1.2V7.9A3.9 3.9 0 0 1 15 4.8h-2.3v9.1a1.9 1.9 0 1 1-1.9-1.9c.3 0 .5 0 .8.1V9.3a4.2 4.2 0 0 0-.8-.1 4.2 4.2 0 1 0 3.4 5.6Z"
      />
    </svg>
  );
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const [managedPackages, setManagedPackages] = useState<ApiPackage[] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedPackageId, setSelectedPackageId] = useState(searchParams.get("package") || "");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const packageOptions = useMemo(
    () => managedPackages === null
      ? fallbackPackageOptions
      : managedPackages.map(({ slug, title, duration, price, description }) => ({ id: slug, title, duration, price, description })),
    [managedPackages],
  );
  const selectedPackage = useMemo(
    () => packageOptions.find((packageItem) => packageItem.id === selectedPackageId),
    [packageOptions, selectedPackageId],
  );

  useEffect(() => {
    let active = true;
    getApi<ApiPackage[]>("packages").then((items) => { if (active) setManagedPackages(items); }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const packageId = searchParams.get("package") || "";
    setSelectedPackageId(packageId);
  }, [searchParams]);

  useEffect(() => {
    if (!selectedPackage) {
      return;
    }

    setFormData((currentFormData) => {
      if (currentFormData.message.trim()) {
        return currentFormData;
      }

      return {
        ...currentFormData,
        message: `I am interested in the ${selectedPackage.title} package. Please send me more details.`,
      };
    });
  }, [selectedPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedMessage = formData.message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      setErrorMessage("Please add your name, email, and message before sending.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await submitFeedback({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        package_id: selectedPackage?.id || "",
        message: [selectedPackage ? `Package: ${selectedPackage.title} (${selectedPackage.price})` : "", trimmedMessage].filter(Boolean).join("\n\n"),
      });

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedPackageId("");

      Swal.fire({
        title: "Message Sent",
        text: `Your message was sent successfully to ${CONTACT_EMAIL}.`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
        background: "#111111",
        color: "#ffffff",
      });

      window.setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please check your connection and try again.",
      );
      window.setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const packageId = e.target.value;
    const packageItem = packageOptions.find((item) => item.id === packageId);

    setSelectedPackageId(packageId);

    if (packageItem) {
      setFormData((currentFormData) => ({
        ...currentFormData,
        message:
          currentFormData.message.trim() && !currentFormData.message.startsWith("I am interested in the")
            ? currentFormData.message
            : `I am interested in the ${packageItem.title} package. Please send me more details.`,
      }));
    }
  };

  const contactInfo = [
    {
      icon: PhoneBrandIcon,
      label: "Phone",
      value: "+94 77 828 0693",
      link: "tel:+94778280693",
    },
    {
      icon: GoogleMailIcon,
      label: "Email",
      value: CONTACT_EMAIL,
      link: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: InstagramBrandIcon,
      label: "Instagram",
      value: "@_manula_d",
      link: "https://www.instagram.com/_manula_d?igsh=ejMyczR5ZTAzMDkz&utm_source=qr",
    },
    {
      icon: TikTokBrandIcon,
      label: "TikTok",
      value: "@_manula_d",
      link: "https://www.tiktok.com/@_manula_d?_r=1&_t=ZS-96UgFr3bx83",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl mb-4">Get In <span className="text-primary">Touch</span></h1>
          <p className="text-xl text-white/80">Let's start your fitness journey together</p>
        </div>
      </section>

      <section className="py-20 theme-section-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">Let's Talk About Your <span className="text-primary">Goals</span></h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Ready to transform your body and build healthier habits? Send a message and I will help you choose the right coaching path for your goals.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white p-2 shadow-xl shadow-black/25 transition-all group-hover:scale-105 group-hover:shadow-primary/15">
                      <item.icon className="h-11 w-11" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">{item.label}</p>
                      <p className="text-lg">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-xl border border-primary/30">
                <h3 className="text-xl mb-3">Free Consultation</h3>
                <p className="text-white/70">
                  Book a consultation to discuss your current routine, fitness goals, nutrition challenges, and the best program for your transformation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl border border-white/10 p-8">
                <h3 className="text-2xl mb-6">Send Me a Message</h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-white/80">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-white/80">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 text-white/80">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="+94 77 828 0693"
                    />
                  </div>

                  <div>
                    <label htmlFor="selected-package" className="block mb-2 text-white/80">
                      Selected Package
                    </label>
                    <select
                      id="selected-package"
                      value={selectedPackageId}
                      onChange={handlePackageChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-black">Choose a package</option>
                      {packageOptions.map((packageItem) => (
                        <option key={packageItem.id} value={packageItem.id} className="bg-black">
                          {packageItem.title} - {packageItem.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedPackage && (
                    <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-wide text-emerald-200/80">Package Selected</p>
                          <h4 className="mt-1 text-2xl text-white">{selectedPackage.title}</h4>
                          <p className="mt-1 text-white/70">{selectedPackage.duration}</p>
                        </div>
                        <div className="rounded-lg border border-emerald-300/50 bg-emerald-500 px-4 py-2 font-semibold text-white shadow-lg shadow-emerald-500/20">
                          {selectedPackage.price}
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-white/75">{selectedPackage.description}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="message" className="block mb-2 text-white/80">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your fitness goals and what you're looking to achieve..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full px-6 py-4 bg-primary hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 rounded-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                      Thanks. Your message was sent successfully.
                    </p>
                  )}

                  {status === "error" && errorMessage && (
                    <p className="flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 theme-section-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Connect With <span className="text-primary">Manula D</span></h2>
            <p className="text-white/60 text-xl">Follow the coaching journey and send a direct message</p>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Gym Location"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 inline-block">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h3 className="text-xl">Manula D Fitness Coaching</h3>
                </div>
                <p className="text-white/80">Online coaching, onsite personal training, and live video coaching available.</p>
                <p className="text-white/60 mt-2">Email manuladamith@gmail.com or call +94 77 828 0693.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
