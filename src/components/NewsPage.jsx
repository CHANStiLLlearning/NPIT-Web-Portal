import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Menu,
  X, 
  Share2, 
  ExternalLink,
  ZoomIn,
  Download,
  Check,
  Wrench,
  GraduationCap,
  Trophy,
  Award,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { getSiteNews } from '../services/siteContentService';


export default function NewsPage({ lang, onNavigate, onSelectNews }) {
  const isKh = lang === 'kh';
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryFilter, setGalleryFilter] = useState('Workshops');
  const [isGalleryMenuOpen, setIsGalleryMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const categories = [
    { id: 'All', label: isKh ? 'ទាំងអស់' : 'All' },
    { id: 'Academic', label: isKh ? 'ការសិក្សា' : 'Academic' },
    { id: 'Campus Life', label: isKh ? 'ជីវិតនិស្សិត' : 'Campus Life' },
    { id: 'Events', label: isKh ? 'ព្រឹត្តិការណ៍' : 'Events' },
    { id: 'Partnerships', label: isKh ? 'កិច្ចសហការ' : 'Partnerships' },
  ];

  const featuredNews = {
    id: 'feat-1',
    title: isKh 
      ? 'ការសម្ពោធដាក់ឱ្យដំណើរការមន្ទីរពិសោធន៍ STEM និងមនុស្សយន្តកម្រិតខ្ពស់' 
      : 'Inauguration of New Advanced STEM and Robotics Laboratory',
    category: 'Academic',
    categoryLabel: isKh ? 'ការសិក្សា' : 'Academic',
    image: '/news-inauguration.jpg',
    date: isKh ? 'ថ្ងៃទី ២៤ ខែតុលា ឆ្នាំ ២០២៣' : 'October 24, 2023',
    desc: isKh 
      ? 'វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន បានប្រារព្ធពិធីសម្ពោធជាផ្លូវការនូវមន្ទីរពិសោធន៍ STEM និងមនុស្សយន្តទំនើបបំផុត ដើម្បីលើកកម្ពស់ការអប់រំវិស្វកម្មអនុវត្តជាក់ស្តែង និងការស្រាវជ្រាវបច្ចេកវិទ្យា...' 
      : 'The National Polytechnic Institute Techo Sen has officially inaugurated its state-of-the-art STEM and robotics lab, aimed at fostering hands-on engineering education and research...',
    fullContent: 'The inauguration ceremony was presided over by leaders from the Ministry of Labour and Vocational Training (MLVT) along with international development partners. The new facility features cutting-edge robotic arms, automated manufacturing workstations, 3D printing equipment, and advanced microcontroller test benches, directly empowering over 1,500 engineering students each semester.'
  };

  const newsList = [
    {
      id: 'news-1',
      title: isKh 
        ? 'ការចុះហត្ថលេខាលើអនុស្សរណៈនៃការយោគយល់ (MoU) ជាមួយក្រុមហ៊ុនបច្ចេកវិទ្យាសកល' 
        : 'MoU Signed with Global Tech Company to Boost Internship Programs',
      category: 'Partnerships',
      categoryLabel: isKh ? 'កិច្ចសហការ' : 'Partnerships',
      image: '/news-mou.jpg',
      date: isKh ? 'ថ្ងៃទី ១២ ខែតុលា ឆ្នាំ ២០២៣' : 'October 12, 2023',
      desc: isKh
        ? 'កិច្ចសហការយុទ្ធសាស្ត្រក្នុងការផ្តល់ឱកាសចុះកម្មសិក្សា និងការងារជាក់ស្តែងដល់និស្សិតវិស្វកម្ម។'
        : 'Strategic collaboration providing exclusive direct internship pathways, co-op programs, and industrial mentoring for engineering students.',
      fullContent: 'This landmark agreement establishes an annual pipeline for top NPIT students to intern at multinational technological innovation hubs, receiving direct mentorship and priority recruitment upon graduation.'
    },
    {
      id: 'news-2',
      title: isKh 
        ? 'និស្សិត NPIT ឈ្នះជើងឯកការប្រកួតមនុស្សយន្តថ្នាក់ជាតិ ឆ្នាំ២០២៣' 
        : 'NPIT Students Win National Robotics Championship 2023',
      category: 'Academic',
      categoryLabel: isKh ? 'ការសិក្សា' : 'Academic',
      image: '/news-robotics.jpg',
      date: isKh ? 'ថ្ងៃទី ២៨ ខែកញ្ញា ឆ្នាំ ២០២៣' : 'September 28, 2023',
      desc: isKh
        ? 'ក្រុមមនុស្សយន្ត NPIT ទទួលបានចំណាត់ថ្នាក់លេខ១ ក្នុងការប្រកួតប្រជែងមនុស្សយន្តប្រចាំឆ្នាំ។'
        : 'The NPIT robotics team claimed first place at the National Polytechnic Robotics Competition with their autonomous obstacle-navigating rover.',
      fullContent: 'Demonstrating superior mechatronics design, sensor integration, and rapid firmware development, the NPIT robotics team outperformed competitors from across Cambodia to secure the prestigious 2023 trophy.'
    },
    {
      id: 'news-3',
      title: isKh 
        ? 'ទិវាស្វាគមន៍និស្សិតថ្មី ឆ្នាំ២០២៣៖ ស្វាគមន៍អ្នកជំនាន់ក្រោយនៃវិស្វករ' 
        : 'Orientation Day 2023: Welcoming our New Cohort of Engineers',
      category: 'Campus Life',
      categoryLabel: isKh ? 'ជីវិតនិស្សិត' : 'Campus Life',
      image: '/news-orientation.jpg',
      date: isKh ? 'ថ្ងៃទី ០៥ ខែកញ្ញា ឆ្នាំ ២០២៣' : 'September 05, 2023',
      desc: isKh
        ? 'ពិធីស្វាគមន៍និស្សិតឆ្នាំទី១ ជាមួយនឹងការណែនាំអំពីមន្ទីរពិសោធន៍ និងសកម្មភាពនានាក្នុងបរិវេណវិទ្យាស្ថាន។'
        : 'A lively campus gathering welcoming over 1,200 incoming freshmen, featuring campus tours, lab demonstrations, and faculty introductions.',
      fullContent: 'The orientation ceremony introduced newly enrolled students to their respective deans, student clubs, safety protocols in mechanical and electrical workshops, and library research facilities.'
    }
  ];

  const upcomingEvents = [
    {
      id: 'evt-1',
      day: '08',
      month: 'NOV',
      title: isKh ? 'ពិព័រណ៍ការងារប្រចាំឆ្នាំ ២០២៣' : 'Annual Career Fair 2023',
      time: '8:00 AM - 4:00 PM',
      location: isKh ? 'សាលធំនៃវិទ្យាស្ថាន' : 'Campus Main Hall',
      desc: isKh 
        ? 'ជួបជាមួយក្រុមហ៊ុនឧស្សាហកម្ម និងបច្ចេកវិទ្យាឈានមុខជាង ៥០ សម្រាប់ឱកាសការងារ និងកម្មសិក្សា។' 
        : 'Connect with over 50 leading industrial and tech companies for job and internship opportunities.'
    },
    {
      id: 'evt-2',
      day: '22',
      month: 'NOV',
      title: isKh ? 'សន្និសីទស្រាវជ្រាវអន្តរជាតិ' : 'International Research Symposium',
      time: '9:00 AM - 5:00 PM',
      location: isKh ? 'បន្ទប់សន្និសីទ A' : 'Conference Room A',
      desc: isKh 
        ? 'វាគ្មិនល្បីៗមកពីជុំវិញពិភពលោកជួបជុំគ្នា ដើម្បីពិភាក្សាអំពីវិស្វកម្មចីរភាព និងការរីកចម្រើននៃបច្ចេកវិទ្យា។' 
        : 'Renowned speakers from around the world gather to discuss sustainable engineering and technological advancements.'
    },
    {
      id: 'evt-3',
      day: '15',
      month: 'DEC',
      title: isKh ? 'ទិវានវានុវត្តន៍ និងសហគមន៍' : 'Community Outreach & Innovation Day',
      time: '8:30 AM - 3:00 PM',
      location: isKh ? 'ទីលានកណ្តាលវិទ្យាស្ថាន' : 'Campus Plaza',
      desc: isKh 
        ? 'ទស្សនាគម្រោងនវានុវត្តន៍របស់និស្សិត និងចូលរួមសកម្មភាពកសាងសហគមន៍ និងការតាំងពិព័រណ៍បច្ចេកវិទ្យា។' 
        : 'Come see innovative student projects and join our community-building and tech showcase activities.'
    }
  ];

  const galleryCategories = [
    { 
      id: 'Workshops', 
      label: isKh ? 'មន្ទីរពិសោធន៍ & អនុវត្ត' : 'Workshops & Labs', 
      desc: isKh ? 'ការអនុវត្តសៀគ្វី និងមន្ទីរពិសោធន៍' : 'Circuit prototyping & lab sessions',
      icon: Wrench 
    },
    { 
      id: 'Academic', 
      label: isKh ? 'ការសិក្សា & បង្រៀន' : 'Academic & Lectures', 
      desc: isKh ? 'ការបង្រៀនស្វ័យប្រវត្តិកម្ម និងមនុស្សយន្ត' : 'Automation & robotics presentations',
      icon: GraduationCap 
    },
    { 
      id: 'Campus Life', 
      label: isKh ? 'ជីវិតនិស្សិត & កីឡា' : 'Campus Life & Sports', 
      desc: isKh ? 'ការប្រកួតកីឡា និងការស្វាគមន៍និស្សិត' : 'Tournaments & student welcome',
      icon: Trophy 
    },
    { 
      id: 'Ceremonies', 
      label: isKh ? 'ពិធី & ពានរង្វាន់' : 'Ceremonies & Awards', 
      desc: isKh ? 'ពិធីផ្លូវការ និងការអបអរសាទរជើងឯក' : 'Inaugurations & championship awards',
      icon: Award 
    },
    { 
      id: 'All', 
      label: isKh ? 'កម្រងរូបភាពទាំងអស់' : 'All Highlights', 
      desc: isKh ? 'ទស្សនារូបភាពទាំងអស់' : 'View complete collection',
      icon: Layers 
    },
  ];

  const currentActiveCategory = galleryCategories.find(c => c.id === galleryFilter) || galleryCategories[0];

  const galleryImages = [
    { 
      id: 1, 
      src: '/gallery-1.jpg', 
      caption: 'Electronics Workshop & Circuit Laboratory Session',
      captionKh: 'សិក្ខាសាលាបច្ចេកទេស និងការអនុវត្តមន្ទីរពិសោធន៍អេឡិចត្រូនិក',
      category: 'Workshops',
      categoryLabel: isKh ? 'មន្ទីរពិសោធន៍ & អនុវត្ត' : 'Workshops & Labs',
      date: isKh ? 'តុលា ២០២៣' : 'October 2023',
      location: isKh ? 'មន្ទីរពិសោធន៍អេឡិចត្រូនិក អគារ C' : 'Electronics Lab, Building C'
    },
    { 
      id: 2, 
      src: '/gallery-2.jpg', 
      caption: 'Academic Lecture & Presentation on Automation & Robotics',
      captionKh: 'ការបង្រៀនលើមុខវិជ្ជាស្វ័យប្រវត្តិកម្ម និងមនុស្សយន្ត',
      category: 'Academic',
      categoryLabel: isKh ? 'ការសិក្សា & បង្រៀន' : 'Academic & Lectures',
      date: isKh ? 'កញ្ញា ២០២៣' : 'September 2023',
      location: isKh ? 'សាលសន្និសីទធំ NPIT' : 'NPIT Main Auditorium Hall'
    },
    { 
      id: 3, 
      src: '/gallery-3.jpg', 
      caption: 'Computer Software & Network Training Session',
      captionKh: 'ការបណ្តុះបណ្តាលវិស្វកម្មសូហ្វវែរ និងប្រព័ន្ធបណ្តាញកុំព្យូទ័រ',
      category: 'Workshops',
      categoryLabel: isKh ? 'មន្ទីរពិសោធន៍ & អនុវត្ត' : 'Workshops & Labs',
      date: isKh ? 'តុលា ២០២៣' : 'October 2023',
      location: isKh ? 'មន្ទីរពិសោធន៍ប្រព័ន្ធបណ្តាញ និង Cloud' : 'Networking & Systems Lab'
    },
    { 
      id: 4, 
      src: '/gallery-4.jpg', 
      caption: 'National Ceremony & Ribbon Cutting Dignitaries at NPIT',
      captionKh: 'ពិធីកាត់ខ្សែបូសម្ពោធជាផ្លូវការនៃវិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន',
      category: 'Ceremonies',
      categoryLabel: isKh ? 'ពិធី & ពានរង្វាន់' : 'Ceremonies & Awards',
      date: isKh ? 'វិច្ឆិកា ២០២៣' : 'November 2023',
      location: isKh ? 'ទីធ្លាធំ NPIT Grand Plaza' : 'NPIT Grand Plaza'
    },
    { 
      id: 5, 
      src: '/gallery-5.jpg', 
      caption: 'Campus Athletics & Friendly Soccer Tournament',
      captionKh: 'ការប្រកួតកីឡាបាល់ទាត់មិត្តភាពនិស្សិត NPIT',
      category: 'Campus Life',
      categoryLabel: isKh ? 'ជីវិតនិស្សិត & កីឡា' : 'Campus Life & Sports',
      date: isKh ? 'សីហា ២០២៣' : 'August 2023',
      location: isKh ? 'ពហុកីឡដ្ឋាននិស្សិត NPIT' : 'NPIT Student Sports Arena'
    },
    { 
      id: 6, 
      src: '/gallery-6.jpg', 
      caption: 'Electronics Circuit Design & Student Teamwork',
      captionKh: 'ការអនុវត្តសៀគ្វីអេឡិចត្រូនិច និងការងារជាក្រុមរបស់និស្សិត',
      category: 'Workshops',
      categoryLabel: isKh ? 'មន្ទីរពិសោធន៍ & អនុវត្ត' : 'Workshops & Labs',
      date: isKh ? 'កក្កដា ២០២៣' : 'July 2023',
      location: isKh ? 'រោងជាងគំរូសៀគ្វីអគ្គិសនី' : 'Circuit Prototyping Workshop'
    },
    { 
      id: 7, 
      src: '/gallery-7.jpg', 
      caption: 'Freshmen Welcome Cohort & Faculty Commemorative Assembly',
      captionKh: 'ទិវាស្វាគមន៍និស្សិតថ្មី និងថ្នាក់ដឹកនាំមហាវិទ្យាល័យ NPIT',
      category: 'Campus Life',
      categoryLabel: isKh ? 'ជីវិតនិស្សិត & កីឡា' : 'Campus Life & Sports',
      date: isKh ? 'តុលា ២០២៣' : 'October 2023',
      location: isKh ? 'អគាររដ្ឋបាលកណ្តាល NPIT' : 'NPIT Administration Center'
    },
    { 
      id: 8, 
      src: '/gallery-8.jpg', 
      caption: 'National Robotics Grand Champions Trophy Celebration',
      captionKh: 'អបអរសាទរជើងឯកមនុស្សយន្តថ្នាក់ជាតិ Grand Champion របស់ NPIT',
      category: 'Ceremonies',
      categoryLabel: isKh ? 'ពិធី & ពានរង្វាន់' : 'Ceremonies & Awards',
      date: isKh ? 'ធ្នូ ២០២៣' : 'December 2023',
      location: isKh ? 'សាលមហោស្រពជាតិ' : 'National STEM Arena'
    }
  ];

  // Gallery filtering logic
  const filteredGallery = galleryFilter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === galleryFilter);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredGallery.length - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < filteredGallery.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredGallery.length - 1));
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev < filteredGallery.length - 1 ? prev + 1 : 0));
  };

  const handleCopyLink = (img, e) => {
    e?.stopPropagation();
    const url = `${window.location.origin}${img.src}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  const handleDownload = (img, e) => {
    e?.stopPropagation();
    const a = document.createElement('a');
    a.href = img.src;
    a.download = `NPIT-Gallery-${img.id}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Dynamic news merge
  const dynamicNews = getSiteNews()
    .filter(n => !['inauguration', 'mou', 'robotics', 'orientation', 'cooperation-summit', 'innovation-fair'].includes(n.id))
    .map(n => ({
      id: n.id,
      title: isKh && n.titleKh ? n.titleKh : n.title,
      category: n.category || 'Academic',
      categoryLabel: isKh ? (n.categoryKh || 'ការសិក្សា') : (n.category || 'Academic'),
      image: n.image || '/news-inauguration.jpg',
      date: isKh && n.dateKh ? n.dateKh : n.date,
      desc: isKh && n.descKh ? n.descKh : n.desc,
      fullContent: n.summary || n.desc
    }));

  const fullNewsList = [...dynamicNews, ...newsList];

  // Filtering
  const allArticles = [featuredNews, ...fullNewsList];
  const filteredList = fullNewsList.filter(item => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });


  const featuredMatches = (activeCategory === 'All' || featuredNews.category === activeCategory) &&
    (featuredNews.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     featuredNews.desc.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-white">

      {/* 1. Hero Banner Matching Reference Mockup */}
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[380px] md:min-h-[440px] flex items-center">
        {/* Aerial Campus Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/about-campus.jpg" 
            alt="National Polytechnic Institute Techo Sen Campus" 
            className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="max-w-2xl text-white">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-white">
              NEWS & EVENTS
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              {isKh 
                ? "ទទួលបានព័ត៌មានថ្មីៗអំពីព្រឹត្តិការណ៍ សមិទ្ធផល និងសេចក្តីប្រកាសសំខាន់ៗពីសហគមន៍វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន។"
                : "Stay updated with the latest happenings, achievements, and announcements from our vibrant community."}
            </p>

            {/* Breadcrumb Matching Reference */}
            <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm">
              <button 
                type="button"
                onClick={() => onNavigate ? onNavigate('home', '#home') : window.location.hash = '#home'}
                className="text-[#e5a035] hover:text-amber-300 font-medium transition-colors cursor-pointer"
              >
                {isKh ? "ទំព័រដើម" : "Home"}
              </button>
              <span className="text-slate-400 font-light">&gt;</span>
              <span className="text-white font-medium">
                {isKh ? "ព័ត៌មាន និងព្រឹត្តិការណ៍" : "News & Events"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Latest News & Announcements Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Title on Left, Search on Right */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Latest News & Announcements
              </h2>
              {isKh && (
                <p className="text-lg font-bold font-khmer text-slate-700 mt-1">
                  ព័ត៌មាន និងសេចក្តីប្រកាសចុងក្រោយ
                </p>
              )}
            </div>

            {/* Search Input Bar */}
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isKh ? "ស្វែងរក..." : "Search..."}
                  className="w-48 sm:w-64 border border-slate-300 rounded-l-md px-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-700 text-slate-800"
                />
              </div>
              <button
                type="button"
                aria-label="Search"
                className="bg-[#244b8a] hover:bg-[#1a3869] text-white px-3 py-2 rounded-r-md transition-colors cursor-pointer flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#244b8a] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Content Grid: 1 Large Card Left + 3 Stacked Cards Right */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Featured News Card (7 Columns) */}
            <div className="lg:col-span-7">
              {featuredMatches ? (
                <div 
                  onClick={() => onSelectNews && onSelectNews(featuredNews)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-100">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#244b8a] transition-colors leading-snug">
                      {featuredNews.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {featuredNews.desc}
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-500 font-medium">
                        {featuredNews.date}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectNews && onSelectNews(featuredNews);
                        }}
                        className="font-semibold text-slate-900 group-hover:text-[#244b8a] inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isKh ? "អានបន្ថែម" : "Read More"}</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  {isKh ? "មិនមានព័ត៌មានលេចធ្លោស្របតាមការស្វែងរកទេ" : "No featured news matches your current filter."}
                </div>
              )}
            </div>

            {/* Right Side 3 Stacked Cards (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {filteredList.map((news) => (
                <div
                  key={news.id}
                  onClick={() => onSelectNews && onSelectNews(news)}
                  className="bg-white rounded-xl border border-slate-200 p-3 sm:p-3.5 flex gap-4 items-center hover:shadow-md transition-all duration-200 group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-28 sm:w-32 h-20 sm:h-22 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#244b8a] transition-colors line-clamp-2 leading-snug">
                      {news.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-500 font-medium">
                      {news.date}
                    </p>
                  </div>
                </div>
              ))}

              {filteredList.length === 0 && (
                <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  {isKh ? "រកមិនឃើញព័ត៌មានទេ" : "No news articles found."}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 3. Upcoming Events Section Matching Mockup */}
      <section className="py-14 md:py-20 bg-[#f0f4f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Title Left, "View Calendar" Right */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Upcoming Events
              </h2>
              {isKh && (
                <p className="text-lg font-bold font-khmer text-slate-700 mt-1">
                  ព្រឹត្តិការណ៍នាពេលខាងមុខ
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsCalendarOpen(true)}
              className="bg-[#244b8a] hover:bg-[#1a3869] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
            >
              {isKh ? "មើលប្រតិទិន" : "View Calendar"}
            </button>
          </div>

          {/* 3 Event Cards in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <div 
                key={evt.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Date Badge + Title */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-14 bg-[#244b8a] text-white rounded-lg flex flex-col items-center justify-center shrink-0 shadow-xs">
                      <span className="text-lg font-extrabold leading-none">{evt.day}</span>
                      <span className="text-[10px] font-bold tracking-wider leading-none mt-1">{evt.month}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {evt.title}
                    </h3>
                  </div>

                  {/* Meta: Time & Location */}
                  <div className="mt-4 text-[11px] sm:text-xs text-slate-600 space-y-1">
                    <p>
                      <strong className="text-slate-900">Time:</strong> {evt.time} | <strong className="text-slate-900">Location:</strong> {evt.location}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {evt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Highlights in Pictures Section with Rich Interactive Logic */}
      <section className="py-14 md:py-20 bg-slate-50/70 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-[#1b4b9b] text-xs font-bold uppercase tracking-wider mb-2">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{isKh ? 'កម្រងរូបភាពផ្លូវការ' : 'Official Photo Gallery'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Highlights in Pictures
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                {isKh 
                  ? 'ទស្សនាសកម្មភាពជាក់ស្តែងក្នុងបន្ទប់ពិសោធន៍ ការបង្រៀន ពិធីផ្លូវការ និងការរស់នៅរបស់និស្សិត NPIT' 
                  : 'Glimpses of cutting-edge laboratory training, distinguished lectures, ceremonies, and dynamic campus life.'}
              </p>
            </div>

            {/* Photo count indicator */}
            <div className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs shrink-0 self-start md:self-auto">
              {isKh 
                ? `បង្ហាញ ${filteredGallery.length} រូបភាព` 
                : `Showing ${filteredGallery.length} photos`}
            </div>
          </div>

          {/* Burger Style Category Selector Bar */}
          <div className="relative mb-8 z-30">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xs">
              
              {/* Left: Burger Menu Toggle Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGalleryMenuOpen(!isGalleryMenuOpen)}
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#1b4b9b] hover:bg-[#143a79] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-900/20 transition-all cursor-pointer group"
                >
                  {/* 3-bar Hamburger Icon */}
                  <div className="w-4 h-3.5 flex flex-col justify-between py-0.5">
                    <span className={`w-full h-0.5 bg-white rounded-full transition-transform duration-200 ${isGalleryMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                    <span className={`w-full h-0.5 bg-white rounded-full transition-opacity duration-200 ${isGalleryMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`w-full h-0.5 bg-white rounded-full transition-transform duration-200 ${isGalleryMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                  </div>

                  <span>{isKh ? 'ប្រភេទរូបភាព' : 'Categories'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isGalleryMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Burger Dropdown Menu */}
                {isGalleryMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setIsGalleryMenuOpen(false)}
                    />

                    <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                          {isKh ? 'ជ្រើសរើសប្រភេទរូបភាព' : 'Select Photo Category'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsGalleryMenuOpen(false)}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="py-1 space-y-1">
                        {galleryCategories.map((cat) => {
                          const count = cat.id === 'All' 
                            ? galleryImages.length 
                            : galleryImages.filter(g => g.category === cat.id).length;
                          const isActive = galleryFilter === cat.id;
                          const CatIcon = cat.icon;

                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => {
                                setGalleryFilter(cat.id);
                                setIsGalleryMenuOpen(false);
                              }}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer text-left ${
                                isActive 
                                  ? 'bg-blue-50/90 text-[#1b4b9b] font-bold border border-blue-200' 
                                  : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                  isActive ? 'bg-[#1b4b9b] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  <CatIcon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs sm:text-sm font-bold truncate leading-tight">
                                    {cat.label}
                                  </p>
                                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                    {cat.desc}
                                  </p>
                                </div>
                              </div>

                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ml-2 ${
                                isActive 
                                  ? 'bg-[#1b4b9b] text-white shadow-xs' 
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right: Active Category Display Pill */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline font-medium">
                  {isKh ? 'ប្រភេទកំពុងមើល:' : 'Current Filter:'}
                </span>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-[#1b4b9b]"></span>
                  <span>{currentActiveCategory?.label || 'Workshops & Labs'}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#1b4b9b] text-white text-[10px] font-bold">
                    {filteredGallery.length}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* 4x2 Responsive Grid of Photos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
            {filteredGallery.map((img, idx) => (
              <div 
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200/70 hover:-translate-y-1"
              >
                <img 
                  src={img.src} 
                  alt={img.caption} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Subtle top badge for category */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900/70 backdrop-blur-md text-white border border-white/20 shadow-xs">
                    {img.categoryLabel}
                  </span>
                </div>

                {/* Hover overlay with smooth gradient, caption, location and zoom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4 text-white z-10">
                  <div className="flex justify-end">
                    <span className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-sm">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm font-bold line-clamp-2 leading-snug drop-shadow-sm">
                      {isKh ? img.captionKh : img.caption}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-blue-200 font-medium">
                      <span>{img.date}</span>
                      <span>•</span>
                      <span className="truncate">{img.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state if no images match filter */}
          {filteredGallery.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                {isKh ? 'មិនមានរូបភាពក្នុងប្រភេទទិន្នន័យនេះទេ' : 'No photos in this category'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {isKh 
                  ? 'សូមជ្រើសរើសប្រភេទផ្សេងទៀត ឬចុចទាំងអស់ដើម្បីទស្សនាកម្រងរូបភាពទាំងមូល' 
                  : 'Please pick another category or click All to view the full gallery.'}
              </p>
              <button
                type="button"
                onClick={() => setGalleryFilter('All')}
                className="mt-4 px-4 py-2 rounded-xl bg-[#1b4b9b] text-white text-xs font-bold"
              >
                {isKh ? 'បង្ហាញទាំងអស់' : 'Show All Photos'}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Interactive Lightbox Modal with Carousel Logic */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (() => {
        const currentImg = filteredGallery[lightboxIndex];
        return (
          <div 
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex flex-col justify-between p-2 sm:p-4 md:p-6 bg-slate-950/92 backdrop-blur-md animate-in fade-in duration-200 select-none"
          >
            {/* Top Bar with Counter, Category, and Action Buttons */}
            <div 
              className="flex items-center justify-between text-white py-2 px-3 sm:px-4 max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
                  {currentImg.categoryLabel}
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  {isKh 
                    ? `រូបភាពទី ${lightboxIndex + 1} នៃ ${filteredGallery.length}` 
                    : `Photo ${lightboxIndex + 1} of ${filteredGallery.length}`}
                </span>
              </div>

              {/* Action Buttons: Copy link, Download, Close */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleCopyLink(currentImg, e)}
                  title={isKh ? 'ចម្លងតំណភ្ជាប់' : 'Copy Image Link'}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-amber-400" />
                      <span className="hidden sm:inline text-amber-400">{isKh ? 'បានចម្លង!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{isKh ? 'ចែករំលែក' : 'Share'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDownload(currentImg, e)}
                  title={isKh ? 'ទាញយករូបភាព' : 'Download Photo'}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">{isKh ? 'ទាញយក' : 'Download'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-600/80 text-white transition-colors ml-1 cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Stage with Next & Prev Buttons */}
            <div 
              className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-auto min-h-0 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              {filteredGallery.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3.5 rounded-full bg-slate-900/70 hover:bg-blue-600 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/20 cursor-pointer"
                  title="Previous (←)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Main Photo Display */}
              <div className="relative max-h-full max-w-full flex items-center justify-center">
                <img 
                  src={currentImg.src} 
                  alt={currentImg.caption} 
                  className="max-h-[62vh] sm:max-h-[66vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
                />
              </div>

              {/* Next Button */}
              {filteredGallery.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3.5 rounded-full bg-slate-900/70 hover:bg-blue-600 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/20 cursor-pointer"
                  title="Next (→)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Metadata */}
            <div 
              className="max-w-4xl w-full mx-auto text-center px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide">
                {currentImg.caption}
              </h3>
              {currentImg.captionKh && (
                <p className="text-xs sm:text-sm font-semibold font-khmer text-amber-400 mt-0.5">
                  {currentImg.captionKh}
                </p>
              )}
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-400 mt-1.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{currentImg.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{currentImg.date}</span>
                </span>
              </div>
            </div>

            {/* Bottom Thumbnail Strip */}
            {filteredGallery.length > 1 && (
              <div 
                className="max-w-4xl w-full mx-auto pt-2 pb-1 overflow-x-auto flex items-center justify-center gap-2 px-2 scrollbar-none"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredGallery.map((thumb, idx) => {
                  const isThumbActive = idx === lightboxIndex;
                  return (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className={`relative w-12 sm:w-16 h-9 sm:h-11 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer ${
                        isThumbActive 
                          ? 'ring-2 ring-blue-500 scale-105 opacity-100 shadow-md shadow-blue-500/30' 
                          : 'opacity-40 hover:opacity-80 scale-95'
                      }`}
                    >
                      <img 
                        src={thumb.src} 
                        alt={thumb.caption} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Keyboard shortcut helper */}
            <div className="text-center text-[10px] text-slate-500 pb-1">
              {isKh 
                ? 'ប្រើគ្រាប់ចុច ← និង → ដើម្បីប្តូររូបភាព • Esc ដើម្បីបិទ' 
                : 'Use ← and → arrow keys to navigate • Esc to close'}
            </div>

          </div>
        );
      })()}

      {/* Calendar View Dialog */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#1b4b9b] text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">NPIT Academic & Events Calendar</h3>
                <p className="text-xs text-blue-200">Academic Year 2023 - 2024</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="text-white hover:text-blue-200 p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#244b8a] text-white rounded-md flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-bold leading-none">{evt.day}</span>
                    <span className="text-[8px] font-bold leading-none mt-0.5">{evt.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{evt.title}</h4>
                    <p className="text-[11px] text-slate-500">{evt.time} • {evt.location}</p>
                  </div>
                </div>
              ))}
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 text-xs text-blue-900">
                📌 Note: Examination schedules, public holidays, and national technical symposiums are synchronized with the Ministry of Labour and Vocational Training (MLVT) official calendar.
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="bg-[#244b8a] hover:bg-[#1a3869] text-white px-5 py-2 rounded-xl text-xs font-semibold"
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
