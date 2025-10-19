import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import articles from '@/components/RecentArticles';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />
      <articles />
      <Footer />
    </div>
  );
};

export default Index;

