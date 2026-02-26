import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "success" | "info" | "warning" | "header";
  delay: number;
}

const projectFlow: TerminalLine[] = [
  { text: "~/opsline-project $ git checkout -b feature/user-auth", type: "command", delay: 800 },
  { text: "Switched to a new branch 'feature/user-auth'", type: "output", delay: 600 },
  { text: "", type: "output", delay: 300 },
  { text: "~/opsline-project $ npm run test", type: "command", delay: 900 },
  { text: "Running 147 test suites...", type: "info", delay: 700 },
  { text: "✓ auth.service.spec.ts          (12 tests passed)", type: "success", delay: 400 },
  { text: "✓ user.controller.spec.ts       (8 tests passed)", type: "success", delay: 350 },
  { text: "✓ middleware.spec.ts             (15 tests passed)", type: "success", delay: 350 },
  { text: "✓ integration/api.spec.ts        (23 tests passed)", type: "success", delay: 400 },
  { text: "All 147 tests passed ● Coverage: 94.2%", type: "success", delay: 600 },
  { text: "", type: "output", delay: 300 },
  { text: "~/opsline-project $ docker build -t api:v3.1.0 .", type: "command", delay: 900 },
  { text: "[1/6] Resolving dependencies...", type: "info", delay: 500 },
  { text: "[2/6] Installing packages...", type: "info", delay: 500 },
  { text: "[3/6] Compiling TypeScript...", type: "info", delay: 600 },
  { text: "[4/6] Running security audit...", type: "info", delay: 500 },
  { text: "  0 vulnerabilities found", type: "success", delay: 400 },
  { text: "[5/6] Optimizing bundle...", type: "info", delay: 500 },
  { text: "[6/6] Building image...", type: "info", delay: 600 },
  { text: "✓ Image built: api:v3.1.0 (248MB → 87MB)", type: "success", delay: 700 },
  { text: "", type: "output", delay: 300 },
  { text: "~/opsline-project $ terraform apply -auto-approve", type: "command", delay: 900 },
  { text: "aws_ecs_service.api: Modifying...", type: "info", delay: 600 },
  { text: "aws_cloudwatch_log_group.api: Creating...", type: "info", delay: 500 },
  { text: "aws_lb_target_group.api: Modifying...", type: "info", delay: 500 },
  { text: "Apply complete! Resources: 3 added, 2 changed, 0 destroyed.", type: "success", delay: 700 },
  { text: "", type: "output", delay: 300 },
  { text: "~/opsline-project $ kubectl rollout status deploy/api", type: "command", delay: 900 },
  { text: "Waiting for rollout to finish: 2/5 replicas updated...", type: "info", delay: 800 },
  { text: "Waiting for rollout to finish: 4/5 replicas updated...", type: "info", delay: 700 },
  { text: 'deployment "api" successfully rolled out', type: "success", delay: 600 },
  { text: "", type: "output", delay: 300 },
  { text: "── Deploy Summary ──────────────────────────", type: "header", delay: 500 },
  { text: "  Environment:  production", type: "info", delay: 300 },
  { text: "  Version:      v3.1.0", type: "info", delay: 300 },
  { text: "  Health:       ✓ All checks passing", type: "success", delay: 300 },
  { text: "  Latency:      P95 → 12ms", type: "success", delay: 300 },
  { text: "  Status:       🟢 Live", type: "success", delay: 500 },
  { text: "───────────────────────────────────────────", type: "header", delay: 1500 },
];

const HeroSection = () => {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let idx = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const addLine = () => {
      const line = projectFlow[idx % projectFlow.length];
      setVisibleLines((prev) => {
        const next = [...prev, line];
        return next.length > 16 ? next.slice(-16) : next;
      });
      idx++;
      timeout = setTimeout(addLine, line.delay);
    };

    timeout = setTimeout(addLine, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-primary font-semibold";
      case "success":
        return "text-[hsl(142,71%,45%)]";
      case "warning":
        return "text-[hsl(45,93%,58%)]";
      case "info":
        return "text-muted-foreground";
      case "header":
        return "text-primary/60";
      default:
        return "text-muted-foreground/70";
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            DevOps Excellence, Delivered
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Your Infrastructure.
            <br />
            <span className="text-gradient-blue">Our Expertise.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            OpsLine engineers your infrastructure for speed, reliability, and scale. From CI/CD pipelines to
            cloud-native architecture — we make your team unstoppable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 text-base px-8"
            >
              Get a 30-min Strategy Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="text-base"
            >
              Explore Services
            </Button>
          </div>
        </motion.div>

        {/* Right: Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10"
        >
          <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/5 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[hsl(0,70%,55%)]" />
                <div className="h-3 w-3 rounded-full bg-[hsl(45,90%,55%)]" />
                <div className="h-3 w-3 rounded-full bg-[hsl(142,65%,45%)]" />
              </div>
              <span className="text-[11px] text-muted-foreground ml-2 font-mono">opsline — deploy-pipeline — zsh</span>
            </div>

            {/* Terminal content */}
            <div
              ref={termRef}
              className="h-[340px] md:h-[380px] overflow-hidden p-5 font-mono text-[12px] md:text-[13px] leading-relaxed space-y-0.5 bg-background/50"
            >
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={getLineColor(line.type)}
                >
                  {line.text || "\u00A0"}
                </motion.div>
              ))}
              <span className="inline-block w-2.5 h-5 bg-primary/80 animate-terminal-blink ml-0.5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
