import { motion } from "framer-motion";
import { Users, Target, Zap } from "lucide-react";
import logo from "@/assets/logo.png";

const pillars = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We partner with engineering teams to eliminate bottlenecks, reduce risk, and accelerate delivery — so you can focus on building great products.",
  },
  {
    icon: Users,
    title: "Battle-Tested Team",
    description: "Our consultants have scaled infrastructure for startups and enterprises alike — across AWS, GCP, and Azure.",
  },
  {
    icon: Zap,
    title: "Impact First",
    description: "We don't just set up tools. We embed best practices that stick — transforming how your team ships, monitors, and recovers.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start gap-12 mb-16"
          >
            {/* Left: intro text */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <img src={logo} alt="OpsLine" className="h-4 w-4" />
                Who We Are
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                DevOps Engineers Who <span className="text-primary">Get It Done</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                OpsLine is a DevOps consulting firm built by engineers, for engineers. We help companies design, automate, and scale their cloud infrastructure — cutting costs, shipping faster, and sleeping better at night.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a startup deploying your first container or an enterprise modernizing legacy systems, we bring the expertise and hands-on execution to get you there.
              </p>
            </div>

            {/* Right: key stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0 grid grid-cols-2 gap-4"
            >
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "99.9%", label: "Avg. Uptime" },
                { value: "35%", label: "Avg. Cost Savings" },
                { value: "24/7", label: "Support Available" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 text-center"
                >
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Pillars */}
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-6"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <pillar.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
