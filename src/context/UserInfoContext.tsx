import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
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
  const storedUserId = JSON.parse(
    localStorage.getItem("userId") || "0"
  ) as number;

  const [userId, setUserId] = useState<number>(storedUserId);

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);

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
