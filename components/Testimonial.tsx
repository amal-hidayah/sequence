"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  { text: "Kopi terbaik yang pernah saya coba.", author: "James Hoffman" },
  { text: "Benar-benar istimewa. Sebuah ritual.", author: "Coffee Monthly" },
  { text: "Kopi Kenangan mengubah pagi saya.", author: "Sarah J." },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen bg-[#f5f5f0] flex flex-col items-center justify-center relative z-10 overflow-hidden cursor-pointer" onClick={next}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-center px-10 max-w-5xl"
        >
          <h2 className="text-5xl md:text-8xl font-bold text-black leading-tight mb-10 font-[family-name:var(--font-caveat)]">
            &ldquo;{testimonials[index].text}&rdquo;
          </h2>
          <p className="text-[#C72229] text-xl md:text-2xl uppercase tracking-widest font-semibold">
            — {testimonials[index].author}
          </p>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
          {testimonials.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i === index ? 'bg-[#C72229]' : 'bg-gray-400'}`} />
          ))}
      </div>
    </section>
  );
}
