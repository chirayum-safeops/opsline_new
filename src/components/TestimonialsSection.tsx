import { motion } from "framer-motion";


const clientLogos = [
  {
    name: "Monotype",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Monotype_Imaging_2019_logo.svg/960px-Monotype_Imaging_2019_logo.svg.png",
  },
  {
    name: "Real Brokerage",
    logo: "https://support.therealbrokerage.com/hc/article_attachments/35782507170071",
  },
  {
    name: "NCM",
    logo: "https://www.boxofficepro.com/wp-content/uploads/2017/10/NCM.jpg",
  },
  {
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/960px-Logo_of_Twitter.svg.png",
  },
  {
    name: "Eisen",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQFuorFmXYGZig/company-logo_200_200/company-logo_200_200/0/1719255857023/eisen_logo?e=2147483647&v=beta&t=2861olwQYPX1Pqz017Ppi_D8r64gaMKnow6gwXst_Vc",
  },
  {
    name: "Komodo Health",
    logo: "https://storage.googleapis.com/simplify-imgs/companies/e6a02887-25bc-4d2d-b055-b9427bca6364/logo.png",
  },
  {
    name: "Apple Cart",
    logo: "https://mms.businesswire.com/media/20210210005875/en/858574/4/Applecart-Square2.jpg",
  },
  {
    name: "StudySync",
    logo: "https://play-lh.googleusercontent.com/le8E3NAAGq9zDIBDMpy5lXmRDSpl-fSsmjNHyS0Otb-eyzVFhJ2sv0NiS9hZe6KJJ8-9",
  },
];

const testimonials = [
  {
    quote:
      "Opsline was instrumental in helping us build the foundation of a big data infrastructure for scale. The team brings a level of expertise and support that stands out in the industry.",
    name: "Samir Mirza",
    role: "Twitter",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative z-10 py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-primary">Engineering Teams</span>
          </h2>
        </motion.div>

        {/* Logo bar */}
        <div className="overflow-hidden mb-16 relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
          <div className="flex animate-logo-scroll whitespace-nowrap">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 mx-4 px-5 py-3 rounded-lg bg-background/50 border border-border/40 shrink-0"
              >
                <img src={client.logo} alt={client.name} className="h-6 w-6 object-contain" />
                <span className="text-sm font-semibold text-muted-foreground">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-full rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-6">
                <p className="text-sm text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
