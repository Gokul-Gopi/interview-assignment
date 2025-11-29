import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { X } from "lucide-react";
import useUserStore from "@/store";
import usersData from "../../../public/users.json";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

interface ITableOptionsProps {
  search: string;
  debouncedSearch: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

const UserTableOptions = ({
  search,
  debouncedSearch,
  setSearch,
  status,
  setStatus,
}: ITableOptionsProps) => {
  const setUsers = useUserStore((state) => state.setUsers);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const filteredUsers = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (status ? user.status === status : true)
    );
    setUsers(filteredUsers);
  }, [debouncedSearch, status]);

  return (
    <div className="flex max-md:flex-col gap-2 mb-4">
      <Input
        placeholder="Search by name.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-md:text-sm md:max-w-xs"
      />

      <div className="relative">
        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-full md:w-40 relative">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {status && (
          <div
            onClick={() => setStatus("")}
            className="bg-primary rounded-full size-4 grid place-items-center absolute top-2.5 right-3 z-99999"
          >
            <X className="text-white size-3" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTableOptions;
