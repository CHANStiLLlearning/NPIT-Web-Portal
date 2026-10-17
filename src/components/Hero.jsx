import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Award } from 'lucide-react';

export default function Hero({ heroData, onOpenApply, onExploreClick, lang = 'en' }) {
  const isKh = lang === 'kh';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 'slide-1',
      image: '/hero-lab.jpg',
      badge: isKh ? '🎓 បើកទទួលពាក្យចុះឈ្មោះឆ្នាំ ២០២៦-២០២៧' : '🎓 Admissions 2026-2027 Open Now',
      badgeSub: isKh ? 'អាហារូបករណ៍រដ្ឋ ១០០%' : '100% State Scholarships',
      tagline: isKh ? 'កសាងអនាគតរបស់អ្នកក្នុងវិស័យ' : 'BUILDING YOUR FUTURE IN',
      highlight: isKh ? 'បច្ចេកវិទ្យា និងវិស្វកម្ម' : 'TECHNOLOGY & ENGINEERING',
      subtitle: isKh 
        ? 'បណ្តុះបណ្តាលវិស្វករជំនាន់ក្រោយជាមួយនឹងជំនាញជាក់ស្តែង មន្ទីរពិសោធន៍បច្ចេកវិទ្យាខ្ពស់ និងការទទួលស្គាល់កម្រិតជាតិ។'
        : 'Empowering next-generation engineers with industry-driven skills, world-class high-tech laboratories, and practical mastery.',
      stats: isKh ? 'និស្សិតជាង ១,៥០០ នាក់' : '1,500+ Active Students'
    },
    {
      id: 'slide-2',
      image: '/news-inauguration.jpg',
      badge: isKh ? '🤖 មន្ទីរពិសោធន៍មនុស្សយន្តឧស្សាហកម្មកម្រិតខ្ពស់' : '🤖 Advanced STEM & Robotics Lab',
      badgeSub: isKh ? 'ឧបករណ៍ស្តង់ដារ ៤.០' : 'Industry 4.0 Standard',
      tagline: isKh ? 'ការបង្កើតថ្មីតាមរយៈការអនុវត្តជាក់ស្តែង' : 'INNOVATING THROUGH HANDS-ON',
      highlight: isKh ? 'មនុស្សយន្ត និងស្វ័យប្រវត្តិកម្ម' : 'ROBOTICS & AUTOMATION',
      subtitle: isKh 
        ? 'បំពាក់ដោយដៃមនុស្សយន្តឧស្សាហកម្ម ៦-អ័ក្ស ម៉ាស៊ីន CNC ទំនើប និងប្រព័ន្ធគ្រប់គ្រងឆ្លាតវៃសម្រាប់រោងចក្រជំនាន់ថ្មី។'
        : 'Equipped with heavy industrial 6-axis robot arms, precision CNC machining beds, and smart automation systems.',
      stats: isKh ? '១៨+ មន្ទីរពិសោធន៍ទំនើប' : '18+ High-Tech Labs'
    },
    {
      id: 'slide-3',
      image: '/admission-scholarships.jpg',
      badge: isKh ? '🏆 អាហារូបករណ៍រដ្ឋពេញលេញ ១០០% និង ៥០%' : '🏆 100% & 50% State-Funded Scholarships',
      badgeSub: isKh ? 'ឧបត្ថម្ភដោយ MLVT' : 'Sponsored by MLVT',
      tagline: isKh ? 'ឱកាសឆ្ពោះទៅរកឧត្តមភាពវិជ្ជាជីវៈ' : 'OPPORTUNITY FOR EXCELLENCE',
      highlight: isKh ? 'អត្រាការងារជោគជ័យ ៩៤%' : '94% GRADUATE EMPLOYMENT',
      subtitle: isKh 
        ? 'ភាពជាដៃគូយុទ្ធសាស្ត្រជាមួយក្រុមហ៊ុនឧស្សាហកម្មជាង ៤០ ធានានូវកម្មសិក្សា និងការងារជាក់ស្តែងភ្លាមៗក្រោយបញ្ចប់ការសិក្សា។'
        : 'Strategic partnerships with 40+ leading enterprises guaranteeing paid internships, co-op mentoring, and direct career placement.',
      stats: isKh ? 'ដៃគូក្រុមហ៊ុន ៤០+' : '40+ Industry Partners'
    }
  ];

  // Auto carousel effect with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  const activeSlide = slides[currentSlide];

  return (
    <section 
      id="home" 
      className="relative w-full overflow-hidden bg-slate-950 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center">
        
        {/* Background Image Layers with Smooth Transitions */}
        {slides.map((slide, idx) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.highlight} 
              className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                idx === currentSlide ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Cinematic Multilayer Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/85 md:from-slate-950/85 md:via-slate-900/65 md:to-slate-950/95" />
            <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Spacer on desktop to showcase the students working */}
            <div className="hidden lg:block lg:col-span-4" />

            {/* Right Hero Text & Call to Action (Col 8) */}
            <div className="lg:col-span-8 flex flex-col items-start lg:pl-6 text-white">
              
              {/* Interactive Live Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 backdrop-blur-md text-blue-200 text-xs sm:text-sm font-semibold mb-5 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{activeSlide.badge}</span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="hidden sm:inline text-amber-300 font-bold">{activeSlide.badgeSub}</span>
              </div>

              {/* Tagline & Main Highlight */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight uppercase font-sans drop-shadow-md">
                <span className="block text-slate-100 font-medium">
                  {activeSlide.tagline}
                </span>
                <span className="block text-amber-400 mt-1.5 drop-shadow-sm font-black">
                  {activeSlide.highlight}
                </span>
              </h1>

              {/* Subtitle with Khmer Support */}
              <p className="mt-4 text-base sm:text-lg md:text-xl font-khmer font-normal text-slate-200 leading-relaxed max-w-2xl drop-shadow-xs">
                {activeSlide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                
                {/* Apply Online Button (Gold Pill) */}
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-amber-500/30 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
                >
                  <span>{heroData?.applyBtn || (isKh ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Apply Online')}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                </button>

                {/* Explore Programs Button (Translucent Pill) */}
                <a
                  href="#programs"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onExploreClick) onExploreClick();
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium border border-white/30 hover:border-white px-7 py-3.5 rounded-full backdrop-blur-md shadow-md transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-blue-300" />
                  <span>{heroData?.exploreBtn || (isKh ? 'ស្វែងយល់កម្មវិធីសិក្សា' : 'Explore Programs')}</span>
                </a>

                {/* Live Stat Indicator on Desktop */}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm text-xs font-semibold text-slate-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeSlide.stats}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Carousel Arrow Controls (Visible on hover on desktop, always visible on mobile) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 opacity-80 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 opacity-80 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators & Slide Counter at Bottom Center */}
        <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`} 
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/80'
                }`} 
              />
            ))}
          </div>

          <span className="text-[11px] font-mono text-white/70 font-semibold hidden sm:inline">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>

      </div>
    </section>
  );
}

