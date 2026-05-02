"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Pinned horizontal scroll section.
 * As the user scrolls vertically, the inside pans horizontally — like reading
 * a museum exhibit sideways. Each panel is a body region treated by the practice,
 * with the anatomy reference behind massive editorial type.
 */
const PANELS = [
  {
    n: "01",
    region: "Crâne",
    eng: "Cranial",
    body: "Migraines de tension, troubles de l'ATM, suites de chocs, vertiges fonctionnels.",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-25" stroke="currentColor" fill="none" strokeWidth="0.4">
        <ellipse cx="100" cy="90" rx="55" ry="60"/>
        <path d="M70 80 q30 -20 60 0"/>
        <path d="M70 100 q30 -10 60 0"/>
        <path d="M75 130 q25 15 50 0"/>
        <circle cx="85" cy="95" r="3"/><circle cx="115" cy="95" r="3"/>
      </svg>
    ),
  },
  {
    n: "02",
    region: "Cervicales",
    eng: "Cervical",
    body: "Tensions, torticolis, dorsalgies hautes liées au travail sur écran. Réalignement segment par segment.",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-25" stroke="currentColor" fill="none" strokeWidth="0.5">
        {Array.from({length:7}).map((_,i)=>(
          <g key={i} transform={`translate(100 ${50+i*16})`}>
            <ellipse cx="0" cy="0" rx="22" ry="6"/>
            <line x1="-22" y1="0" x2="22" y2="0"/>
          </g>
        ))}
      </svg>
    ),
  },
  {
    n: "03",
    region: "Lombaires",
    eng: "Lumbar",
    body: "Lombalgie aiguë et chronique, sciatiques, suites de port de charges, post-partum.",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-25" stroke="currentColor" fill="none" strokeWidth="0.5">
        {Array.from({length:5}).map((_,i)=>(
          <g key={i} transform={`translate(100 ${60+i*22})`}>
            <ellipse cx="0" cy="0" rx="32" ry="9"/>
            <path d={`M-32 0 Q0 ${i%2?-8:8} 32 0`}/>
          </g>
        ))}
      </svg>
    ),
  },
  {
    n: "04",
    region: "Bassin",
    eng: "Pelvis",
    body: "Pubalgies, tensions du diaphragme pelvien, accompagnement grossesse trimestre par trimestre.",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-25" stroke="currentColor" fill="none" strokeWidth="0.5">
        <path d="M50 80 Q100 130 150 80 L160 130 Q100 170 40 130 Z"/>
        <ellipse cx="80" cy="115" rx="14" ry="22"/>
        <ellipse cx="120" cy="115" rx="14" ry="22"/>
      </svg>
    ),
  },
  {
    n: "05",
    region: "Genou",
    eng: "Knee",
    body: "Tendinopathies du sportif, suites de torsion, syndrome rotulien. Prévention et reprise.",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-25" stroke="currentColor" fill="none" strokeWidth="0.5">
        <path d="M100 30 L100 90"/>
        <ellipse cx="100" cy="100" rx="30" ry="14"/>
        <circle cx="100" cy="100" r="8"/>
        <path d="M100 110 L100 170"/>
      </svg>
    ),
  },
  {
    n: "06",
    region: "Cheville · Pied",
    eng: "Ankle · Foot",
    body: "Entorses, suites d'immobilisation, douleurs plantaires, alignement de la chaîne descendante.",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-25" stroke="currentColor" fill="none" strokeWidth="0.5">
        <path d="M70 60 L70 120 Q70 140 100 140 L160 140"/>
        <circle cx="70" cy="60" r="6"/>
        <line x1="70" y1="120" x2="160" y2="140"/>
        {[0,1,2,3,4].map(i=>(
          <ellipse key={i} cx={130+i*7} cy={140+i*1.5} rx="3" ry="6"/>
        ))}
      </svg>
    ),
  },
];

export function Anatomy() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(PANELS.length - 1) * 100}vw`]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="anatomy" ref={wrap} className="relative bg-[#0f1010] text-cream-50" style={{ height: `${PANELS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* top chrome */}
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-cream-50/60">
          <span>Atlas anatomique — zones traitées</span>
          <span>{PANELS.length} régions · scroll ↓</span>
        </div>
        {/* progress line */}
        <motion.div style={{ width: progress }} className="absolute bottom-0 left-0 h-px bg-saffron-500/70 z-20"/>

        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {PANELS.map((p, i) => (
            <article key={p.n} className="relative flex w-screen h-full shrink-0 items-center justify-center px-12 md:px-24 border-l border-cream-50/5">
              {/* index */}
              <div className="absolute top-[18vh] left-12 md:left-24 font-mono text-[10px] uppercase tracking-[0.3em] text-cream-50/40">
                {p.n} / {String(PANELS.length).padStart(2, "0")}
              </div>
              {/* anatomical glyph behind */}
              <div className="absolute inset-0 flex items-center justify-center text-saffron-500 -z-0">
                <div className="w-[60vh] h-[60vh] -mt-12">{p.art}</div>
              </div>
              {/* type */}
              <div className="relative z-10 max-w-3xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-saffron-500/80 mb-6">
                  {p.eng}
                </div>
                <h3 className="font-serif italic text-[clamp(4rem,12vw,11rem)] leading-[0.92] tracking-[-0.02em]"
                    style={{ fontVariationSettings: "'opsz' 144, 'wght' 460, 'SOFT' 80" }}>
                  {p.region}
                </h3>
                <p className="mt-8 max-w-md font-mono text-sm leading-relaxed text-cream-50/75">
                  {p.body}
                </p>
              </div>
              {/* edge counter */}
              <div className="absolute bottom-10 right-12 md:right-24 font-mono text-[10px] uppercase tracking-[0.3em] text-cream-50/40">
                Région {i + 1}
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
