import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useState } from "react";
import Image from "next/image";
import { User } from "@/types";
import usersMockData from "../../../public/users.json";
import { cn } from "@/utils/helpers";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import TableOptions from "./TableOptions";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="pl-4">
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting()}
        >
          Name
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 items-center pl-4">
        <Image
          src={row.original.avatar}
          alt={row.getValue("name")}
          width={32}
          height={32}
          className="rounded-full"
        />
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div
          className={cn("capitalize px-3 font-medium py-1 rounded-md w-fit", {
            "bg-green-300": status === "active",
            "bg-red-300": status === "inactive",
          })}
        >
          {status}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 hover:bg-transparent"
        onClick={() => column.toggleSorting()}
      >
        Created
      </Button>
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      const formattedDate = new Date(date).toLocaleDateString();

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => <Button className="font-sans">View</Button>,
    enableSorting: false,
  },
];

const UsersTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [data] = useState<User[]>(usersMockData.slice(0, 10));

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: true,
    sortDescFirst: true,
    state: {
      sorting,
    },
  });

  const onSearch = (value: string) => {
    table.getColumn("name")?.setFilterValue(value);
  };

  const onStatusChange = (value: string) => {
    table.getColumn("status")?.setFilterValue(value);
  };

  return (
    <div className="w-full max-w-240">
      <TableOptions
        search={table.getColumn("name")?.getFilterValue() as string}
        onSearch={onSearch}
        onStatusChange={onStatusChange}
      />

      <div className="overflow-hidden min-h-142 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      <div className="flex gap-2 items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {header.column.getCanSort() &&
                          (header.column.getIsSorted() === "asc" ? (
                            <ChevronUp size={14} />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronsUpDown size={14} />
                          ))}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default UsersTable;
