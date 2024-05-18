import { ReactNode, createContext, useContext, useState } from "react";
interface UserInfoProviderProps {
  children: ReactNode;
}

interface UserInfoContext {
  userId: number;
  updateUserId: (id: number) => void;
}

const UserInfoContext = createContext({} as UserInfoContext);

export function useUserInfo() {
  return useContext(UserInfoContext);
}

export function UserInfoProvider({ children }: UserInfoProviderProps) {
  const [userId, setUserId] = useState<number>(0);

  const updateUserId = (id: number): void => {
    setUserId(id);
  };

  return (
    <UserInfoContext.Provider
      value={{
        userId,
        updateUserId,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
