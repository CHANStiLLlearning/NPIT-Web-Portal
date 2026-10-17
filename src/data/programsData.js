/**
 * NPIT Academic Programs Comprehensive Data
 * Bilingual (English & Khmer) dataset for dedicated Program Detail Pages
 * National Polytechnic Institute Techo Sen (NPIT)
 */

export const programsList = [
  {
    id: "civil",
    name: "Civil & Structural Engineering",
    nameKhmer: "វិស្វកម្មសំណង់ស៊ីវិល និងស្ថាបត្យកម្ម",
    shortName: "Civil Engineering",
    shortNameKh: "វិស្វកម្មសំណង់ស៊ីវិល",
    faculty: "Faculty of Civil Engineering",
    facultyKh: "មហាវិទ្យាល័យវិស្វកម្មសំណង់ស៊ីវិល",
    code: "NPIT-ENG-CE",
    color: "from-amber-500 to-amber-600",
    cardBg: "bg-amber-500",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-300",
    bannerColor: "#f59e0b",
    icon: "HardHat",
    image: "/program-civil.jpg",
    degrees: [
      {
        level: "Bachelor of Engineering (B.Eng)",
        levelKh: "បរិញ្ញាបត្រវិស្វកម្ម (B.Eng)",
        duration: "4 Years (8 Semesters)",
        durationKh: "៤ ឆ្នាំ (៨ ឆមាស)",
        credits: 135
      },
      {
        level: "Higher Diploma / Associate Degree",
        levelKh: "សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកវិទ្យា (បរិញ្ញាបត្ររង)",
        duration: "2 Years (4 Semesters)",
        durationKh: "២ ឆ្នាំ (៤ ឆមាស)",
        credits: 72
      }
    ],
    overview: "The Department of Civil Engineering at NPIT delivers an intensive, hands-on engineering education adhering to international engineering accreditation standards. Students master structural mechanics, reinforced concrete, steel structure design, geotechnical exploration, highway engineering, and cutting-edge Building Information Modeling (BIM). Equipped with multi-million dollar physical test rigs and digital CAD suites, graduates lead Cambodia's urban infrastructure expansion.",
    overviewKh: "ដេប៉ាតឺម៉ង់វិស្វកម្មសំណង់ស៊ីវិលនៃវិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន (NPIT) ផ្តល់នូវការបណ្តុះបណ្តាលវិស្វកម្មកម្រិតស្តង់ដារអន្តរជាតិ ដោយផ្តោតលើការអនុវត្តជាក់ស្តែងក្នុងមន្ទីរពិសោធន៍ទំនើប និងការដ្ឋានជាក់ស្តែង។ និស្សិតត្រូវបានបំពាក់បំប៉ននូវជំនាញគណនាប្លង់សំណង់បេតុង និងដែក ការវិភាគភូមិសាស្ត្រគ្រឹះ បច្ចេកវិទ្យាស្ថាបត្យកម្មឌីជីថល BIM និងការគ្រប់គ្រងគម្រោងស្ថាបត្យកម្មហេដ្ឋារចនាសម្ព័ន្ធធំៗ។",
    highlights: [
      "100% Industry placement rate within 6 months of graduation",
      "Licensed Autodesk BIM, Revit, Civil 3D, and ETABS design labs",
      "Field surveying using Leica Total Stations and RTK Drone mapping",
      "Accredited by the Board of Engineers Cambodia (BEC)"
    ],
    highlightsKh: [
      "អត្រាការងារ ១០០% ក្នុងរយៈពេល ៦ ខែក្រោយបញ្ចប់ការសិក្សា",
      "បន្ទប់អនុវត្តកុំព្យូទ័រដែលបំពាក់កម្មវិធីស្របច្បាប់ Autodesk BIM, Revit, Civil 3D និង ETABS",
      "ការវាស់វែងវាលដោយប្រើប្រាស់ម៉ាស៊ីន Total Station និងបច្ចេកវិទ្យាដ្រូន RTK",
      "ទទួលស្គាល់ដោយគណៈវិស្វករកម្ពុជា (BEC) និងក្រសួងការងារ"
    ],
    curriculum: [
      {
        year: 1,
        title: "Year 1: Foundation Engineering & Sciences",
        titleKh: "ឆ្នាំទី ១៖ មូលដ្ឋានគ្រឹះវិទ្យាសាស្ត្រ និងវិស្វកម្ម",
        courses: [
          { code: "ENG101", name: "Engineering Mathematics & Calculus I & II", credits: 6, lab: "30h" },
          { code: "ENG102", name: "Physics for Civil Engineers & Material Mechanics", credits: 4, lab: "45h" },
          { code: "CE103", name: "Engineering Drawing & 2D/3D AutoCAD Drafting", credits: 4, lab: "60h" },
          { code: "CE104", name: "Introduction to Civil Engineering & Ethics", credits: 3, lab: "15h" },
          { code: "CE105", name: "Plane Surveying, Leveling & Topography", credits: 4, lab: "60h" },
          { code: "GEN106", name: "Technical English & Communication for Engineers", credits: 3, lab: "0h" }
        ]
      },
      {
        year: 2,
        title: "Year 2: Structural Mechanics & Geology",
        titleKh: "ឆ្នាំទី ២៖ មេកានិចសំណង់ និងភូមិសាស្ត្រវិស្វកម្ម",
        courses: [
          { code: "CE201", name: "Mechanics of Deformable Bodies & Materials", credits: 4, lab: "30h" },
          { code: "CE202", name: "Fluid Mechanics & Open Channel Hydraulics", credits: 4, lab: "45h" },
          { code: "CE203", name: "Engineering Geology & Soil Mechanics Testing", credits: 4, lab: "60h" },
          { code: "CE204", name: "Structural Analysis I: Statically Determinate Trusses", credits: 4, lab: "30h" },
          { code: "CE205", name: "Construction Materials, Aggregates & Concrete Technology", credits: 4, lab: "60h" },
          { code: "CE206", name: "Advanced Geomatics & Leica Total Station Survey", credits: 3, lab: "45h" }
        ]
      },
      {
        year: 3,
        title: "Year 3: Advanced Concrete, Steel & BIM",
        titleKh: "ឆ្នាំទី ៣៖ ការរចនាបេតុង ដែកថែប និងបច្ចេកវិទ្យា BIM",
        courses: [
          { code: "CE301", name: "Design of Reinforced Concrete Structures I & II", credits: 5, lab: "45h" },
          { code: "CE302", name: "Structural Steel & Metal Connection Design", credits: 4, lab: "30h" },
          { code: "CE303", name: "Deep Foundation Engineering & Retaining Walls", credits: 4, lab: "45h" },
          { code: "CE304", name: "Highway Geometric Design, Pavement & Asphalt", credits: 4, lab: "45h" },
          { code: "CE305", name: "Building Information Modeling (BIM - Autodesk Revit)", credits: 4, lab: "75h" },
          { code: "CE306", name: "Water Supply Systems, Hydrology & Urban Drainage", credits: 3, lab: "30h" }
        ]
      },
      {
        year: 4,
        title: "Year 4: Megastructures, Capstone & Internship",
        titleKh: "ឆ្នាំទី ៤៖ សំណង់ស្មុគស្មាញ សារណា និងកម្មសិក្សាការដ្ឋាន",
        courses: [
          { code: "CE401", name: "Earthquake & Wind Resistant Structural Engineering", credits: 4, lab: "30h" },
          { code: "CE402", name: "Prestressed Concrete & Bridge Engineering", credits: 4, lab: "30h" },
          { code: "CE403", name: "Construction Management, Cost Estimating & Tender", credits: 3, lab: "30h" },
          { code: "CE404", name: "Green Building Design & Sustainable Environmental Engineering", credits: 3, lab: "15h" },
          { code: "CE490", name: "Senior Engineering Capstone Design Project", credits: 6, lab: "120h" },
          { code: "CE495", name: "3-Month Mandatory Mega-Project Site Internship", credits: 6, lab: "360h" }
        ]
      }
    ],
    laboratories: [
      {
        name: "Universal Structural Testing & Concrete Laboratory",
        nameKh: "មន្ទីរពិសោធន៍សាកល្បងសម្ភារៈសំណង់ និងបេតុង",
        desc: "Equipped with high-capacity 1,000 kN Universal Testing Machines, computerized compressive strength testers, ultrasonic pulse testers, and curing pools for high-strength concrete formulations."
      },
      {
        name: "Geotechnical & Soil Mechanics Laboratory",
        nameKh: "មន្ទីរពិសោធន៍ភូមិសាស្ត្រ និងមេកានិចដី",
        desc: "Houses triaxial shear systems, direct shear machines, automated consolidation cells, sieve shakers, and Atterberg limit apparatus for high-rise foundation investigations."
      },
      {
        name: "Digital BIM & Computer-Aided Civil Design Center",
        nameKh: "មជ្ឈមណ្ឌលរចនាប្លង់ឌីជីថល BIM និងគំរូព័ត៌មានអគារ",
        desc: "Over 60 high-performance multi-GPU engineering workstations running Autodesk Revit, Civil 3D, CSI ETABS, SAP2000, and Plaxis for parametric multi-story modeling."
      },
      {
        name: "Geomatics & Satellite Surveying Hub",
        nameKh: "មជ្ឈមណ្ឌលវាស់វែងដីធ្លី និងប្រព័ន្ធផ្កាយរណប",
        desc: "Full fleet of electronic Leica Total Stations, GPS RTK receivers, auto-levels, and photogrammetry mapping drones for large-scale topographic and infrastructure surveys."
      }
    ],
    careers: [
      "Structural Design Engineer (High-Rise & Industrial)",
      "Construction Site Resident Engineer & Inspector",
      "BIM Coordinator & Digital Twin Specialist",
      "Geotechnical & Foundation Engineer",
      "Quantity Surveyor & Construction Cost Estimator",
      "Bridge & Highway Infrastructure Planner"
    ],
    careersKh: [
      "វិស្វករគណនាប្លង់សំណង់ (អគារខ្ពស់ៗ និងរោងចក្រ)",
      "វិស្វករត្រួតពិនិត្យការដ្ឋានសំណង់",
      "អ្នកសម្របសម្រួលបច្ចេកវិទ្យា BIM និងគំរូឌីជីថល",
      "វិស្វករជំនាញគ្រឹះ និងភូមិសាស្ត្រដី",
      "អ្នកប៉ាន់ប្រមាណតម្លៃ និងគណនាបរិមាណសំណង់",
      "វិស្វករស្ពាន ថ្នល់ និងហេដ្ឋារចនាសម្ព័ន្ធទីក្រុង"
    ],
    industryPartners: [
      "Chip Mong Insee Cement & Construction",
      "Soma Construction & Architecture Co., Ltd",
      "OCIC (Overseas Cambodia Investment Corporation)",
      "Borey Peng Huoth Group",
      "Ministry of Public Works and Transport (MPWT)",
      "Archetype Cambodia Architecture & Engineering"
    ],
    dean: {
      name: "Dr. Seng Visal, Ph.D.",
      nameKh: "បណ្ឌិត សេង វិសាល",
      title: "Dean of Faculty of Civil Engineering",
      titleKh: "ព្រឹទ្ធបុរសមហាវិទ្យាល័យវិស្វកម្មសំណង់ស៊ីវិល",
      education: "Ph.D. in Structural Engineering, Tokyo Institute of Technology, Japan",
      email: "civil.faculty@npit.edu.kh",
      phone: "+855 (0) 23 888 201",
      office: "Engineering Building B, Room 201, NPIT Main Campus"
    },
    stats: {
      degree: "B.Eng & Higher Diploma",
      duration: "2 - 4 Years",
      credits: "135 Credits (B.Eng)",
      language: "Khmer & English",
      shifts: "Morning / Afternoon / Weekend"
    }
  },
  {
    id: "it",
    name: "Information Technology & Software Engineering",
    nameKhmer: "ព័ត៌មានវិទ្យា និងវិស្វកម្មសូហ្វវែរ",
    shortName: "Information Technology",
    shortNameKh: "បច្ចេកវិទ្យាព័ត៌មាន",
    faculty: "Faculty of Information Technology",
    facultyKh: "មហាវិទ្យាល័យព័ត៌មានវិទ្យា",
    code: "NPIT-TECH-IT",
    color: "from-blue-600 to-indigo-700",
    cardBg: "bg-blue-600",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-300",
    bannerColor: "#2563eb",
    icon: "Laptop",
    image: "/program-it.jpg",
    degrees: [
      {
        level: "Bachelor of Science in IT (B.Sc)",
        levelKh: "បរិញ្ញាបត្រវិទ្យាសាស្ត្រព័ត៌មានវិទ្យា (B.Sc)",
        duration: "4 Years (8 Semesters)",
        durationKh: "៤ ឆ្នាំ (៨ ឆមាស)",
        credits: 130
      },
      {
        level: "Higher Diploma / Associate Degree",
        levelKh: "សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកវិទ្យាព័ត៌មាន (បរិញ្ញាបត្ររង)",
        duration: "2 Years (4 Semesters)",
        durationKh: "២ ឆ្នាំ (៤ ឆមាស)",
        credits: 70
      }
    ],
    overview: "The Department of Information Technology and Software Engineering at NPIT prepares graduates to build scalable software architectures, defend enterprise systems against cyber threats, deploy cloud platforms, and innovate with artificial intelligence. With practical laboratory instruction spanning full-stack web, mobile development, containerization, and data intelligence, students graduate ready for immediate impact in top tech firms.",
    overviewKh: "ដេប៉ាតឺម៉ង់ព័ត៌មានវិទ្យា និងវិស្វកម្មសូហ្វវែរ នៃវិទ្យាស្ថាន NPIT ផ្តោតសំខាន់លើការបណ្តុះបណ្តាលវិស្វករសូហ្វវែរ អ្នកឯកទេសសន្តិសុខប្រព័ន្ធ (Cybersecurity) បច្ចេកវិទ្យា Cloud Computing និងបញ្ញាសិប្បនិម្មិត (AI)។ និស្សិតទទួលបានបទពិសោធន៍ផ្ទាល់ក្នុងការបង្កើតកម្មវិធី Web និង Mobile ខ្នាតធំ ការគ្រប់គ្រងប្រព័ន្ធទិន្នន័យស្មុគស្មាញ និងការការពារហេដ្ឋារចនាសម្ព័ន្ធបណ្តាញព័ត៌មានវិទ្យា។",
    highlights: [
      "Official Cisco Networking Academy & AWS Cloud Education Partner",
      "Dedicated High-Performance GPU AI & Deep Learning Research Cluster",
      "Annual Hackathon and Industry Capstone Showcase with venture sponsors",
      "Direct pathway into leading banks, fintech, and telecom carriers"
    ],
    highlightsKh: [
      "ជាដៃគូផ្លូវការរបស់ Cisco Networking Academy និង AWS Cloud Education",
      "មន្ទីរពិសោធន៍កុំព្យូទ័រ GPU ល្បឿនលឿនសម្រាប់ស្រាវជ្រាវ AI និង Deep Learning",
      "កម្មវិធីប្រកួតប្រជែងសរសេរកូដ Hackathon និងពិព័រណ៍គម្រោងបច្ចេកវិទ្យាប្រចាំឆ្នាំ",
      "ឱកាសការងារផ្ទាល់ជាមួយធនាគារ ស្ថាប័នហិរញ្ញវត្ថុ Fintech និងក្រុមហ៊ុនទូរគមនាគមន៍"
    ],
    curriculum: [
      {
        year: 1,
        title: "Year 1: Programming Logic & Computational Foundations",
        titleKh: "ឆ្នាំទី ១៖ មូលដ្ឋានគ្រឹះសរសេរកូដ និងកុំព្យូទ័រ",
        courses: [
          { code: "IT101", name: "Introduction to Computer Science & Algorithms", credits: 3, lab: "30h" },
          { code: "IT102", name: "Structured Programming with C/C++", credits: 4, lab: "60h" },
          { code: "IT103", name: "Discrete Mathematics & Boolean Logic", credits: 3, lab: "15h" },
          { code: "IT104", name: "Modern Web Foundations (HTML5, Modern CSS, ES6+)", credits: 4, lab: "60h" },
          { code: "IT105", name: "Computer Architecture & Operating Systems (Linux)", credits: 4, lab: "45h" },
          { code: "GEN106", name: "Professional Technical Communication", credits: 3, lab: "0h" }
        ]
      },
      {
        year: 2,
        title: "Year 2: Data Structures, OOP & Networking",
        titleKh: "ឆ្នាំទី ២៖ រចនាសម្ព័ន្ធទិន្នន័យ OOP និងប្រព័ន្ធបណ្តាញ",
        courses: [
          { code: "IT201", name: "Object-Oriented Programming (Java / C#)", credits: 4, lab: "60h" },
          { code: "IT202", name: "Data Structures & Algorithm Optimization", credits: 4, lab: "45h" },
          { code: "IT203", name: "Relational Database Design & PostgreSQL / MySQL", credits: 4, lab: "60h" },
          { code: "IT204", name: "Computer Networks & Cisco Routing (CCNA I & II)", credits: 4, lab: "60h" },
          { code: "IT205", name: "UI/UX Design Systems & Human-Computer Interaction", credits: 3, lab: "30h" },
          { code: "IT206", name: "Python for Data Science & Automation", credits: 3, lab: "45h" }
        ]
      },
      {
        year: 3,
        title: "Year 3: Full-Stack, Mobile, Cloud & Security",
        titleKh: "ឆ្នាំទី ៣៖ កម្មវិធី Full-Stack, Mobile, Cloud និងសុវត្ថិភាព",
        courses: [
          { code: "IT301", name: "Full-Stack Web Engineering (React, Node.js & TypeScript)", credits: 5, lab: "75h" },
          { code: "IT302", name: "Cross-Platform Mobile Development (Flutter & Kotlin)", credits: 4, lab: "60h" },
          { code: "IT303", name: "Cybersecurity Defense, Ethical Hacking & Cryptography", credits: 4, lab: "60h" },
          { code: "IT304", name: "Cloud Architecture, Docker & Kubernetes (AWS / GCP)", credits: 4, lab: "60h" },
          { code: "IT305", name: "Artificial Intelligence & Applied Machine Learning", credits: 4, lab: "60h" },
          { code: "IT306", name: "Agile Software Engineering & Project Management", credits: 3, lab: "30h" }
        ]
      },
      {
        year: 4,
        title: "Year 4: Enterprise Architecture, AI & Tech Internship",
        titleKh: "ឆ្នាំទី ៤៖ សូហ្វវែរខ្នាតធំ បញ្ញាសិប្បនិម្មិត និងកម្មសិក្សា",
        courses: [
          { code: "IT401", name: "Distributed Microservices & Event-Driven Architecture", credits: 4, lab: "45h" },
          { code: "IT402", name: "DevOps CI/CD Pipelines & Site Reliability Engineering", credits: 4, lab: "45h" },
          { code: "IT403", name: "Natural Language Processing & Computer Vision", credits: 4, lab: "45h" },
          { code: "IT404", name: "Tech Entrepreneurship, IP & Cambodian Cyber Law", credits: 3, lab: "15h" },
          { code: "IT490", name: "Major Software Engineering Capstone Project", credits: 6, lab: "120h" },
          { code: "IT495", name: "3-Month Intensive Tech Industry Internship", credits: 6, lab: "360h" }
        ]
      }
    ],
    laboratories: [
      {
        name: "AI & High-Performance Computing Research Lab",
        nameKh: "មន្ទីរពិសោធន៍ AI និងកុំព្យូទ័រល្បឿនលឿន",
        desc: "Equipped with NVIDIA RTX GPU compute nodes, deep learning environments, model training servers, and Jupyter hubs for artificial intelligence exploration."
      },
      {
        name: "Cisco Networking & Security Operations Center (SOC)",
        nameKh: "មជ្ឈមណ្ឌលប្រតិបត្តិការបណ្តាញ និងសន្តិសុខប្រព័ន្ធ (SOC)",
        desc: "Enterprise racks featuring Cisco Catalyst switches, modular ISR routers, hardware firewalls, and network intrusion emulation environments."
      },
      {
        name: "Full-Stack Software Engineering & App Studio",
        nameKh: "ស្ទូឌីយោអភិវឌ្ឍន៍សូហ្វវែរ និងកម្មវិធីទូរស័ព្ទ",
        desc: "Over 80 dual-monitor workstations configured with modern developer toolchains, Git repositories, virtualization testbeds, and testing devices."
      },
      {
        name: "IoT & Hardware Prototyping Laboratory",
        nameKh: "មន្ទីរពិសោធន៍បច្ចេកវិទ្យា IoT និងផ្នែករឹង",
        desc: "Houses Raspberry Pi 5 clusters, ESP32 boards, LoRaWAN wireless gateways, environmental sensor arrays, and soldering testbenches."
      }
    ],
    careers: [
      "Full-Stack Web & Mobile Software Engineer",
      "Cloud Solutions Architect & DevOps Specialist",
      "Cybersecurity Defense Analyst & Penetration Tester",
      "Artificial Intelligence & Machine Learning Engineer",
      "Database Administrator & Big Data Engineer",
      "IT Project Manager & Enterprise Systems Consultant"
    ],
    careersKh: [
      "វិស្វករសរសេរកូដ Full-Stack និង Mobile App",
      "អ្នករចនាប្រព័ន្ធ Cloud Architecture និង DevOps",
      "អ្នកជំនាញសន្តិសុខប្រព័ន្ធ Cybersecurity និង Ethical Hacker",
      "វិស្វករបញ្ញាសិប្បនិម្មិត AI & Machine Learning",
      "អ្នកគ្រប់គ្រងទិន្នន័យ Database និង Big Data",
      "អ្នកគ្រប់គ្រងគម្រោងបច្ចេកវិទ្យាព័ត៌មាន (IT Project Manager)"
    ],
    industryPartners: [
      "Smart Axiata Co., Ltd",
      "Metfone (Viettel Cambodia)",
      "Wing Bank (Cambodia) Plc",
      "Canadia Bank & OCIC Tech",
      "Ministry of Post and Telecommunications (MPTC)",
      "Sabay Digital Corporation"
    ],
    dean: {
      name: "Dr. Chhun Chantha, Ph.D.",
      nameKh: "បណ្ឌិត ឈុន ចាន់ថា",
      title: "Dean of Faculty of Information Technology",
      titleKh: "ព្រឹទ្ធបុរសមហាវិទ្យាល័យព័ត៌មានវិទ្យា",
      education: "Ph.D. in Computer Science, Korea Advanced Institute of Science and Technology (KAIST)",
      email: "it.faculty@npit.edu.kh",
      phone: "+855 (0) 23 888 202",
      office: "Engineering Building C, Room 301, NPIT Main Campus"
    },
    stats: {
      degree: "B.Sc & Higher Diploma",
      duration: "2 - 4 Years",
      credits: "130 Credits (B.Sc)",
      language: "Khmer & English",
      shifts: "Morning / Afternoon / Evening / Weekend"
    }
  },
  {
    id: "electrical",
    name: "Electrical, Electronics & Energy Engineering",
    nameKhmer: "វិស្វកម្មអគ្គិសនី អេឡិចត្រូនិក និងថាមពល",
    shortName: "Electrical Engineering",
    shortNameKh: "វិស្វកម្មអគ្គិសនី",
    faculty: "Faculty of Electrical & Electronics Engineering",
    facultyKh: "មហាវិទ្យាល័យវិស្វកម្មអគ្គិសនី និងអេឡិចត្រូនិក",
    code: "NPIT-ENG-EE",
    color: "from-blue-700 to-blue-900",
    cardBg: "bg-[#0f2757]",
    badgeBg: "bg-blue-50 text-blue-900 border-blue-200",
    bannerColor: "#0f2757",
    icon: "Cpu",
    image: "/program-electrical.jpg",
    degrees: [
      {
        level: "Bachelor of Engineering (B.Eng)",
        levelKh: "បរិញ្ញាបត្រវិស្វកម្ម (B.Eng)",
        duration: "4 Years (8 Semesters)",
        durationKh: "៤ ឆ្នាំ (៨ ឆមាស)",
        credits: 134
      },
      {
        level: "Higher Diploma / Associate Degree",
        levelKh: "សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកវិទ្យាអគ្គិសនី (បរិញ្ញាបត្ររង)",
        duration: "2 Years (4 Semesters)",
        durationKh: "២ ឆ្នាំ (៤ ឆមាស)",
        credits: 72
      }
    ],
    overview: "The Department of Electrical, Electronics and Energy Engineering educates students at the frontier of power systems, modern smart grids, industrial automation, solar photovoltaics, and microelectronics. Students design and troubleshoot real electrical circuits, program industrial PLCs, and engineer solar arrays with international safety benchmarks, empowering Cambodia's clean energy transition and factory automation.",
    overviewKh: "ដេប៉ាតឺម៉ង់វិស្វកម្មអគ្គិសនី អេឡិចត្រូនិក និងថាមពល នៃវិទ្យាស្ថាន NPIT ផ្តល់ការបណ្តុះបណ្តាលកម្រិតវិស្វករជំនាញលើប្រព័ន្ធបញ្ជូន និងចែកចាយថាមពលអគ្គិសនី បច្ចេកវិទ្យាស្វ័យប្រវត្តិកម្មឧស្សាហកម្ម PLC ប្រព័ន្ធថាមពលពន្លឺព្រះអាទិត្យ (Solar Energy) និងសៀគ្វីអេឡិចត្រូនិចទំនើប។ និស្សិតមានជំនាញជាក់ស្តែងក្នុងការតម្លើង ថែទាំ និងបញ្ជាប្រព័ន្ធអគ្គិសនីក្នុងរោងចក្រ និងអគារពាណិជ្ជកម្មធំៗ។",
    highlights: [
      "Live High-Voltage Power & Substation Simulation Training Benches",
      "Industry-grade Siemens & Omron Programmable Logic Controller (PLC) Lab",
      "On-campus 50kW Grid-Tied Solar Photovoltaic Testing Installation",
      "Strong partnership with Electricité du Cambodge (EDC)"
    ],
    highlightsKh: [
      "តុកៅអីពិសោធន៍ប្រព័ន្ធថាមពលអគ្គិសនីកម្លាំងខ្ពស់ និងស្ថានីយរងក្លែងធ្វើ",
      "មន្ទីរពិសោធន៍ប្រព័ន្ធបញ្ជាស្វ័យប្រវត្តិកម្ម PLC ស្តង់ដារ Siemens និង Omron",
      "ស្ថានីយថាមពលសូឡា 50kW ភ្ជាប់បណ្តាញជាតិលើដំបូលអគារសម្រាប់និស្សិតអនុវត្ត",
      "កិច្ចសហការយ៉ាងជិតស្និទ្ធជាមួយអគ្គិសនីកម្ពុជា (EDC) ក្នុងការចុះកម្មសិក្សា"
    ],
    curriculum: [
      {
        year: 1,
        title: "Year 1: Circuit Foundations & Electrical Sciences",
        titleKh: "ឆ្នាំទី ១៖ មូលដ្ឋានគ្រឹះសៀគ្វី និងវិទ្យាសាស្ត្រអគ្គិសនី",
        courses: [
          { code: "EE101", name: "Engineering Calculus & Differential Equations", credits: 5, lab: "15h" },
          { code: "EE102", name: "Direct Current (DC) Circuit Analysis", credits: 4, lab: "45h" },
          { code: "EE103", name: "Electrical Drafting & Computer-Aided CAD Design", credits: 4, lab: "60h" },
          { code: "EE104", name: "Basic Workshop Practice & National Electrical Codes", credits: 3, lab: "60h" },
          { code: "EE105", name: "Engineering Materials & Magnetic Properties", credits: 3, lab: "30h" },
          { code: "GEN106", name: "Technical English & Engineering Ethics", credits: 3, lab: "0h" }
        ]
      },
      {
        year: 2,
        title: "Year 2: AC Circuits, Electronics & Machines",
        titleKh: "ឆ្នាំទី ២៖ សៀគ្វីចរន្តឆ្លាស់ អេឡិចត្រូនិក និងម៉ាស៊ីនអគ្គិសនី",
        courses: [
          { code: "EE201", name: "Alternating Current (AC) Circuits & Three-Phase Systems", credits: 4, lab: "45h" },
          { code: "EE202", name: "Analog Electronics (Diodes, BJTs & Op-Amps)", credits: 4, lab: "60h" },
          { code: "EE203", name: "Digital Logic Design & Microprocessor Architecture", credits: 4, lab: "60h" },
          { code: "EE204", name: "Electromechanical Energy Conversion & Transformers", credits: 4, lab: "45h" },
          { code: "EE205", name: "AC/DC Motors & Motor Control Centers (MCC)", credits: 4, lab: "60h" },
          { code: "EE206", name: "Electrical Instrumentation & Sensors", credits: 3, lab: "45h" }
        ]
      },
      {
        year: 3,
        title: "Year 3: Industrial Automation, Power & Solar",
        titleKh: "ឆ្នាំទី ៣៖ ស្វ័យប្រវត្តិកម្មឧស្សាហកម្ម ថាមពល និងសូឡា",
        courses: [
          { code: "EE301", name: "Electric Power Transmission & Distribution Systems", credits: 4, lab: "45h" },
          { code: "EE302", name: "Industrial PLC Programming (Siemens S7 & Omron)", credits: 5, lab: "75h" },
          { code: "EE303", name: "Power Electronics, Rectifiers & Inverter Drives", credits: 4, lab: "45h" },
          { code: "EE304", name: "Solar PV Engineering, Inverters & Battery Storage", credits: 4, lab: "60h" },
          { code: "EE305", name: "Feedback Control Systems & PID Optimization", credits: 4, lab: "45h" },
          { code: "EE306", name: "Building MEP Electrical Installation & Illumination", credits: 3, lab: "45h" }
        ]
      },
      {
        year: 4,
        title: "Year 4: Smart Grids, SCADA & Industrial Internship",
        titleKh: "ឆ្នាំទី ៤៖ បណ្តាញឆ្លាតវៃ SCADA និងកម្មសិក្សាឧស្សាហកម្ម",
        courses: [
          { code: "EE401", name: "High Voltage Engineering & Substation Protective Relaying", credits: 4, lab: "45h" },
          { code: "EE402", name: "SCADA Systems & Industrial IoT Telemetry", credits: 4, lab: "60h" },
          { code: "EE403", name: "Smart Grid Technologies & Renewable Energy Integration", credits: 3, lab: "30h" },
          { code: "EE404", name: "Energy Auditing, Conservation & Power Quality", credits: 3, lab: "30h" },
          { code: "EE490", name: "Senior Electrical Engineering Capstone Design Project", credits: 6, lab: "120h" },
          { code: "EE495", name: "3-Month Industrial Power Plant Internship", credits: 6, lab: "360h" }
        ]
      }
    ],
    laboratories: [
      {
        name: "High-Voltage & Power Systems Protection Lab",
        nameKh: "មន្ទីរពិសោធន៍ថាមពលអគ្គិសនីកម្លាំងខ្ពស់ និងប្រព័ន្ធការពារ",
        desc: "State-of-the-art power simulator boards, high-voltage test transformers, microprocessor protective relays (SEL, ABB), and circuit breaker test sets."
      },
      {
        name: "Industrial Automation, PLC & SCADA Laboratory",
        nameKh: "មន្ទីរពិសោធន៍ស្វ័យប្រវត្តិកម្ម PLC និង SCADA",
        desc: "Houses over 30 modular training stations equipped with Siemens S7-1200/1500 and Omron CP1E PLCs, HMI touch panels, and FESTO electro-pneumatics."
      },
      {
        name: "Solar Photovoltaic & Renewable Energy Testbed",
        nameKh: "មន្ទីរពិសោធន៍ថាមពលពន្លឺព្រះអាទិត្យ និងថាមពលកកើតឡើងវិញ",
        desc: "Monocrystalline/bifacial solar arrays, solar radiation sensors, MPPT solar charge controllers, hybrid grid-tied inverters, and battery banks."
      },
      {
        name: "Embedded Systems & Microelectronics Cleanroom",
        nameKh: "មន្ទីរពិសោធន៍សៀគ្វីអេឡិចត្រូនិច និងប្រព័ន្ធបង្កប់",
        desc: "Digital storage oscilloscopes, function generators, SMD hot-air rework stations, and CNC PCB prototyping routers for circuit fabrication."
      }
    ],
    careers: [
      "Electric Power Transmission & Substation Engineer",
      "Industrial Automation & PLC/SCADA Specialist",
      "Solar Photovoltaic & Clean Energy Consultant",
      "Building MEP Electrical Systems Designer",
      "Embedded Electronics & Hardware Engineer",
      "Factory Maintenance & Plant Operations Manager"
    ],
    careersKh: [
      "វិស្វករប្រព័ន្ធបញ្ជូន និងស្ថានីយរងអគ្គិសនី",
      "អ្នកឯកទេសស្វ័យប្រវត្តិកម្មឧស្សាហកម្ម និង PLC/SCADA",
      "អ្នកប្រឹក្សាគម្រោងថាមពលសូឡា និងថាមពលស្អាត",
      "វិស្វករគណនាប្លង់ប្រព័ន្ធអគ្គិសនីអគារ (MEP)",
      "វិស្វករផ្នែករឹងអេឡិចត្រូនិក និងប្រព័ន្ធបង្កប់",
      "អ្នកគ្រប់គ្រងការថែទាំ និងដំណើរការរោងចក្រ"
    ],
    industryPartners: [
      "Electricité du Cambodge (EDC)",
      "Schneider Electric (Cambodia)",
      "TotalEnergies Renewables Cambodia",
      "Comin Khmere Engineering & Contracting",
      "ABB Cambodia Automation",
      "Pestech (Cambodia) Plc"
    ],
    dean: {
      name: "Dr. Keo Sopheak, Ph.D.",
      nameKh: "បណ្ឌិត កែវ សុភក្តិ",
      title: "Dean of Faculty of Electrical Engineering",
      titleKh: "ព្រឹទ្ធបុរសមហាវិទ្យាល័យវិស្វកម្មអគ្គិសនី",
      education: "Ph.D. in Power Systems, Seoul National University, South Korea",
      email: "electrical.faculty@npit.edu.kh",
      phone: "+855 (0) 23 888 203",
      office: "Engineering Building D, Room 102, NPIT Main Campus"
    },
    stats: {
      degree: "B.Eng & Higher Diploma",
      duration: "2 - 4 Years",
      credits: "134 Credits (B.Eng)",
      language: "Khmer & English",
      shifts: "Morning / Afternoon / Weekend"
    }
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering, Automotive & Mechatronics",
    nameKhmer: "វិស្វកម្មមេកានិច យានយន្ត និងមេកាត្រូនិក",
    shortName: "Mechanical Engineering",
    shortNameKh: "វិស្វកម្មមេកានិច",
    faculty: "Faculty of Mechanical & Manufacturing",
    facultyKh: "មហាវិទ្យាល័យវិស្វកម្មមេកានិច និងផលិតកម្ម",
    code: "NPIT-ENG-ME",
    color: "from-red-600 to-red-800",
    cardBg: "bg-red-700",
    badgeBg: "bg-red-50 text-red-900 border-red-200",
    bannerColor: "#b91c1c",
    icon: "Cog",
    image: "/program-mechanical.jpg",
    degrees: [
      {
        level: "Bachelor of Engineering (B.Eng)",
        levelKh: "បរិញ្ញាបត្រវិស្វកម្ម (B.Eng)",
        duration: "4 Years (8 Semesters)",
        durationKh: "៤ ឆ្នាំ (៨ ឆមាស)",
        credits: 136
      },
      {
        level: "Higher Diploma / Associate Degree",
        levelKh: "សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកវិទ្យាមេកានិច (បរិញ្ញាបត្ររង)",
        duration: "2 Years (4 Semesters)",
        durationKh: "២ ឆ្នាំ (៤ ឆមាស)",
        credits: 72
      }
    ],
    overview: "The Department of Mechanical and Manufacturing Engineering trains students in precision computer numerical control (CNC) machining, advanced CAD/CAM modeling, thermodynamic energy systems, modern automotive electric vehicles (EV), and robotic automation. Students spend hundreds of hours in machine shops crafting parts, testing materials, and programming articulated robot arms.",
    overviewKh: "ដេប៉ាតឺម៉ង់វិស្វកម្មមេកានិច និងផលិតកម្ម នៃវិទ្យាស្ថាន NPIT ផ្តោតសំខាន់លើការរចនា និងផលិតគ្រឿងម៉ាស៊ីនដោយកុំព្យូទ័រ (CAD/CAM) ការបញ្ជាម៉ាស៊ីនក្រឡឹង និងកាត់ CNC សុក្រឹត បច្ចេកវិទ្យាយានយន្តអគ្គិសនី (EV) និងរ៉ូបូតឧស្សាហកម្ម។ និស្សិតទទួលបានការបង្វឹកផ្ទាល់លើម៉ាស៊ីនឧស្សាហកម្មខ្នាតធំ ដើម្បីត្រៀមខ្លួនដឹកនាំវិស័យផលិតកម្មទំនើបនៅកម្ពុជា។",
    highlights: [
      "Precision 5-Axis CNC Milling, CNC Lathe & Wire EDM Machining Center",
      "Industrial Robotics Cell with 6-Axis Articulated Arms (ABB & KUKA)",
      "Automotive Diagnostic Center & Electric Vehicle (EV) Powertrain Rig",
      "Full SolidWorks, Mastercam, and ANSYS FEA simulation licenses"
    ],
    highlightsKh: [
      "មជ្ឈមណ្ឌលម៉ាស៊ីន CNC កម្រិតខ្ពស់ ៥ អ័ក្ស ម៉ាស៊ីនក្រឡឹង CNC និង Wire EDM",
      "បន្ទប់រ៉ូបូតឧស្សាហកម្ម ៦ អ័ក្ស ស្តង់ដារពិភពលោក (ABB និង KUKA)",
      "មជ្ឈមណ្ឌលវិនិច្ឆ័យយានយន្ត និងប្រព័ន្ធដំណើរការរថយន្តអគ្គិសនី (EV)",
      "កម្មវិធីរចនា និងក្លែងធ្វើកម្លាំងលំដាប់ពិភពលោក SolidWorks, Mastercam និង ANSYS"
    ],
    curriculum: [
      {
        year: 1,
        title: "Year 1: Engineering Mechanics & Workshop Basics",
        titleKh: "ឆ្នាំទី ១៖ មេកានិចវិស្វកម្ម និងរោងជាងមូលដ្ឋាន",
        courses: [
          { code: "ME101", name: "Engineering Mechanics (Statics & Equilibrium)", credits: 4, lab: "30h" },
          { code: "ME102", name: "Engineering Mathematics & Vector Analysis", credits: 5, lab: "15h" },
          { code: "ME103", name: "Computer-Aided 3D Modeling (SolidWorks)", credits: 4, lab: "60h" },
          { code: "ME104", name: "Mechanical Workshop (Lathe, Milling & Arc Welding)", credits: 4, lab: "75h" },
          { code: "ME105", name: "Materials Science & Engineering Metallurgy", credits: 3, lab: "30h" },
          { code: "GEN106", name: "Technical English & Industrial Safety Standards", credits: 3, lab: "0h" }
        ]
      },
      {
        year: 2,
        title: "Year 2: Dynamics, Mechanics of Materials & Fluid Power",
        titleKh: "ឆ្នាំទី ២៖ ឌីណាមិច សម្ភារៈ និងប្រព័ន្ធធារាសាស្ត្រ",
        courses: [
          { code: "ME201", name: "Engineering Dynamics & Kinematics of Machinery", credits: 4, lab: "30h" },
          { code: "ME202", name: "Strength of Materials & Stress Analysis", credits: 4, lab: "45h" },
          { code: "ME203", name: "Manufacturing Technology & Metrology Inspection", credits: 4, lab: "60h" },
          { code: "ME204", name: "Applied Thermodynamics & Gas Cycles", credits: 4, lab: "30h" },
          { code: "ME205", name: "Fluid Mechanics, Pumps & Compressors", credits: 4, lab: "45h" },
          { code: "ME206", name: "Industrial Pneumatics & Electro-Hydraulics", credits: 3, lab: "60h" }
        ]
      },
      {
        year: 3,
        title: "Year 3: Machine Design, CNC & Automotive Tech",
        titleKh: "ឆ្នាំទី ៣៖ ការរចនាគ្រឿងម៉ាស៊ីន CNC និងយានយន្ត",
        courses: [
          { code: "ME301", name: "Mechanical Element Design (Gears, Shafts & Bearings)", credits: 5, lab: "45h" },
          { code: "ME302", name: "Heat Transfer, HVAC & Cold Storage Engineering", credits: 4, lab: "45h" },
          { code: "ME303", name: "Computer-Aided Manufacturing (CAM & Mastercam G-Code)", credits: 4, lab: "75h" },
          { code: "ME304", name: "Precision CNC Machining Setup & Operation", credits: 4, lab: "75h" },
          { code: "ME305", name: "Automotive Internal Combustion & EV Powertrains", credits: 4, lab: "60h" },
          { code: "ME306", name: "Mechatronics Systems, Actuators & Sensors", credits: 3, lab: "45h" }
        ]
      },
      {
        year: 4,
        title: "Year 4: Robotics, FEA Simulation & Plant Internship",
        titleKh: "ឆ្នាំទី ៤៖ រ៉ូបូត ការក្លែងធ្វើ FEA និងកម្មសិក្សារោងចក្រ",
        courses: [
          { code: "ME401", name: "Industrial Robotics & Automated Assembly Cells", credits: 4, lab: "60h" },
          { code: "ME402", name: "Finite Element Analysis (FEA with ANSYS)", credits: 4, lab: "60h" },
          { code: "ME403", name: "Plant Maintenance, TPM & Vibration Analysis", credits: 3, lab: "30h" },
          { code: "ME404", name: "Production Planning, Lean Six Sigma & Quality Control", credits: 3, lab: "15h" },
          { code: "ME490", name: "Senior Mechanical Engineering Capstone Project", credits: 6, lab: "120h" },
          { code: "ME495", name: "3-Month Industrial Manufacturing Plant Internship", credits: 6, lab: "360h" }
        ]
      }
    ],
    laboratories: [
      {
        name: "Precision CNC Machining & Toolmaking Center",
        nameKh: "មជ្ឈមណ្ឌលម៉ាស៊ីន CNC និងផលិតពុម្ពសុក្រឹត",
        desc: "Equipped with 5-axis CNC machining centers, precision CNC lathes, wire EDM, laser sheet metal cutting, and digital coordinate measuring machines (CMM)."
      },
      {
        name: "Mechatronics, Hydraulics & Industrial Robotics Cell",
        nameKh: "មន្ទីរពិសោធន៍មេកាត្រូនិក ធារាសាស្ត្រ និងរ៉ូបូត",
        desc: "Features 6-axis ABB and KUKA robotic arms, automated conveyor sorting stations, vision guidance cameras, and FESTO hydraulic power packs."
      },
      {
        name: "Automotive Technology & Electric Vehicle (EV) Test Lab",
        nameKh: "មន្ទីរពិសោធន៍បច្ចេកវិទ្យាយានយន្ត និងរថយន្តអគ្គិសនី",
        desc: "Full vehicle chassis lift, engine dynamometer, OBD-II computerized fault scanners, and high-voltage lithium battery pack diagnostic benches."
      },
      {
        name: "Materials Testing & Destructive / Non-Destructive Lab",
        nameKh: "មន្ទីរពិសោធន៍សាកល្បងលោហៈធាតុ និងភាពរឹង",
        desc: "Rockwell and Vickers hardness testers, Charpy impact test pendulums, metallurgical microscopes, and ultrasonic flaw detectors."
      }
    ],
    careers: [
      "Mechanical Product Design Engineer (CAD/CAM)",
      "Precision CNC Manufacturing Engineer",
      "Automotive & Electric Vehicle (EV) Engineer",
      "Mechatronics & Industrial Robotics Specialist",
      "HVAC, Refrigeration & Building Services Engineer",
      "Factory Operations & Plant Maintenance Manager"
    ],
    careersKh: [
      "វិស្វកររចនាផលិតផលមេកានិច (CAD/CAM)",
      "វិស្វករផលិតកម្មម៉ាស៊ីន CNC សុក្រឹត",
      "វិស្វករបច្ចេកវិទ្យាយានយន្ត និងរថយន្តអគ្គិសនី (EV)",
      "អ្នកឯកទេសមេកាត្រូនិក និងរ៉ូបូតឧស្សាហកម្ម",
      "វិស្វករប្រព័ន្ធត្រជាក់ HVAC និងសេវាកម្មអគារ",
      "អ្នកគ្រប់គ្រងប្រតិបត្តិការ និងការថែទាំរោងចក្រឧស្សាហកម្ម"
    ],
    industryPartners: [
      "RMA Cambodia (Ford Assembly & Heavy Equipment)",
      "Toyota Cambodia Co., Ltd",
      "MinebeaMitsumi (Cambodia) Co., Ltd",
      "Heineken Cambodia Engineering Division",
      "Denso (Cambodia) Co., Ltd",
      "Cambodia Beverage Company (Coca-Cola)"
    ],
    dean: {
      name: "Dr. Pen Sokunthea, Ph.D.",
      nameKh: "បណ្ឌិត ប៉ែន សុគន្ធា",
      title: "Dean of Faculty of Mechanical Engineering",
      titleKh: "ព្រឹទ្ធបុរសមហាវិទ្យាល័យវិស្វកម្មមេកានិច",
      education: "Ph.D. in Precision Manufacturing, Nanyang Technological University (NTU), Singapore",
      email: "mechanical.faculty@npit.edu.kh",
      phone: "+855 (0) 23 888 204",
      office: "Engineering Building E, Room 101, NPIT Main Campus"
    },
    stats: {
      degree: "B.Eng & Higher Diploma",
      duration: "2 - 4 Years",
      credits: "136 Credits (B.Eng)",
      language: "Khmer & English",
      shifts: "Morning / Afternoon / Weekend"
    }
  }
];

export const getProgramById = (id) => {
  if (!id) return programsList[0];
  const normalized = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // 1. Exact match on program id ('civil', 'it', 'electrical', 'mechanical')
  const exactId = programsList.find(p => p.id.toLowerCase() === normalized);
  if (exactId) return exactId;

  // 2. Match on code without partial substring false-positives
  const exactCode = programsList.find(p => 
    p.code.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized ||
    p.code.toLowerCase().split('-').pop() === normalized
  );
  if (exactCode) return exactCode;

  // 3. Match by shortName or fullName
  const matchName = programsList.find(p => 
    p.shortName.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalized) ||
    p.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalized)
  );
  if (matchName) return matchName;

  return programsList[0];
};
