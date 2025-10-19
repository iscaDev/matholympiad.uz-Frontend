import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import RecentArticles from '@/components/RecentArticles';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />
      <RecentArticles />
      <Footer />
    </div>
  );
};

export default Index;

