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
          { label: "Who We Are", href: "#about/who-we-are", desc: "Identity, polytechnic mission & values" },
          { label: "Vision & Mission", href: "#about/vision-mission", desc: "Strategic roadmap & quality goals" },
          { label: "Institute History & Milestones", href: "#about/history", desc: "Milestones from 2015 to present" },
          { label: "Leadership & Council", href: "#about/leadership", desc: "Director & executive faculty deans" },
          { label: "Explore Full Institute Overview", href: "#about", desc: "Comprehensive background of NPIT", isFullLink: true }
        ]
      },
      { 
        id: "programs", 
        label: "Academic Programs", 
        href: "#programs",
        isMega: true,
        dropdownGroups: [
          {
            title: "Higher Diploma (2 Years)",
            badge: "100% Scholarship",
            badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
            items: [
              { label: "Industrial Engineering", href: "#programs/industrial", code: "DIP-IE", tag: "Popular" },
              { label: "Electrical Engineering", href: "#programs/electrical", code: "ENG-EE" },
              { label: "Refrigeration & HVAC", href: "#programs/hvac", code: "DIP-HVAC" },
              { label: "IT & Software Engineering", href: "#programs/it", code: "TECH-IT", tag: "Popular" },
              { label: "Automotive Technology", href: "#programs/automotive", code: "DIP-AUTO" },
              { label: "Civil Engineering", href: "#programs/civil", code: "ENG-CE" },
              { label: "English Literature", href: "#programs/english", code: "DIP-ENG" },
              { label: "Veterinary Medicine", href: "#programs/veterinary", code: "DIP-VET" },
              { label: "Business Administration", href: "#programs/business", code: "DIP-BA" }
            ]
          },
          {
            title: "Bachelor of Technology (4 Years)",
            badge: "Night & Weekend",
            badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
            items: [
              { label: "Smart Digital & Cybersecurity", href: "#programs/cybersecurity", code: "BACH-CYBER", tag: "B.Tech" },
              { label: "Electrical Engineering", href: "#programs/electrical-beng", code: "BACH-EE", tag: "B.Tech" },
              { label: "HVAC & Thermal Systems", href: "#programs/hvac-beng", code: "BACH-HVAC", tag: "B.Tech" },
              { label: "Civil Engineering", href: "#programs/civil-beng", code: "BACH-CE", tag: "B.Tech" },
              { label: "Automotive Engineering", href: "#programs/automotive-beng", code: "BACH-AUTO", tag: "B.Tech" }
            ]
          }
        ],
        footerLink: { label: "Explore All 14 Degree & Diploma Programs", href: "#programs" }
      },
      { 
        id: "admissions", 
        label: "Admissions", 
        href: "#admissions",
        dropdown: [
          { label: "Eligibility & Requirements", href: "#admissions/requirements", desc: "Passed or failed Bac II directly accepted", badge: "Criteria" },
          { label: "100% Government Scholarships", href: "#admissions/scholarships", desc: "All 9 Higher Diploma majors 100% free", badge: "100% Free" },
          { label: "Tuition, Fees & Payment Plans", href: "#admissions/tuition", desc: "Subsidized fees & zero-interest installments", badge: "Subsidized" },
          { label: "Associate & Bachelor Pathways", href: "#admissions/degrees", desc: "Structured 2-year and 4-year technical degrees", badge: "Pathways" },
          { label: "TVET Short Vocational Courses", href: "#admissions/vocational", desc: "3-6 months practical technician courses", badge: "TVET" },
          { label: "Transfer & International Students", href: "#admissions/transfer", desc: "Accredited credit transfer framework", badge: "Transfer" },
          { label: "Apply Online for 2026-2027", href: "#apply", desc: "Fast-track your application today", isCta: true }
        ]
      },
      { 
        id: "research", 
        label: "Research", 
        href: "#research",
        dropdown: [
          { label: "Engineering & Robotics", href: "#research/robotics", desc: "AMRs, mechatronics & Industry 4.0 automation" },
          { label: "ICT & Digital Innovation", href: "#research/ict", desc: "Khmer NLP, AI models & cyber threat defense" },
          { label: "Applied Sciences & Materials", href: "#research/applied-sciences", desc: "Green geopolymer concrete & eco-filtration" },
          { label: "Renewable Energy & Smart Grids", href: "#research/energy", desc: "Solar microgrids & power distribution testing" },
          { label: "Explore All Research Facilities & Labs", href: "#research", isFullLink: true }
        ]
      },
      { 
        id: "news", 
        label: "News & Events", 
        href: "#news",
        dropdown: [
          { label: "Latest Announcements", href: "#news", desc: "Campus updates and admissions notifications" },
          { label: "Academic Calendar & Cohorts", href: "#news", desc: "Batch 1 (Nov 13, 2026) & Batch 2 (Jan 04, 2027)" },
          { label: "Competitions & Exhibitions", href: "#news", desc: "Student engineering projects and showcase events" }
        ]
      },
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
          { label: "យើងជានរណា", href: "#about/who-we-are", desc: "អត្តសញ្ញាណ និងគុណតម្លៃរួម" },
          { label: "ចក្ខុវិស័យ និងបេសកកម្ម", href: "#about/vision-mission", desc: "ទិសដៅ និងគោលដៅអប់រំបច្ចេកទេស" },
          { label: "ប្រវត្តិវិទ្យាស្ថាន និងសមិទ្ធផល", href: "#about/history", desc: "ព្រឹត្តិការណ៍សំខាន់ៗតាំងពីឆ្នាំ២០១៥" },
          { label: "គណៈគ្រប់គ្រងវិទ្យាស្ថាន", href: "#about/leadership", desc: "ថ្នាក់ដឹកនាំ និងព្រឹទ្ធបុរស" },
          { label: "ស្វែងយល់អំពី NPIT ទាំងអស់", href: "#about", desc: "ព័ត៌មានលម្អិតអំពីវិទ្យាស្ថាន", isFullLink: true }
        ]
      },
      { 
        id: "programs", 
        label: "កម្មវិធីសិក្សា", 
        href: "#programs",
        isMega: true,
        dropdownGroups: [
          {
            title: "កម្រិតសញ្ញាបត្រជាន់ខ្ពស់ (សិក្សា ២ឆ្នាំ)",
            badge: "អាហារូបករណ៍ ១០០%",
            badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
            items: [
              { label: "វិស្វកម្មឧស្សាហកម្ម", code: "DIP-IE", href: "#programs/industrial", tag: "ពេញនិយម" },
              { label: "វិស្វកម្មអគ្គិសនី", code: "ENG-EE", href: "#programs/electrical" },
              { label: "បរិក្ខារត្រជាក់", code: "DIP-HVAC", href: "#programs/hvac" },
              { label: "វិស្វកម្មព័ត៌មានវិទ្យា", code: "TECH-IT", href: "#programs/it", tag: "ពេញនិយម" },
              { label: "យន្តសាស្ត្ររថយន្ត", code: "DIP-AUTO", href: "#programs/automotive" },
              { label: "វិស្វកម្មសំណង់ស៊ីវិល", code: "ENG-CE", href: "#programs/civil" },
              { label: "អក្សរសាស្ត្រអង់គ្លេស", code: "DIP-ENG", href: "#programs/english" },
              { label: "បសុព្យាបាល", code: "DIP-VET", href: "#programs/veterinary" },
              { label: "គ្រប់គ្រងពាណិជ្ជកម្ម", code: "DIP-BA", href: "#programs/business" }
            ]
          },
          {
            title: "កម្រិតបរិញ្ញាបត្របច្ចេកទេស (សិក្សា ៤ឆ្នាំ)",
            badge: "វេនយប់ & ថ្ងៃសៅរ៍-អាទិត្យ",
            badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
            items: [
              { label: "ប្រព័ន្ធឌីជីថល & សន្តិសុខសាយប័រ", code: "BACH-CYBER", href: "#programs/cybersecurity", tag: "បរិញ្ញាបត្រ" },
              { label: "វិស្វកម្មអគ្គិសនី", code: "BACH-EE", href: "#programs/electrical-beng", tag: "បរិញ្ញាបត្រ" },
              { label: "វិស្វកម្មប្រព័ន្ធត្រជាក់ & កម្តៅ", code: "BACH-HVAC", href: "#programs/hvac-beng", tag: "បរិញ្ញាបត្រ" },
              { label: "វិស្វកម្មសំណង់ស៊ីវិល", code: "BACH-CE", href: "#programs/civil-beng", tag: "បរិញ្ញាបត្រ" },
              { label: "វិស្វកម្មរថយន្ត", code: "BACH-AUTO", href: "#programs/automotive-beng", tag: "បរិញ្ញាបត្រ" }
            ]
          }
        ],
        footerLink: { label: "ស្វែងយល់មុខវិជ្ជាទាំង ១៤ ជំនាញ", href: "#programs" }
      },
      { 
        id: "admissions", 
        label: "ការចុះឈ្មោះចូលរៀន", 
        href: "#admissions",
        dropdown: [
          { label: "លក្ខខណ្ឌនៃការជ្រើសរើស", href: "#admissions/requirements", desc: "ជាប់ ឬធ្លាក់បាក់ឌុប មានសិទ្ធិចុះឈ្មោះ", badge: "លក្ខខណ្ឌ" },
          { label: "អាហារូបករណ៍រដ្ឋ ១០០%", href: "#admissions/scholarships", desc: "អាហារូបករណ៍ ១០០% លើ ៩ មុខជំនាញ", badge: "ឥតគិតថ្លៃ" },
          { label: "តម្លៃសិក្សា & ការបង់ប្រាក់", href: "#admissions/tuition", desc: "តម្លៃសិក្សាសមរម្យឧបត្ថម្ភដោយរដ្ឋ", badge: "តម្លៃសិក្សា" },
          { label: "ថ្នាក់បរិញ្ញាបត្ររង & បរិញ្ញាបត្រ", href: "#admissions/degrees", desc: "រចនាសម្ព័ន្ធកម្មវិធីសិក្សា ២ឆ្នាំ និង ៤ឆ្នាំ", badge: "កម្រិតសិក្សា" },
          { label: "វគ្គបណ្តុះបណ្តាលវិជ្ជាជីវៈខ្លីៗ (TVET)", href: "#admissions/vocational", desc: "វគ្គខ្លី ៣-៦ ខែ បណ្តុះបណ្តាលអនុវត្តផ្ទាល់", badge: "TVET" },
          { label: "និស្សិតផ្ទេរការសិក្សា", href: "#admissions/transfer", desc: "ការផ្ទេរក្រេឌីតសិក្សា និងនិស្សិតអន្តរជាតិ", badge: "ផ្ទេរការសិក្សា" },
          { label: "ចុះឈ្មោះសិក្សាអនឡាញ ២០២៦-២០២៧", href: "#apply", desc: "ដាក់ពាក្យស្នើសុំចូលរៀនឥឡូវនេះ", isCta: true }
        ]
      },
      { 
        id: "research", 
        label: "ការស្រាវជ្រាវ", 
        href: "#research",
        dropdown: [
          { label: "វិស្វកម្ម និងរ៉ូបូត", href: "#research/robotics", desc: "ស្វ័យប្រវត្តិកម្ម & ឧស្សាហកម្ម ៤.០" },
          { label: "ព័ត៌មានវិទ្យា & នវានុវត្តន៍ឌីជីថល", href: "#research/ict", desc: "Khmer NLP, AI & សន្តិសុខសាយប័រ" },
          { label: "វិទ្យាសាស្ត្រអនុវត្ត & សម្ភារៈ", href: "#research/applied-sciences", desc: "បេតុងបៃតង និងចម្រោះទឹកសំណល់" },
          { label: "ថាមពលកកើតឡើងវិញ & Smart Grids", href: "#research/energy", desc: "ប្រព័ន្ធសូឡា និងបណ្តាញអគ្គិសនីឆ្លាតវៃ" },
          { label: "ស្វែងយល់ការស្រាវជ្រាវទាំងអស់", href: "#research", desc: "មជ្ឈមណ្ឌលពិសោធន៍ និងការស្រាវជ្រាវ", isFullLink: true }
        ]
      },
      { 
        id: "news", 
        label: "ព័ត៌មាន និងព្រឹត្តិការណ៍", 
        href: "#news",
        dropdown: [
          { label: "សេចក្តីជូនដំណឹងថ្មីៗ", href: "#news", desc: "ដំណឹងប្រចាំថ្ងៃ និងការចូលរៀន" },
          { label: "ប្រតិទិនសិក្សាផ្លូវការ", href: "#news", desc: "លើកទី១ (១៣ វិច្ឆិកា) & លើកទី២ (០៤ មករា)" },
          { label: "ការប្រកួតប្រជែង & ស្នាដៃនិស្សិត", href: "#news", desc: "គម្រោងមនុស្សយន្ត និងការតាំងពិព័រណ៍" }
        ]
      },
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
