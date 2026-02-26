import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CloudArchitecture from "./infra/CloudArchitecture";
import GrafanaDashboard from "./infra/GrafanaDashboard";

const InfraAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      <motion.div style={{ opacity, y }} className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Live Infrastructure
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Always Running. Always <span className="text-gradient-blue">Watching.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Your cloud architecture, auto-scaling and self-healing — in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <CloudArchitecture isVisible={isVisible} />
          <GrafanaDashboard />
        </div>
      </motion.div>
    </section>
  );
};

export default InfraAnimation;
