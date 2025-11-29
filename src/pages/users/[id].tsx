import AppLayout from "@/components/layout/AppLayout";
import { User } from "@/types";
import { GetServerSideProps } from "next";
import { useState } from "react";
import userData from "../../../public/users.json";
import Image from "next/image";
import StatusLabel from "@/components/users/StatusLabel";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import UserCard from "@/components/userDetails/UserCard";
import LastActivity from "@/components/userDetails/LastActivity";

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
    <AppLayout header="User details" className="flex gap-4 justify-center">
      <div className="flex flex-col gap-6">
        <UserCard user={userDetails} />
        <LastActivity />
      </div>
    </AppLayout>
  );
};

export default Page;
