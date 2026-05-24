import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";

export const metadata = {
  title: "Engineering Blog | Vivek Kumar",
  description: "Technical deep dives, system design, and engineering decisions.",
};

export default function BlogList() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto">
        
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </nav>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-4">Engineering Notes</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Thoughts on scalable systems, backend architecture, and production engineering.
          </p>
        </header>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-[var(--text-muted)]">No posts found.</p>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="glass-card rounded-2xl border border-[var(--glass-border)] p-6 md:p-8 hover:border-green-500/40 transition-all">
                <Link href={`/blog/${post.slug}`} className="block h-full w-full group">
                  <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-3 font-mono">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-green-500/10 text-[var(--accent-color)] rounded-md uppercase tracking-wide">
                          <Tag size={10} className="mr-1 inline-block" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="text-xs font-bold text-[var(--accent-color)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Post <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
