import { motion } from "framer-motion";
import {
  Rocket,
  ShieldCheck,
  TrendingDown,
  Activity,
  Clock,
  Users,
  CalendarCheck,
  Layers,
  Headphones,
} from "lucide-react";

const outcomes = [
  {
    icon: Rocket,
    stat: "40%",
    label: "Faster Deployments",
    description:
      "Average deployment frequency improvement across our clients within the first 90 days.",
  },
  {
    icon: Activity,
    stat: "99.9%",
    label: "Uptime Achieved",
    description:
      "Production uptime for clients after OpsLine implemented reliability engineering practices.",
  },
  {
    icon: ShieldCheck,
    stat: "70%",
    label: "Fewer Incidents",
    description:
      "Reduction in production incidents through automated testing, monitoring, and guardrails.",
  },
  {
    icon: TrendingDown,
    stat: "35%",
    label: "Cloud Cost Savings",
    description:
      "Average reduction in cloud spend through right-sizing, reserved instances, and optimized networking & storage.",
  },
];

const engagementDetails = [
  {
    icon: Layers,
    title: "Scalable Commitment Tiers",
    detail: "Engagement levels tailored to your needs — from lightweight advisory to fully embedded teams, adjustable as your business evolves.",
  },
  {
    icon: CalendarCheck,
    title: "Structured Sprint Cadence",
    detail: "A disciplined delivery rhythm matched to your commitment level, ensuring predictable progress and continuous iteration.",
  },
  {
    icon: Users,
    title: "Dedicated Engineering & Architect Oversight",
    detail: "Every engagement includes focused engineer allocation with senior architect governance to maintain quality and strategic alignment.",
  },
  {
    icon: Clock,
    title: "Defined SLAs & Critical Coverage",
    detail: "Tiered response commitments with round-the-clock availability for production-critical incidents — so your systems are never unattended.",
  },
  {
    icon: Headphones,
    title: "Enterprise-Grade Responsiveness",
    detail: "Clear escalation paths, dedicated communication channels, and transparent reporting built into every engagement.",
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="results" className="relative z-10 py-24">
      <div className="container mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real <span className="text-primary">Results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Numbers don't lie. Here's what OpsLine delivers for teams like yours.
          </p>
        </motion.div>

        {/* Outcome Blocks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto mb-20">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="h-full"
            >
              <div className="rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <o.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-0.5">{o.stat}</div>
                <div className="text-base font-semibold text-foreground mb-1">{o.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{o.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engagement Model Sub-section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
              How We Deliver
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Powered by Our Engagement Model
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Every outcome above is backed by a delivery structure designed for reliability, governance, and scale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {engagementDetails.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <e.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">{e.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{e.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
