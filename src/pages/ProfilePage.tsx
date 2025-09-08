import Navbar from '@/components/Navbar';
import Profile from '@/components/ProfileSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
};

export default Index;
