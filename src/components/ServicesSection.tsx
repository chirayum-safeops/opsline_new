import { motion } from "framer-motion";
import { GitBranch, Cloud, Activity, ShieldCheck, Workflow, DollarSign } from "lucide-react";

const services = [
  {
    icon: GitBranch,
    title: "CI/CD Pipelines",
    description: "Automated build, test, and deploy workflows that get your code to production safely and fast.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable, cost-optimized cloud architecture on AWS, GCP, or Azure — built with Infrastructure as Code.",
  },
  {
    icon: Activity,
    title: "Monitoring & Observability",
    description: "Full-stack observability with metrics, logs, and traces so you catch issues before your users do.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description: "DevSecOps practices baked into your pipeline — vulnerability scanning, secrets management, and compliance readiness.",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Streamline repetitive workflows with intelligent automation — from deployments to incident response.",
  },
  {
    icon: DollarSign,
    title: "Cost Optimization",
    description: "Reduce cloud spend by analyzing usage, right-sizing resources, and applying best practices in computing, networking, and storage.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative z-10 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We <span className="text-primary">Deliver</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade DevOps services tailored to your stack, your team, and your growth trajectory.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
