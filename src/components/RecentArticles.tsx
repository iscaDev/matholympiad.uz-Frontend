import { Calendar, Clock, ArrowRight } from "lucide-react";

// Article data - you can replace this with your actual articles
const articles = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to progressive web apps.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
    author: "Sarah Johnson",
    date: "2025-10-18",
    category: "Technology",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Mastering Remote Work: Tips for Productivity and Balance",
    excerpt: "Discover practical strategies to maintain productivity, work-life balance, and mental health while working from home.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    author: "Michael Chen",
    date: "2025-10-17",
    category: "Productivity",
    readTime: "7 min read"
  }
];

const RecentArticles = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Eng so'nggi maqolalar
            </h2>
            <p className="text-muted-foreground">
              Matematika qanday qilib amaliyotda tadbiq etilishini kashf eting.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <a
              key={article.id}
              href="/articles"
              className="group block"
            >
              <article className="h-full bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)] hover:-translate-y-1">
                {/* Article Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
                
                {/* Article Content */}
                <div className="p-6 flex flex-col">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  {/* Author */}
                  <div className="mt-auto pt-4 border-t border-border">
                    <span className="text-sm font-medium text-card-foreground">
                      By {article.author}
                    </span>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* Read All Button */}
        <div className="text-center mt-16">
          <a href="/articles">
            <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)] transition-all duration-300">
              Barcha maqolalarni ko'rish
              <ArrowRight className="w-5 h-5" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;
