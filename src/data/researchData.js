export const researchList = [
  {
    id: "robotics",
    title: "Engineering & Robotics",
    titleKh: "វិស្វកម្ម និងរ៉ូបូត",
    badge: "Automation & Industry 4.0",
    badgeKh: "ស្វ័យប្រវត្តិកម្ម & ឧស្សាហកម្ម ៤.០",
    tagline: "Advancing precision mechatronics, autonomous mobile robotics, and industrial automation in Cambodia.",
    taglineKh: "ជំរុញបច្ចេកវិទ្យាមេកាត្រូនិកកម្រិតខ្ពស់ មនុស្សយន្តស្វ័យប្រវត្ត និងស្វ័យប្រវត្តិកម្មឧស្សាហកម្មនៅកម្ពុជា។",
    headerBg: "bg-[#1b4b9b]",
    accentColor: "text-[#1b4b9b]",
    borderHover: "hover:border-[#1b4b9b]",
    image: "/research-robotics.jpg",
    iconName: "Cpu",
    stats: {
      activeProjects: "6 Projects",
      activeProjectsKh: "៦ គម្រោង",
      laboratories: "3 Dedicated Labs",
      laboratoriesKh: "៣ មន្ទីរពិសោធន៍",
      facultyResearchers: "12 Specialists",
      facultyResearchersKh: "១២ អ្នកឯកទេស",
      industryPartners: "8 Corporate Partners",
      industryPartnersKh: "៨ ដៃគូឧស្សាហកម្ម"
    },
    overview: "The Department of Engineering & Robotics Research at NPIT spearheads applied research in smart factory automation, autonomous mobile robots (AMRs), robotic arm manipulation, and artificial intelligence-driven machine vision. Our research teams collaborate directly with industrial manufacturers, logistics centers, and agricultural operations across Cambodia to deploy affordable, robust robotic solutions tailored for regional operational environments.",
    overviewKh: "ដេប៉ាតឺម៉ង់ស្រាវជ្រាវវិស្វកម្ម និងរ៉ូបូតនៅ NPIT ដឹកនាំការស្រាវជ្រាវអនុវត្តលើស្វ័យប្រវត្តិកម្មរោងចក្រឆ្លាតវៃ មនុស្សយន្តចល័តស្វ័យប្រវត្ត (AMRs) ប្រព័ន្ធដៃយន្តឧស្សាហកម្ម និងបច្ចេកវិទ្យាម៉ាស៊ីនមើលឃើញដំណើរការដោយបញ្ញាសិប្បនិម្មិត (AI Vision)។ ក្រុមស្រាវជ្រាវរបស់យើងសហការដោយផ្ទាល់ជាមួយរោងចក្រផលិត មជ្ឈមណ្ឌលភស្តុភារ និងកសិដ្ឋាន ដើម្បីដាក់ឱ្យប្រើប្រាស់នូវដំណោះស្រាយមនុស្សយន្តដែលមានប្រសិទ្ធភាព និងតម្លៃសមរម្យ។",
    leadResearcher: {
      name: "Dr. Chan Sokheng",
      nameKh: "បណ្ឌិត ចាន់ សុខហេង",
      title: "Head of Robotics & Mechatronics Research Laboratory",
      titleKh: "ប្រធានមន្ទីរពិសោធន៍ស្រាវជ្រាវមនុស្សយន្ត និងមេកាត្រូនិក",
      degrees: "Ph.D. in Robotics Engineering (Tokyo Institute of Technology)",
      email: "sokheng.chan@npit.edu.kh",
      office: "Engineering Innovation Building, Room 402"
    },
    keyFocusAreas: [
      {
        title: "Autonomous Mobile Robots (AMR)",
        titleKh: "មនុស្សយន្តចល័តស្វ័យប្រវត្ត (AMR)",
        desc: "LiDAR and visual SLAM navigation for industrial warehouse logistics and material handling in localized environments."
      },
      {
        title: "Industrial Robotic Manipulation",
        titleKh: "ដៃយន្តឧស្សាហកម្មពហុអ័ក្ស",
        desc: "Precision kinematic trajectory planning for 6-axis industrial robotic arms, high-precision soldering, and sorting."
      },
      {
        title: "Embedded AI & Edge Machine Vision",
        titleKh: "បញ្ញាសិប្បនិម្មិត Edge & Machine Vision",
        desc: "Real-time edge neural inference for automated surface defect detection in garment and electronic assembly lines."
      },
      {
        title: "Agri-Tech Unmanned Systems",
        titleKh: "ប្រព័ន្ធយានគ្មានមនុស្សបើកកសិកម្ម",
        desc: "Low-cost multispectral sensory aerial drones and automated soil sample collection rovers for sustainable farming."
      }
    ],
    projects: [
      {
        title: "Autonomous Guided Vehicle (AGV) for Factory Logistics",
        titleKh: "រថយន្តដឹកជញ្ជូនស្វ័យប្រវត្តក្នុងរោងចក្រឧស្សាហកម្ម (AGV)",
        status: "Active Deployment",
        statusKh: "កំពុងដាក់ឱ្យប្រើប្រាស់",
        duration: "2024 - 2026",
        sponsor: "Ministry of Industry, Science, Technology & Innovation (MISTI)",
        desc: "Developing a modular 250kg-payload autonomous transporter using ROS2, safety LiDAR arrays, and magnetic tape/visual hybrid navigation for Cambodian assembly factories.",
        deliverables: [
          "ROS2 navigation stack optimized for narrow warehouse aisles",
          "Automated battery docking and wireless fleet manager dispatch system",
          "3 active pilot vehicles operating in partner logistics centers"
        ]
      },
      {
        title: "4-Axis High-Precision Robotic Soldering & Sorting Station",
        titleKh: "ស្ថានីយដៃយន្តស្វ័យប្រវត្តសម្រាប់ផ្សារបន្ទះសៀគ្វី និងតម្រៀបគ្រឿងបង្គុំ ៤-អ័ក្ស",
        status: "Field Testing",
        statusKh: "កំពុងធ្វើតេស្តជាក់ស្តែង",
        duration: "2023 - 2025",
        sponsor: "Cambodia-Japan Technical Cooperation Agency",
        desc: "Custom high-speed delta and SCARA robot cell achieving ±0.03mm repeatability for electronic printed circuit board fabrication and automated visual inspection.",
        deliverables: [
          "Low-cost proprietary motion controller compatible with PLC Modbus TCP",
          "Defect recognition accuracy of 99.4% at 120 parts per minute",
          "Complete open-hardware schematics for technical training"
        ]
      },
      {
        title: "AI-Powered Vision Quality Inspection for Garment Assembly",
        titleKh: "ប្រព័ន្ធ AI ស្កេនពិនិត្យគុណភាពស្វ័យប្រវត្តសម្រាប់ឧស្សាហកម្មកាត់ដេរ",
        status: "Grant Funded",
        statusKh: "ទទួលបានមូលនិធិស្រាវជ្រាវ",
        duration: "2024 - 2026",
        sponsor: "National Science & Technology Development Fund",
        desc: "Deep learning convolutional models running on low-power edge accelerators to spot stitching anomalies, fabric tears, and color misalignment on live assembly conveyors.",
        deliverables: [
          "10,000+ localized garment defect image dataset annotated by industry QA inspectors",
          "Edge inference running under 25ms per garment item",
          "Plug-and-play retrofit unit for existing production lines"
        ]
      },
      {
        title: "Low-Cost Agricultural Drone for Multispectral Crop Health",
        titleKh: "ដ្រូនកសិកម្មតម្លៃសមរម្យសម្រាប់ត្រួតពិនិត្យសុខភាពដំណាំតាមរូបភាពពហុរលក",
        status: "Active",
        statusKh: "កំពុងដំណើរការ",
        duration: "2024 - 2025",
        sponsor: "NPIT Internal Innovation Fund",
        desc: "Lightweight quadcopter equipped with NDVI multispectral sensors providing Battambang paddy farmers with precise fertilizer maps and early pest infestation alerts.",
        deliverables: [
          "Open-source automated flight path planner for standard smartphones",
          "Farmer-friendly NDVI index map generator running offline",
          "Field validation on 150 hectares of paddy rice in Battambang province"
        ]
      }
    ],
    facilities: [
      {
        name: "Industrial Automation & Robotics Lab (Room 302)",
        nameKh: "មន្ទីរពិសោធន៍ស្វ័យប្រវត្តិកម្មឧស្សាហកម្ម និងរ៉ូបូត",
        desc: "Equipped with KUKA KR-6 6-axis articulated robot, FANUC LR Mate cell, Festo modular production system (MPS), and pneumatic test rigs."
      },
      {
        name: "Mechatronics Prototyping Workshop (Building B)",
        nameKh: "រោងជាងគំរូមេកាត្រូនិក និងម៉ាស៊ីន CNC",
        desc: "Features 5-axis CNC vertical machining center, high-precision fiber laser cutting machine, and resin/FDM 3D printing farm."
      },
      {
        name: "Autonomous Systems Test Field",
        nameKh: "ទីលានធ្វើតេស្តប្រព័ន្ធស្វ័យប្រវត្ត",
        desc: "1,200 sq. meter indoor test facility with variable ground friction, obstacle generation rigs, and optical motion capture tracking cameras."
      }
    ],
    publications: [
      {
        title: "Robust Obstacle Avoidance for Industrial AGVs in Dynamic Cambodian Warehouses",
        journal: "IEEE Transactions on Industrial Informatics, Vol. 21, Issue 4",
        year: "2025",
        authors: "Chan Sokheng, Meng Piseth, et al."
      },
      {
        title: "Edge-based Deep Convolutional Neural Network for High-Speed Fabric Inspection",
        journal: "Journal of Manufacturing Systems, Elsevier",
        year: "2024",
        authors: "Chan Sokheng, Chea Rathana"
      },
      {
        title: "Patent KH/2024/091: Low-Cost Hybrid Track Navigation for Agricultural Field Rovers",
        journal: "Ministry of Industry, Science, Technology & Innovation",
        year: "2024",
        authors: "NPIT Robotics Research Group"
      }
    ]
  },
  {
    id: "ict",
    title: "ICT & Digital Innovation",
    titleKh: "ព័ត៌មានវិទ្យា និងនវានុវត្តន៍ឌីជីថល",
    badge: "Cloud, AI & Cybersecurity",
    badgeKh: "Cloud, AI & សន្តិសុខសាយប័រ",
    tagline: "Empowering Cambodia's digital transformation with Khmer NLP, resilient cloud architectures, and cybersecurity defense.",
    taglineKh: "ជំរុញការផ្លាស់ប្តូរឌីជីថលកម្ពុជា ជាមួយភាសាវិទ្យាកុំព្យូទ័រខ្មែរ (NLP) ប្រព័ន្ធក្លោដ និងប្រព័ន្ធការពារសន្តិសុខសាយប័រ។",
    headerBg: "bg-[#0f2757]",
    accentColor: "text-[#0f2757]",
    borderHover: "hover:border-[#0f2757]",
    image: "/program-it.jpg",
    iconName: "Network",
    stats: {
      activeProjects: "7 Projects",
      activeProjectsKh: "៧ គម្រោង",
      laboratories: "2 Computing Centers",
      laboratoriesKh: "២ មជ្ឈមណ្ឌលកុំព្យូទ័រ",
      facultyResearchers: "16 Engineers",
      facultyResearchersKh: "១៦ វិស្វករ",
      industryPartners: "10 Tech Companies",
      industryPartnersKh: "១០ ក្រុមហ៊ុនបច្ចេកវិទ្យា"
    },
    overview: "The ICT & Digital Innovation Center at NPIT conducts pioneering research at the crossroads of artificial intelligence, high-performance computing, distributed ledger tech, and cybersecurity. Our mission is to accelerate national digital sovereignty through open datasets, specialized Khmer natural language processing models, and resilient digital infrastructure suitable for commercial, governmental, and civic platforms.",
    overviewKh: "មជ្ឈមណ្ឌលព័ត៌មានវិទ្យា និងនវានុវត្តន៍ឌីជីថលនៅ NPIT ដឹកនាំការស្រាវជ្រាវត្រួសត្រាយផ្លូវលើបញ្ញាសិប្បនិម្មិត (AI) ប្រព័ន្ធកុំព្យូទ័រសមត្ថភាពខ្ពស់ និងសន្តិសុខសាយប័រ។ បេសកកម្មរបស់យើងគឺជំរុញអធិបតេយ្យភាពឌីជីថលជាតិ តាមរយៈការបង្កើតទិន្នន័យបើកទូលាយ គំរូភាសាខ្មែរកុំព្យូទ័រ (Khmer NLP) និងហេដ្ឋារចនាសម្ព័ន្ធឌីជីថលដែលមានភាពធន់ខ្ពស់។",
    leadResearcher: {
      name: "Dr. Heng Vicheth",
      nameKh: "បណ្ឌិត ហេង វិចិត្រ",
      title: "Director of Digital Innovation & Artificial Intelligence Group",
      titleKh: "ប្រធានក្រុមស្រាវជ្រាវនវានុវត្តន៍ឌីជីថល និងបញ្ញាសិប្បនិម្មិត",
      degrees: "Ph.D. in Computer Science (KAIST, South Korea)",
      email: "vicheth.heng@npit.edu.kh",
      office: "ICT Center of Excellence, Floor 3"
    },
    keyFocusAreas: [
      {
        title: "Khmer Language Natural Language Processing (NLP)",
        titleKh: "បច្ចេកវិទ្យាដំណើរការភាសាខ្មែរ (Khmer NLP)",
        desc: "Transformer large language models, automated tokenizers, and phonetic speech-to-text synthesis for public service automation."
      },
      {
        title: "IoT Smart Campus & Environmental Sensing",
        titleKh: "ប្រព័ន្ធ IoT និងបរិវេណឆ្លាតវៃ",
        desc: "Distributed micro-controllers and LoRaWAN wireless sensor meshes collecting atmospheric data and energy consumption metrics."
      },
      {
        title: "Zero-Trust Architecture & Threat Intelligence",
        titleKh: "ស្ថាបត្យកម្ម Zero-Trust & ការពារសាយប័រ",
        desc: "Continuous identity verification, behavioral anomaly detection, and automated incident response for critical national infrastructure."
      },
      {
        title: "Predictive Big Data Analytics",
        titleKh: "ការវិភាគទិន្នន័យធំកម្រិតព្យាករណ៍",
        desc: "Time-series machine learning models forecasting solar energy output, water table levels, and traffic congestions."
      }
    ],
    projects: [
      {
        title: "Khmer Natural Language Processing (NLP) & Speech Engine",
        titleKh: "ម៉ាស៊ីនដំណើរការភាសាខ្មែរ (NLP) និងការបម្លែងសំឡេងជាអក្សរស្វ័យប្រវត្ត",
        status: "Active",
        statusKh: "កំពុងដំណើរការ",
        duration: "2023 - 2026",
        sponsor: "Cambodia Academy of Digital Technology (CADT) & NPIT",
        desc: "Open-source fine-tuned Transformer model achieving state-of-the-art tokenization and speech recognition accuracy across regional Khmer dialects.",
        deliverables: [
          "Public GitHub repository with 1.2M annotated Khmer sentence pairs",
          "Real-time speech-to-text API deployed for municipal record transcribing",
          "Voice transcription benchmark suite for Khmer educational lectures"
        ]
      },
      {
        title: "IoT Smart Campus Environmental & Energy Monitoring Grid",
        titleKh: "បណ្តាញ IoT សម្រាប់ត្រួតពិនិត្យបរិស្ថាន និងការប្រើប្រាស់ថាមពលក្នុងសាលាឆ្លាតវៃ",
        status: "Completed",
        statusKh: "បានបញ្ចប់ និងដាក់ឱ្យប្រើប្រាស់",
        duration: "2023 - 2024",
        sponsor: "NPIT Sustainable Infrastructure Initiative",
        desc: "Over 85 LoRaWAN wireless sensor nodes monitoring classroom air quality, solar generation, and water distribution, reducing campus peak energy draw by 18%.",
        deliverables: [
          "Interactive 3D digital twin dashboard displaying live telemetry",
          "Automated smart HVAC regulation based on student room occupancy",
          "Comprehensive API documentation for student programming projects"
        ]
      },
      {
        title: "Zero-Trust Cloud Network Defense & Threat Hunting Testbed",
        titleKh: "ប្រព័ន្ធការពារបណ្តាញក្លោដ Zero-Trust និងស្ថានីយពិសោធន៍ស្វែងរកការគំរាមកំហែងសាយប័រ",
        status: "Active Deployment",
        statusKh: "កំពុងដាក់ឱ្យប្រើប្រាស់",
        duration: "2024 - 2026",
        sponsor: "National Cyber Security Center Support Grant",
        desc: "An isolated cyber range designed to simulate advanced persistent threats (APTs), distributed denial-of-service, and credential harvesting against SCADA networks.",
        deliverables: [
          "Virtual cyber range capable of spinning up 50 isolated enterprise network nodes",
          "Automated blue team incident playbook with SIEM telemetry pipelines",
          "Annual cyber defense capture-the-flag training tournament platform"
        ]
      },
      {
        title: "Predictive Machine Learning for Renewable Power Distribution",
        titleKh: "ម៉ូដែល Machine Learning សម្រាប់ព្យាករណ៍ការចែកចាយថាមពលកកើតឡើងវិញ",
        status: "Grant Funded",
        statusKh: "ទទួលបានមូលនិធិស្រាវជ្រាវ",
        duration: "2024 - 2025",
        sponsor: "EDC (Electricite du Cambodge) Innovation Partnership",
        desc: "Hybrid LSTM-GRU neural networks forecasting 24-hour solar photovoltaic generation fluctuations to optimize municipal battery energy storage switching.",
        deliverables: [
          "Day-ahead solar irradiance and temperature forecasting model (MAPE < 4.2%)",
          "Automated battery charge/discharge scheduling algorithm",
          "Integration with local substation supervisory control interfaces"
        ]
      }
    ],
    facilities: [
      {
        name: "High-Performance AI & Cloud Computing Cluster (Server Room 301)",
        nameKh: "មជ្ឈមណ្ឌលកុំព្យូទ័រសមត្ថភាពខ្ពស់ AI & Cloud Cluster",
        desc: "Equipped with 4x NVIDIA A100 GPU nodes, 512GB ECC RAM per node, 100GbE InfiniBand interconnect, and 120TB redundant Ceph distributed storage."
      },
      {
        name: "Cyber Security Simulation Range & SOC Lab",
        nameKh: "បន្ទប់ពិសោធន៍សន្តិសុខសាយប័រ និង Security Operations Center (SOC)",
        desc: "24-seat dedicated cyber warfare arena featuring dual-isolated network rings, SIEM consoles, and hardware cryptoprocessor testing suites."
      },
      {
        name: "Software Innovation & Human-Computer Interaction Lab",
        nameKh: "មន្ទីរពិសោធន៍នវានុវត្តន៍សូហ្វវែរ និងអន្តរកម្មមនុស្ស-កុំព្យូទ័រ",
        desc: "Collaborative design space with eye-tracking usability stations, high-resolution prototyping screens, and cross-platform mobile testing rigs."
      }
    ],
    publications: [
      {
        title: "Transformer-based Dialect-Robust Speech Recognition for the Khmer Language",
        journal: "ACM Transactions on Asian and Low-Resource Language Information Processing",
        year: "2025",
        authors: "Heng Vicheth, Oung Sarun, et al."
      },
      {
        title: "Zero-Trust Threat Hunting in Industrial IoT Grids Utilizing Graph Neural Networks",
        journal: "IEEE Internet of Things Journal, Vol. 12",
        year: "2024",
        authors: "Heng Vicheth, Tep Sovann"
      },
      {
        title: "Energy Footprint Optimization in Campus Microgrids via Hybrid Deep Forecasting",
        journal: "Applied Energy, Elsevier",
        year: "2024",
        authors: "NPIT ICT & Clean Energy Working Group"
      }
    ]
  },
  {
    id: "applied-sciences",
    title: "Applied Sciences & Materials",
    titleKh: "វិទ្យាសាស្ត្រអនុវត្ត និងសម្ភារៈ",
    badge: "Advanced Materials & Environment",
    badgeKh: "សម្ភារៈទំនើប & បរិស្ថាន",
    tagline: "Developing sustainable green concrete, novel biomaterials, and industrial wastewater treatment solutions.",
    taglineKh: "អភិវឌ្ឍបេតុងបៃតងចីរភាព សម្ភារៈជីវសាស្រ្ត និងបច្ចេកវិទ្យាចម្រោះទឹកសំណល់ឧស្សាហកម្មកម្រិតខ្ពស់។",
    headerBg: "bg-[#b91c1c]",
    accentColor: "text-[#b91c1c]",
    borderHover: "hover:border-[#b91c1c]",
    image: "/news-mini2.jpg",
    iconName: "FlaskConical",
    stats: {
      activeProjects: "5 Projects",
      activeProjectsKh: "៥ គម្រោង",
      laboratories: "4 Chemical & Material Labs",
      laboratoriesKh: "៤ មន្ទីរពិសោធន៍គីមី-សម្ភារៈ",
      facultyResearchers: "14 Scientists",
      facultyResearchersKh: "១៤ អ្នកវិទ្យាសាស្ត្រ",
      industryPartners: "6 Manufacturing Partners",
      industryPartnersKh: "៦ ដៃគូផលិតកម្ម"
    },
    overview: "The Department of Applied Sciences & Material Engineering at NPIT addresses pressing environmental and infrastructural challenges by formulating eco-friendly construction materials, analyzing industrial chemical processes, and pioneering advanced water remediation technologies. We emphasize converting agricultural by-products into high-value engineered composites that decrease industrial carbon emissions.",
    overviewKh: "ដេប៉ាតឺម៉ង់វិទ្យាសាស្ត្រអនុវត្ត និងវិស្វកម្មសម្ភារៈនៅ NPIT ដោះស្រាយបញ្ហាប្រឈមបរិស្ថាន និងហេដ្ឋារចនាសម្ព័ន្ធ តាមរយៈការបង្កើតសម្ភារៈសំណង់ដែលមិនប៉ះពាល់ដល់បរិស្ថាន ការវិភាគដំណើរការគីមីឧស្សាហកម្ម និងការចម្រោះទឹកកខ្វក់កម្រិតខ្ពស់។ យើងផ្តោតលើការកែច្នៃកាកសំណល់កសិកម្មឱ្យទៅជាសម្ភារៈសំណង់មានតម្លៃខ្ពស់ ដើម្បីកាត់បន្ថយការបំភាយឧស្ម័នកាបូន។",
    leadResearcher: {
      name: "Dr. Mao Kolap",
      nameKh: "បណ្ឌិត ម៉ៅ កូឡាប",
      title: "Lead Chemist & Materials Engineering Division Chair",
      titleKh: "ប្រធានផ្នែកវិស្វកម្មសម្ភារៈ និងគីមីវិទ្យាអនុវត្ត",
      degrees: "Ph.D. in Materials Science (Chulalongkorn University / Univ. of Melbourne)",
      email: "kolap.mao@npit.edu.kh",
      office: "Science & Engineering Complex, Lab 208"
    },
    keyFocusAreas: [
      {
        title: "Bio-Based Geopolymer Construction Materials",
        titleKh: "បេតុង Geopolymer កែច្នៃពីកាកសំណល់កសិកម្ម",
        desc: "Replacing Portland cement with activated rice husk ash and blast furnace slag to lower structural carbon footprints by 45%."
      },
      {
        title: "Industrial Wastewater Membrane Filtration",
        titleKh: "បច្ចេកវិទ្យាចម្រោះទឹកសំណល់ឧស្សាហកម្ម",
        desc: "Nanofiber membrane synthesis removing heavy metal ions, chemical dyes, and toxic solvents from textile factory discharges."
      },
      {
        title: "High-Temperature Thermal Degradation Testing",
        titleKh: "ការធ្វើតេស្តភាពធន់នឹងកម្តៅ និងការច្រែះ",
        desc: "Characterizing polymer composite aging, corrosion mechanics, and thermal conductivity in tropical humid environments."
      },
      {
        title: "Circular Economy Bio-Composites",
        titleKh: "សម្ភារៈជីវសាស្រ្តសេដ្ឋកិច្ចវិលជុំ",
        desc: "Reinforcing recycled plastics with local bamboo and banana stem fibers for durable consumer furniture and packaging."
      }
    ],
    projects: [
      {
        title: "Bio-Based Geopolymer Concrete Utilizing Rice Husk Ash",
        titleKh: "បេតុង Geopolymer ចីរភាពទាញយកផលពីផេះកន្ទក់ និងអង្កាម",
        status: "Active Deployment",
        statusKh: "កំពុងដាក់ឱ្យប្រើប្រាស់",
        duration: "2023 - 2026",
        sponsor: "Ministry of Environment & Battambang Cement Consortium",
        desc: "Formulating high-early-strength geopolymer concrete reaching 42 MPa compressive strength at 28 days without requiring standard carbon-intensive Portland cement.",
        deliverables: [
          "Standardized mix design guidelines adopted by 2 provincial ready-mix suppliers",
          "Life Cycle Assessment (LCA) verifying 44% net carbon reduction",
          "Test walkway and drainage culvert installed on campus for long-term monitoring"
        ]
      },
      {
        title: "Industrial Wastewater Heavy-Metal Membrane Filtration",
        titleKh: "ប្រព័ន្ធចម្រោះទឹកសំណល់ឧស្សាហកម្មកាត់ដេរកម្ចាត់លោហៈធ្ងន់",
        status: "Field Testing",
        statusKh: "កំពុងធ្វើតេស្តជាក់ស្តែង",
        duration: "2024 - 2025",
        sponsor: "United Nations Industrial Development Organization (UNIDO) Grant",
        desc: "Synthesizing electrospun polyacrylonitrile/chitosan nanofiber membranes capable of extracting 99.2% of copper, chromium, and synthetic azo dyes from effluent streams.",
        deliverables: [
          "Continuous 500-liter/day pilot filtration skid operational at partner textile mill",
          "Regenerable sorbent cartridges with over 30 reusable cycles before replacement",
          "Real-time spectrophotometric water quality monitoring probe"
        ]
      },
      {
        title: "Smart Lithium-Ion Battery Thermal Degradation Profiling",
        titleKh: "ការវិភាគការធ្លាក់ចុះសមត្ថភាព និងកម្តៅនៃថ្ម Lithium-Ion ក្នុងអាកាសធាតុក្តៅ",
        status: "Active",
        statusKh: "កំពុងដំណើរការ",
        duration: "2024 - 2026",
        sponsor: "NPIT Center for Clean Energy & Materials",
        desc: "Examining solid electrolyte interphase (SEI) layer breakdown and capacity fade in commercial LFP/NMC cells under ambient Cambodian temperatures (35°C–42°C).",
        deliverables: [
          "Accelerated thermal aging dataset across 1,200 charge-discharge cycles",
          "Optimized active liquid cooling manifold design for electric motorbikes",
          "Battery management system (BMS) thermal protection firmware update"
        ]
      },
      {
        title: "Bamboo-Fiber Reinforced Recycled Polymer Composites",
        titleKh: "សម្ភារៈសមាសធាតុប្លាស្ទិកកែច្នៃពង្រឹងដោយសរសៃឫស្សីធម្មជាតិ",
        status: "Grant Funded",
        statusKh: "ទទួលបានមូលនិធិស្រាវជ្រាវ",
        duration: "2024 - 2025",
        sponsor: "National Green Growth Initiative",
        desc: "Developing structural decking panels made from recycled HDPE waste plastic and alkali-treated Cambodian giant bamboo fibers.",
        deliverables: [
          "Tensile strength matching commercial timber decking (>38 MPa)",
          "Termite and fungal resistance certification under humid conditions",
          "Demonstration benches placed across NPIT botanical gardens"
        ]
      }
    ],
    facilities: [
      {
        name: "Advanced Materials Characterization Center (Room 214)",
        nameKh: "មជ្ឈមណ្ឌលវិភាគ និងពិសោធន៍លក្ខណៈសម្ភារៈ",
        desc: "Equipped with Scanning Electron Microscope (SEM), Fourier Transform Infrared Spectrometer (FTIR), and X-Ray Diffraction (XRD) analyzers."
      },
      {
        name: "Concrete & Geotechnical Mechanics Laboratory (Lab 105)",
        nameKh: "មន្ទីរពិសោធន៍បេតុង និងមេកានិចដី",
        desc: "Includes 2,000 kN computerized compression testing machine, concrete core drilling rigs, aggregate sieve shakers, and curing humidity chambers."
      },
      {
        name: "Environmental Chemistry & Water Testing Facility (Lab 208)",
        nameKh: "មន្ទីរពិសោធន៍គីមីបរិស្ថាន និងការវិភាគគុណភាពទឹក",
        desc: "Features Inductively Coupled Plasma Optical Emission Spectrometry (ICP-OES), gas chromatography-mass spectrometry (GC-MS), and automated titrators."
      }
    ],
    publications: [
      {
        title: "Synthesis and Mechanical Evaluation of Agricultural Rice Husk Ash-based Geopolymer",
        journal: "Construction and Building Materials, Elsevier",
        year: "2025",
        authors: "Mao Kolap, Veng Samnang, et al."
      },
      {
        title: "Electrospun Chitosan-Functionalized Nanofibers for Efficient Azo Dye Remediation",
        journal: "Journal of Hazardous Materials, Vol. 468",
        year: "2024",
        authors: "Mao Kolap, Sin Sreyneath"
      },
      {
        title: "Degradation Kinetics of Commercial LiFePO4 Cells in Tropical High-Ambient Climates",
        journal: "Journal of Power Sources, Elsevier",
        year: "2024",
        authors: "NPIT Applied Sciences & Energy Team"
      }
    ]
  },
  {
    id: "energy",
    title: "Renewable Energy & Smart Grids",
    titleKh: "ថាមពលកកើតឡើងវិញ និង Smart Grids",
    badge: "Clean Energy & Storage",
    badgeKh: "ថាមពលបៃតង & ការផ្ទុកថាមពល",
    tagline: "Optimizing photovoltaic solar systems, micro-grid dispatch, and industrial energy efficiency across Cambodia.",
    taglineKh: "បង្កើនប្រសិទ្ធភាពប្រព័ន្ធថាមពលសូឡាពន្លឺព្រះអាទិត្យ បណ្តាញអគ្គិសនីឆ្លាតវៃ និងការគ្រប់គ្រងថាមពលឧស្សាហកម្ម។",
    headerBg: "bg-[#d97706]",
    accentColor: "text-[#d97706]",
    borderHover: "hover:border-[#d97706]",
    image: "/about-students.jpg",
    iconName: "SunMedium",
    stats: {
      activeProjects: "4 Projects",
      activeProjectsKh: "៤ គម្រោង",
      laboratories: "2 Clean Energy Testbeds",
      laboratoriesKh: "២ ស្ថានីយពិសោធន៍ថាមពល",
      facultyResearchers: "10 Engineers",
      facultyResearchersKh: "១០ វិស្វករ",
      industryPartners: "7 Energy Developers",
      industryPartnersKh: "៧ ក្រុមហ៊ុនថាមពល"
    },
    overview: "The Renewable Energy & Smart Grids Research Group at NPIT focuses on maximizing solar photovoltaic efficiency in hot humid climates, microgrid power stability, energy storage solutions, and distributed supervisory automation. As Cambodia accelerates toward its clean energy transition goals, our engineering researchers provide verified technical models, field audits, and high-performance inverter topologies to ensure national energy independence and grid stability.",
    overviewKh: "ក្រុមស្រាវជ្រាវថាមពលកកើតឡើងវិញ និង Smart Grids នៅ NPIT ផ្តោតលើការបង្កើនប្រសិទ្ធភាពបន្ទះសូឡាពន្លឺព្រះអាទិត្យក្នុងអាកាសធាតុក្តៅសើម ស្ថិរភាពបណ្តាញអគ្គិសនីតូចៗ (Microgrids) ប្រព័ន្ធផ្ទុកថាមពលថ្ម និងស្វ័យប្រវត្តិកម្មចែកចាយ។ យើងផ្តល់នូវការធ្វើតេស្តបច្ចេកទេស ការធ្វើសវនកម្មថាមពលរោងចក្រ និងការរចនាប្រព័ន្ធអាំងវែរទ័រដើម្បីគាំទ្រដល់ការអភិវឌ្ឍប្រកបដោយចីរភាព។",
    leadResearcher: {
      name: "Eng. Keo Munyrith",
      nameKh: "វិស្វករ កែវ មុនីរិទ្ធ",
      title: "Head of Clean Energy Systems & Microgrid Testbed",
      titleKh: "ប្រធានប្រព័ន្ធថាមពលស្អាត និងស្ថានីយពិសោធន៍ Microgrid",
      degrees: "M.Eng. in Power Engineering (Asian Institute of Technology, Thailand)",
      email: "munyrith.keo@npit.edu.kh",
      office: "Electrical Innovation Hall, Room 108"
    },
    keyFocusAreas: [
      {
        title: "Bifacial Solar Photovoltaic Yield Modeling",
        titleKh: "គំរូទិន្នផលសូឡាពន្លឺព្រះអាទិត្យ Bifacial",
        desc: "Evaluating ground albedo reflectivity gains, dust soiling degradation, and passive thermal cooling configurations."
      },
      {
        title: "Hybrid Islanded Microgrid Stability",
        titleKh: "ស្ថិរភាពបណ្តាញអគ្គិសនីដាច់ដោយឡែក (Microgrids)",
        desc: "Droop control algorithms synchronizing diesel backup generators, solar PV inverters, and battery storage without frequency collapse."
      },
      {
        title: "Industrial Energy Audits & Power Factor Correction",
        titleKh: "សវនកម្មថាមពលឧស្សាហកម្ម និង Power Factor",
        desc: "Harmonic distortion mitigation, reactive power compensation, and sub-metering telemetry for heavy industrial consumers."
      },
      {
        title: "Automated Solar Panel Maintenance Systems",
        titleKh: "ប្រព័ន្ធស្វ័យប្រវត្តសម្រាប់ថែទាំ និងសម្អាតបន្ទះសូឡា",
        desc: "Waterless robotic brush systems removing particulate dust accumulation to maintain peak solar conversion efficiency."
      }
    ],
    projects: [
      {
        title: "40 kW Rooftop Solar & Battery Microgrid Testbed",
        titleKh: "ស្ថានីយពិសោធន៍សូឡាលើដំបូល ៤០ kW និងប្រព័ន្ធផ្ទុកថាមពលថ្ម",
        status: "Active Deployment",
        statusKh: "កំពុងដាក់ឱ្យប្រើប្រាស់",
        duration: "2023 - 2026",
        sponsor: "German International Cooperation (GIZ) & NPIT",
        desc: "Full-scale educational and operational grid-tied solar array supplying clean energy to NPIT engineering buildings while continuously capturing meteorological and power quality data.",
        deliverables: [
          "Open telemetry API streaming live solar irradiance, cell temperatures, and AC power output",
          "Battery energy storage unit mitigating campus peak demand charges by 22%",
          "Hands-on training facility for undergraduate and technician certifications"
        ]
      },
      {
        title: "Automated Waterless Robotic Solar Panel Cleaner",
        titleKh: "មនុស្សយន្តស្វ័យប្រវត្តសម្អាតបន្ទះសូឡាដោយមិនប្រើទឹក",
        status: "Field Testing",
        statusKh: "កំពុងធ្វើតេស្តជាក់ស្តែង",
        duration: "2024 - 2025",
        sponsor: "Cambodia Clean Energy Challenge Fund",
        desc: "Autonomous crawling robot equipped with microfiber rollers and electrostatic dust repellers designed specifically for agricultural utility-scale solar farms.",
        deliverables: [
          "Recovers 8.5% to 14% of power lost to dry-season dust soiling",
          "Zero water consumption, safeguarding precious agricultural water supplies",
          "Automatic weather-triggered nocturnal dispatch cycle"
        ]
      },
      {
        title: "Microgrid Dispatch Algorithms for Rural Communes",
        titleKh: "ក្បួនដោះស្រាយការបញ្ជូនថាមពល Microgrid សម្រាប់សហគមន៍ជនបទ",
        status: "Active",
        statusKh: "កំពុងដំណើរការ",
        duration: "2024 - 2026",
        sponsor: "Electricity Authority of Cambodia (EAC) Joint Project",
        desc: "Developing self-healing microgrid controllers for remote villages lacking national grid interconnection, integrating mini-hydro, solar, and biomass generation.",
        deliverables: [
          "Low-cost controller hardware based on open-source industrial compute modules",
          "Fault-isolation software maintaining critical medical clinics online during line drops",
          "Pilot deployment in 2 remote rural communities in Battambang province"
        ]
      }
    ],
    facilities: [
      {
        name: "Campus Solar Photovoltaic Outdoor Testbed",
        nameKh: "ស្ថានីយពិសោធន៍ថាមពលពន្លឺព្រះអាទិត្យក្រៅអគារ",
        desc: "Features 120 monocrystalline, polycrystalline, and bifacial solar modules with calibrated pyranometers and weather monitoring instruments."
      },
      {
        name: "Power Systems Simulation & Protection Lab (Room 110)",
        nameKh: "មន្ទីរពិសោធន៍ត្រាប់តាមប្រព័ន្ធអគ្គិសនីកម្លាំងខ្លាំង និងការការពារ",
        desc: "Equipped with real-time digital simulators (RTDS), SEL digital protective relays, and high-precision programmable AC/DC power sources."
      }
    ],
    publications: [
      {
        title: "Evaluation of Dust Soiling Mitigation on Utility Photovoltaic Plants in Tropical Cambodia",
        journal: "Solar Energy Journal, Elsevier",
        year: "2025",
        authors: "Keo Munyrith, Hem Samnang, et al."
      },
      {
        title: "Decentralized Secondary Frequency Control in Inverter-Dominated Islanded Microgrids",
        journal: "IEEE Power and Energy Technology Systems Journal",
        year: "2024",
        authors: "Keo Munyrith, Chea Sovanna"
      }
    ]
  },
  {
    id: "centers-labs",
    title: "Research Centers & Fabrication Labs",
    titleKh: "មជ្ឈមណ្ឌលស្រាវជ្រាវ និងមន្ទីរពិសោធន៍",
    badge: "Advanced Facilities & Testbeds",
    badgeKh: "ហេដ្ឋារចនាសម្ព័ន្ធ & ស្ថានីយពិសោធន៍",
    tagline: "State-of-the-art specialized laboratories, 5-axis CNC machining, additive manufacturing, and high-voltage test bays.",
    taglineKh: "មន្ទីរពិសោធន៍ទំនើបស្តង់ដារអន្តរជាតិ ម៉ាស៊ីន CNC ៥-អ័ក្ស បច្ចេកវិទ្យាបោះពុម្ព 3D និងស្ថានីយពិសោធន៍អគ្គិសនីកម្លាំងខ្លាំង។",
    headerBg: "bg-[#1b4b9b]",
    accentColor: "text-[#1b4b9b]",
    borderHover: "hover:border-[#1b4b9b]",
    image: "/about-students.jpg",
    iconName: "Building2",
    stats: {
      activeProjects: "18 Laboratories",
      activeProjectsKh: "១៨ មន្ទីរពិសោធន៍",
      laboratories: "2,400 m² Floor Space",
      laboratoriesKh: "២,៤០០ ម² ផ្ទៃក្រឡា",
      facultyResearchers: "35 Lab Specialists",
      facultyResearchersKh: "៣៥ អ្នកឯកទេសប្រចាំការ",
      industryPartners: "20+ Corporate Users",
      industryPartnersKh: "២០+ ដៃគូឧស្សាហកម្ម"
    },
    overview: "NPIT's Research Centers & Fabrication Labs provide faculty, undergraduate researchers, and industrial enterprise clients with high-end machinery and diagnostic instrumentation. From rapid mechanical prototyping with industrial 5-axis CNC vertical milling to electronic circuit board pick-and-place prototyping and materials stress testing, our laboratories enable seamless progression from CAD concept to validated physical product.",
    overviewKh: "មជ្ឈមណ្ឌលស្រាវជ្រាវ និងរោងជាងគំរូរបស់ NPIT ផ្តល់ជូនសាស្ត្រាចារ្យ និស្សិតស្រាវជ្រាវ និងដៃគូឧស្សាហកម្មនូវគ្រឿងម៉ាស៊ីន និងឧបករណ៍វិនិច្ឆ័យកម្រិតខ្ពស់។ ចាប់ពីការបង្កើតគំរូមេកានិចរហ័សដោយម៉ាស៊ីន CNC ៥-អ័ក្ស រហូតដល់ការផលិតបន្ទះសៀគ្វីអេឡិចត្រូនិច និងការធ្វើតេស្តកម្លាំងសម្ភារៈ មន្ទីរពិសោធន៍របស់យើងជួយជំរុញការអភិវឌ្ឍគំនិតឱ្យក្លាយជាផលិតផលជាក់ស្តែង។",
    leadResearcher: {
      name: "Eng. Bun Sereyvath",
      nameKh: "វិស្វករ ប៊ុន សេរីវឌ្ឍន៍",
      title: "Chief of Central Laboratories & Prototyping Infrastructure",
      titleKh: "ប្រធានគ្រប់គ្រងមន្ទីរពិសោធន៍កណ្តាល និងរោងជាងគំរូ",
      degrees: "M.Sc. in Precision Manufacturing (National University of Singapore)",
      email: "sereyvath.bun@npit.edu.kh",
      office: "Engineering Center of Excellence, Central Lab Office"
    },
    keyFocusAreas: [
      {
        title: "Subtractive & Additive Rapid Prototyping",
        titleKh: "ការផលិតគំរូរហ័ស CNC និង 3D Printing",
        desc: "High-precision CAD/CAM toolpaths, 5-axis vertical machining, waterjet profiling, and composite additive manufacturing."
      },
      {
        title: "Surface Metrology & Coordinate Measurement",
        titleKh: "ការវាស់វែងកម្រិតភាពជាក់លាក់ និងមាត្រវិទ្យា",
        desc: "Optoelectronic coordinate measuring machines (CMM) verifying micron-scale geometric dimensioning and tolerancing (GD&T)."
      },
      {
        title: "High-Voltage & Power Electronics Isolation",
        titleKh: "ការធ្វើតេស្តអគ្គិសនីកម្លាំងខ្លាំង និងសុវត្ថិភាព",
        desc: "Dielectric insulation testing up to 50 kV, surge impulse withstand validation, and EMC emissions scanning."
      },
      {
        title: "Industrial Metrology Calibration Services",
        titleKh: "សេវាបញ្ជាក់ និងក្រិតខ្នាតឧបករណ៍ឧស្សាហកម្ម",
        desc: "ISO/IEC 17025 compliant calibration of thermal, pressure, torque, and electrical instrumentation for provincial factories."
      }
    ],
    projects: [
      {
        title: "Mechatronics Prototyping Laboratory (Room 304)",
        titleKh: "មន្ទីរពិសោធន៍ផលិតគំរូមេកាត្រូនិក (បន្ទប់ ៣០៤)",
        status: "Active Deployment",
        statusKh: "កំពុងដំណើរការពេញលេញ",
        duration: "Established 2023",
        sponsor: "Royal Government Infrastructure Quota",
        desc: "Equipped with DMG MORI 5-axis vertical machining center, surface grinder, wire EDM, and dedicated vacuum degassing casting machines for rapid mold making.",
        deliverables: [
          "Rapid turnaround prototyping service for provincial enterprises",
          "Hands-on vocational training for over 350 engineering students annually",
          "Production of custom replacement parts for regional processing mills"
        ]
      },
      {
        title: "IoT & Smart Sensor Research Testbed (Building B)",
        titleKh: "ស្ថានីយស្រាវជ្រាវប្រព័ន្ធ IoT និងឧបករណ៍ចាប់សញ្ញាឆ្លាតវៃ (អគារ B)",
        status: "Active Deployment",
        statusKh: "កំពុងដំណើរការពេញលេញ",
        duration: "Established 2024",
        sponsor: "Telecommunications & Digital Development Fund",
        desc: "Cleanroom assembly stations with automated pick-and-place SMT lines, reflow ovens, and RF spectrum analyzers for custom hardware development.",
        deliverables: [
          "Turnkey custom PCB assembly for student capstone and research projects",
          "FCC/CE compliant pre-certification electromagnetic emissions testing",
          "Sensory sensor calibration benches for agricultural telemetry"
        ]
      },
      {
        title: "Civil Material Structural Mechanics Testing Facility",
        titleKh: "មន្ទីរពិសោធន៍មេកានិចរចនាសម្ព័ន្ធ និងសម្ភារៈសំណង់",
        status: "Active Deployment",
        statusKh: "កំពុងដំណើរការពេញលេញ",
        duration: "Established 2023",
        sponsor: "Ministry of Public Works and Transport",
        desc: "Reinforced reaction floor with hydraulic servo-actuators capable of dynamic cyclic loading tests on bridge girders, rebar, and composite beams.",
        deliverables: [
          "Official structural testing reports for regional civil engineering projects",
          "Tensile, shear, and fatigue assessment of welded structural steel",
          "Testing of earthquake and flood-resilient retaining foundation blocks"
        ]
      }
    ],
    facilities: [
      {
        name: "Central CNC Machining Center (Engineering Hall)",
        nameKh: "មជ្ឈមណ្ឌលម៉ាស៊ីន CNC កណ្តាល",
        desc: "DMG MORI CMX 600V vertical milling machine, Haas CNC lathe, and CNC plasma cutter."
      },
      {
        name: "Rapid 3D Additive Manufacturing Farm",
        nameKh: "រោងជាងបោះពុម្ព 3D បច្ចេកវិទ្យាទំនើប",
        desc: "12 industrial-grade FDM printers, stereolithography (SLA) resin printers, and continuous carbon-fiber reinforcement printer."
      },
      {
        name: "High-Voltage Electrical Safety & Testing Bay",
        nameKh: "ស្ថានីយធ្វើតេស្តសុវត្ថិភាពអគ្គិសនីកម្លាំងខ្លាំង",
        desc: "50 kV AC/DC dielectric withstand test transformer, ground resistance earth testers, and thermal imaging cameras."
      }
    ],
    publications: [
      {
        title: "Precision Optimization in CNC Toolpath Generation for Locally Sourced Alloys",
        journal: "International Journal of Advanced Manufacturing Technology",
        year: "2024",
        authors: "Bun Sereyvath, Chan Sokheng"
      },
      {
        title: "Calibration Protocols for High-Precision Pressure Transducers in Agro-Processing",
        journal: "Measurement Science and Technology",
        year: "2023",
        authors: "NPIT Metrology Calibration Team"
      }
    ]
  },
  {
    id: "publications-grants",
    title: "Publications, Patents & National Grants",
    titleKh: "ការបោះពុម្ពផ្សាយ មូលនិធិ និងប៉ាតង់",
    badge: "Academic Impact & IP",
    badgeKh: "ឥទ្ធិពលសិក្សាស្រាវជ្រាវ & កម្មសិទ្ធិបញ្ញា",
    tagline: "Empowering faculty research output, Scopus-indexed publications, international conference proceedings, and technological patents.",
    taglineKh: "លើកកម្ពស់ស្នាដៃស្រាវជ្រាវសាស្ត្រាចារ្យ ការបោះពុម្ពផ្សាយក្នុងទិនានុប្បវត្តិ Scopus និងការចុះបញ្ជីកម្មសិទ្ធិបញ្ញាប៉ាតង់ជាតិ។",
    headerBg: "bg-[#0f2757]",
    accentColor: "text-[#0f2757]",
    borderHover: "hover:border-[#0f2757]",
    image: "/news-conference.jpg",
    iconName: "FileText",
    stats: {
      activeProjects: "45+ Papers",
      activeProjectsKh: "៤៥+ អត្ថបទស្រាវជ្រាវ",
      laboratories: "4 Granted Patents",
      laboratoriesKh: "៤ ប៉ាតង់បានអនុម័ត",
      facultyResearchers: "$420K Total Grants",
      facultyResearchersKh: "ថវិកាមូលនិធិ ៤២ម៉ឺនដុល្លារ",
      industryPartners: "14 External Grants",
      industryPartnersKh: "១៤ មូលនិធិគាំទ្រ"
    },
    overview: "The Research Management & Intellectual Property Office at NPIT oversees all institutional research grants, peer-reviewed publication subsidies, ethics clearances, and patent filings. Through competitive internal grants and strategic partnerships with national ministries and international development organizations, NPIT nurtures an active research culture where academic discoveries directly translate into economic development.",
    overviewKh: "ការិយាល័យគ្រប់គ្រងការស្រាវជ្រាវ និងកម្មសិទ្ធិបញ្ញានៅ NPIT ទទួលបន្ទុកគ្រប់គ្រងមូលនិធិស្រាវជ្រាវ ការឧបត្ថម្ភការបោះពុម្ពផ្សាយកម្រិតអន្តរជាតិ ការត្រួតពិនិត្យក្រមសីលធម៌ និងការចុះបញ្ជីប៉ាតង់។ តាមរយៈកិច្ចសហការជាមួយក្រសួងស្ថាប័នជាតិ និងដៃគូអន្តរជាតិ យើងជំរុញឱ្យការរកឃើញបែបវិទ្យាសាស្ត្របម្លែងទៅជាការអភិវឌ្ឍសេដ្ឋកិច្ចជាក់ស្តែង។",
    leadResearcher: {
      name: "Prof. Dr. Ouk Nareth",
      nameKh: "សាស្ត្រាចារ្យ បណ្ឌិត អ៊ុក ណារ៉េត",
      title: "Dean of Research & Academic Affairs",
      titleKh: "ព្រឹទ្ធបុរសរងទទួលបន្ទុកការស្រាវជ្រាវ និងកិច្ចការសិក្សា",
      degrees: "Ph.D. in Engineering Management (Nanyang Technological University, Singapore)",
      email: "nareth.ouk@npit.edu.kh",
      office: "Rectorate Building, Research Directorate Office"
    },
    keyFocusAreas: [
      {
        title: "Peer-Reviewed Journal Publishing Assistance",
        titleKh: "ការគាំទ្រការបោះពុម្ពផ្សាយក្នុងទិនានុប្បវត្តិអន្តរជាតិ",
        desc: "Full institutional financial support for Scopus Q1/Q2 open-access article processing charges (APCs) and manuscript editing."
      },
      {
        title: "Intellectual Property & National Patent Registration",
        titleKh: "ការចុះបញ្ជីកម្មសិទ្ធិបញ្ញា និងប៉ាតង់ជាតិ",
        desc: "Legal patent attorney counsel, invention disclosures, prior-art searches, and commercial licensing management."
      },
      {
        title: "National & International Grant Application Support",
        titleKh: "ការរៀបចំសំណើគម្រោងដេញថ្លៃមូលនិធិស្រាវជ្រាវ",
        desc: "Dedicated proposal writing workshops, budget administration, multi-institutional consortia formation, and compliance audits."
      },
      {
        title: "Annual Polytechnic Innovation Symposium",
        titleKh: "សន្និសីទវិទ្យាសាស្ត្រ និងនវានុវត្តន៍ពហុបច្ចេកទេសប្រចាំឆ្នាំ",
        desc: "Host of the prestigious annual conference gathering over 400 national researchers, student inventors, and industry leaders."
      }
    ],
    projects: [
      {
        title: "National Science & Technology Development Fund Grant (#KH-2024-812)",
        titleKh: "មូលនិធិអភិវឌ្ឍន៍វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យាជាតិ (#KH-2024-812)",
        status: "Active",
        statusKh: "កំពុងដំណើរការ",
        duration: "2024 - 2026",
        sponsor: "Ministry of Industry, Science, Technology & Innovation",
        desc: "Awarded $85,000 for advancing local fabrication of agro-industrial robotics and continuous defect scanning for garment factories.",
        deliverables: [
          "Biannual milestone compliance reports verified by external scientific peer panel",
          "Support for 4 Master-level thesis candidates and 8 undergraduate capstone interns",
          "Public technical demonstrator exhibition at Cambodia Tech Expo"
        ]
      },
      {
        title: "Patent: Automated Solar Panel Dust Cleaning Mechanism (Reg #KH-PT-2024-018)",
        titleKh: "ប៉ាតង់៖ យន្តការស្វ័យប្រវត្តសម្អាតធូលីបន្ទះសូឡា (ចុះបញ្ជីលេខ #KH-PT-2024-018)",
        status: "Grant Funded",
        statusKh: "ទទួលបានប៉ាតង់ផ្លូវការ",
        duration: "Granted May 2024",
        sponsor: "Department of Industrial Property, Cambodia",
        desc: "Official 20-year exclusive utility patent covering the unique lightweight climbing track and waterless electrostatic brush design developed at NPIT.",
        deliverables: [
          "Official patent certificate and gazette publication documentation",
          "Commercial licensing agreement currently in negotiation with local solar EPC firm",
          "Royalty distribution framework benefiting student co-inventors"
        ]
      },
      {
        title: "IEEE Transactions on Industrial Informatics Publication Sponsorship",
        titleKh: "ការឧបត្ថម្ភការបោះពុម្ពផ្សាយក្នុងទិនានុប្បវត្តិ IEEE",
        status: "Completed",
        statusKh: "បានបោះពុម្ពផ្សាយជោគជ័យ",
        duration: "Published 2025",
        sponsor: "NPIT High-Impact Publication Reward Scheme",
        desc: "Full open-access sponsorship and institutional incentive bonus awarded to faculty authors for their breakthrough paper on factory autonomous guided vehicles.",
        deliverables: [
          "Global open-access availability generating over 1,400 downloads in 6 months",
          "Citation count benchmark tracking toward institutional Scopus indexing",
          "Featured presentation at the International Conference on Robotics and Automation (ICRA)"
        ]
      }
    ],
    facilities: [
      {
        name: "Research Directorate & Grant Administration Office",
        nameKh: "ការិយាល័យរដ្ឋបាលស្រាវជ្រាវ និងគ្រប់គ្រងមូលនិធិ",
        desc: "Central office assisting researchers with grant compliance, international wire transfers, and technical report submissions."
      },
      {
        name: "Digital Academic Repository & Research Library",
        nameKh: "បណ្ណាល័យស្រាវជ្រាវឌីជីថល និងឃ្លាំងទិន្នន័យសិក្សា",
        desc: "Subscription access to IEEE Xplore, ScienceDirect, SpringerLink, and Web of Science databases with 40 research terminals."
      }
    ],
    publications: [
      {
        title: "Institutional Research Annual Report 2024-2025",
        journal: "National Polytechnic Institute of Techo Sen Publication Office",
        year: "2025",
        authors: "NPIT Directorate of Academic Research"
      },
      {
        title: "Guidelines for Technology Transfer and University-Industry Patent Licensing in Cambodia",
        journal: "MISTI Policy White Paper Series",
        year: "2024",
        authors: "Ouk Nareth, Chan Sokheng"
      }
    ]
  }
];

export const getResearchById = (id) => {
  if (!id) return researchList[0];
  const normalized = id.toLowerCase().trim();
  const found = researchList.find(r => r.id.toLowerCase() === normalized);
  if (found) return found;

  // Partial match or alias support
  if (normalized.includes('robot')) return researchList.find(r => r.id === 'robotics');
  if (normalized.includes('ict') || normalized.includes('digital') || normalized.includes('it')) return researchList.find(r => r.id === 'ict');
  if (normalized.includes('science') || normalized.includes('material')) return researchList.find(r => r.id === 'applied-sciences');
  if (normalized.includes('energy') || normalized.includes('solar')) return researchList.find(r => r.id === 'energy');
  if (normalized.includes('lab') || normalized.includes('center')) return researchList.find(r => r.id === 'centers-labs');
  if (normalized.includes('grant') || normalized.includes('publish') || normalized.includes('patent')) return researchList.find(r => r.id === 'publications-grants');

  return researchList[0];
};
