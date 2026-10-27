export type Service = {
  icon: string;
  g: number;
  draft?: boolean;
  title: string;
  short: string;
  alt: string;
  lead: string;
  intro: string;
  offers: string[][];
  extras?: string[];
  partners: string[];
};
export type Project = { cat: string; title: string; copy: string; loc: string; year: string };
export type Job = { title: string; team: string; loc: string; copy: string };

export const SV: Service[] = [
 {icon:'ShieldCheck',g:0,title:'Network Security Solutions',short:'network security',alt:'Next-Generation Network Security',lead:'Comprehensive Security with Leading Technologies',
  intro:"In today's interconnected world, robust network security is pivotal for safeguarding your digital assets against sophisticated threats. Leveraging our strategic partnerships with industry leaders such as Cisco, Meraki, Juniper, Aruba, and HPE, we deliver bespoke Network Security Solutions designed to fortify your business's defenses, ensuring resilience against cyber threats and maintaining operational integrity.",
  offers:[["Cisco's Advanced Security Architecture","Harness the power of Cisco's comprehensive security ecosystem, including the Cisco SecureX platform, which provides an integrated and simplified security experience across your infrastructure. From Cisco ASA Firewalls to Next-Generation Firewalls (NGFWs) and Advanced Malware Protection (AMP), we implement Cisco's cutting-edge technologies to protect your network at every layer."],
   ["Meraki Cloud-Managed Security Solutions","Benefit from Meraki's intuitive cloud-managed security appliances that offer out-of-the-box security with easy scalability. Meraki's solutions, including MX Security Appliances, provide unified threat management (UTM) capabilities, such as intrusion prevention, content filtering, and web search filtering."],
   ["Juniper's High-Performance Security Frameworks","Leverage Juniper Networks' high-performance security solutions, including SRX Series Gateways for secure routing and firewall capabilities. Juniper's advanced security features, such as Sky ATP for threat prevention and Policy Enforcer for policy management across the network, ensure comprehensive protection against cyber threats."],
   ["Aruba's Intelligent Access Control","Utilize Aruba ClearPass for dynamic role-based access control, enforcing security policies across wired and wireless networks. Aruba's solutions provide visibility into who and what is connected to your network, offering robust guest access, device profiling, and network access control to mitigate risks."],
   ["HPE's Secure Networking Infrastructure","Implement HPE's secure networking solutions to build a resilient network foundation. With HPE's Aruba networking products, we offer secure wired and wireless networking options designed to meet the security and performance requirements of today's mobile-first enterprises."]],
  extras:['Multi-Factor Authentication (MFA) with Duo Security','Endpoint Protection and Response','Secure VPN Services for Remote Work','DDoS Protection and Mitigation'],
  partners:['Cisco','Meraki','Juniper','Aruba','HPE']},
 {icon:'Activity',g:0,title:'Network Monitoring and Management',short:'monitoring',alt:'Proactive Network Monitoring and Management',lead:'Empower Your Network with Advanced Monitoring and Intelligent Management',
  intro:"In the digital age, maintaining optimal network performance and reliability is not just a necessity—it's a competitive advantage. Our Network Monitoring and Management services integrate cutting-edge solutions from industry leaders like Cisco, SolarWinds, Nagios, IBM Watson, HPE, and Splunk to offer unparalleled network insights and operational efficiency. By leveraging these technologies, we provide a proactive approach to network management, ensuring your infrastructure supports your business goals without interruption.",
  offers:[["Real-Time Analytics with SolarWinds, Nagios & Cisco","Dive deep into network performance with the powerful analytics capabilities of SolarWinds and Nagios. Enhanced by Cisco's comprehensive network management tools, our solution offers you the ability to monitor network performance actively, identify bottlenecks, and optimize traffic flows for enhanced efficiency and reliability."],
   ["Network Optimization with Cisco DNA Center","Experience the future of network management with Cisco DNA Center. This centralized management platform automates network operations, harnesses AI-driven insights for performance optimization, and simplifies the complexity of managing modern networks."],
   ["Visibility and Troubleshooting with Cisco Stealthwatch","Elevate your network security posture and operational efficiency with Stealthwatch. This advanced solution provides deep visibility into your network traffic patterns, enabling swift detection of anomalies and threats."],
   ["Predictive Maintenance with IBM Watson & HPE","Revolutionize network management with predictive insights from IBM Watson, complemented by the robust networking solutions from HPE. This approach enables us to foresee potential issues before they impact your operations, ensuring your network remains up and running with minimal downtime."],
   ["Custom Dashboards and Intelligent Monitoring with Splunk & Cisco","Harness the power of big data for network management with Splunk's advanced data analysis tools, integrated with Cisco's monitoring technologies. Our custom dashboard solutions provide a comprehensive, at-a-glance view of your network's health, performance metrics, and security posture."]],
  partners:['Cisco','SolarWinds','Nagios','IBM Watson','HPE','Splunk']},
 {icon:'Wifi',g:0,title:'Wireless Network Solutions',short:'wireless',alt:'Wireless Networks That Simply Work',lead:'Elevate Your Connectivity with Advanced Wireless Networking',
  intro:"In today's hyper-connected world, wireless networks serve as the backbone of business operations, supporting a myriad of devices and applications. Our Wireless Network Solutions leverage the latest technologies and strategic partnerships with Aruba Networks, Cisco, Meraki, Ubiquiti Networks, and Juniper Mist to deliver unparalleled performance, security, and scalability.",
  offers:[["Optimized Wireless Performance with Aruba Networks & Cisco","Experience the future of wireless networking with our solutions powered by Aruba Networks and Cisco. By embracing Wi-Fi 6 and 6E technologies, we offer superior performance that supports higher data rates, increased capacity, and improved power efficiency."],
   ["Enhanced Wireless Security and Management with Meraki","Simplify your wireless network management with Cisco Meraki's cloud-managed solutions. These platforms provide intuitive deployment, centralized management, and robust security features, including advanced encryption and threat protection."],
   ["Scalable Wireless Architectures with Ubiquiti Networks & Juniper Mist","Build a future-proof wireless network with scalable solutions from Ubiquiti Networks, further enhanced by Juniper Mist's AI-driven platform. This combination offers smart wireless networking that adapts to your needs, providing unparalleled insight and automation capabilities."]],
  partners:['Aruba Networks','Cisco','Meraki','Ubiquiti Networks','Juniper Mist']},
 {icon:'Cloud',g:0,title:'Cloud Networking Integration',short:'cloud networking',alt:"Cloud Networking: The Sky's the Limit",lead:'Transform Your Cloud Networking Landscape',
  intro:"Embrace the full potential of the cloud with our comprehensive Cloud Networking Integration services, designed to streamline your cloud operations, enhance security, and ensure optimal performance. By partnering with leading providers like AWS, Azure, Cisco, Google Cloud Platform, VMware, and HPE, we offer tailored solutions that fit your specific business needs.",
  offers:[["Cloud Services Optimization with AWS, Azure, & Cisco","Achieve peak cloud performance and efficiency by integrating the expansive services of Amazon Web Services (AWS) and Microsoft Azure with Cisco's cloud-ready networking solutions."],
   ["Cloud Security and Compliance with Google Cloud Platform & Cisco","Secure your cloud environment against the latest threats with the advanced security models of Google Cloud Platform, complemented by Cisco's comprehensive cloud security solutions."],
   ["Simplified Cloud Operations with VMware & HPE","Leverage the sophisticated cloud management capabilities of VMware, enhanced by the robust networking solutions from HPE, for streamlined cloud operations."]],
  partners:['AWS','Azure','Google Cloud Platform','Cisco','VMware','HPE']},
 {icon:'MessagesSquare',g:0,title:'Unified Communications',short:'unified communications',alt:'Unified Communications for Unmatched Collaboration',lead:'Elevate Your Communication Strategy',
  intro:"Our Unified Communications services revolutionize how your teams collaborate and communicate, integrating cutting-edge solutions from Microsoft Teams, Slack, Cisco, and Zoom. These platforms are designed to unify voice, video, and messaging into a seamless and secure communication experience, fostering better collaboration, productivity, and engagement across your organization.",
  offers:[["Collaboration Solutions with Microsoft Teams, Slack, & Cisco","Transform your team collaboration with integrated solutions from Microsoft Teams, Slack, and Cisco. This synergy provides a comprehensive communication ecosystem that supports real-time messaging, video conferencing, and file sharing, all within a secure and user-friendly interface."],
   ["Secure Communications with Zoom & Cisco","Guarantee the security of your communications with end-to-end encryption provided by Zoom, enhanced with Cisco's security-focused collaboration tools."]],
  partners:['Microsoft Teams','Slack','Cisco','Zoom']},
 {icon:'Server',g:0,title:'Network Infrastructure Upgrades',short:'infrastructure upgrades',alt:'Future-Proof Network Infrastructure',lead:'Future-Proof Your Network for the 5G Era',
  intro:"Elevate your network infrastructure with our advanced upgrades, ensuring you're ready for the demands of 5G and beyond. With top-tier technology from Nokia, Ericsson, Cisco, and Juniper Networks, we provide end-to-end solutions that prepare your business for the next generation of high-speed, high-capacity networking, enabling transformative applications and services.",
  offers:[["5G Readiness and High-Performance Networking","Harness the power of 5G with cutting-edge solutions from Nokia and Ericsson, complemented by Cisco and Juniper Networks' high-performance networking technologies."],
   ["SD-Access and SD-WAN with Cisco","SD-Access offers automated access control and policy enforcement, simplifying network management and enhancing security. Meanwhile, Cisco's SD-WAN technology optimizes cloud connectivity, improving application performance and user experience across distributed environments."]],
  partners:['Nokia','Ericsson','Cisco','Juniper Networks']},
 {icon:'ClipboardCheck',g:0,draft:true,title:'IT Infrastructure Audit',short:'infrastructure audit',alt:'Know Exactly What Your Infrastructure Needs',lead:'Independent Audits of Your Technology Infrastructure',
  intro:"We audit networks, servers, cloud environments and security controls to show you what is working, what is at risk and what to fix first, with clear findings and a prioritised action plan.",
  offers:[["Network & Infrastructure Assessment","Review of your topology, equipment, capacity and configuration to find bottlenecks, single points of failure and outdated components."],["Security & Compliance Review","Assessment of access control, firewalls, endpoints and policies against recognised good practice, with the gaps and risks clearly documented."],["Report & Remediation Roadmap","A plain-language report and prioritised plan, with UNETG available to carry out the fixes."]],
  partners:['Cisco','Juniper','Microsoft','VMware']},
 {icon:'Globe',g:1,draft:true,title:'Software, Website & App Development',short:'software & apps',alt:'Software Built for Your Business',lead:'From Idea to Launch',
  intro:"We design and build custom software, websites, web platforms, mobile apps and internal business tools, covering design, development, testing, launch, hosting and ongoing maintenance.",
  offers:[["Custom Software","Business applications built around your processes, from internal tools and management systems to integrations with the systems you already use."],["Websites & E-commerce","Fast, secure, mobile-friendly company websites and online stores, designed to match your brand and built to be easy to update."],["Web Platforms & Portals","Customer portals, booking systems and internal dashboards built on modern, secure frameworks."],["Mobile Applications","Native iOS and Android apps, or cross-platform builds with Flutter and React Native, published and maintained in the stores."],["Hosting, SEO & Maintenance","Domain, hosting and security updates, performance tuning and search optimisation after launch."]],
  partners:['Microsoft Azure','AWS','Google Cloud']},
 {icon:'BarChart3',g:1,draft:true,title:'Data & Analytics',short:'data & analytics',alt:'Decisions Backed by Data',lead:'Turn Operational Data into Insight',
  intro:"We build data pipelines, warehouses and dashboards that give leadership a reliable, current view of operations, finance and network performance.",
  offers:[["Data Engineering","Pipelines that collect and clean data from your systems, devices and network logs."],["Business Intelligence","Dashboards and scheduled reports in Power BI and Splunk, tailored to each team."],["Governance & Compliance","Access control, retention and quality rules that keep your data trustworthy."]],
  partners:['Microsoft','Splunk','AWS','Google Cloud']},
 {icon:'BrainCircuit',g:1,draft:true,title:'Artificial Intelligence',short:'AI',alt:'Practical AI for Business',lead:'AI That Fits Your Workflows',
  intro:"We help organisations adopt AI where it pays off: assistants trained on internal documents, process automation, forecasting and AI-driven network operations.",
  offers:[["AI Assistants","Secure assistants that answer staff and customer questions from your own knowledge base."],["Automation","Document processing, ticket triage and routine IT tasks handled automatically."],["AIOps for Networks","Predictive insights from platforms such as Juniper Mist and IBM Watson to prevent downtime."]],
  partners:['Microsoft','IBM Watson','Juniper Mist','Google Cloud']}
];
export const GROUPS = ['Networking & Infrastructure','Software, Data & AI'];
export const PROJECTS: Project[] = [
 {cat:'Security',title:'Bank branch firewall rollout',copy:'Next-generation firewalls and MFA deployed across a regional branch network.',loc:'Kinshasa, DRC',year:'2025'},
 {cat:'Wireless',title:'Campus Wi-Fi 6 upgrade',copy:'High-density wireless coverage for a university campus with cloud management.',loc:'Lubumbashi, DRC',year:'2025'},
 {cat:'Cloud',title:'Hybrid cloud migration',copy:'Workloads moved to Azure with SD-WAN links between head office and sites.',loc:'Cincinnati, USA',year:'2024'},
 {cat:'Monitoring',title:'24/7 network operations dashboard',copy:'Real-time monitoring and alerting for a logistics operator’s WAN.',loc:'Ohio, USA',year:'2024'},
 {cat:'Apps',title:'Field-service mobile app',copy:'Android and iOS app for technicians with offline job sheets and sync.',loc:'Goma, DRC',year:'2025'},
 {cat:'Data & AI',title:'Operations analytics platform',copy:'Data warehouse and dashboards with forecasting for an NGO programme.',loc:'Remote',year:'2026'}
];
export const JOBS: Job[] = [
 {title:'Senior Network Engineer',team:'Networking',loc:'Kinshasa, DRC',copy:'Design and deploy enterprise LAN/WAN, SD-WAN and security solutions for clients. CCNP or equivalent experience with Cisco, Juniper or Aruba preferred.'},
 {title:'Mobile Developer',team:'Apps',loc:'Remote · USA',copy:'Build and ship cross-platform mobile apps with Flutter or React Native, working closely with clients from scoping to release.'},
 {title:'Data Analyst',team:'Data & AI',loc:'Hybrid · USA / DRC',copy:'Build dashboards and data models that help clients understand operations and network performance.'},
 {title:'IT Support Technician',team:'Managed IT',loc:'Lubumbashi, DRC',copy:'Provide on-site and remote support, maintain client networks and help users across devices and services.'}
];
export type PageId = "home" | "services" | "projects" | "about" | "careers" | "contact";
export const PAGES: [PageId, string][] = [["home","Home"],["services","Services"],["projects","Projects"],["about","About"],["careers","Careers"],["contact","Contact"]];
export const PARTNERS = ['Cisco','Microsoft','Juniper','VMware','Deloitte','KPMG','Meraki','Aruba','HPE','SolarWinds','Splunk','IBM','AWS','Google Cloud','Nokia','Ericsson','Ubiquiti','Zoom','Cabinet Nyamugabo'];
export const OFFICES = [{ country: 'USA', phone: '+1 (513) 262-0639', tel: 'tel:+15132620639' }, { country: 'DRC', phone: '+243 988 777 258', tel: 'tel:+243988777258' }];
export const WHY = [
  { icon: 'Award', title: 'Expertise and Experience', copy: 'With years of experience and a team of certified professionals, we possess the expertise required to navigate the complexities of modern IT infrastructure. Our strategic partnerships with tech giants further enhance our ability to deliver cutting-edge solutions.' },
  { icon: 'Settings2', title: 'Tailored Solutions', copy: 'Recognizing that no two businesses are the same, we specialize in crafting customized solutions that align with your specific business goals, operational needs, and future aspirations.' },
  { icon: 'Rocket', title: 'Future-Ready Technology', copy: 'From advanced SD-WAN technologies to the latest in cybersecurity defenses, we ensure your business is equipped with the tools and technologies needed to stay ahead in a rapidly evolving digital landscape.' },
  { icon: 'LifeBuoy', title: 'Comprehensive Support', copy: 'Beyond implementation, we offer ongoing support, management, and consulting services to ensure your IT infrastructure continues to meet your business needs efficiently and effectively.' },
];
export const STEPS = [
  { num: '01', title: 'Consulting & Advisory', copy: 'We assess your current infrastructure and goals, then recommend the architecture and roadmap that fit.' },
  { num: '02', title: 'Design & Implementation', copy: 'Networks, cloud and software deployed with partner technologies and tested before handover.' },
  { num: '03', title: 'Training & Education', copy: 'Your team learns to operate and get the most from the systems we deliver.' },
  { num: '04', title: 'Support & Management', copy: 'Ongoing monitoring, maintenance and specialized services to keep everything performing.' },
];
export const QUOTES = [
  { text: 'UNETG redesigned our branch network and security in six weeks. Downtime is now the exception.', who: 'Client name, IT Director — placeholder' },
  { text: 'Their monitoring dashboards let us spot problems before our users do.', who: 'Client name, Operations Manager — placeholder' },
  { text: 'A partner that understands both the network and the business side.', who: 'Client name, CEO — placeholder' },
];

/** Image basenames in /public/images (`-sm` for mobile, `-md` otherwise), in the same order as SV and PROJECTS. */
export const SERVICE_IMG = ['cables', 'syslog', 'ciscosign', 'city', 'tablet', 'rack', 'meeting', 'coders', 'analytics', 'graph'];
export const PROJECT_IMG = ['rack', 'people', 'city', 'syslog', 'analytics', 'coders'];

export const TENGENEZA_STEPS = [
  { num: '01', title: 'Spot it', copy: 'See a pothole on your road and open the app.' },
  { num: '02', title: 'Report it', copy: 'Take a photo with your phone; the location is captured with it.' },
  { num: '03', title: 'AI confirms it', copy: 'An AI model detects the pothole in the image and confirms the report.' },
  { num: '04', title: 'Track it', copy: 'Follow the report until the road is repaired.' },
];

export const APPS_PITCH = [
  { icon: 'Globe', title: 'Websites', copy: 'Fast, secure, mobile-friendly websites and online stores that present your business well and are easy for your team to update.' },
  { icon: 'Smartphone', title: 'Mobile apps', copy: 'iOS and Android apps built around how your customers and staff actually work, launched in the stores and maintained after release.' },
  { icon: 'ClipboardCheck', title: 'Audit', copy: 'An independent review of your infrastructure and security, with a clear report and a prioritised plan, so you know what to fix first.' },
];
