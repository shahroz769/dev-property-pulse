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
        if (page > 1) pageNumbers.push(page - 1);
        pageNumbers.push(page);
        if (page < totalPages) pageNumbers.push(page + 1);
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

                {page > 2 && (
                    <>
                        <PaginationItem>
                            <Link href='/properties/1' passHref legacyBehavior>
                                <PaginationLink className='hover:bg-slate-100'>
                                    1
                                </PaginationLink>
                            </Link>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {getPageNumbers().map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <Link
                            href={`/properties/${pageNumber}`}
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
                    </PaginationItem>
                ))}

                {page < totalPages - 1 && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <Link
                                href={`/properties/${totalPages}`}
                                passHref
                                legacyBehavior
                            >
                                <PaginationLink className='hover:bg-slate-100'>
                                    {totalPages}
                                </PaginationLink>
                            </Link>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <Link
                        href={
                            page < totalPages ? `/properties/${page + 1}` : '#'
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
