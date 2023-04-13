import { RootStateOrAny } from "store";


export const selectUsersCount = (state: RootStateOrAny): number => state.usersCount.count;
