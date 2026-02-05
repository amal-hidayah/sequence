"use client";
import CountUp from "react-countup";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        { value: 100, label: "Arabica", suffix: "%" },
        { value: 24, label: "Hour Delivery", suffix: "h" },
        { value: 500, label: "Farmers", suffix: "+" },
    ];

    return (
        <section ref={ref} className="bg-[#f5f5f0] py-32 relative z-10 border-y-2 border-black">
             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                {stats.map((stat, i) => (
                    <div key={i}>
                        <div className="text-8xl md:text-9xl font-bold text-[#C72229] tabular-nums font-[family-name:var(--font-caveat)]">
                            {isInView ? <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} /> : 0}
                        </div>
                        <div className="text-black mt-4 text-xl uppercase tracking-widest font-semibold">{stat.label}</div>
                    </div>
                ))}
             </div>
        </section>
    )
}
