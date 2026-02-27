import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function BlogPagination({
  currentPage,
  totalPages,
}: BlogPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 5 page buttons centered around current
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    const adjusted = Math.max(1, end - 4);
    return pages.slice(adjusted - 1, end);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-3 py-2 text-sm text-body-text hover:text-emerald-text font-medium rounded-[4px] hover:bg-emerald/5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm text-body-text/40 font-medium">
          <ChevronLeft className="w-4 h-4" />
          Prev
        </span>
      )}

      {/* Page Numbers */}
      {visiblePages[0] > 1 && (
        <>
          <Link
            href="/blog?page=1"
            className="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-[4px] text-body-text hover:bg-emerald/5 hover:text-emerald-text transition-colors"
          >
            1
          </Link>
          {visiblePages[0] > 2 && (
            <span className="text-body-text/40 px-1">...</span>
          )}
        </>
      )}

      {visiblePages.map((page) => (
        <Link
          key={page}
          href={`/blog?page=${page}`}
          className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-[4px] transition-colors ${
            page === currentPage
              ? "bg-emerald text-navy"
              : "text-body-text hover:bg-emerald/5 hover:text-emerald-text"
          }`}
        >
          {page}
        </Link>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-body-text/40 px-1">...</span>
          )}
          <Link
            href={`/blog?page=${totalPages}`}
            className="w-10 h-10 flex items-center justify-center text-sm font-medium rounded-[4px] text-body-text hover:bg-emerald/5 hover:text-emerald-text transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-3 py-2 text-sm text-body-text hover:text-emerald-text font-medium rounded-[4px] hover:bg-emerald/5 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm text-body-text/40 font-medium">
          Next
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
