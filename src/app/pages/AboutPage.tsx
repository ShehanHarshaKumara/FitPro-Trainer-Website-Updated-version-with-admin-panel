import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Dumbbell,
  Gauge,
  HeartHandshake,
  Medal,
  MonitorPlay,
  NotebookTabs,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Heart,
} from "lucide-react";
import { motion } from "motion/react";

export function AboutPage() {
  const certifications = [
    {
      icon: ShieldCheck,
      title: "NASM Certified Personal Trainer",
      meta: "Verified professional credential",
      detail: "Internationally recognized fitness coaching certification.",
    },
    {
      icon: Trophy,
      title: "8+ Years Natural Bodybuilding Athlete",
      meta: "Real training experience",
      detail: "Practical physique development knowledge built through consistency.",
    },
    {
      icon: Dumbbell,
      title: "5+ Years Professional Fitness Coaching",
      meta: "Client transformation support",
      detail: "Structured coaching for fat loss, muscle gain, and body recomposition.",
    },
    {
      icon: BookOpenCheck,
      title: "Evidence-Based Training & Physique Development",
      meta: "Science-led programming",
      detail: "Programs shaped around progressive overload, nutrition, and recovery.",
    },
  ];

  const skills = [
    { icon: Target, label: "Personalized Coaching", desc: "Structured workout and nutrition guidance built around each client's goal" },
    { icon: Heart, label: "Accountability", desc: "Consistent progress tracking, support, and practical habit building" },
    { icon: Medal, label: "Natural Physique Expertise", desc: "Real-world bodybuilding experience applied through science-based programming" },
  ];

  const coachingSkills = [
    { icon: Target, label: "Personalized Fitness Coaching", type: "Custom plan" },
    { icon: Dumbbell, label: "Strength & Hypertrophy Programming", type: "Muscle growth" },
    { icon: Gauge, label: "Fat Loss Coaching", type: "Lean progress" },
    { icon: Repeat2, label: "Body Recomposition Strategies", type: "Shape change" },
    { icon: NotebookTabs, label: "Customized Nutrition Planning", type: "Food strategy" },
    { icon: TrendingUp, label: "Progressive Overload Programming", type: "Smart scaling" },
    { icon: ShieldCheck, label: "Exercise Technique Correction", type: "Safe form" },
    { icon: BarChart3, label: "Client Progress Tracking", type: "Measured results" },
    { icon: Sparkles, label: "Transformation Coaching", type: "Full system" },
    { icon: MonitorPlay, label: "Online & Onsite Personal Training", type: "Flexible support" },
    { icon: HeartHandshake, label: "Accountability Coaching", type: "Weekly guidance" },
    { icon: Trophy, label: "Natural Bodybuilding Guidance", type: "Physique focus" },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="About"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl mb-4">About <span className="text-primary">Me</span></h1>
          <p className="text-xl text-white/80">Science-based coaching for natural, lasting transformation</p>
        </div>
      </section>

      <section className="py-20 theme-section-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[1091/1441] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-black/40"
            >
              <div className="absolute inset-x-8 bottom-8 top-20 bg-primary/15 blur-3xl" aria-hidden="true" />
              <img
                src="/assets/img27.jpeg"
                alt="Trainer"
                className="relative z-10 h-full w-full object-cover object-center drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">My <span className="text-primary">Story</span></h2>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                I'm Manula D, a dedicated fitness coach and natural bodybuilding athlete with 8+ years of experience in training, physique development, and fitness transformation.
              </p>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                My journey began with a passion for understanding how proper training, nutrition, and consistency can naturally transform the body. Over the years, that passion developed into a professional coaching career focused on helping people achieve real results through structured, personalized guidance.
              </p>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                I specialize in fat loss, muscle building, body recomposition, customized nutrition planning, and performance improvement. My approach is built on science-based training principles, progressive overload, discipline, and long-term sustainability.
              </p>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                My mission is to simplify fitness, remove confusion, and help every client build a stronger body, healthier habits, greater confidence, and a stronger mindset through professional coaching and accountability.
              </p>

              <div className="space-y-3">
                {["8+ Years Natural Bodybuilding Experience", "5+ Years Professional Coaching Experience", "Customized Training & Nutrition Systems"].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 theme-section-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Special <span className="text-primary">Skills</span></h2>
            <p className="text-white/60 text-xl">Coaching built for real-world transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white/5 rounded-xl border border-white/10 hover:border-primary/50 transition-all group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <skill.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl mb-3">{skill.label}</h3>
                <p className="text-white/60">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 theme-section-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-normal text-primary">
                <BadgeCheck className="h-4 w-4" />
                Verified Coaching Standard
              </div>
              <h2 className="text-4xl mb-4"><span className="text-primary">Certifications</span> & Credentials</h2>
              <p className="max-w-2xl text-white/60 text-xl">
                Professional credentials backed by years of practical training experience.
              </p>
            </div>

            <a
              href="https://credentials.nasm.org/a7b9b554-45ff-4613-ab11-8ac65fb5dad1?utm_source=tiktok&utm_medium=social"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary px-6 py-3 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              View NASM Credential
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start gap-5">
                  <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 shadow-inner shadow-white/5 transition-all group-hover:border-primary group-hover:bg-primary/20">
                    <cert.icon className="h-8 w-8 text-primary" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-black bg-primary">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                    </span>
                  </div>

                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {cert.meta}
                    </div>
                    <h3 className="mb-2 text-2xl leading-tight text-white">{cert.title}</h3>
                    <p className="leading-relaxed text-white/60">{cert.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 theme-section-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-normal text-primary">
              <Brain className="h-4 w-4" />
              Coaching Skill Set
            </div>
            <h2 className="text-4xl mb-4">Coaching <span className="text-primary">Expertise</span></h2>
            <p className="text-white/60 text-xl">
              The core skills behind every transformation plan.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3">
            {coachingSkills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.025 }}
                viewport={{ once: true }}
                className="group inline-flex min-h-14 items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:border-primary/55 hover:bg-primary/10 hover:shadow-primary/10"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25">
                  <skill.icon className="h-4.5 w-4.5" />
                </div>
                <span className="whitespace-nowrap text-sm font-semibold text-white sm:text-base">{skill.label}</span>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
