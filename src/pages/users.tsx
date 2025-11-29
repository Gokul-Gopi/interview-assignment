import AppLayout from "@/components/layout/AppLayout";
import UsersTable from "@/components/users/UsersTable";

const Page = () => {
  return (
    <AppLayout header="Users">
      <UsersTable />
    </AppLayout>
  );
};

export default Page;
