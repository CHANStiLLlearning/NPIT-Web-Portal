export const admissionsDetails = {
  requirements: {
    id: "requirements",
    title: "Eligibility & Admission Requirements",
    titleKh: "លក្ខខណ្ឌនៃការជ្រើសរើស និងឯកសារតម្រូវ",
    badge: "Official Entry Criteria",
    badgeColor: "bg-blue-600 text-white",
    image: "/admission-requirements.jpg",
    summary: "Comprehensive eligibility criteria for all high school graduates, vocational certificate holders, and equivalent credentials applying for Associate and Bachelor degrees at NPIT.",
    summaryKh: "លក្ខខណ្ឌជ្រើសរើសទូទៅសម្រាប់សិស្សបញ្ចប់មធ្យមសិក្សាទុតិយភូមិ សញ្ញាបត្របច្ចេកទេស និងសញ្ញាបត្រសមមូល ដើម្បីបន្តការសិក្សាថ្នាក់បរិញ្ញាបត្ររង និងបរិញ្ញាបត្រនៅ NPIT។",
    criteria: [
      {
        title: "High School Diploma (Bac II)",
        titleKh: "សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប)",
        desc: "Must hold an official High School Diploma (Grade A, B, C, D, or E) or recognized equivalent issued by the Ministry of Education, Youth and Sport (MoEYS)."
      },
      {
        title: "TVET Technical Level 3/4 Equivalence",
        titleKh: "សញ្ញាបត្របច្ចេកទេស TVET កម្រិត ៣ ឬ ៤",
        desc: "Graduates of technical high schools or certified Level 3/4 National Competency Certificates are directly eligible for Higher Diploma admission."
      },
      {
        title: "Foundation Entrance Assessment",
        titleKh: "ការប្រឡងតេស្តសមត្ថភាពមូលដ្ឋាន",
        desc: "All candidates participate in a diagnostic evaluation in Basic Mathematics, Physics fundamentals, and technical problem solving."
      },
      {
        title: "Passion for Engineering",
        titleKh: "ចំណង់ចំណូលចិត្តលើបច្ចេកវិទ្យា",
        desc: "Demonstrated interest in practical problem solving, digital innovation, and hands-on laboratory work."
      }
    ],
    documents: [
      "Original High School Diploma (Bac II) or certified provisional pass certificate (2 copies)",
      "Official High School Academic Transcript showing grades 10 to 12 (1 copy)",
      "Original Cambodian National Identification Card or Passport (1 clear copy)",
      "Official Birth Certificate in Khmer (1 certified copy)",
      "Recent 4x6 cm formal color photos with white background and collared shirt (4 copies)",
      "Official NPIT Application Form completed either online or in-person at Admissions Hall"
    ],
    procedure: [
      "Step 1: Complete online application or visit the campus Admissions Desk along National Road 2.",
      "Step 2: Submit academic records and identification documents for verification.",
      "Step 3: Sit for the foundation assessment test or scholarship interview.",
      "Step 4: Receive formal Admission Offer Letter, select study shift (Morning, Afternoon, or Weekend), and finalize enrollment."
    ]
  },

  scholarships: {
    id: "scholarships",
    title: "National & Government Scholarships",
    titleKh: "អាហារូបករណ៍រដ្ឋាភិបាល និងការឧបត្ថម្ភ",
    badge: "100% & 50% State-Funded",
    badgeColor: "bg-amber-500 text-slate-950 font-bold",
    image: "/admission-scholarships.jpg",
    summary: "The Ministry of Labour and Vocational Training (MLVT) provides full and partial tuition scholarships for high-achieving high school graduates, women in STEM, and provincial students nationwide.",
    summaryKh: "ក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ ផ្តល់អាហារូបករណ៍ពេញលេញ ១០០% និង ៥០% សម្រាប់សិស្សឆ្នើម សិស្សនារី និងសិស្សមកពីបណ្តាខេត្តទូទាំងប្រទេស។",
    criteria: [
      {
        title: "Merit-Based National Quota (100% Funded)",
        titleKh: "កូតាសិស្សឆ្នើមទូទាំងប្រទេស (១០០%)",
        desc: "Full tuition waiver awarded to outstanding high school graduates who achieve Grade A, B, or C on the national Bac II examination."
      },
      {
        title: "Women in STEM Priority Quota",
        titleKh: "អាទិភាពសិស្សនារីក្នុងវិស័យវិស្វកម្ម",
        desc: "Special ministry-funded incentives, mentoring programs, and scholarship quotas reserved specifically for female applicants in Electrical, Mechanical, Civil, and IT engineering."
      },
      {
        title: "Provincial & Equity Scholarship",
        titleKh: "អាហារូបករណ៍សមធម៌ និងបណ្តាខេត្ត",
        desc: "Targeted support for students from provincial districts, low-income households, and remote communities, including priority dormitory allocation."
      }
    ],
    documents: [
      "High School Diploma copy showing Grade A, B, or C or high percentile ranking",
      "Poverty or Equity Card issued by Ministry of Planning (if applying for equity quota)",
      "Recommendation letter from high school principal or provincial training department",
      "National ID card and family book (សៀវភៅគ្រួសារ) copy"
    ],
    procedure: [
      "100% free tuition coverage throughout the entire duration of the degree (2 to 4 years)",
      "Zero laboratory, workshop, and equipment usage fees during all semesters",
      "Priority allocation for subsidized on-campus dormitory housing",
      "Direct placement in paid industrial internship programs with multinational enterprise partners",
      "Official National Scholar recognition certified by the Ministry of Labour and Vocational Training"
    ]
  },

  schedules: {
    id: "schedules",
    title: "Study Shifts & Academic Schedules",
    titleKh: "វេនសិក្សាបត់បែន និងពេលវេលា",
    badge: "Flexible Timetables",
    badgeColor: "bg-blue-800 text-white",
    image: "/admission-schedules.jpg",
    summary: "NPIT offers three flexible study shifts tailored for both full-time day students and working professionals, ensuring every learner can balance education and career.",
    summaryKh: "NPIT ផ្តល់ជូនវេនសិក្សាបត់បែនចំនួន ៣ ជម្រើស ដែលត្រូវបានរៀបចំឡើងសម្រាប់ទាំងសិស្សពេញម៉ោង និងបុគ្គលិកកំពុងបម្រើការងារ។",
    shifts: [
      {
        name: "Morning Shift (វេនព្រឹក)",
        hours: "07:30 AM – 11:30 AM",
        days: "Monday – Friday",
        desc: "Ideal for fresh high school graduates and full-time dedicated engineering students wanting hands-on daytime laboratory immersion."
      },
      {
        name: "Afternoon Shift (វេនរសៀល)",
        hours: "01:30 PM – 05:30 PM",
        days: "Monday – Friday",
        desc: "Well-suited for students engaging in part-time technical apprenticeships, research clubs, or independent work."
      },
      {
        name: "Weekend Shift (វេនចុងសប្តាហ៍)",
        hours: "08:00 AM – 05:00 PM",
        days: "Saturday & Sunday",
        desc: "Tailored specifically for factory technicians, engineers, civil servants, and company staff upgrading their formal degrees while working full-time."
      }
    ],
    documents: [
      "Access to all laboratories, fabrication machines, and CNC centers matching full-time standards",
      "Same nationally accredited degree diploma and curriculum as weekday programs",
      "Continuous digital learning access with recorded lectures on the NPIT Cloud LMS",
      "Direct academic advising and faculty consultation on both weekdays and weekends"
    ]
  },

  tuition: {
    id: "tuition",
    title: "Tuition, Fees & Payment Plans",
    titleKh: "តម្លៃសិក្សា និងការបង់ប្រាក់រំលោះ",
    badge: "Affordable Higher Ed",
    badgeColor: "bg-blue-700 text-white",
    image: "/admission-tuition.jpg",
    summary: "Transparent, state-subsidized tuition rates designed to make premier technical education accessible to all Cambodian youth with zero hidden laboratory fees.",
    summaryKh: "តម្លៃសិក្សាសមរម្យឧបត្ថម្ភធនដោយរដ្ឋ ដើម្បីធ្វើឱ្យការអប់រំបច្ចេកទេសឈានមុខគេអាចទៅដល់យុវជនកម្ពុជាគ្រប់រូប ដោយគ្មានការគិតថ្លៃលាក់កំបាំង។",
    feeTable: [
      {
        level: "Technical & Vocational Short Courses",
        levelKh: "វគ្គបណ្តុះបណ្តាលបច្ចេកទេសខ្លីៗ",
        duration: "3 – 6 Months",
        fee: "$150 – $250 / Course",
        note: "Includes all consumables, welding rods, PLC test components"
      },
      {
        level: "Higher Diploma / Associate Degree",
        levelKh: "ថ្នាក់សញ្ញាបត្រជាន់ខ្ពស់បច្ចេកវិទ្យា (បរិញ្ញាបត្ររង)",
        duration: "2 Years (4 Semesters)",
        fee: "$280 / Semester",
        note: "State-subsidized; includes full workshop & computer lab access"
      },
      {
        level: "Bachelor of Engineering (B.Eng)",
        levelKh: "ថ្នាក់បរិញ្ញាបត្រវិស្វកម្ម",
        duration: "4 Years (8 Semesters)",
        fee: "$380 / Semester",
        note: "Includes thesis guidance, BIM software licenses, lab test equipment"
      }
    ],
    documents: [
      "Payment Options: Lump-sum payment per semester (5% early registration rebate)",
      "Flexible Installment: 50% upon registration, 50% prior to midterm examinations (0% interest)",
      "Digital Banking: Instant QR payments via ABA Pay, ACLEDA mobile, and Wing Bank",
      "Laboratory Exemption: Zero equipment maintenance or tooling charges across all semesters"
    ]
  },

  degrees: {
    id: "degrees",
    title: "Associate & Bachelor Degree Pathways",
    titleKh: "ថ្នាក់បរិញ្ញាបត្ររង និងបរិញ្ញាបត្រវិស្វកម្ម",
    badge: "Degree Pathways",
    badgeColor: "bg-blue-600 text-white",
    image: "/admission-degrees.jpg",
    summary: "Two structured higher education qualifications providing deep mathematical theory, advanced engineering simulation, and heavy workshop mastery.",
    summaryKh: "កម្មវិធីឧត្តមសិក្សា ២ កម្រិត ដែលផ្តល់នូវទ្រឹស្តីវិស្វកម្មស៊ីជម្រៅ ការអនុវត្តជាក់ស្តែងក្នុងបន្ទប់ពិសោធន៍ និងការចុះកម្មសិក្សាផ្ទាល់។",
    structure: [
      {
        year: "Year 1: Foundation & STEM Engineering",
        desc: "Advanced Mathematics, Physics for Engineers, Technical Drawing, Introduction to C++/Python, Safety & Workshop Fundamentals."
      },
      {
        year: "Year 2: Specialized Core Disciplines",
        desc: "Electronic Circuits, Structural Mechanics, CAD/CAM Machining, Data Structures, Fluid Mechanics, Digital Logic Design."
      },
      {
        year: "Year 3: Advanced Systems & Industrial Applications",
        desc: "PLC & SCADA Automation, BIM Structural Modeling, Microcontroller IoT, Cloud Infrastructure, Machine Design."
      },
      {
        year: "Year 4: Capstone Engineering Thesis & Industrial Internship",
        desc: "6-month full-time enterprise internship placement, major engineering design capstone project, and defense."
      }
    ]
  },

  vocational: {
    id: "vocational",
    title: "Technical & Vocational Training (TVET)",
    titleKh: "វគ្គបណ្តុះបណ្តាលវិជ្ជាជីវៈ និងបច្ចេកទេស",
    badge: "Hands-on Mastery",
    badgeColor: "bg-red-700 text-white",
    image: "/admission-vocational.jpg",
    summary: "Focused, practical vocational modules delivering in-demand technical competence directly aligned with Cambodia's industrial manufacturing and infrastructure growth.",
    summaryKh: "វគ្គបណ្តុះបណ្តាលជំនាញជាក់លាក់ និងខ្លីៗដែលឆ្លើយតបយ៉ាងឆាប់រហ័សទៅនឹងតម្រូវការទីផ្សារការងារក្នុងរោងចក្រ និងសហគ្រាស។",
    courses: [
      {
        title: "Industrial PLC & Automation Programming",
        duration: "3 Months (Weekend / Evening)",
        desc: "Siemens S7-1200 and Mitsubishi FX5U PLC ladder logic programming, sensor wiring, inverter frequency control, and HMI touch panel development."
      },
      {
        title: "Precision CNC Milling & Lathe Machining",
        duration: "4 Months (Intensive Hands-on)",
        desc: "Mastercam CAD/CAM modeling, G-code toolpath generation, 3-axis CNC setup, precision measurement, and component prototyping."
      },
      {
        title: "Solar Photovoltaic (PV) Design & Installation",
        duration: "3 Months",
        desc: "Commercial & residential solar sizing, grid-tied and hybrid inverters, DC wiring safety standards, solar battery management systems."
      },
      {
        title: "Industrial Electrical Power & Motor Controls",
        duration: "3 Months",
        desc: "Three-phase distribution panels, magnetic contactor control circuits, Star-Delta starters, and factory electrical troubleshooting."
      }
    ]
  },

  transfer: {
    id: "transfer",
    title: "Transfer & International Students",
    titleKh: "និស្សិតផ្ទេរការសិក្សា និងនិស្សិតអន្តរជាតិ",
    badge: "Regional Mobility",
    badgeColor: "bg-amber-600 text-white",
    image: "/admission-transfer.jpg",
    summary: "Seamless credit transfer framework for students transferring from other accredited technical institutes across Cambodia and the ASEAN region.",
    summaryKh: "ក្របខ័ណ្ឌផ្ទេរក្រេឌីតសិក្សាដ៏ងាយស្រួល សម្រាប់និស្សិតដែលផ្លាស់ប្តូរមកពីគ្រឹះស្ថានបច្ចេកទេសផ្សេងៗក្នុង និងក្រៅប្រទេស។",
    guidelines: [
      {
        title: "Credit Equivalence Recognition",
        desc: "Transfer up to 50% of your total degree credits. Courses with grade C (GPA 2.50+) and matching syllabi are recognized directly."
      },
      {
        title: "International Student Support",
        desc: "Full visa sponsorship, English and Khmer language transitional courses, on-campus international housing, and cultural orientation."
      },
      {
        title: "ASEAN Polytechnic Mobility",
        desc: "NPIT participates in TVET student exchange agreements across Thailand, Vietnam, and Malaysia with reciprocal credit transfers."
      }
    ]
  }
};
