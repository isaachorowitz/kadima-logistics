import { BlogClient } from "seobot";
import BlogHeader from "@/components/blog/blog-header";
import BlogCard from "@/components/blog/blog-card";
import BlogPagination from "@/components/blog/blog-pagination";
import Container from "@/components/ui/Container";

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

const POSTS_PER_PAGE = 12;

async function fetchBlogPosts(page: number = 1) {
  const apiKey = process.env.SEOBOT_API_KEY;

  if (!apiKey) {
    throw new Error("SEOBOT_API_KEY is not configured");
  }

  try {
    const client = new BlogClient(apiKey);
    const zeroBasedPage = page - 1;
    const articles = await client.getArticles(zeroBasedPage, POSTS_PER_PAGE);

    if (!Array.isArray(articles)) {
      console.error("SEObot API did not return an array:", articles);
      return { posts: [], total: 0, page: 1, totalPages: 0 };
    }

    const posts: BlogPost[] = articles.map((article: any) => ({
      id: article.id,
      slug: article.slug,
      title: article.headline,
      excerpt: article.metaDescription || article.headline,
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      featuredImage: article.image,
      tags: article.tags,
      category: article.category,
    }));

    const firstPost = articles[0] as any;
    const totalArticles = firstPost?.total || articles.length;
    const totalPages = Math.ceil(totalArticles / POSTS_PER_PAGE);

    return { posts, total: totalArticles, page, totalPages };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], total: 0, page: 1, totalPages: 0 };
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { posts, totalPages } = await fetchBlogPosts(currentPage);

  return (
    <main>
      <BlogHeader />

      <section className="bg-white py-16">
        <Container>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-body-text text-lg">
                No posts yet. Check back soon for shipping insights and tips.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16">
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
