import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, BookOpen, FileText, Calculator, Bot, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '../assets/mathLogo.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { href: '/home', label: 'Bosh sahifa', icon: Home },
    { href: '/tests', label: 'Testlar', icon: Calculator },
    { href: '/books', label: 'Kitoblar', icon: BookOpen },
    { href: '/articles', label: 'Maqolalar', icon: FileText },
    { href: '/ai', label: 'AI Yordamchisi', icon: Bot },
  ];

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    setIsAuth(!!(access && refresh));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuth(false);
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/home">
              <img src={logo} alt="Logo" className="w-20" />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-primary">MathOlympiad.Uz</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  "hover:bg-primary/5 hover:text-primary hover:shadow-soft"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Dropdown */}
          <div className="hidden md:flex items-center relative">
            {isAuth ? (
              <div ref={dropdownRef} className="relative">
                {/* Round avatar/button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
                >
                  <User className="w-5 h-5" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                    {/* Profile link */}
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-primary/20 rounded-md"
                    >
                      <User className="w-4 h-4 text-primary" />
                      <span>Profil</span>
                    </Link>
                    {/* Logout button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm rounded-md  hover:text-white hover:bg-red-500 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Chiqish</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login" className="px-4 py-2">Kirish</Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-primary hover:shadow-glow">
                  <Link to="/register" className="px-4 py-2">Ro'yxatdan o'tish</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-large animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-card hover:bg-primary/5 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                {isAuth ? (
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 rounded-lg hover:bg-primary/5"
                    >
                      Profil
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
                    >
                      Chiqish
                    </button>
                  </div>
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to="/login">Kirish</Link>
                    </Button>
                    <Button asChild size="sm" className="w-full bg-gradient-primary">
                      <Link to="/register">Ro'yxatdan o'tish</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
