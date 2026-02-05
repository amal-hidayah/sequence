"use client";
import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="h-[80vh] bg-[#C72229] relative z-10 flex items-center justify-center overflow-hidden">
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay" 
        />
        
        <div className="text-center z-10 px-4">
            <h2 className="text-white text-6xl md:text-9xl font-bold mb-10 tracking-tight font-[family-name:var(--font-caveat)]">
                Mulai Kenanganmu.
            </h2>
            <button className="bg-white text-[#C72229] px-12 py-6 rounded-full text-2xl font-bold hover:scale-105 hover:bg-black hover:text-white transition-all">
                Pesan Sekarang
            </button>
        </div>
    </section>
  );
}
