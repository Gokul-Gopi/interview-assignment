import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/Pagination";
import useUserStore from "@/store";
import usersData from "../../../public/users.json";

interface ITablePaginationProps {
  search: string;
  status: string;
}

const itemsPerPage = 10;

const TablePagination = ({ search, status }: ITablePaginationProps) => {
  const isMounted = useRef(false);
  const setUsers = useUserStore((state) => state.setUsers);

  const [currentPage, setCurrentPage] = useState(1);

  const currentList = useMemo(
    () =>
      !!search || !!status
        ? usersData.filter(
            (user) =>
              user.name.toLowerCase().includes(search.toLowerCase()) &&
              (status ? user.status === status : true)
          )
        : usersData,
    [search, status]
  );

  const totalItems = currentList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = currentList.slice(startIndex, endIndex);
    setUsers(currentItems);
  }, [currentPage]);

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              currentPage > 1 && setCurrentPage((prev) => prev - 1)
            }
            aria-disabled={currentPage === 1}
            style={{
              pointerEvents: currentPage === 1 ? "none" : "auto",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && setCurrentPage((prev) => prev + 1)
            }
            aria-disabled={currentPage === totalPages}
            style={{
              pointerEvents: currentPage === totalPages ? "none" : "auto",
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
