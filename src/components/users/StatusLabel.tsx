import { cn } from "@/utils/helpers";

interface IStatusLabelProps {
  status: string;
}

const StatusLabel = ({ status }: IStatusLabelProps) => {
  return (
    <div
      className={cn(
        "capitalize px-3 border bg-transparent font-medium py-1 rounded-md w-fit dark:bg-transparent",
        {
          "border-green-500 bg-green-100": status === "active",
          "border-red-500 bg-red-100": status === "inactive",
        }
      )}
    >
      {status}
    </div>
  );
};

export default StatusLabel;
