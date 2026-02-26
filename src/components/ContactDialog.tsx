import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

// Google reCAPTCHA v2 test key — replace with your real site key
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

interface ContactDialogProps {
  children: React.ReactNode;
}

const ContactDialog = ({ children }: ContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const sanitize = (str: string) =>
    str.replace(
      /[<>"'&]/g,
      (ch) => ({ "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "&": "&amp;" })[ch] ?? ch,
    );

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (!captchaToken) {
      toast({ title: "Please complete the CAPTCHA", variant: "destructive" });
      return;
    }

    if (!isValidEmail(email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    if (name.length > 100 || email.length > 255 || message.length > 1000) {
      toast({ title: "Input exceeds maximum length", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
const res = await fetch("https://formsubmit.co/ajax/amatos@opsline.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: sanitize(name),
          email: sanitize(email),
          message: sanitize(message),
          _subject: `OpsLine Contact: ${sanitize(name)}`,
        }),
      });

      if (res.ok) {
        toast({ title: "Message sent!", description: "We'll get back to you shortly." });
        setForm({ name: "", email: "", message: "" });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
        setOpen(false);
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md border-border/50 bg-background/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Get in <span className="text-primary">Touch</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              maxLength={255}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              maxLength={1000}
              rows={4}
            />
          </div>
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
              theme="dark"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading || !captchaToken}>
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
