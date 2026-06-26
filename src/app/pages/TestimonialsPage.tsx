import { FormEvent, useEffect, useMemo, useState } from "react";
import { Quote, Send, Star } from "lucide-react";
import { motion } from "motion/react";
import { getApi } from "../lib/api";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  image?: string;
  rating: number;
  text: string;
  result: string;
  createdAt?: string;
};

const sampleTestimonials: Testimonial[] = [
  {
    id: "sample-1",
    name: "Sarah Johnson",
    role: "Weight Loss Client",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "Manula's personalized meal plan and training structure helped me stay consistent, understand my body better, and make real progress with fat loss.",
    result: "Lost 30 lbs in 3 months",
  },
  {
    id: "sample-2",
    name: "Michael Chen",
    role: "Muscle Building Client",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "The muscle building program was clear, progressive, and easy to follow. The technique feedback and overload plan made every workout feel purposeful.",
    result: "Gained 15 lbs of muscle",
  },
  {
    id: "sample-3",
    name: "Emily Rodriguez",
    role: "Beginner Client",
    image: "https://images.unsplash.com/photo-1596357395217-80de13130e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "As a complete beginner, I was intimidated by the gym. Manula made everything easy to understand and helped me build confidence with proper form.",
    result: "Went from zero to hero",
  },
  {
    id: "sample-4",
    name: "David Thompson",
    role: "Online Coaching Client",
    image: "https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "The online coaching program exceeded my expectations. Even remotely, the guidance, accountability, and weekly adjustments kept me on track.",
    result: "Lost 20 lbs remotely",
  },
  {
    id: "sample-5",
    name: "Jessica Martinez",
    role: "Transformation Client",
    image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "The customized program worked around my schedule and made nutrition feel practical. I finally had a realistic system I could follow.",
    result: "Complete body transformation",
  },
  {
    id: "sample-6",
    name: "Robert Anderson",
    role: "Strength Training Client",
    image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "The strength and performance program helped me improve my compound lifts with better technique, smarter progression, and clear weekly targets.",
    result: "Competition ready in 12 weeks",
  },
];

export function TestimonialsPage() {
  const [databaseFeedback, setDatabaseFeedback] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 5,
    text: "",
    result: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let ignoreResponse = false;

    async function loadTestimonials() {
      try {
        const testimonials = await getApi<Testimonial[]>("testimonials");

        if (!ignoreResponse) {
          setDatabaseFeedback(Array.isArray(testimonials) ? testimonials : []);
        }
      } catch {
        if (!ignoreResponse) {
          setStatusMessage("Feedback could not be loaded. Please try again shortly.");
        }
      }
    }

    loadTestimonials();

    return () => {
      ignoreResponse = true;
    };
  }, []);

  const allTestimonials = useMemo(
    () => databaseFeedback.length ? databaseFeedback : sampleTestimonials,
    [databaseFeedback],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedRole = formData.role.trim();
    const trimmedText = formData.text.trim();
    const trimmedResult = formData.result.trim();

    if (!trimmedName || !trimmedText || !trimmedResult) {
      setStatusMessage("Please add your name, feedback, and result before submitting.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          role: trimmedRole,
          rating: formData.rating,
          text: trimmedText,
          result: trimmedResult,
        }),
      });
      const newFeedback = (await response.json()) as Testimonial | { error?: string };

      if (!response.ok || "error" in newFeedback) {
        throw new Error("error" in newFeedback ? newFeedback.error : "Unable to save feedback.");
      }

      setDatabaseFeedback((currentFeedback) => [newFeedback, ...currentFeedback]);
      setFormData({ name: "", role: "", rating: 5, text: "", result: "" });
      setStatusMessage("Thank you. Your feedback has been saved to the database.");
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Could not save feedback. Please try again shortly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518459031867-a89b944bffe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8Z3ltJTIwdHJhaW5lciUyMGZpdG5lc3MlMjB3b3Jrb3V0fGVufDF8fHx8MTc3ODgzNzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Feedback"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl mb-4">Client <span className="text-primary">Feedback</span></h1>
          <p className="text-xl text-white/80">Reviews and success stories from satisfied clients</p>
        </div>
      </section>

      <section className="py-20 theme-section-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-4xl mb-4">Share Your <span className="text-primary">Feedback</span></h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Visitors and clients can add their experience here. Submitted feedback is saved to the feedback database and stays available after refresh.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="feedback-name" className="block mb-2 text-white/80">Name *</label>
                  <input
                    id="feedback-name"
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="feedback-role" className="block mb-2 text-white/80">Program / Goal</label>
                  <input
                    id="feedback-role"
                    type="text"
                    value={formData.role}
                    onChange={(event) => setFormData({ ...formData, role: event.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-primary"
                    placeholder="Fat loss client"
                  />
                </div>
              </div>

              <div className="mt-5">
                <span className="block mb-2 text-white/80">Rating</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:border-primary"
                      aria-label={`Set rating to ${rating} stars`}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating <= formData.rating ? "fill-primary text-primary" : "text-white/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="feedback-text" className="block mb-2 text-white/80">Feedback *</label>
                <textarea
                  id="feedback-text"
                  rows={5}
                  value={formData.text}
                  onChange={(event) => setFormData({ ...formData, text: event.target.value })}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-primary"
                  placeholder="Write your experience..."
                />
              </div>

              <div className="mt-5">
                <label htmlFor="feedback-result" className="block mb-2 text-white/80">Result *</label>
                <input
                  id="feedback-result"
                  type="text"
                  value={formData.result}
                  onChange={(event) => setFormData({ ...formData, result: event.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-primary"
                  placeholder="Lost 8 kg / gained strength / improved confidence"
                />
              </div>

              {statusMessage && (
                <p className="mt-4 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-white/80">
                  {statusMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-medium text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <Send className="h-5 w-5" />
                {isSubmitting ? "Saving..." : "Save Feedback"}
              </button>
            </motion.form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-xl border border-white/10 p-8 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start gap-4 mb-6">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-xl font-semibold text-primary">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl mb-1">{testimonial.name}</h3>
                    <p className="text-white/60 mb-2">{testimonial.role}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>

                <p className="text-white/80 leading-relaxed mb-6">"{testimonial.text}"</p>

                <div className="pt-4 border-t border-white/10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-primary">{testimonial.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 theme-section-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8">
              <div className="text-5xl mb-4 text-primary">5+</div>
              <p className="text-white/60">Years Coaching</p>
            </div>
            <div className="p-8">
              <div className="text-5xl mb-4 text-primary">8+</div>
              <p className="text-white/60">Years Natural Athlete</p>
            </div>
            <div className="p-8">
              <div className="text-5xl mb-4 text-primary">NASM</div>
              <p className="text-white/60">Certified Trainer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
