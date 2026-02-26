import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Architecture nodes with positions (percentage-based)
const LAYERS = {
  ingress: { label: "Internet", y: 5 },
  lb: { label: "Load Balancer", y: 22 },
  services: { label: "Services", y: 45 },
  data: { label: "Data Layer", y: 75 },
};

interface ServiceNode {
  id: string;
  label: string;
  x: number;
  y: number;
  layer: string;
  status: "healthy" | "scaling" | "healing";
  replicas: number;
}

interface TrafficParticle {
  id: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
}

const DESKTOP_NODES: ServiceNode[] = [
  { id: "users", label: "Users", x: 50, y: 5, layer: "ingress", status: "healthy", replicas: 1 },
  { id: "lb", label: "Load Balancer", x: 50, y: 22, layer: "lb", status: "healthy", replicas: 2 },
  { id: "api", label: "API", x: 20, y: 45, layer: "services", status: "healthy", replicas: 3 },
  { id: "auth", label: "Auth", x: 50, y: 45, layer: "services", status: "healthy", replicas: 2 },
  { id: "worker", label: "Workers", x: 80, y: 45, layer: "services", status: "healthy", replicas: 4 },
  { id: "db", label: "PostgreSQL", x: 25, y: 75, layer: "data", status: "healthy", replicas: 2 },
  { id: "cache", label: "Redis", x: 50, y: 75, layer: "data", status: "healthy", replicas: 3 },
  { id: "queue", label: "Queue", x: 75, y: 75, layer: "data", status: "healthy", replicas: 2 },
];

const MOBILE_NODES: ServiceNode[] = [
  { id: "users", label: "Users", x: 50, y: 8, layer: "ingress", status: "healthy", replicas: 1 },
  { id: "lb", label: "LB", x: 50, y: 22, layer: "lb", status: "healthy", replicas: 2 },
  { id: "api", label: "API", x: 18, y: 36, layer: "services", status: "healthy", replicas: 3 },
  { id: "auth", label: "Auth", x: 50, y: 36, layer: "services", status: "healthy", replicas: 2 },
  { id: "worker", label: "Workers", x: 82, y: 36, layer: "services", status: "healthy", replicas: 4 },
  { id: "db", label: "PgSQL", x: 18, y: 50, layer: "data", status: "healthy", replicas: 2 },
  { id: "cache", label: "Redis", x: 50, y: 50, layer: "data", status: "healthy", replicas: 3 },
  { id: "queue", label: "Queue", x: 78, y: 46, layer: "data", status: "healthy", replicas: 2 },
];

const CONNECTIONS: [string, string][] = [
  ["users", "lb"],
  ["lb", "api"],
  ["lb", "auth"],
  ["lb", "worker"],
  ["api", "db"],
  ["api", "cache"],
  ["auth", "db"],
  ["auth", "cache"],
  ["worker", "queue"],
  ["worker", "cache"],
];

const STATUS_EVENTS = [
  { nodeId: "api", status: "scaling" as const, replicas: 5, message: "⚡ Auto-scaling API: 3 → 5 replicas" },
  { nodeId: "worker", status: "healing" as const, replicas: 4, message: "🔄 Self-healing: restarting worker-c2" },
  { nodeId: "auth", status: "scaling" as const, replicas: 3, message: "⚡ Auth scaling up: 2 → 3 replicas" },
  { nodeId: "cache", status: "healing" as const, replicas: 3, message: "🔄 Redis failover: promoting replica" },
  { nodeId: "api", status: "healthy" as const, replicas: 3, message: "✓ API stable: 3 replicas healthy" },
  { nodeId: "worker", status: "healthy" as const, replicas: 4, message: "✓ Workers recovered: all 4 healthy" },
  { nodeId: "db", status: "scaling" as const, replicas: 3, message: "⚡ DB read-replica added: 2 → 3" },
  { nodeId: "auth", status: "healthy" as const, replicas: 2, message: "✓ Auth scaled down: 2 replicas" },
];

interface Props {
  isVisible: boolean;
}

const CloudArchitecture = ({ isVisible }: Props) => {
  const isMobile = useIsMobile();
  const layoutNodes = useMemo(() => isMobile ? MOBILE_NODES : DESKTOP_NODES, [isMobile]);
  const [nodes, setNodes] = useState<ServiceNode[]>(DESKTOP_NODES);

  // Sync node positions when layout changes
  useEffect(() => {
    setNodes(prev => prev.map(n => {
      const layout = layoutNodes.find(ln => ln.id === n.id);
      return layout ? { ...n, x: layout.x, y: layout.y, label: layout.label } : n;
    }));
  }, [layoutNodes]);
  const [particles, setParticles] = useState<TrafficParticle[]>([]);
  const [eventLog, setEventLog] = useState<{ id: number; text: string; type: string }[]>([]);
  const particleIdRef = useRef(0);
  const eventIdRef = useRef(0);
  const eventIndexRef = useRef(0);

  // Simulate status changes
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      const event = STATUS_EVENTS[eventIndexRef.current % STATUS_EVENTS.length];
      eventIndexRef.current++;

      setNodes((prev) =>
        prev.map((n) =>
          n.id === event.nodeId
            ? { ...n, status: event.status, replicas: event.replicas }
            : n
        )
      );

      setEventLog((prev) => [
        ...prev.slice(-4),
        {
          id: eventIdRef.current++,
          text: event.message,
          type: event.status,
        },
      ]);

      // Reset status after 2.5s
      setTimeout(() => {
        setNodes((prev) =>
          prev.map((n) =>
            n.id === event.nodeId ? { ...n, status: "healthy" } : n
          )
        );
      }, 2500);
    }, 3500);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Generate traffic particles
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      const fromNode = layoutNodes.find((n) => n.id === conn[0])!;
      const toNode = layoutNodes.find((n) => n.id === conn[1])!;

      setParticles((prev) => [
        ...prev.slice(-20),
        {
          id: particleIdRef.current++,
          fromX: fromNode.x,
          fromY: fromNode.y,
          toX: toNode.x,
          toY: toNode.y,
          progress: 0,
          speed: 0.012 + Math.random() * 0.015,
        },
      ]);
    }, 300);
    return () => clearInterval(interval);
  }, [isVisible, layoutNodes]);

  // Animate particles
  useEffect(() => {
    if (!isVisible) return;
    const frame = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + p.speed }))
          .filter((p) => p.progress <= 1)
      );
    }, 16);
    return () => clearInterval(frame);
  }, [isVisible]);

  const getNodeBorder = (status: ServiceNode["status"]) => {
    switch (status) {
      case "scaling": return "border-[hsl(45,93%,58%)] shadow-[0_0_12px_hsl(45,93%,58%,0.3)]";
      case "healing": return "border-[hsl(0,70%,55%)] shadow-[0_0_12px_hsl(0,70%,55%,0.3)]";
      default: return "border-border/60";
    }
  };

  const getStatusDot = (status: ServiceNode["status"]) => {
    switch (status) {
      case "scaling": return "bg-[hsl(45,93%,58%)]";
      case "healing": return "bg-[hsl(0,70%,55%)] animate-pulse";
      default: return "bg-[hsl(152,52%,48%)]";
    }
  };

  return (
    <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(0,70%,55%)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(45,90%,55%)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(152,52%,48%)]" />
          </div>
          <span className="text-[11px] text-muted-foreground ml-2 font-mono">cloud-architecture — live</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(152,52%,48%)] animate-pulse" />
          all systems operational
        </div>
      </div>

      <div className="relative h-[340px] md:h-[440px]">
        {/* Layer labels - hidden on mobile */}
        {!isMobile && Object.entries(LAYERS).map(([key, layer]) => (
          <div
            key={key}
            className="absolute left-2 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/40"
            style={{ top: `${layer.y}%`, transform: "translateY(-50%)" }}
          >
            {layer.label}
          </div>
        ))}

        {/* Layer dividers */}
        {[16, 35, 62].map((y) => (
          <div
            key={y}
            className="absolute left-0 right-0 border-t border-dashed border-border/20"
            style={{ top: `${y}%` }}
          />
        ))}

        {/* SVG for connections and particles */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {/* Connection lines */}
          {CONNECTIONS.map(([fromId, toId], idx) => {
            const from = layoutNodes.find((n) => n.id === fromId)!;
            const to = layoutNodes.find((n) => n.id === toId)!;
            return (
              <line
                key={idx}
                x1={`${from.x}%`}
                y1={`${from.y + 4}%`}
                x2={`${to.x}%`}
                y2={`${to.y - 4}%`}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.4"
              />
            );
          })}

          {/* Traffic particles */}
          {particles.map((p) => {
            const cx = p.fromX + (p.toX - p.fromX) * p.progress;
            const cy = p.fromY + 4 + (p.toY - 4 - (p.fromY + 4)) * p.progress;
            return (
              <circle
                key={p.id}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r="2.5"
                fill="hsl(var(--primary))"
                opacity={0.8 - p.progress * 0.5}
              >
                <animate attributeName="r" values="2;3.5;2" dur="0.8s" repeatCount="indefinite" />
              </circle>
            );
          })}
        </svg>

        {/* Service nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
            animate={
              node.status === "scaling"
                ? { scale: [1, 1.08, 1] }
                : node.status === "healing"
                ? { scale: [1, 0.95, 1.02, 1] }
                : {}
            }
            transition={{ duration: 1, repeat: node.status !== "healthy" ? Infinity : 0 }}
          >
            <div
              className={`relative rounded-lg md:rounded-xl border-2 bg-card/90 backdrop-blur-sm px-1.5 py-1 md:px-3 md:py-2 transition-all duration-500 ${getNodeBorder(node.status)}`}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <span className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${getStatusDot(node.status)}`} />
                <span className="text-[9px] md:text-xs font-mono font-semibold text-foreground">{node.label}</span>
              </div>
              <div className="hidden md:flex items-center gap-1 mt-1">
                {Array.from({ length: Math.min(node.replicas, 5) }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-3 rounded-sm ${
                      node.status === "healing" && i === node.replicas - 1
                        ? "bg-[hsl(0,70%,55%)]/60 animate-pulse"
                        : "bg-primary/40"
                    }`}
                  />
                ))}
                <span className="text-[9px] text-muted-foreground ml-1">×{node.replicas}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Event log overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="rounded-lg bg-card/90 backdrop-blur-md border border-border/40 p-2 space-y-0.5 font-mono text-[10px]">
            <AnimatePresence mode="popLayout">
              {eventLog.map((e) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    e.type === "scaling"
                      ? "text-[hsl(45,93%,58%)]"
                      : e.type === "healing"
                      ? "text-[hsl(0,70%,55%)]"
                      : "text-[hsl(152,52%,48%)]"
                  }
                >
                  {e.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudArchitecture;
