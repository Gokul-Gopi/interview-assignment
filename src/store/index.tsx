import { User } from "@/types";
import { create } from "zustand";
import usersData from "../../public/users.json";

export type UserStore = {
  users: User[];
  setUsers: (users: User[]) => void;
  findUserById: (id: string) => User | undefined;
};

const useUserStore = create<UserStore>((set) => ({
  users: usersData.slice(0, 10),
  setUsers: (users: User[]) => set({ users }),
  findUserById: (id: string) => {
    return usersData.find((user) => user.id === id);
  },
}));

export default useUserStore;
