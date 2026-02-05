"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const text = "Coffee is not just a drink. It is a ritual. A moment of silence in a chaotic world. We traverse the globe to find beans that speak the language of the earth.";
  const words = text.split(" ");

  return (
    <section ref={container} className="min-h-[80vh] flex items-center justify-center bg-[#f5f5f0] px-8 md:px-20 py-20 relative z-10">
      <div className="max-w-6xl flex flex-wrap gap-x-4 gap-y-2 justify-center">
        {words.map((word, i) => (
          <RevealWord
            key={`${word}-${i}`}
            word={word}
            index={i}
            total={words.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

type RevealWordProps = {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function RevealWord({ word, index, total, progress }: RevealWordProps) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="text-4xl md:text-7xl font-bold text-black transition-colors font-[family-name:var(--font-caveat)]">
      {word}
    </motion.span>
  );
}
