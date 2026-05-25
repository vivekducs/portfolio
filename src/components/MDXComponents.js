import Link from "next/link";
import Image from "next/image";

export const MDXComponents = {
  h1: (props) => <h1 className="text-3xl font-extrabold mt-10 mb-4 text-[var(--text-primary)]" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mt-10 mb-4 text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2" {...props} />,
  h3: (props) => <h3 className="text-xl font-bold mt-8 mb-3 text-[var(--text-primary)]" {...props} />,
  p: (props) => <p className="leading-relaxed text-[var(--text-secondary)] mb-6 text-sm md:text-base" {...props} />,
  a: ({ href, children, ...props }) => {
    const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
    if (isInternal) {
      return (
        <Link href={href} className="text-[var(--accent-color)] hover:text-violet-700 dark:hover:text-violet-400 transition-colors font-medium border-b border-violet-500/20 hover:border-[var(--accent-color)]" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:text-violet-700 dark:hover:text-violet-400 transition-colors font-medium border-b border-violet-500/20 hover:border-[var(--accent-color)]" {...props}>
        {children}
      </a>
    );
  },
  ul: (props) => <ul className="list-disc pl-6 mb-6 text-[var(--text-secondary)] text-sm md:text-base space-y-2 marker:text-[var(--accent-color)]" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-6 text-[var(--text-secondary)] text-sm md:text-base space-y-2 marker:text-[var(--accent-color)]" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-[var(--accent-color)] pl-4 italic text-[var(--text-muted)] my-6 bg-[var(--bg-tertiary)] py-3 rounded-r-lg" {...props} />
  ),
  pre: (props) => (
    <pre className="bg-[#0d0d0d] rounded-xl p-4 overflow-x-auto border border-[#222] my-6 shadow-xl" {...props} />
  ),
  code: (props) => {
    const isInline = !props.className;
    if (isInline) {
      return <code className="bg-[var(--bg-tertiary)] text-[var(--accent-color)] px-1.5 py-0.5 rounded-md text-xs md:text-sm font-mono border border-[var(--glass-border)]" {...props} />;
    }
    return <code className="text-xs md:text-sm font-mono text-neutral-300 block" {...props} />;
  },
  table: (props) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-left border-collapse border border-[var(--border-color)] text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="bg-[var(--bg-tertiary)] p-3 font-bold text-[var(--text-primary)] border border-[var(--border-color)]" {...props} />,
  td: (props) => <td className="p-3 text-[var(--text-secondary)] border border-[var(--border-color)]" {...props} />,
  img: (props) => (
    <div className="my-8 rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-lg relative">
      <img className="w-full h-auto object-cover" loading="lazy" {...props} />
    </div>
  )
};
