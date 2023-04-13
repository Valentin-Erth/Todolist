import {UserType} from 'types';
import {RootStateOrAny} from "../index";


export const selectUsers = (state: RootStateOrAny): UserType[] => state.userData.users;
