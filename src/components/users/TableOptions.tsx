import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { X } from "lucide-react";

interface UserTableOptionsProps {
  search: string;
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const UserTableOptions = ({
  search = "",
  onSearch,
  onStatusChange,
}: UserTableOptionsProps) => {
  const [status, setStatus] = useState("");

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Search by name.."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full max-w-xs"
      />

      <div className="relative">
        <Select
          value={status || ""}
          onValueChange={(value) => {
            setStatus(value);
            onStatusChange(value);
          }}
        >
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
            onClick={() => {
              setStatus("");
              onStatusChange("");
            }}
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
