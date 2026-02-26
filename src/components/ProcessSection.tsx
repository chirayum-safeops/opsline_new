import { motion } from "framer-motion";
import { Briefcase, Settings, Headphones, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Briefcase,
    title: "Scope Your Project",
    description: "We work with you to define goals, timelines, and deliverables — whether it's a migration, a new pipeline, or a full infrastructure build.",
  },
  {
    icon: Settings,
    title: "Build & Deliver",
    description: "Our engineers execute hands-on — CI/CD pipelines, Infrastructure as Code, cloud architecture, and automation tailored to your stack.",
  },
  {
    icon: Headphones,
    title: "Managed Services",
    description: "Ongoing management of your infrastructure — monitoring, patching, scaling, and incident response so your team stays focused on product.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Support",
    description: "Dedicated support with SLAs, proactive optimization, and a team that knows your systems inside and out.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="relative z-10 py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How OpsLine <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A proven 4-step process that takes you from fragile infrastructure to engineering excellence.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-1 md:gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-center gap-8 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } py-8`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Center icon */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileInView={{ scale: [0, 1.15, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                    className="h-14 w-14 rounded-full bg-background border-2 border-primary shadow-lg shadow-primary/20 flex items-center justify-center"
                  >
                    <step.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
