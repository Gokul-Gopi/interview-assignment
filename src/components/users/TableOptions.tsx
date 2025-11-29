import React, { useEffect, useRef, useState } from "react";
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

const UserTableOptions = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const setUsers = useUserStore((state) => state.setUsers);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const filteredUsers = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) &&
        (status ? user.status === status : true)
    );
    setUsers(filteredUsers);
  }, [search, status]);

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Search by name.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xs"
      />

      <div className="relative">
        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-40 relative">
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
