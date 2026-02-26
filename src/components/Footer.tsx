import logo from "@/assets/logo.png";
import { Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand + Social */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="OpsLine logo" className="h-7 w-7 rounded-lg" />
              <span className="text-lg font-bold text-foreground">
                Ops<span className="text-primary">Line</span>
              </span>
            </div>
            <a
              href="https://www.linkedin.com/company/opsline/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/devopsline/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} OpsLine. All rights reserved.
          </p>

          {/* Spacer to balance layout */}
          <div className="hidden sm:block w-[140px]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
