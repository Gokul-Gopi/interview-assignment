import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import StatusLabel from "@/components/users/StatusLabel";
import { Button } from "@/components/ui/Button";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex items-center gap-3 p-5 shadow border rounded-lg h-fit w-full">
      <Image
        src={user.avatar}
        alt={user.name}
        width={200}
        height={200}
        className="rounded-full mx-auto"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center text-lg">
          <p className="font-semibold w-18">Name: </p>
          <p className="text-primary font-medium">{user.name}</p>
        </div>

        <div className="flex items-center text-lg">
          <p className="font-semibold w-18">Email: </p>
          <Link
            target="_blank"
            href={`mailto:${user.email}`}
            className="text-primary font-medium hover:underline hover:underline-offset-4"
          >
            {user.email}
          </Link>
        </div>

        <div className="flex items-center text-lg">
          <p className="font-semibold w-18">Status: </p>
          <StatusLabel status={user.status} />
        </div>

        <Button className="mt-4">Edit</Button>
      </div>
    </div>
  );
};

export default UserCard;
