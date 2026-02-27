import { NextResponse } from "next/server";
import { BlogClient } from "seobot";

async function fetchAllBlogPosts() {
  const apiKey = process.env.SEOBOT_API_KEY;

  if (!apiKey) {
    console.error("SEOBOT_API_KEY is not configured");
    return [];
  }

  try {
    const client = new BlogClient(apiKey);
    const allPosts: Array<{
      slug: string;
      updatedAt: string;
      publishedAt: string;
    }> = [];
    let page = 0;
    let hasMore = true;
    const BATCH_SIZE = 50;

    while (hasMore) {
      const articles = await client.getArticles(page, BATCH_SIZE);

      if (Array.isArray(articles) && articles.length > 0) {
        allPosts.push(
          ...articles.map((article: any) => ({
            slug: article.slug,
            updatedAt: article.updatedAt,
            publishedAt: article.publishedAt || article.createdAt,
          }))
        );

        if (articles.length < BATCH_SIZE) {
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false;
      }

      if (page > 20) {
        hasMore = false;
      }
    }

    return allPosts;
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return [];
  }
}

export async function GET() {
  try {
    const posts = await fetchAllBlogPosts();
    const baseUrl = "https://kadimalogistics.com";

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt || post.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating blog sitemap:", error);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kadimalogistics.com/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
}
