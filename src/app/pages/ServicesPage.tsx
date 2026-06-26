import { Dumbbell, Weight, Heart, TrendingUp, Apple, Monitor } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { assetUrl, getApi, type ApiService } from "../lib/api";

export function ServicesPage() {
  const [managedServices, setManagedServices] = useState<ApiService[]>([]);
  const services = [
    {
      icon: Dumbbell,
      title: "1-on-1 Personal Training",
      description: "Onsite or live video coaching focused on technique correction, performance improvement, and real-time guidance.",
      features: ["Onsite sessions", "Live video coaching", "Form correction", "Goal-based programming"],
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Monitor,
      title: "Online Fitness Coaching",
      description: "Complete remote coaching with customized workout plans, nutrition guidance, check-ins, and ongoing support.",
      features: ["Remote coaching", "Workout guidance", "Nutrition support", "Progress check-ins"],
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8Z3ltJTIwdHJhaW5lciUyMGZpdG5lc3MlMjB3b3Jrb3V0fGVufDF8fHx8MTc3ODgzNzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Weight,
      title: "Fat Loss Coaching",
      description: "Science-based fat loss strategies designed to reduce body fat while protecting lean muscle and lifestyle balance.",
      features: ["Nutrition control", "Progressive training", "Body composition focus", "Sustainable habits"],
      image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: TrendingUp,
      title: "Muscle Building Programs",
      description: "Structured hypertrophy-focused coaching for lean muscle growth, strength, and natural physique development.",
      features: ["Progressive overload", "Hypertrophy training", "Compound lifts", "Recovery planning"],
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Heart,
      title: "Body Recomposition Coaching",
      description: "A balanced strategy to build muscle and reduce fat through targeted training, nutrition, and accountability.",
      features: ["Build muscle", "Reduce body fat", "Strategic nutrition", "Progress tracking"],
      image: "https://images.unsplash.com/photo-1596357395217-80de13130e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Apple,
      title: "Personalized Meal Plans",
      description: "Practical nutrition plans tailored to your body, schedule, food preferences, and transformation goal.",
      features: ["Meal planning", "Macro guidance", "Lifestyle fit", "Healthy habit coaching"],
      image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Dumbbell,
      title: "Personalized Workout Plans",
      description: "Practical training programs tailored to your fitness level, schedule, recovery capacity, and transformation goal.",
      features: [
        "Customized workout programming",
        "Progressive overload guidance",
        "Exercise technique coaching",
        "Lifestyle & habit support",
      ],
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];
  useEffect(() => { getApi<ApiService[]>("services").then(setManagedServices).catch(() => undefined); }, []);
  const iconByName = { dumbbell: Dumbbell, weight: Weight, heart: Heart, trending: TrendingUp, apple: Apple, monitor: Monitor };
  const displayServices = managedServices.length ? managedServices.map((service) => ({ ...service, icon: iconByName[service.icon as keyof typeof iconByName] || Dumbbell, image: assetUrl(service.image) || services.find((item) => item.title === service.title)?.image || services[0].image })) : services;

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl mb-4">My <span className="text-primary">Services</span></h1>
          <p className="text-xl text-white/80">Personalized coaching for fat loss, muscle building, and recomposition</p>
        </div>
      </section>

      <section className="py-20 theme-section-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {displayServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden rounded-xl h-96 group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl mb-4">{service.title}</h2>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
