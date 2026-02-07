"use client";

import { useScroll, useTransform, useMotionValueEvent, motion, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";

const frameCount = 240;

const loadingQuotes = [
  "Tahukah kamu? Kopi kenangan lebih nikmat saat dibagikan bersama orang tersayang ☕❤️",
  "Fun fact: Rata-rata orang butuh 3 cangkir kopi untuk jatuh cinta... atau mungkin hanya 1? 😊",
  "Sedang menyeduh kenangan indah untukmu... Sabar ya! ✨",
  "Kopi terbaik adalah kopi yang dinikmati berdua. Siapa kopi kenangan-mu? 💕",
  "Tips: Scroll pelan-pelan nanti ya, biar kenangannya terasa lebih manis! 🍃",
  "Sementara menunggu, ingat: Kenangan indah dimulai dari secangkir kopi sederhana ☕",
  "Loading... seperti menunggu kopi dingin, worth it kok! 😄",
  "Did you know? 100% pengguna yang menunggu ini akan tersenyum! (data kami 100% akurat) 😁",
  "Hampir siap! Seperti kopi, kenangan juga butuh waktu untuk disajikan dengan sempurna 🌟",
  "Pro tip: Kopi kenangan paling enak diminum sambil ngobrol. Siap-siap scroll ya! 🚀"
];

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const lastIndexRef = useRef<number>(-1);
  const maxLoadedIndexRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Rotate quotes every 3 seconds
  useEffect(() => {
    if (loaded) return;
    
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % loadingQuotes.length);
        setFadeIn(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [loaded]);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const frames = imagesRef.current;
    if (!canvas || !ctx || frames.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const clampedIndex = Math.min(index, maxLoadedIndexRef.current);
    const imgIndex = Math.min(frameCount - 1, Math.max(0, clampedIndex - 1));
    const img = frames[imgIndex];
    if (!img || img.width === 0 || img.height === 0) return;

    const hRatio = width / img.width;
    const vRatio = height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (width - img.width * ratio) / 2;
    const centerShiftY = (height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      img.width * ratio,
      img.height * ratio
    );
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const src = `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.src = src;
      img.onload = () => {
        imagesRef.current[i - 1] = img;
        maxLoadedIndexRef.current = Math.max(maxLoadedIndexRef.current, i);
        loadedCount++;
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);
        
        // Hanya set loaded setelah SEMUA gambar selesai
        if (loadedCount === frameCount) {
          setLoaded(true);
          renderFrame(1);
        }
      };
      img.onerror = () => {
        loadedCount++;
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);
        
        // Tetap mark sebagai loaded meskipun ada error
        if (loadedCount === frameCount) {
          setLoaded(true);
          renderFrame(1);
        }
      };
    }
  }, [renderFrame]);

  useEffect(() => {
    if (!loaded) return;
    renderFrame(lastIndexRef.current > 0 ? lastIndexRef.current : 1);
    const onResize = () => renderFrame(lastIndexRef.current > 0 ? lastIndexRef.current : 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded, renderFrame]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    const index = Math.max(1, Math.min(frameCount, Math.round(latest * frameCount) + 1));
    if (index === lastIndexRef.current) return;
    lastIndexRef.current = index;
    renderFrame(index);
  });

  return (
    <>
      {!loaded && (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f5f5f0] fixed top-0 left-0 z-50">
           <NextImage 
             src="/logo/logo.png" 
             alt="Kopi Kenangan" 
             width={400} 
             height={130} 
             className="object-contain mb-8 w-[200px] sm:w-[300px] md:w-[400px] animate-pulse" 
             unoptimized 
           />
           <div className="flex gap-2 mt-4">
               <div className="w-3 h-3 bg-[#C72229] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
               <div className="w-3 h-3 bg-[#C72229] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
               <div className="w-3 h-3 bg-[#C72229] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
           </div>
           
           {/* Progress Bar */}
           <div className="mt-6 w-64 sm:w-80">
             <div className="bg-black/10 rounded-full h-2 overflow-hidden">
               <div 
                 className="bg-[#C72229] h-full transition-all duration-300 ease-out"
                 style={{ width: `${progress}%` }}
               />
             </div>
           </div>

           {/* Fun Quote */}
           <div className="mt-6 max-w-md px-6 text-center">
             <p 
               className={`text-sm sm:text-base text-black/70 font-[family-name:var(--font-poppins)] transition-opacity duration-300 ${
                 fadeIn ? 'opacity-100' : 'opacity-0'
               }`}
             >
               {loadingQuotes[currentQuote]}
             </p>
           </div>
        </div>
      )}

      <div ref={containerRef} className="h-[400vh] relative z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full object-cover block" />
        
        {/* 0% - Hero */}
        <Overlay opacity={useTransform(scrollYProgress, [0, 0.15], [1, 0])} className="inset-0 flex items-center justify-center pointer-events-none">
             <div className="text-center">
                 <div className="relative inline-block">
                   <NextImage src="/logo/logo.png" alt="Kopi Kenangan" width={600} height={200} className="object-contain mb-6 mx-auto relative z-10" unoptimized style={{filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(255,255,255,0.8)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))'}} />
                 </div>
                 <p className="text-3xl text-black tracking-wide font-[family-name:var(--font-caveat)] font-bold">Rasa Yang Tak Terlupakan</p>
             </div>
        </Overlay>

        {/* 30% - Slogan Left */}
         <Overlay opacity={useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0])} className="inset-0 flex items-center justify-start pl-10 md:pl-32 pointer-events-none">
             <div className="text-left max-w-2xl">
                 <h2 className="text-6xl md:text-8xl font-bold leading-tight font-[family-name:var(--font-caveat)]">
                    <span className="text-black" style={{textShadow: '0 2px 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6)'}}>Dipetik di</span> <br />
                    <span className="text-white" style={{textShadow: '0 4px 30px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,1)'}}>Fajar Pertama</span>.
                 </h2>
             </div>
        </Overlay>

        {/* 60% - Slogan Right */}
        <Overlay opacity={useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0])} className="inset-0 flex items-center justify-end pr-10 md:pr-32 pointer-events-none">
             <div className="text-right max-w-2xl">
                 <h2 className="text-6xl md:text-8xl font-bold leading-tight font-[family-name:var(--font-caveat)]">
                    <span className="text-black" style={{textShadow: '0 2px 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6)'}}>Disangrai untuk</span> <br />
                    <span className="text-white" style={{textShadow: '0 4px 30px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,1)'}}>Kesempurnaan Rasa</span>.
                 </h2>
             </div>
        </Overlay>
        
        {/* 90% - CTA */}
        <Overlay opacity={useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1])} className="inset-0 flex items-center justify-center pointer-events-auto">
             <div className="text-center">
                 <h2 className="text-7xl md:text-9xl font-bold text-white mb-12 font-[family-name:var(--font-caveat)]" style={{textShadow: '0 4px 30px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,1)'}}>Rasakan Kenangan.</h2>
                 <button className="bg-[#C72229] text-white px-12 py-6 rounded-full text-2xl font-bold hover:scale-105 hover:bg-[#A01D22] transition-all duration-300 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                    Belanja Sekarang
                 </button>
             </div>
        </Overlay>
      </div>
      </div>
    </>
  );
}

type OverlayProps = {
  opacity: MotionValue<number>;
  children: React.ReactNode;
  className: string;
};

function Overlay({ opacity, children, className }: OverlayProps) {
  return <motion.div style={{ opacity }} className={`absolute ${className}`}>{children}</motion.div>;
}
