"use client";
import { motion } from "motion/react";
import Image from "next/image";

const cards = [
  { 
    title: "Ethical Sourcing", 
    col: "md:col-span-2", 
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    text: "text-white" 
  },
  { 
    title: "Master Roasting", 
    col: "md:col-span-1", 
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    text: "text-white" 
  },
  { 
    title: "Global Shipping", 
    col: "md:col-span-1", 
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
    text: "text-white" 
  },
  { 
    title: "Sustainable", 
    col: "md:col-span-2", 
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
    text: "text-white" 
  },
];

export default function Bento() {
  return (
    <section className="min-h-screen bg-[#f5f5f0] px-8 py-20 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
            className={`${card.col} h-[400px] rounded-3xl p-10 flex flex-col justify-between border-2 border-black cursor-pointer group relative overflow-hidden`}
          >
            <Image 
              src={card.image} 
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500" />
            <div className="w-full flex justify-end relative z-10">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-[#C72229] flex items-center justify-center group-hover:bg-white group-hover:text-[#C72229] transition-colors text-white font-bold">
                    ↗
                </div>
            </div>
            <h3 className={`text-4xl font-bold ${card.text} relative z-10 font-[family-name:var(--font-caveat)]`}>{card.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
