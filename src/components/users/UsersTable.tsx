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
import TableOptions from "./TableOptions";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import StatusLabel from "./StatusLabel";
import useUserStore from "@/store";
import TablePagination from "./TablePagination";
import { useDebouncedValue } from "@/hooks/useDebounceValue";
import Link from "next/link";

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
    cell: ({ row }) => <StatusLabel status={row.getValue("status")} />,
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
    cell: ({ row }) => (
      <Link href={`/users/${row.original.id}`}>
        <Button className="font-sans">View</Button>
      </Link>
    ),
    enableSorting: false,
  },
];

const UsersTable = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);

  const [sorting, setSorting] = useState<SortingState>([]);

  const users = useUserStore((state) => state.users);

  const table = useReactTable({
    data: users,
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

  return (
    <div className="w-full max-w-240 mx-auto">
      <TableOptions
        search={search}
        debouncedSearch={debouncedSearch}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
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

      <TablePagination search={debouncedSearch} status={status} />
    </div>
  );
};

export default UsersTable;
