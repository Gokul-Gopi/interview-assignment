import AppLayout from "@/components/layout/AppLayout";
import { User } from "@/types";
import { GetServerSideProps } from "next";
import { useState } from "react";
import userData from "../../../public/users.json";
import Image from "next/image";
import StatusLabel from "@/components/users/StatusLabel";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const getServerSideProps: GetServerSideProps = async (context) => {
  //fetching the user server-side
  const userId = context.params?.id as string;

  if (!userId) {
    return {
      redirect: {
        destination: "/users",
        permanent: false,
      },
    };
  }

  const user = userData.find((user) => user.id === userId);

  if (!user) {
    return {
      redirect: {
        destination: "/users",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

const Page = ({ user }: { user: User }) => {
  const [userDetails, setUserDetails] = useState<User>(user);

  return (
    <AppLayout header="User details" className="flex  justify-center">
      <div className="flex items-center gap-3 p-5 shadow border rounded-lg h-fit">
        <Image
          src={userDetails.avatar}
          alt={userDetails.name}
          width={200}
          height={200}
          className="rounded-full mx-auto"
        />

        <div className="flex flex-col gap-1">
          <div className="flex items-center text-lg">
            <p className="font-semibold w-18">Name: </p>
            <p className="text-primary font-medium">{userDetails.name}</p>
          </div>

          <div className="flex items-center text-lg">
            <p className="font-semibold w-18">Email: </p>
            <Link
              target="_blank"
              href={`mailto:${userDetails.email}`}
              className="text-primary font-medium hover:underline hover:underline-offset-4"
            >
              {userDetails.email}
            </Link>
          </div>

          <div className="flex items-center text-lg">
            <p className="font-semibold w-18">Status: </p>
            <StatusLabel status={userDetails.status} />
          </div>

          <Button className="mt-4">Edit</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
