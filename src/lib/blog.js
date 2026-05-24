import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export function getBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  
  const files = fs.readdirSync(BLOG_DIR);  
  
  const posts = files
    .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      
      return {
        slug: filename.replace(/\.mdx?$/, ""),
        title: data.title || "Untitled",
        date: data.date || "1970-01-01",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  return posts;
}

export function getBlogPostBySlug(slug) {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContent);
    return { data, content };
  } catch (error) {
    // Fallback to .md
    try {
      const fullPath = path.join(BLOG_DIR, `${slug}.md`);
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContent);
      return { data, content };
    } catch (e) {
      return null;
    }
  }
}
