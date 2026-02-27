import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime?: number;
  featuredImage?: string;
  tags?: Array<{ id: string; title: string; slug: string }>;
  category?: { id: string; title: string; slug: string };
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-slate-border rounded-[6px] overflow-hidden hover:shadow-lg hover:border-emerald/30 transition-all duration-300"
    >
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-[16/9] overflow-hidden bg-slate-bg">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Category / Tags */}
        {post.category && (
          <span className="text-emerald-text text-xs font-display font-semibold uppercase tracking-wider mb-3">
            {post.category.title}
          </span>
        )}

        {/* Title */}
        <h2 className="font-display text-lg font-bold text-heading leading-snug mb-3 group-hover:text-emerald-text transition-colors duration-200">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-body-text text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-border">
          <div className="flex items-center gap-4 text-body-text text-xs">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} min
              </span>
            )}
          </div>
          <span className="text-emerald-text text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            Read
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
