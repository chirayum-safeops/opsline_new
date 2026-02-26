import { motion } from "framer-motion";

const row1Clients = [
  { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Amazon Web Services", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Microsoft Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Vault", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vault/vault-original.svg" },
];

const row2Clients = [
  { name: "GitLab", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "Grafana", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
  { name: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
  { name: "Datadog", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/datadog/datadog-original.svg" },
  { name: "SonarQube", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg" },
  { name: "Apache Airflow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg" },
  { name: "Prometheus", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
];

const ClientsSection = () => {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technologies We <span className="text-primary">Master</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with industry-leading platforms to deliver world-class infrastructure.
          </p>
        </motion.div>

        {/* Scrolling logo rows */}
        <div className="space-y-6 overflow-hidden">
          {/* Row 1 - scrolls left */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-logo-scroll">
              {[...row1Clients, ...row1Clients, ...row1Clients].map((client, i) => (
                <div
                  key={`row1-${i}`}
                  className="inline-flex items-center gap-3 mx-4 px-6 py-4 rounded-xl bg-card/60 border border-border/40 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 shrink-0"
                >
                  <img src={client.logo} alt={client.name} className="h-8 w-8 object-contain" />
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{client.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - scrolls right */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-logo-scroll-reverse">
              {[...row2Clients, ...row2Clients, ...row2Clients].map(
                (client, i) => (
                  <div
                    key={`row2-${i}`}
                    className="inline-flex items-center gap-3 mx-4 px-6 py-4 rounded-xl bg-card/60 border border-border/40 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 shrink-0"
                  >
                    <img src={client.logo} alt={client.name} className="h-8 w-8 object-contain" />
                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{client.name}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
