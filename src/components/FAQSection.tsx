import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What types of projects do you take on?",
    a: "We handle cloud migrations, CI/CD pipeline builds, infrastructure modernization, Kubernetes deployments, monitoring setups, and more — all scoped as defined projects with clear deliverables.",
  },
  {
    q: "What are your managed services?",
    a: "We provide ongoing infrastructure management including monitoring, patching, scaling, incident response, and cost optimization — so your team can focus on building product.",
  },
  {
    q: "How does your support model work?",
    a: "We offer dedicated support plans with SLAs, proactive health checks, and a team that knows your systems. Whether it's a quick question or an urgent issue, we've got you covered.",
  },
  {
    q: "What cloud providers do you support?",
    a: "We're cloud-agnostic — we work with AWS, Google Cloud, Azure, and hybrid/multi-cloud environments. Our IaC practices ensure your infrastructure is portable.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "Security is embedded into every stage. We implement vulnerability scanning, secrets management, RBAC, and help you meet SOC 2, HIPAA, or ISO 27001 requirements as needed.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope — smaller projects like pipeline builds can take 2–4 weeks, while larger migrations or platform builds run 2–3 months. We define timelines upfront during scoping.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative z-10 py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm px-6 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 data-[state=open]:border-primary/30 transition-all"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
