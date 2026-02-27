import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogClient } from "seobot";
import { ArrowLeft, Clock } from "lucide-react";
import Container from "@/components/ui/Container";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: Array<{ id: string; title: string; slug: string }>;
  category?: { id: string; title: string; slug: string };
  readingTime?: number;
  featuredImage?: string;
  metaDescription?: string;
  headline?: string;
  html?: string;
  image?: string;
  relatedPosts?: Array<{
    id: string;
    headline: string;
    slug: string;
    image?: string;
  }>;
}

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const apiKey = process.env.SEOBOT_API_KEY;

  if (!apiKey) {
    console.error("SEOBOT_API_KEY is not configured");
    return null;
  }

  try {
    const client = new BlogClient(apiKey);
    const article = await client.getArticle(slug);

    if (!article) return null;

    return {
      id: article.id,
      slug: article.slug,
      title: article.headline,
      headline: article.headline,
      excerpt: article.metaDescription || article.headline,
      content: article.html || article.markdown || "",
      html: article.html,
      publishedAt: article.publishedAt || article.createdAt,
      updatedAt: article.updatedAt,
      tags: article.tags,
      category: article.category,
      readingTime: article.readingTime,
      featuredImage: article.image,
      image: article.image,
      metaDescription: article.metaDescription,
      relatedPosts: article.relatedPosts,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = post.title || post.headline;
  const description = post.metaDescription || post.excerpt;
  const image = post.featuredImage || post.image;
  const canonicalUrl = `https://kadimalogistics.com/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: image ? [{ url: image }] : undefined,
      siteName: "Kadima Logistics",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title || post.headline,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage || post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Kadima Logistics",
      url: "https://kadimalogistics.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Kadima Logistics",
      logo: {
        "@type": "ImageObject",
        url: "https://kadimalogistics.com/og-image.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://kadimalogistics.com/blog/${slug}`,
    },
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navy header bar */}
      <div className="bg-navy pt-28 pb-12">
        <Container narrow>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {post.category && (
            <span className="block text-emerald text-xs font-display font-semibold uppercase tracking-wider mb-4">
              {post.category.title}
            </span>
          )}

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title || post.headline}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            )}
          </div>
        </Container>
      </div>

      <article className="py-12">
        <Container narrow>
          {/* Featured Image */}
          {(post.featuredImage || post.image) && (
            <div className="mb-12 rounded-[6px] overflow-hidden">
              <img
                src={post.featuredImage || post.image}
                alt={post.title || post.headline}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{
              __html: post.content || post.html || "",
            }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-xs font-medium bg-slate-bg text-body-text rounded-[4px] border border-slate-border"
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-border">
              <h2 className="font-display text-2xl font-bold text-heading mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.relatedPosts.slice(0, 3).map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group block rounded-[6px] border border-slate-border overflow-hidden hover:shadow-md hover:border-emerald/30 transition-all"
                  >
                    {related.image && (
                      <div className="aspect-[16/9] overflow-hidden bg-slate-bg">
                        <img
                          src={related.image}
                          alt={related.headline}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-display text-sm font-bold text-heading group-hover:text-emerald-text transition-colors leading-snug">
                        {related.headline}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>
    </main>
  );
}
