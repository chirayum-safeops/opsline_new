import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PodMetric {
  name: string;
  status: "Running" | "CrashLoop" | "Pending";
  cpu: number;
  mem: number;
  restarts: number;
  age: string;
}

interface AlertItem {
  id: number;
  severity: "firing" | "resolved";
  text: string;
}

const INITIAL_PODS: PodMetric[] = [
  { name: "api-7b4f9", status: "Running", cpu: 34, mem: 52, restarts: 0, age: "4d" },
  { name: "auth-3c8a1", status: "Running", cpu: 18, mem: 41, restarts: 0, age: "4d" },
  { name: "worker-9d2e5", status: "Running", cpu: 61, mem: 73, restarts: 1, age: "2d" },
  { name: "cache-1f6b3", status: "Running", cpu: 12, mem: 28, restarts: 0, age: "6d" },
];

const ALERT_TEMPLATES = [
  { severity: "resolved" as const, text: "CPU < 80% [api] — resolved" },
  { severity: "firing" as const, text: "Memory > 70% [worker-9d2e5]" },
  { severity: "resolved" as const, text: "Pod restart [worker] — recovered" },
  { severity: "firing" as const, text: "Latency p99 > 200ms [auth]" },
  { severity: "resolved" as const, text: "Latency p99 normalized [auth]" },
];

const GrafanaDashboard = () => {
  const [pods, setPods] = useState<PodMetric[]>(INITIAL_PODS);
  const [sparklines] = useState(() =>
    INITIAL_PODS.map(() =>
      Array.from({ length: 20 }, () => 15 + Math.random() * 60)
    )
  );
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [alertId, setAlertId] = useState(0);
  const [totalRequests, setTotalRequests] = useState(48291);

  // Update pod metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setPods((prev) =>
        prev.map((p) => ({
          ...p,
          cpu: Math.max(5, Math.min(95, p.cpu + (Math.random() - 0.48) * 12)),
          mem: Math.max(15, Math.min(92, p.mem + (Math.random() - 0.5) * 6)),
          restarts: Math.random() > 0.98 ? p.restarts + 1 : p.restarts,
          status:
            p.cpu > 85
              ? "CrashLoop"
              : Math.random() > 0.97
              ? "Pending"
              : "Running",
        }))
      );
      setTotalRequests((r) => r + Math.floor(Math.random() * 30 + 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const tmpl = ALERT_TEMPLATES[Math.floor(Math.random() * ALERT_TEMPLATES.length)];
      setAlertId((prev) => {
        const newId = prev + 1;
        setAlerts((a) => [...a.slice(-2), { id: newId, ...tmpl }]);
        return newId;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = (s: PodMetric["status"]) => {
    if (s === "Running") return "text-[hsl(152,52%,48%)]";
    if (s === "CrashLoop") return "text-[hsl(0,70%,55%)]";
    return "text-[hsl(45,93%,58%)]";
  };

  const statusDot = (s: PodMetric["status"]) => {
    if (s === "Running") return "bg-[hsl(152,52%,48%)]";
    if (s === "CrashLoop") return "bg-[hsl(0,70%,55%)] animate-pulse";
    return "bg-[hsl(45,93%,58%)] animate-pulse";
  };

  const cpuBarColor = (v: number) => {
    if (v > 80) return "bg-[hsl(0,70%,55%)]";
    if (v > 60) return "bg-[hsl(45,93%,58%)]";
    return "bg-primary";
  };

  return (
    <div className="flex flex-col gap-3 flex-1">
      {/* Grafana-style header */}
      <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-primary/80" />
            <span className="text-[11px] text-muted-foreground font-mono">
              Grafana — Cluster Overview
            </span>
          </div>
          <span className="text-[9px] text-muted-foreground font-mono">
            Last 5m · Auto-refresh
          </span>
        </div>

        {/* Top stats row */}
        <div className="grid grid-cols-3 gap-px bg-border/30">
          {[
            { label: "Pods Running", value: `${pods.filter((p) => p.status === "Running").length}/${pods.length}`, color: "text-[hsl(152,52%,48%)]" },
            { label: "Total Restarts", value: pods.reduce((s, p) => s + p.restarts, 0).toString(), color: pods.reduce((s, p) => s + p.restarts, 0) > 2 ? "text-[hsl(45,93%,58%)]" : "text-foreground" },
            { label: "Requests", value: totalRequests.toLocaleString(), color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card/60 p-2.5 text-center">
              <div className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-[9px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pod table */}
        <div className="p-2.5 space-y-1 font-mono text-[10px]">
          {/* Header */}
          <div className="flex items-center gap-1 text-muted-foreground/50 text-[9px] uppercase tracking-wider pb-1 border-b border-border/30 px-1">
            <span className="w-[72px]">Pod</span>
            <span className="w-[52px]">Status</span>
            <span className="w-[42px] text-right">CPU</span>
            <span className="w-[42px] text-right">Mem</span>
            <span className="w-[18px] text-right">R</span>
            <span className="flex-1 text-right">Trend</span>
          </div>

          {pods.map((pod, idx) => (
            <motion.div
              key={pod.name}
              className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-muted/30 transition-colors"
              animate={{ opacity: [0.85, 1] }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-[72px] text-foreground/80 truncate">{pod.name}</span>
              <span className={`w-[52px] flex items-center gap-1 ${statusColor(pod.status)}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${statusDot(pod.status)}`} />
                <span className="text-[9px]">{pod.status === "CrashLoop" ? "Crash" : pod.status}</span>
              </span>
              {/* CPU bar */}
              <span className="w-[42px] flex items-center justify-end gap-1">
                <div className="h-1.5 w-6 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${cpuBarColor(pod.cpu)}`}
                    animate={{ width: `${pod.cpu}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground w-[20px] text-right">{Math.round(pod.cpu)}%</span>
              </span>
              {/* Mem bar */}
              <span className="w-[42px] flex items-center justify-end gap-1">
                <div className="h-1.5 w-6 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[hsl(152,52%,48%)]/70"
                    animate={{ width: `${pod.mem}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground w-[20px] text-right">{Math.round(pod.mem)}%</span>
              </span>
              {/* Restarts */}
              <span className={`w-[18px] text-right text-[9px] ${pod.restarts > 0 ? "text-[hsl(45,93%,58%)]" : "text-muted-foreground/50"}`}>
                {pod.restarts}
              </span>
              {/* Mini sparkline */}
              <span className="flex-1 flex justify-end">
                <svg viewBox="0 0 60 16" className="w-12 h-3">
                  <polyline
                    points={sparklines[idx]
                      .map((v, i) => `${(i / 19) * 60},${16 - (v / 100) * 16}`)
                      .join(" ")}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prometheus Alerts */}
      <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden flex-1">
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border/50">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(0,70%,55%)] animate-pulse" />
          <span className="text-[11px] text-muted-foreground font-mono">Alertmanager</span>
        </div>
        <div className="p-2.5 font-mono text-[10px] space-y-1 h-[80px] overflow-hidden flex flex-col justify-end">
          {alerts.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-1.5 ${
                a.severity === "firing"
                  ? "text-[hsl(0,70%,55%)]"
                  : "text-[hsl(152,52%,48%)]"
              }`}
            >
              <span className={`text-[8px] uppercase font-bold px-1 py-px rounded ${
                a.severity === "firing"
                  ? "bg-[hsl(0,70%,55%)]/15"
                  : "bg-[hsl(152,52%,48%)]/15"
              }`}>
                {a.severity}
              </span>
              {a.text}
            </motion.div>
          ))}
          {alerts.length === 0 && (
            <span className="text-muted-foreground/40">Waiting for alerts...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrafanaDashboard;
