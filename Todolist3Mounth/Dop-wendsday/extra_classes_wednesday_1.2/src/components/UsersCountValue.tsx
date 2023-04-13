import React, {FC, memo} from 'react';

type PropsType = {
  usersCount: number;
};

export const UsersCountValue: FC<PropsType> = memo(({usersCount}) => {
  const newUsersCount = usersCount + 1;

  return <span>Users count: {newUsersCount}</span>;
});
