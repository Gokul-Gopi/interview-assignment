import { User } from "@/types";
import { create } from "zustand";
import usersData from "../../public/users.json";

export type UserStore = {
  users: User[];
  setUsers: (users: User[]) => void;
};

const useUserStore = create<UserStore>((set) => ({
  users: usersData.slice(0, 10),
  setUsers: (users: User[]) => set({ users }),
}));

export default useUserStore;
