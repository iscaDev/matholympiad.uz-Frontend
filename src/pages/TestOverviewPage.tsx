import Navbar from '@/components/Navbar';
import TestOverview from '@/components/TestOverviewSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <TestOverview />
      <Footer />
    </div>
  );
};

export default Index;
