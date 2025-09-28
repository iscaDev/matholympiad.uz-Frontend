import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, FileText, Brain } from 'lucide-react';
import heroImage from '@/assets/hero-math.jpg';

const Hero = () => {
    const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/books/get_dashboard_data/`);
        if (!res.ok) throw new Error('Xatolik yuz berdi');
        const data = await res.json();

        
        const mapped = [
          { icon: BookOpen, label: 'Kitoblar', value: data.total_books, color: 'text-yellow-400' },
          { icon: FileText, label: 'Maqolalar', value: data.total_articles, color: 'text-accent' },
          { icon: Brain, label: 'Testlar', value: data.total_tests, color: 'text-success' }, // hozircha kommentda
          { icon: Users, label: 'Talabalar', value: data.total_users, color: 'text-secondary' },
        ];

        setStats(mapped);
      } catch (err) {
        console.error('Stats fetch error:', err);
      }
    };
    fetchStats();
  }, []);
  

  return (
    <>
    <section id="home" className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          
          {/* Main Heading */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Mathematics
              </span>
              <br />
              <span>Olympiad</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 font-medium">
              O'zbekistonning eng katta matematik ta'lim platformasi
            </p>
            
            <p className="text-lg mb-10 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Testlar, kitoblar, maqolalar va AI yordamchisi bilan matematikani o'rganing. 
              Olimpiadaga tayyorlanish uchun eng yaxshi resurslar.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-glow px-8 py-4 text-lg font-semibold"
            >
              <a href='/tests'>Testlarni boshlash</a>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <a href='/books' 
              className="px-5 py-2 bg-white text-gray-900 rounded-lg hover:opacity-40 ease-out transition-all "
            >
              Kitoblarni ko'rish
            </a >
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:bg-background/20 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto text-background">
          <path d="M0,120 C200,80 400,40 600,60 C800,80 1000,100 1200,60 L1200,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
    {/* Quotes Section Below Wave */}
<section className="relative bg-gradient-to-b from-background to-secondary/10 py-24">
  <div className="container mx-auto px-6 max-w-4xl space-y-16">

    {/* First Quote */}
<div className="relative p-10 rounded-3xl shadow-xl bg-white/80 backdrop-blur-md border border-primary/10 hover:scale-[1.02] transition-transform duration-300">
  <span className="absolute top-6 left-6 text-7xl text-secondary opacity-20">“</span>
  <blockquote className="relative font-[Playfair_Display] text-2xl md:text-3xl italic text-center leading-relaxed text-gray-800">
    Matematika barcha insonlar uchun buyuk motivatordir, chunki uning karyerasi noldan boshlanadi va hech qachon tugamaydi.
  </blockquote>
</div>


    {/* Second Quote */}
    <div className="relative p-10 rounded-3xl shadow-xl bg-white/70 backdrop-blur-sm border border-primary/10 hover:scale-[1.02] transition-transform duration-300">
      <span className="block text-6xl text-secondary opacity-80 mb-6">“</span>
      <blockquote className="relative text-2xl md:text-3xl font-semibold italic text-center leading-relaxed bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
        Matematika barcha fanlarning onasidir.
      </blockquote>
    </div>

  </div>
</section>
  </>
  );
};

export default Hero;
