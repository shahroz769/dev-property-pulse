import Link from 'next/link';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export default function Component({ page, pageSize, totalItems }) {
    const totalPages = Math.ceil(totalItems / pageSize);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);

        let start = Math.max(1, page - halfVisible);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        if (start > 1) {
            pageNumbers.push(1);
            if (start > 2) pageNumbers.push('ellipsis');
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pageNumbers.push('ellipsis');
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <Pagination className='mt-10'>
            <PaginationContent>
                <PaginationItem>
                    <Link
                        href={page > 1 ? `/properties?page=${page - 1}` : '#'}
                        passHref
                        legacyBehavior
                    >
                        <PaginationPrevious
                            aria-disabled={page <= 1}
                            className={
                                page <= 1
                                    ? 'pointer-events-none opacity-50'
                                    : 'hover:bg-slate-100'
                            }
                        />
                    </Link>
                </PaginationItem>
                {getPageNumbers().map((pageNumber, index) => (
                    <PaginationItem key={index}>
                        {pageNumber === 'ellipsis' ? (
                            <PaginationEllipsis />
                        ) : (
                            <Link
                                href={`/properties?page=${pageNumber}`}
                                passHref
                                legacyBehavior
                            >
                                <PaginationLink
                                    isActive={pageNumber === page}
                                    className={
                                        pageNumber === page
                                            ? 'bg-slate-800 hover:bg-slate-700 text-white hover:text-white'
                                            : 'hover:bg-slate-100'
                                    }
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </Link>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <Link
                        href={
                            page < totalPages
                                ? `/properties?page=${page + 1}`
                                : '#'
                        }
                        passHref
                        legacyBehavior
                    >
                        <PaginationNext
                            aria-disabled={page >= totalPages}
                            className={
                                page >= totalPages
                                    ? 'pointer-events-none opacity-50'
                                    : 'hover:bg-slate-100'
                            }
                        />
                    </Link>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
