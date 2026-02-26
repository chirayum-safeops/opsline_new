import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, XCircle, AlertTriangle, DollarSign, TrendingDown, Cpu, Network, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  text: string;
  category: string;
  options: { label: string; score: number; icon: "yes" | "partial" | "no" }[];
}

const QUESTIONS: Question[] = [
  {
    id: "iac",
    text: "Do you manage infrastructure as code (Terraform, Pulumi, CloudFormation)?",
    category: "Infrastructure",
    options: [
      { label: "Yes, fully automated", score: 3, icon: "yes" },
      { label: "Partially — some manual steps", score: 1.5, icon: "partial" },
      { label: "No, mostly manual", score: 0, icon: "no" },
    ],
  },
  {
    id: "cicd",
    text: "Do you have a CI/CD pipeline with automated testing?",
    category: "Delivery",
    options: [
      { label: "Yes, with full test coverage", score: 3, icon: "yes" },
      { label: "CI only — deploys are manual", score: 1.5, icon: "partial" },
      { label: "No automated pipeline", score: 0, icon: "no" },
    ],
  },
  {
    id: "observability",
    text: "Do you have centralized logging, metrics, and alerting?",
    category: "Observability",
    options: [
      { label: "Full observability stack", score: 3, icon: "yes" },
      { label: "Basic monitoring only", score: 1.5, icon: "partial" },
      { label: "We check logs on servers", score: 0, icon: "no" },
    ],
  },
  {
    id: "deploys",
    text: "How often do you deploy to production?",
    category: "Velocity",
    options: [
      { label: "Multiple times per day", score: 3, icon: "yes" },
      { label: "Weekly or bi-weekly", score: 1.5, icon: "partial" },
      { label: "Monthly or less", score: 0, icon: "no" },
    ],
  },
  {
    id: "security",
    text: "Is security scanning integrated into your pipeline?",
    category: "Security",
    options: [
      { label: "Yes — SAST, DAST, dependency scans", score: 3, icon: "yes" },
      { label: "Some checks, not automated", score: 1.5, icon: "partial" },
      { label: "No security automation", score: 0, icon: "no" },
    ],
  },
  {
    id: "recovery",
    text: "Can you recover from a production incident in under 1 hour?",
    category: "Resilience",
    options: [
      { label: "Yes — runbooks + auto-remediation", score: 3, icon: "yes" },
      { label: "Usually — but it's stressful", score: 1.5, icon: "partial" },
      { label: "It takes hours or days", score: 0, icon: "no" },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 3;

const getLevel = (pct: number) => {
  if (pct >= 85) return { label: "Elite", color: "hsl(142, 71%, 45%)", emoji: "🚀", desc: "You're operating at elite level. Fine-tuning and innovation are your next frontier." };
  if (pct >= 60) return { label: "Advanced", color: "hsl(var(--primary))", emoji: "⚡", desc: "Strong foundations — a few targeted improvements will unlock elite performance." };
  if (pct >= 35) return { label: "Developing", color: "hsl(45, 93%, 58%)", emoji: "🔧", desc: "You've started the journey. Automation and observability will accelerate your team." };
  return { label: "Beginning", color: "hsl(0, 70%, 55%)", emoji: "🌱", desc: "Big opportunity ahead. The right DevOps strategy will transform your delivery speed." };
};

const OptionIcon = ({ type }: { type: "yes" | "partial" | "no" }) => {
  switch (type) {
    case "yes": return <CheckCircle2 className="h-5 w-5 text-[hsl(142,71%,45%)]" />;
    case "partial": return <AlertTriangle className="h-5 w-5 text-[hsl(45,93%,58%)]" />;
    case "no": return <XCircle className="h-5 w-5 text-[hsl(0,70%,55%)]" />;
  }
};

const DevOpsMaturity = () => {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (optionIdx: number, score: number) => {
    setSelected(optionIdx);
    const q = QUESTIONS[current];
    setAnswers((prev) => ({ ...prev, [q.id]: score }));
  };

  const next = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setStep("result");
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setStep("intro");
    setCurrent(0);
    setAnswers({});
    setSelected(null);
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const pct = Math.round((totalScore / MAX_SCORE) * 100);
  const level = getLevel(pct);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {step === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Free Assessment
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  How Mature Is Your <span className="text-gradient-blue">DevOps?</span>
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Answer 6 quick questions and get an instant score with actionable insights for your team.
                </p>
                <Button
                  size="lg"
                  onClick={() => setStep("quiz")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 text-base px-8"
                >
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {/* QUIZ */}
            {step === "quiz" && (
              <motion.div
                key={`q-${current}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {QUESTIONS[current].category}
                    </span>
                    <span className="font-mono text-xs">
                      {current + 1} / {QUESTIONS.length}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      animate={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-snug">
                  {QUESTIONS[current].text}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {QUESTIONS[current].options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect(idx, opt.score)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                        selected === idx
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border/60 bg-card/80 hover:border-primary/40 hover:bg-primary/[0.02]"
                      }`}
                    >
                      <OptionIcon type={opt.icon} />
                      <span className="text-sm md:text-base text-foreground/90 font-medium">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prev}
                    disabled={current === 0}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={next}
                    disabled={selected === null}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    {current === QUESTIONS.length - 1 ? "See Results" : "Next"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* RESULT */}
            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{level.emoji}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Your DevOps Maturity
                </h2>
                <p className="text-lg font-semibold mb-8" style={{ color: level.color }}>
                  {level.label} — {pct}%
                </p>

                {/* Visual score ring */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50" cy="50" r="42"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50" cy="50" r="42"
                      fill="none"
                      stroke={level.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 42}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - pct / 100) }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-4xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {pct}%
                    </motion.span>
                    <span className="text-xs text-muted-foreground font-mono">score</span>
                  </div>
                </div>

                {/* Category breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {QUESTIONS.map((q) => {
                    const s = answers[q.id] ?? 0;
                    const catPct = Math.round((s / 3) * 100);
                    return (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + QUESTIONS.indexOf(q) * 0.1 }}
                        className="rounded-xl border border-border/60 bg-card/80 p-3"
                      >
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-mono">
                          {q.category}
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: catPct >= 80 ? "hsl(142,71%,45%)" : catPct >= 40 ? "hsl(var(--primary))" : "hsl(0,70%,55%)" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${catPct}%` }}
                            transition={{ duration: 0.8, delay: 1 }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground">{catPct}%</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Cloud Savings Estimate */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-8 text-left"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Estimated Cloud Savings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your maturity level, here's where we typically help teams like yours reduce cloud spend:
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Cpu,
                        title: "Right-sizing compute",
                        desc: pct >= 60
                          ? "Fine-tune instance types & autoscaling for 10–20% savings."
                          : "Eliminate over-provisioned instances — typical savings of 25–40%.",
                        saving: pct >= 60 ? "10–20%" : "25–40%",
                      },
                      {
                        icon: TrendingDown,
                        title: "Reserved Instances & Savings Plans",
                        desc: pct >= 60
                          ? "Optimize existing commitments and coverage gaps."
                          : "Commit to 1–3 year reservations on predictable workloads for up to 60% off on-demand pricing.",
                        saving: pct >= 60 ? "15–30%" : "30–60%",
                      },
                      {
                        icon: Network,
                        title: "Network & data transfer",
                        desc: "Reduce cross-AZ/region traffic, optimize CDN caching, and consolidate egress paths.",
                        saving: "10–25%",
                      },
                      {
                        icon: HardDrive,
                        title: "Storage & lifecycle policies",
                        desc: "Move cold data to cheaper tiers, enforce retention policies, and clean up orphaned resources.",
                        saving: "15–35%",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + idx * 0.1 }}
                        className="flex items-start gap-3 rounded-lg bg-card/80 border border-border/40 p-3"
                      >
                        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-sm font-semibold text-foreground">{item.title}</span>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0 ml-2">
                              {item.saving}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <p className="text-muted-foreground mb-8 max-w-md mx-auto">{level.desc}</p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30"
                  >
                    Get Expert Help
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={reset} className="gap-2">
                    <RotateCcw className="h-4 w-4" /> Retake
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DevOpsMaturity;
