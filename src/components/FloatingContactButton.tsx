import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ContactDialog from "@/components/ContactDialog";

const FloatingContactButton = () => {
  return (
    <ContactDialog>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40"
        aria-label="Contact Us"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Contact Us</span>
      </motion.button>
    </ContactDialog>
  );
};

export default FloatingContactButton;
