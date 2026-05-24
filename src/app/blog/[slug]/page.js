import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import "highlight.js/styles/atom-one-dark.css";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { MDXComponents } from "@/components/MDXComponents";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }) {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { data, content } = post;

  return (
    <>
      <ReadingProgress />
      <main className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        <article className="flex-1 max-w-3xl lg:w-[800px]">
          
          <nav className="mb-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft size={16} />
              Back to Engineering Blog
            </Link>
          </nav>

          <header className="mb-12 pb-8 border-b border-[var(--border-color)]">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[var(--text-primary)] leading-tight">
              {data.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)] font-mono">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {data.date}
              </span>
              <div className="flex items-center gap-2">
                {data.tags && data.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-green-500/10 text-[var(--accent-color)] rounded-md uppercase tracking-wide">
                    <Tag size={10} className="mr-1 inline-block" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* MDX Content */}
          <div className="w-full">
            <MDXRemote 
              source={content} 
              components={MDXComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeSlug, rehypeHighlight],
                }
              }}
            />
          </div>
          
        </article>

        {/* Sidebar for TOC */}
        <aside className="w-full lg:w-72 pt-12 lg:pt-32">
          <TableOfContents />
        </aside>

      </main>
    </>
  );
}
