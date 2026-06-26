import { Link } from "react-router";
import {
  Award,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  Dumbbell,
  Flame,
  MessageCircle,
  NotebookTabs,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export function HomePage() {
  const coachingSteps = [
    {
      icon: Target,
      title: "Goal Audit",
      description: "We map your current training, nutrition, schedule, and transformation target before building the plan.",
    },
    {
      icon: NotebookTabs,
      title: "Custom System",
      description: "You get structured workouts, practical nutrition guidance, and weekly priorities that fit real life.",
    },
    {
      icon: BarChart3,
      title: "Progress Reviews",
      description: "Check-ins keep training load, food strategy, recovery, and consistency moving in the right direction.",
    },
  ];

  const outcomes = [
    "Fat loss without guesswork",
    "Muscle growth with progressive overload",
    "Technique feedback and safer form",
    "Nutrition that fits your lifestyle",
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src="/assets/hero-background.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/62 to-black/38" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(239,68,68,0.18),transparent_34%),radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.06),transparent_34%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-30 grid w-full max-w-7xl mx-auto grid-cols-1 items-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative z-30 order-2 mx-auto h-[640px] w-full max-w-[430px] translate-y-10 sm:h-[560px] sm:max-w-lg sm:translate-y-0 lg:order-1 md:h-[710px] md:max-w-xl lg:h-[740px] lg:max-w-2xl xl:h-[820px]"
          >
            <div className="absolute inset-x-4 bottom-0 top-20 bg-[radial-gradient(circle_at_50%_58%,rgba(239,68,68,0.18),transparent_58%)] blur-2xl" />
            <div className="absolute inset-x-12 bottom-0 h-28 bg-black/55 blur-2xl" />
            <div className="relative flex h-full items-end justify-center overflow-visible">
              <img
                src="/assets/img28.png"
                alt="Personal trainer workout"
                className="h-full max-h-full w-auto max-w-[125%] object-contain object-bottom drop-shadow-[0_28px_55px_rgba(0,0,0,0.65)] sm:max-w-none"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 max-w-3xl text-left lg:order-2 lg:ml-auto"
          >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur md:text-sm">
              Manula D Fitness Coaching
            </div>
            <h1 className="mb-6 max-w-4xl text-5xl font-black uppercase leading-none tracking-normal text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
              Transform{" "}
              <span className="block text-primary">
                Your Body
              </span>
            </h1>
            <p className="mb-9 max-w-2xl border-l-4 border-primary pl-5 text-lg font-medium leading-8 text-white/90 md:text-xl">
              Build a stronger physique, healthier habits, and lasting confidence through science-based training and personalized nutrition.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-medium text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Book Training
              </Link>
              <Link
                to="/packages"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                View Packages
              </Link>
            </div>
          </motion.div>

        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 sm:h-44 lg:h-56" aria-hidden="true">
          <div
            className="absolute inset-x-0 bottom-0 h-28 bg-black/95 shadow-2xl shadow-red-950/20 backdrop-blur-sm sm:h-32 lg:h-40"
            style={{ clipPath: "polygon(0 44%, 100% 6%, 100% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-12 h-20 bg-gradient-to-r from-black/85 via-red-950/45 to-orange-950/30 sm:bottom-14 sm:h-24 lg:bottom-18 lg:h-32"
            style={{ clipPath: "polygon(0 52%, 100% 12%, 100% 100%, 0 100%)" }}
          />
        </div>
      </section>

      <section className="bg-gradient-to-b from-black to-zinc-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Dumbbell, label: "8+ Years", sublabel: "Training Experience" },
              { icon: Users, label: "5+ Years", sublabel: "Coaching" },
              { icon: Target, label: "8+ Years", sublabel: "Natural Athlete" },
              { icon: Award, label: "NASM", sublabel: "Certified Trainer" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 transition-all group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl mb-2">{stat.label}</h3>
                <p className="text-white/60">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-red py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-normal text-primary">
              <Flame className="h-4 w-4" />
              Updated Coaching System
            </div>
            <h2 className="mx-auto mb-5 max-w-4xl text-4xl md:text-5xl">
              Training, nutrition, and accountability in one <span className="text-primary">clear plan</span>
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-white/70">
              The coaching flow is designed to remove confusion: know what to train, how to eat, what to track, and when to adjust so progress stays measurable.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex min-h-32 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.065] p-5 text-left transition-all hover:border-primary/45 hover:bg-white/[0.09]">
                  <CheckCircle2 className="mb-4 h-6 w-6 flex-shrink-0 text-primary" />
                  <span className="text-white/82">{outcome}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Why Choose <span className="text-primary">Manula D</span></h2>
            <p className="text-white/60 text-xl">Smart coaching for real, sustainable transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Plans",
                description: "Custom workout and nutrition plans tailored to your goals, lifestyle, and current fitness level",
                image: "https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
              },
              {
                title: "Expert Guidance",
                description: "Certified coaching supported by 8+ years of natural bodybuilding and physique development experience",
                image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
              },
              {
                title: "Real Results",
                description: "A results-driven system built on consistency, discipline, accountability, and science-based training",
                image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8Z3ltJTIwdHJhaW5lciUyMGZpdG5lc3MlMjB3b3Jrb3V0fGVufDF8fHx8MTc3ODgzNzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 h-64">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-orange py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl md:text-5xl">How Coaching <span className="text-primary">Works</span></h2>
            <p className="mx-auto max-w-2xl text-xl text-white/60">A simple process built for consistency, not confusion.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {coachingSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-7"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="text-5xl font-black text-white/10">0{index + 1}</span>
                </div>
                <h3 className="mb-3 text-2xl">{step.title}</h3>
                <p className="leading-7 text-white/65">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/75">
              <CalendarCheck className="h-4 w-4 text-primary" />
              Free consultation available
            </div>
            <h2 className="text-4xl md:text-5xl">Ready to start your <span className="text-primary">journey</span>?</h2>
            <p className="mt-4 max-w-2xl text-xl leading-8 text-white/60">
              Share your goal, current routine, and biggest challenge. Manula D will help you choose the right coaching path.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Send Message
              <MessageCircle className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
