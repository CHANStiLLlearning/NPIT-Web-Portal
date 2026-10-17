export const contentData = {
  en: {
    instituteName: "NATIONAL POLYTECHNIC INSTITUTE TECHO SEN",
    instituteNameKhmer: "វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន",
    studentPortal: "Student Portal",
    nav: [
      { id: "home", label: "Home", href: "#home" },
      { 
        id: "about", 
        label: "About", 
        href: "#about",
        dropdown: [
          { label: "Vision & Mission", href: "#about" },
          { label: "Leadership & Council", href: "#about" },
          { label: "Institute History", href: "#about" },
          { label: "Quality Assurance", href: "#about" }
        ]
      },
      { 
        id: "programs", 
        label: "Academic Programs", 
        href: "#programs",
        dropdown: [
          { label: "Industrial Engineering (វិស្វកម្មឧស្សាហកម្ម)", href: "#programs" },
          { label: "Electrical Engineering (វិស្វកម្មអគ្គិសនី)", href: "#programs" },
          { label: "Refrigeration & HVAC (បរិក្ខារត្រជាក់)", href: "#programs" },
          { label: "IT & Software Engineering (ព័ត៌មានវិទ្យា)", href: "#programs" },
          { label: "Automotive Technology (យន្តសាស្ត្ររថយន្ត)", href: "#programs" },
          { label: "Civil Engineering (សំណង់ស៊ីវិល)", href: "#programs" },
          { label: "Smart Digital & Cybersecurity (សន្តិសុខសាយប័រ)", href: "#programs" },
          { label: "English, Veterinary & Business Management", href: "#programs" }
        ]
      },
      { 
        id: "admissions", 
        label: "Admissions", 
        href: "#admissions",
        dropdown: [
          { label: "Admission Requirements", href: "#admissions" },
          { label: "Scholarship Schemes", href: "#admissions" },
          { label: "Tuition & Fees", href: "#admissions" },
          { label: "How to Apply", href: "#admissions" }
        ]
      },
      { id: "research", label: "Research", href: "#research" },
      { id: "news", label: "News & Events", href: "#news" },
      { id: "contact", label: "Contact Us", href: "#contact" },
    ],
    hero: {
      tagline: "BUILDING YOUR FUTURE IN",
      highlight: "TECHNOLOGY & ENGINEERING",
      khmerSubtitle: "កសាងអនាគតរបស់អ្នក ក្នុងវិស័យបច្ចេកវិទ្យា និងវិស្វកម្ម",
      applyBtn: "Apply Online",
      exploreBtn: "Explore Programs",
      slides: [
        {
          title: "Leading Innovation in Technical Education",
          subtitle: "Empowering next-generation engineers with industry-driven skills and practical excellence.",
          image: "/hero-lab.jpg",
          roundImage: "/campus-round.jpg"
        },
        {
          title: "State-of-the-art Robotics & AI Research",
          subtitle: "Equipped with world-class laboratory instruments and global industry certifications.",
          image: "/hero-lab.jpg",
          roundImage: "/campus-round.jpg"
        }
      ]
    },
    whyNPIT: {
      title: "Why NPIT?",
      searchPlaceholder: "Search features, labs...",
      features: [
        {
          id: 1,
          icon: "MonitorCheck",
          title: "State-of-the-art Labs",
          desc: "Modern-the-art labs, engineering preparations and cutting-edge technologies for hands-on practice."
        },
        {
          id: 2,
          icon: "Handshake",
          title: "Industrial Partnerships",
          desc: "Connects international partnerships with leading industries, factories and regional technology hubs."
        },
        {
          id: 3,
          icon: "GraduationCap",
          title: "Expert Faculty",
          desc: "Expert faculty with international academic pedigrees and industrial expertise in engineering."
        }
      ]
    },
    programs: {
      title: "Academic Programs Grid",
      searchPlaceholder: "Search academic programs...",
      learnMore: "Learn More",
      list: [
        {
          id: "civil",
          name: "Civil Engineering",
          nameKhmer: "វិស្វកម្មសំណង់ស៊ីវិល",
          color: "from-amber-500 to-amber-600",
          cardBg: "bg-amber-500",
          bannerColor: "#f59e0b",
          icon: "HardHat",
          image: "/program-civil.jpg",
          degree: "Bachelor of Engineering (4 Years)",
          overview: "Equips students with structural design, geotechnical engineering, building information modeling (BIM), sustainable materials, and mega-infrastructure construction management.",
          career: "Structural Engineer, Project Manager, Site Engineer, Urban Planner",
          totalCredits: 135
        },
        {
          id: "it",
          name: "Information Technology",
          nameKhmer: "បច្ចេកវិទ្យាព័ត៌មាន",
          color: "from-blue-600 to-indigo-700",
          cardBg: "bg-blue-600",
          bannerColor: "#2563eb",
          icon: "Laptop",
          image: "/program-it.jpg",
          degree: "Bachelor of Science in IT (4 Years)",
          overview: "Focuses on modern software engineering, web & mobile full-stack architecture, network security, AI algorithms, cloud computing, and database management systems.",
          career: "Full-Stack Developer, DevOps Specialist, Cybersecurity Analyst, AI Engineer",
          totalCredits: 130
        },
        {
          id: "electrical",
          name: "Electrical & Electronics",
          nameKhmer: "វិស្វកម្មអគ្គិសនី និងអេឡិចត្រូនិក",
          color: "from-blue-700 to-blue-900",
          cardBg: "bg-[#0f2757]",
          bannerColor: "#0f2757",
          icon: "Cpu",
          image: "/program-electrical.jpg",
          degree: "Bachelor of Engineering (4 Years)",
          overview: "Covers high-voltage power grids, industrial automation, PCB embedded systems, IoT sensors, telecommunication networks, and renewable photovoltaic solar systems.",
          career: "Power Systems Engineer, Automation Specialist, Embedded Developer, Telecommunications Engineer",
          totalCredits: 134
        },
        {
          id: "mechanical",
          name: "Mechanical Engineering",
          nameKhmer: "វិស្វកម្មមេកានិច",
          color: "from-red-600 to-red-800",
          cardBg: "bg-red-700",
          bannerColor: "#b91c1c",
          icon: "Cog",
          image: "/program-mechanical.jpg",
          degree: "Bachelor of Engineering (4 Years)",
          overview: "Provides in-depth training in precision CNC machining, CAD/CAM design, mechatronics, thermodynamics, fluid dynamics, and robotics automation for manufacturing plants.",
          career: "Mechanical Design Engineer, Automotive Engineer, Plant Maintenance Manager, Robotics Engineer",
          totalCredits: 136
        }
      ]
    },
    news: {
      title: "News & Events",
      searchPlaceholder: "Search news & events...",
      featured: {
        date: "18 March 2023",
        title: "National Polytechnic Institute Techo Sen advancement & Academic Cooperation Summit",
        category: "Institute News",
        image: "/news-conference.jpg",
        description: "NPIT leadership welcomed international academic partners and government dignitaries to expand hands-on technical training, curriculum digitalization, and student scholarship opportunities across Cambodia."
      },
      list: [
        {
          id: 1,
          date: "7 May 2023",
          title: "National Polytechnic Institute Technology & Engineering Innovation Fair 2023",
          category: "Exhibition",
          image: "/news-mini1.jpg"
        },
        {
          id: 2,
          date: "1 May 2023",
          title: "Upcoming events in Main NPIT SEN Campus Auditorium on Renewable Energy",
          category: "Seminar",
          image: "/news-mini2.jpg"
        },
        {
          id: 3,
          date: "1 Nov 2023",
          title: "Upcoming events in Our Mechanical Engineering Center: Advanced CNC Workshop",
          category: "Workshop",
          image: "/program-mechanical.jpg"
        }
      ]
    },
    footer: {
      aboutTitle: "About NPIT",
      aboutText: "National Polytechnic Institute Techo Sen is a premier public polytechnic higher education institution established under the Ministry of Labour and Vocational Training of the Royal Government of Cambodia.",
      quickLinksTitle: "Quick Links",
      programsTitle: "Departments",
      contactTitle: "Campus Contact & Admissions",
      address: "National Road 21, Prek Samraong 3 Village, Sangkat Ta Khmau, Ta Khmau City, Kandal Province",
      phone: "098 444 495 / 092 735 263 / 016 475 544 / 012 216 169",
      email: "info@npit-edu.com / admission@npit.edu.kh",
      hours: "Monday - Friday: 7:30 AM - 5:00 PM | Sat - Sun: 8:00 AM - 4:30 PM",
      copyright: "© 2026 National Polytechnic Institute Techo Sen (NPIT). All Rights Reserved."
    }
  },
  kh: {
    instituteName: "NATIONAL POLYTECHNIC INSTITUTE TECHO SEN",
    instituteNameKhmer: "វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន",
    studentPortal: "ផតថលនិស្សិត",
    nav: [
      { id: "home", label: "ទំព័រដើម", href: "#home" },
      { 
        id: "about", 
        label: "អំពីវិទ្យាស្ថាន", 
        href: "#about",
        dropdown: [
          { label: "ចក្ខុវិស័យ និងបេសកកម្ម", href: "#about" },
          { label: "គណៈគ្រប់គ្រង", href: "#about" },
          { label: "ប្រវត្តិវិទ្យាស្ថាន", href: "#about" },
          { label: "ការធានាគុណភាពអប់រំ", href: "#about" }
        ]
      },
      { 
        id: "programs", 
        label: "កម្មវិធីសិក្សា", 
        href: "#programs",
        dropdown: [
          { label: "១. វិស្វកម្មឧស្សាហកម្ម", href: "#programs" },
          { label: "២. វិស្វកម្មអគ្គិសនី", href: "#programs" },
          { label: "៣. បរិក្ខារត្រជាក់", href: "#programs" },
          { label: "៤. វិស្វកម្មព័ត៌មានវិទ្យា", href: "#programs" },
          { label: "៥. យន្តសាស្ត្ររថយន្ត", href: "#programs" },
          { label: "៦. វិស្វកម្មសំណង់ស៊ីវិល", href: "#programs" },
          { label: "៧. សន្តិសុខសាយប័រ & ឌីជីថល", href: "#programs" },
          { label: "៨. អក្សរសាស្ត្រ, បសុព្យាបាល, គ្រប់គ្រង", href: "#programs" }
        ]
      },
      { 
        id: "admissions", 
        label: "ការចុះឈ្មោះចូលរៀន", 
        href: "#admissions",
        dropdown: [
          { label: "លក្ខខណ្ឌនៃការជ្រើសរើស", href: "#admissions" },
          { label: "អាហារូបករណ៍", href: "#admissions" },
          { label: "តម្លៃសិក្សា", href: "#admissions" }
        ]
      },
      { id: "research", label: "ការស្រាវជ្រាវ", href: "#research" },
      { id: "news", label: "ព័ត៌មាន និងព្រឹត្តិការណ៍", href: "#news" },
      { id: "contact", label: "ទំនាក់ទំនង", href: "#contact" },
    ],
    hero: {
      tagline: "BUILDING YOUR FUTURE IN",
      highlight: "TECHNOLOGY & ENGINEERING",
      khmerSubtitle: "កសាងអនាគតរបស់អ្នក ក្នុងវិស័យបច្ចេកវិទ្យា និងវិស្វកម្ម",
      applyBtn: "ចុះឈ្មោះសិក្សាអនឡាញ",
      exploreBtn: "ស្វែងយល់ពីមុខវិជ្ជា",
      slides: [
        {
          title: "ភាពឈានមុខគេក្នុងការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈ",
          subtitle: "បណ្តុះបណ្តាលវិស្វករជំនាន់ក្រោយប្រកបដោយជំនាញជាក់ស្តែង និងឧត្តមភាពវិជ្ជាជីវៈ។",
          image: "/hero-lab.jpg",
          roundImage: "/campus-round.jpg"
        }
      ]
    },
    whyNPIT: {
      title: "ហេតុអ្វីជ្រើសរើស NPIT?",
      searchPlaceholder: "ស្វែងរកលក្ខណៈពិសេស មន្ទីរពិសោធន៍...",
      features: [
        {
          id: 1,
          icon: "MonitorCheck",
          title: "មន្ទីរពិសោធន៍ទំនើប",
          desc: "បំពាក់ដោយឧបករណ៍ពិសោធន៍ទំនើបស្តង់ដារអន្តរជាតិ និងបច្ចេកវិទ្យាចុងក្រោយបំផុតសម្រាប់ការអនុវត្តជាក់ស្តែង។"
        },
        {
          id: 2,
          icon: "Handshake",
          title: "កិច្ចសហការជាមួយវិស័យឧស្សាហកម្ម",
          desc: "ផ្សារភ្ជាប់ទំនាក់ទំនងជាមួយក្រុមហ៊ុន រោងចក្រ និងសហគ្រាសជាតិ និងអន្តរជាតិឈានមុខគេ។"
        },
        {
          id: 3,
          icon: "GraduationCap",
          title: "សាស្ត្រាចារ្យជំនាញជាន់ខ្ពស់",
          desc: "ក្រុមសាស្ត្រាចារ្យ និងអ្នកជំនាញមានបទពិសោធន៍ខ្ពស់ទាំងក្នុង និងក្រៅប្រទេស។"
        }
      ]
    },
    programs: {
      title: "កម្មវិធីបណ្តុះបណ្តាលជំនាញវិស្វកម្ម",
      searchPlaceholder: "ស្វែងរកជំនាញសិក្សា...",
      learnMore: "ស្វែងយល់បន្ថែម",
      list: [
        {
          id: "civil",
          name: "Civil Engineering",
          nameKhmer: "វិស្វកម្មសំណង់ស៊ីវិល",
          color: "from-amber-500 to-amber-600",
          cardBg: "bg-amber-500",
          bannerColor: "#f59e0b",
          icon: "HardHat",
          image: "/program-civil.jpg",
          degree: "បរិញ្ញាបត្រវិស្វកម្ម (៤ ឆ្នាំ)",
          overview: "បណ្តុះបណ្តាលលើការគណនាប្លង់សំណង់ ការគ្រប់គ្រងការដ្ឋាន សម្ភារៈសំណង់ និងបច្ចេកវិទ្យា BIM។",
          career: "វិស្វករសំណង់, អ្នកគ្រប់គ្រងគម្រោង, វិស្វករការដ្ឋាន",
          totalCredits: 135
        },
        {
          id: "it",
          name: "Information Technology",
          nameKhmer: "បច្ចេកវិទ្យាព័ត៌មាន",
          color: "from-blue-600 to-indigo-700",
          cardBg: "bg-blue-600",
          bannerColor: "#2563eb",
          icon: "Laptop",
          image: "/program-it.jpg",
          degree: "បរិញ្ញាបត្រវិទ្យាសាស្ត្រព័ត៌មាន (៤ ឆ្នាំ)",
          overview: "ផ្តោតលើការអភិវឌ្ឍកម្មវិធី សុវត្ថិភាពប្រព័ន្ធបណ្តាញ បញ្ញាសិប្បនិម្មិត (AI) និង Cloud Computing។",
          career: "អ្នកសរសេរកូដ, អ្នកឯកទេសសន្តិសុខប្រព័ន្ធ, វិស្វករ AI",
          totalCredits: 130
        },
        {
          id: "electrical",
          name: "Electrical & Electronics",
          nameKhmer: "វិស្វកម្មអគ្គិសនី និងអេឡិចត្រូនិក",
          color: "from-blue-700 to-blue-900",
          cardBg: "bg-[#0f2757]",
          bannerColor: "#0f2757",
          icon: "Cpu",
          image: "/program-electrical.jpg",
          degree: "បរិញ្ញាបត្រវិស្វកម្ម (៤ ឆ្នាំ)",
          overview: "គ្របដណ្តប់លើបណ្តាញអគ្គិសនី ប្រព័ន្ធស្វ័យប្រវត្តិកម្មឧស្សាហកម្ម សៀគ្វីអេឡិចត្រូនិច និងថាមពលពន្លឺព្រះអាទិត្យ។",
          career: "វិស្វករអគ្គិសនី, អ្នកឯកទេសស្វ័យប្រវត្តិកម្ម, វិស្វករទូរគមនាគមន៍",
          totalCredits: 134
        },
        {
          id: "mechanical",
          name: "Mechanical Engineering",
          nameKhmer: "វិស្វកម្មមេកានិច",
          color: "from-red-600 to-red-800",
          cardBg: "bg-red-700",
          bannerColor: "#b91c1c",
          icon: "Cog",
          image: "/program-mechanical.jpg",
          degree: "បរិញ្ញាបត្រវិស្វកម្ម (៤ ឆ្នាំ)",
          overview: "បណ្តុះបណ្តាលលើម៉ាស៊ីន CNC ទំនើប ការរចនាគ្រឿងយន្ត CAD/CAM និងមេកាត្រូនិក។",
          career: "វិស្វករមេកានិច, វិស្វករយានយន្ត, អ្នកគ្រប់គ្រងរោងចក្រ",
          totalCredits: 136
        }
      ]
    },
    news: {
      title: "ព័ត៌មាន និងព្រឹត្តិការណ៍ថ្មីៗ",
      searchPlaceholder: "ស្វែងរកព័ត៌មាន...",
      featured: {
        date: "18 មីនា 2023",
        title: "វឌ្ឍនភាពនៃវិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន និងពិធីចុះអនុស្សរណៈយោគយល់គ្នា",
        category: "ព័ត៌មានវិទ្យាស្ថាន",
        image: "/news-conference.jpg",
        description: "គណៈគ្រប់គ្រងវិទ្យាស្ថាន NPIT បានទទួលស្វាគមន៍ដៃគូអន្តរជាតិ ដើម្បីពង្រីកការបណ្តុះបណ្តាលជំនាញបច្ចេកទេសជាក់ស្តែង និងអាហារូបករណ៍ដល់និស្សិតកម្ពុជា។"
      },
      list: [
        {
          id: 1,
          date: "7 ឧសភា 2023",
          title: "ពិព័រណ៍បច្ចេកវិទ្យា និងវិស្វកម្មប្រចាំឆ្នាំ ២០២៣ នៅវិទ្យាស្ថាន NPIT",
          category: "ពិព័រណ៍",
          image: "/news-mini1.jpg"
        },
        {
          id: 2,
          date: "1 ឧសភា 2023",
          title: "សិក្ខាសាលាស្តីពីថាមពលកកើតឡើងវិញ និងអនាគតបច្ចេកវិទ្យាបៃតង នៅសាលសន្និសីទ NPIT",
          category: "សិក្ខាសាលា",
          image: "/news-mini2.jpg"
        },
        {
          id: 3,
          date: "1 វិច្ឆិកា 2023",
          title: "វគ្គបណ្តុះបណ្តាលស្តីពីការប្រើប្រាស់ម៉ាស៊ីន CNC កម្រិតខ្ពស់ នៅមជ្ឈមណ្ឌលមេកានិច",
          category: "វគ្គបណ្តុះបណ្តាល",
          image: "/program-mechanical.jpg"
        }
      ]
    },
    footer: {
      aboutTitle: "អំពី NPIT",
      aboutText: "វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន គឺជាគ្រឹះស្ថានឧត្តមសិក្សាបច្ចេកទេសសាធារណៈឈានមុខគេ ស្ថិតក្រោមក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ នៃព្រះរាជាណាចក្រកម្ពុជា។",
      quickLinksTitle: "តំណភ្ជាប់រហ័ស",
      programsTitle: "ដេប៉ាតឺម៉ង់បណ្តុះបណ្តាល",
      contactTitle: "ទំនាក់ទំនងការិយាល័យចុះឈ្មោះ",
      address: "ផ្លូវជាតិលេខ២១ ភូមិព្រែកសំរោង៣ សង្កាត់តាខ្មៅ ក្រុងតាខ្មៅ ខេត្តកណ្តាល",
      phone: "098 444 495 / 092 735 263 / 016 475 544 / 012 216 169",
      email: "info@npit-edu.com / admission@npit.edu.kh",
      hours: "ច័ន្ទ - សុក្រ: ៧:៣០ ព្រឹក - ៥:០០ ល្ងាច | សៅរ៍ - អាទិត្យ: ៨:០០ ព្រឹក - ៤:៣០ ល្ងាច",
      copyright: "© ២០២៦ វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន (NPIT)។ រក្សាសិទ្ធិគ្រប់យ៉ាង។"
    }
  }
};
