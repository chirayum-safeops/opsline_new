import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
      initBadgeWidget: (opts: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding?: boolean;
      }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/d/cx9m-tbp-2qs/opsline-meeting";

const CalendlyCTA = () => {
  useEffect(() => {
    // Load Calendly CSS
    if (!document.querySelector('link[href*="calendly"]')) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Load Calendly JS
    if (!document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank");
    }
  };

  return (
    <section id="booking" className="relative z-10 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm p-6 md:p-12 shadow-2xl shadow-primary/10">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Calendar className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              Ready to Transform Your <span className="text-primary">Infrastructure</span>?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto">
              Book a free 30-minute strategy session with an OpsLine engineer. No sales pitch — just actionable insights
              for your stack.
            </p>
            <Button
              size="lg"
              onClick={openCalendly}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 text-sm md:text-lg px-6 md:px-10 py-4 md:py-6 h-auto w-full md:w-auto"
            >
              Get a 30-min OpsLine Strategy Session
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <p className="text-xs text-muted-foreground mt-3 md:mt-4">Free · No commitment · 100% technical</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalendlyCTA;
