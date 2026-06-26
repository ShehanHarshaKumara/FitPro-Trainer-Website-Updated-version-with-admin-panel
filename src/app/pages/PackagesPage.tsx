import { Clock, Users, TrendingUp, Home, Dumbbell, Target } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { assetUrl, getApi, type ApiPackage } from "../lib/api";

export function PackagesPage() {
  const [managedPackages, setManagedPackages] = useState<ApiPackage[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const packages = [
    {
      id: "legacy",
      icon: TrendingUp,
      title: "LEGACY",
      duration: "12-Month Transformation Journey",
      level: "Rs. 165,500",
      description: "Designed for individuals who want more than a short-term transformation. This premium coaching experience provides year-round guidance, accountability, and support to help you build a stronger physique and sustainable lifestyle.",
      features: [
        "Fully personalized nutrition plan with ongoing updates",
        "Customized training programs tailored to your goals and schedule",
        "Daily progress tracking and accountability",
        "Unlimited meal plan modifications when required",
        "Personalized workout plan updates throughout the year",
        "Supplementation guidance and recommendations",
        "Technique and exercise support",
        "Lifestyle and habit coaching",
        "24-Hour WhatsApp response guarantee",
        "Direct access to your coach for guidance and support",
      ],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=90",
      imagePosition: "object-center",
    },
    {
      id: "foundation",
      icon: Dumbbell,
      title: "FOUNDATION",
      duration: "3-Month Coaching Program",
      level: "Rs. 66,500",
      description: "A results-driven coaching experience designed to help you build momentum, establish consistency, and create measurable progress through personalized training and nutrition guidance.",
      features: [
        "Personalized meal plan tailored to your goals",
        "Customized training program based on your fitness level and lifestyle",
        "Weekly progress tracking and feedback",
        "Ongoing plan modifications based on your results",
        "Supplementation recommendations",
        "Accountability and coach support",
        "Exercise form and technique guidance",
        "24-48 Hour WhatsApp response guarantee",
      ],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=90",
      imagePosition: "object-center",
    },
    {
      id: "elevate",
      icon: Target,
      title: "ELEVATE",
      duration: "6-Month Coaching Program",
      level: "Rs. 92,500",
      description: "Created for individuals who are serious about maximizing their results through a structured and sustainable approach. This program focuses on refining your physique, improving performance, and maintaining consistent progress over an extended period.",
      features: [
        "Personalized nutrition plan with ongoing updates",
        "Goal-specific training programs designed for progression",
        "Regular progress assessments and strategy adjustments",
        "Recovery and lifestyle management guidance",
        "Supplementation recommendations",
        "Performance and physique tracking",
        "Coach support throughout the program",
        "24-48 Hour WhatsApp response guarantee",
      ],
      image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=1600&q=90",
      imagePosition: "object-center",
    },
    {
      id: "elite-monthly",
      icon: Clock,
      title: "ELITE MONTHLY",
      duration: "Monthly Coaching Membership",
      level: "Rs. 28,500",
      description: "A high-support coaching experience designed for individuals who value regular guidance and accountability.",
      features: [
        "Personalized meal plan",
        "Customized training plan",
        "Weekly progress reviews",
        "Coach feedback and support",
        "Recipe collection",
        "Supplement guidance",
        "24-48 Hour WhatsApp response guarantee",
      ],
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1600&q=90",
      imagePosition: "object-center",
    },
    {
      id: "nutrition-blueprint",
      icon: Users,
      title: "NUTRITION BLUEPRINT",
      duration: "One-Time Plan",
      level: "Rs. 16,500",
      description: "A personalized nutrition plan built around your lifestyle, food preferences, and body composition goals.",
      features: [
        "Customized calorie targets",
        "Personalized meal structure",
        "Flexible food selections",
        "Supplement recommendations",
      ],
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=90",
      imagePosition: "object-center",
    },
    {
      id: "training-blueprint",
      icon: Home,
      title: "TRAINING BLUEPRINT",
      duration: "One-Time Workout Plan",
      level: "Rs. 16,500",
      description: "A fully customized workout program designed specifically for your fitness level, training experience, available equipment, and physique goals. Whether you train at a gym or from home, you'll receive a structured training plan built to help you progress with confidence and clarity.",
      features: [
        "Personalized workout plan",
        "Customized to your fitness level and experience",
        "Home or gym-based training options",
        "Goal-specific exercise selection",
        "Structured sets, reps, and training volume",
        "Progressive overload strategy for continued results",
        "Clear exercise instructions and training guidance",
      ],
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=90",
      imagePosition: "object-center",
    },
  ];
  useEffect(() => {
    let active = true;
    getApi<ApiPackage[]>("packages")
      .then((items) => { if (active) setManagedPackages(items); })
      .catch(() => { if (active) setLoadError(true); });
    return () => { active = false; };
  }, []);
  const displayPackages = managedPackages === null ? packages : managedPackages.map((item, index) => ({ ...item, id: item.slug, level: item.price, image: assetUrl(item.image) || packages[index % packages.length].image, imagePosition: "object-center", icon: [TrendingUp, Dumbbell, Target, Clock, Users, Home][index % 6] }));

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Packages"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl mb-4">Coaching <span className="text-primary">Packages</span></h1>
          <p className="text-xl text-white/80">Structured coaching options for natural results and long-term progress</p>
        </div>
      </section>

      <section className="py-20 theme-section-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loadError && <p className="lg:col-span-2 rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-center text-amber-100">Live package updates are temporarily unavailable. Showing the standard packages.</p>}
            {!displayPackages.length && <p className="lg:col-span-2 rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/70">Packages are being updated. Please check back soon.</p>}
            {displayPackages.map((packageItem, index) => (
              <motion.div
                key={packageItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={packageItem.image}
                    alt={packageItem.title}
                    className={`w-full h-full object-cover ${
                      packageItem.imagePosition || "object-center"
                    } group-hover:scale-110 transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  <div className="absolute top-4 right-4 rounded-lg border border-emerald-300/50 bg-emerald-500 px-4 py-2 shadow-lg shadow-emerald-500/30">
                    <span>{packageItem.level}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 backdrop-blur-sm rounded-lg">
                      <packageItem.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl">{packageItem.title}</h3>
                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="w-4 h-4" />
                      <span>{packageItem.duration}</span>
                    </div>
                  </div>
                  <p className="text-white/70 mb-6">{packageItem.description}</p>
                  <div className="space-y-2 mb-6">
                    {packageItem.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/contact?package=${packageItem.id}`}
                    className="block w-full text-center px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                  >
                    Choose Package
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
