import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter,Navigate, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Index from "./pages/Index";
import Profile from "./pages/ProfilePage";
import Tests from "./pages/TestsPage";
import TestsByClassPage from "./pages/TestByClassPage";
import TestsFormPage from "./pages/TestFormPage";
import TestOverviewPage from "./pages/TestOverviewPage";
import Books from "./pages/BooksPage";
import OneBookPage from "./pages/OneBooksPage";
import Articles from "./pages/ArticlesPage";
import ArticleDetail from "./pages/ArticleDetailPage"
import Ai from "./pages/Aihelper"
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          {/* Auth pages */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          {/* Tests pages */}
          <Route path="/tests" element={<Tests />} />
          <Route path="/tests-by-class/:grade" element={<TestsByClassPage />} />
          <Route path="/tests-form/:id" element={<TestsFormPage />} />
          <Route path="/test-overview/:id" element={<TestOverviewPage />} />
          {/* Books pages */}
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<OneBookPage />} />
          {/* Articles pages */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          {/* AI Helper */}
          <Route path="/ai" element={<Ai />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
