import { Calculator, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { name: 'Bosh sahifa', href: '/home' },
    { name: 'Testlar', href: '/tests' },
    { name: 'Kitoblar', href: '/books' },
    { name: 'Maqolalar', href: '/articles' },
    { name: 'AI Yordamchisi', href: '/ai' },
  ];

  const resources = [
    { name: 'Olimpiada yangiliklari', href: '#' },
    { name: 'Yo\'riqnomalar', href: '#' },
    { name: 'Qo\'llab-quvvatlash', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Bog\'lanish', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/matholympiad-uz/', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shadow-glow">
                <Calculator className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">MathOlympiad.Uz</h3>
                <p className="text-sm text-primary-foreground/80">Matematika Olimpiadasi</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/90 leading-relaxed mb-6 max-w-md">
              O'zbekistonning eng katta matematik ta'lim platformasi. Olimpiadaga 
              tayyorgarlik ko'rish uchun eng yaxshi resurslar va professional 
              yordamchi xizmatlari.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Andijan, Uzbekistan</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-secondary" />
                <span>matholympiad.uz@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Tezkor havolalar</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resurslar</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-foreground/80">Ijtimoiy tarmoqlar:</span>
              {/* <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-primary-foreground/60 ${social.color} transition-colors duration-300 hover:scale-110`}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div> */}
              <div className="flex space-x-3">
  {/* Instagram */}
  <a
    href="#"
    className="text-primary-foreground/60 hover:text-pink-600 transition-colors duration-300 hover:scale-110"
    title="Instagram"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 4.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25-.75a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5z"/>
    </svg>
  </a>

  {/* YouTube */}
  <a
    href="#"
    className="text-primary-foreground/60 hover:text-red-600 transition-colors duration-300 hover:scale-110"
    title="YouTube"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.615 3.184C20.403 3.39 21.09 4.09 21.296 4.878c.488 1.814.488 5.59.488 5.59s0 3.776-.488 5.59c-.206.788-.893 1.488-1.681 1.694C18.144 18 12 18 12 18s-6.144 0-7.615-.248c-.788-.206-1.475-.906-1.681-1.694C2.216 14.244 2.216 10.468 2.216 10.468s0-3.776.488-5.59c.206-.788.893-1.488 1.681-1.694C5.856 3 12 3 12 3s6.144 0 7.615.184zM10 8.75v5l4.5-2.5-4.5-2.5z"/>
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/company/matholympiad-uz/"
    className="text-primary-foreground/60 hover:text-blue-700 transition-colors duration-300 hover:scale-110"
    title="LinkedIn"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.783-1.75-1.749s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.749-1.75 1.749zm13.5 11.268h-3v-5.604c0-1.337-.027-3.061-1.866-3.061-1.867 0-2.154 1.459-2.154 2.963v5.702h-3v-10h2.879v1.367h.041c.402-.761 1.382-1.562 2.848-1.562 3.047 0 3.611 2.007 3.611 4.618v5.577z"/>
    </svg>
  </a>

  {/* Telegram */}
  <a
    href="https://t.me/math_olympiaduz"
    className="text-primary-foreground/60 hover:text-sky-500 transition-colors duration-300 hover:scale-110"
    title="Telegram"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.999 15.17l-.39 3.93c.56 0 .8-.24 1.09-.52l2.62-2.48 5.43 3.95c.99.55 1.7.26 1.95-.91l3.54-16.62v-.01c.32-1.49-.54-2.07-1.51-1.71L1.43 9.64c-1.46.57-1.44 1.39-.25 1.76l5.49 1.71 12.7-7.99c.6-.36 1.15-.16.7.23l-10.33 9.82z"/>
    </svg>
  </a>
</div>

            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-primary-foreground/80">
                © 2025 MathOlympiad.Uz. Barcha huquqlar himoyalangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
