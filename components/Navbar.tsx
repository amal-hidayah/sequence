"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 px-8 py-6 flex justify-between items-center text-[#ededed]">
        <div className="mix-blend-normal">
          <Image src="/logo/logo.png" alt="Kopi Kenangan" width={150} height={50} className="object-contain" priority unoptimized />
        </div>
        <button 
            onClick={() => setIsOpen(true)} 
            className="text-black font-semibold text-sm tracking-widest hover:text-[#C72229] transition-colors uppercase"
        >
            Menu
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#f5f5f0] z-50 flex flex-col justify-center items-center"
          >
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-8 text-black text-sm font-bold tracking-widest hover:text-[#C72229] transition-colors uppercase"
            >
                Close
            </button>
            
            <div className="flex flex-col items-center space-y-4">
                {["Our Story", "The Beans", "Shop", "Contact"].map((item, i) => (
                    <div key={item} className="overflow-hidden">
                        <motion.a
                            href="#"
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "100%" }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="block text-6xl md:text-8xl font-bold text-black hover:text-[#C72229] transition-colors tracking-tight font-[family-name:var(--font-caveat)]"
                        >
                            {item}
                        </motion.a>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 flex space-x-6 text-gray-700 font-semibold text-sm">
                <a href="#" className="hover:text-[#C72229] transition-colors uppercase tracking-wider">INSTAGRAM</a>
                <a href="#" className="hover:text-[#C72229] transition-colors uppercase tracking-wider">TWITTER</a>
                <a href="#" className="hover:text-[#C72229] transition-colors uppercase tracking-wider">EMAIL</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
