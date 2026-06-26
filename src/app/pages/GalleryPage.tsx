import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CSSProperties } from "react";
import { assetUrl, getApi, type ApiGalleryItem } from "../lib/api";

export function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTransformation, setActiveTransformation] = useState(0);
  const [managedGallery, setManagedGallery] = useState<ApiGalleryItem[]>([]);

  const transformations = [
    {
      beforeImage: "/assets/img3.jpeg",
      afterImage: "/assets/img4.jpeg",
      title: "12 Week Transformation",
      description: "Before and after progress from focused training and nutrition",
    },
    {
      beforeImage: "/assets/img5.jpeg",
      afterImage: "/assets/img6.jpeg",
      title: "Body Recomposition",
      description: "Leaner shape with improved muscle definition",
    },
    {
      beforeImage: "/assets/img7.jpeg",
      afterImage: "/assets/img8.jpeg",
      title: "Muscle Building Success",
      description: "Stronger physique built through progressive training",
    },
    {
      beforeImage: "/assets/img9.jpeg",
      afterImage: "/assets/img10.jpeg",
      title: "Strength Gains",
      description: "Visible progress from consistent strength work",
    },
    {
      beforeImage: "/assets/img11.jpeg",
      afterImage: "/assets/img12.jpeg",
      title: "Athletic Performance",
      description: "Conditioning and body composition improved together",
    },
    {
      beforeImage: "/assets/img13.jpeg",
      afterImage: "/assets/img14.jpeg",
      title: "Complete Transformation",
      description: "Full transformation through training, nutrition, and accountability",
    },
    {
      beforeImage: "/assets/img15.jpeg",
      afterImage: "/assets/img16.jpeg",
      title: "Fat Loss Progress",
      description: "Sharper condition from a focused fat loss phase",
    },
    {
      beforeImage: "/assets/img17.jpeg",
      afterImage: "/assets/img18.jpeg",
      title: "Lean Muscle Progress",
      description: "Improved size, posture, and overall shape",
    },
    {
      beforeImage: "/assets/img19.jpeg",
      afterImage: "/assets/img20.jpeg",
      title: "Physique Upgrade",
      description: "Clear before and after body composition change",
    },
    {
      beforeImage: "/assets/img21.jpeg",
      afterImage: "/assets/img22.jpeg",
      title: "Transformation Journey",
      description: "Step-by-step progress through structured coaching",
    },
    {
      beforeImage: "/assets/img23.jpeg",
      afterImage: "/assets/img24.jpeg",
      title: "Client Result",
      description: "Before and after progress with measurable consistency",
    },
  ];

  const trainingPhotos = [
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1548690312-e3b507d8c110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8Z3ltJTIwdHJhaW5lciUyMGZpdG5lc3MlMjB3b3Jrb3V0fGVufDF8fHx8MTc3ODgzNzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  ];
  useEffect(() => { getApi<ApiGalleryItem[]>("gallery").then(setManagedGallery).catch(() => undefined); }, []);
  const visibleTransformations = managedGallery.filter((item) => item.category === "transformation" && item.before_image && item.image).map((item) => ({ beforeImage: assetUrl(item.before_image), afterImage: assetUrl(item.image), title: item.title || "Transformation", description: item.description || "Client progress" }));
  const visibleTrainingPhotos = managedGallery.filter((item) => item.category === "training" && item.image).map((item) => assetUrl(item.image));
  const displayedTransformations = visibleTransformations.length ? visibleTransformations : transformations;
  const displayedTrainingPhotos = visibleTrainingPhotos.length ? visibleTrainingPhotos : trainingPhotos;
  useEffect(() => { setActiveTransformation((current) => Math.min(current, displayedTransformations.length - 1)); }, [displayedTransformations.length]);

  const showPreviousTransformation = () => {
    setActiveTransformation((current) =>
                  current === 0 ? displayedTransformations.length - 1 : current - 1,
    );
  };

  const showNextTransformation = () => {
    setActiveTransformation((current) =>
      current === displayedTransformations.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    const timer = window.setInterval(showNextTransformation, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const activeItem = displayedTransformations[activeTransformation];
  const firstTrainingRow = displayedTrainingPhotos;
  const secondTrainingRow = [...displayedTrainingPhotos].reverse();

  const getTrainingCarouselStyle = (quantity: number): CSSProperties => ({
    "--width": "320px",
    "--height": "220px",
    "--quantity": quantity,
  } as CSSProperties);

  const getTrainingItemStyle = (position: number): CSSProperties => ({
    "--position": position,
  } as CSSProperties);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxneW0lMjB0cmFpbmVyJTIwZml0bmVzcyUyMHdvcmtvdXR8ZW58MXx8fHwxNzc4ODM3ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl mb-4">Transformation <span className="text-primary">Gallery</span></h1>
          <p className="text-xl text-white/80">Real results from real people</p>
        </div>
      </section>

      <section className="py-16 theme-section-red">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-3">Client <span className="text-primary">Transformations</span></h2>
            <p className="text-white/60 text-lg">Before and after success stories</p>
          </div>

          <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/45 p-3 shadow-2xl shadow-black/40 backdrop-blur md:p-4">
            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[0.95fr_0.7fr]">
              <div className="relative">
                <div className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {String(activeTransformation + 1).padStart(2, "0")} / {String(displayedTransformations.length).padStart(2, "0")}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 gap-3 md:grid-cols-2"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedImage(activeItem.beforeImage)}
                      className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-black"
                    >
                      <img
                        src={activeItem.beforeImage}
                        alt={`${activeItem.title} before`}
                        className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-normal text-white backdrop-blur">
                        Before
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(activeItem.afterImage)}
                      className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-primary/30 bg-black"
                    >
                      <img
                        src={activeItem.afterImage}
                        alt={`${activeItem.title} after`}
                        className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span className="absolute bottom-4 right-4 rounded-full border border-primary/30 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-normal text-white shadow-lg shadow-primary/25">
                        After
                      </span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.06] p-4 lg:p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Transformation Story
                    </p>
                    <h3 className="mb-3 text-2xl font-bold md:text-3xl">{activeItem.title}</h3>
                    <p className="text-sm leading-6 text-white/70 lg:text-base lg:leading-7">{activeItem.description}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6">
                  <div className="mb-5 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={showPreviousTransformation}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all hover:border-primary hover:bg-primary"
                      aria-label="Previous transformation"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextTransformation}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all hover:border-primary hover:bg-primary"
                      aria-label="Next transformation"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {displayedTransformations.map((item, index) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => {
                          setActiveTransformation(index);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          activeTransformation === index ? "w-10 bg-primary" : "w-2 bg-white/25 hover:bg-white/50"
                        }`}
                        aria-label={`Show ${item.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 lg:grid-cols-6">
              {displayedTransformations.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setActiveTransformation(index);
                  }}
                  className={`group relative h-20 overflow-hidden rounded-lg border transition-all sm:h-24 lg:h-24 ${
                    activeTransformation === index
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-white/10 opacity-65 hover:border-white/40 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.afterImage}
                    alt={`${item.title} after`}
                    className="h-full w-full bg-black object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 theme-section-orange">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Training <span className="text-primary">Sessions</span></h2>
            <p className="text-white/60 text-xl">Behind the scenes of our workouts</p>
          </div>

          <div className="space-y-8">
            {[firstTrainingRow, secondTrainingRow].map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="training-slider"
                data-reverse={rowIndex === 1 ? "true" : "false"}
                style={getTrainingCarouselStyle(row.length)}
              >
                <div className="training-slider-list">
                  {row.map((photo, index) => (
                    <button
                      key={`${rowIndex}-${photo}`}
                      type="button"
                      className="training-slider-item"
                      style={getTrainingItemStyle(index + 1)}
                      onClick={() => setSelectedImage(photo)}
                    >
                      <span className="training-slider-card">
                        <img
                          src={photo}
                          alt={`Training session ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <span className="training-slider-overlay" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
