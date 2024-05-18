import { ReactNode, createContext, useContext, useState } from "react";
interface RestaurantInfoProviderProps {
  children: ReactNode;
}

interface RestaurantInfoContext {
  restaurantId: number;
  // setRestaurantId: React.Dispatch<React.SetStateAction<number>>;
  updateRestaurantId: (id: number) => void;
  ratingArray: number[];
  updateRatingArray: (allRatings: number[]) => void;
}

const RestaurantInfoContext = createContext({} as RestaurantInfoContext);

export function useRestaurantInfo() {
  return useContext(RestaurantInfoContext);
}

export function RestaurantInfoProvider({
  children,
}: RestaurantInfoProviderProps) {
  const [restaurantId, setRestaurantId] = useState<number>(0);
  const [ratingArray, setRatingArray] = useState<number[]>([]);

  const updateRestaurantId = (id: number): void => {
    setRestaurantId(id);
  };
  const updateRatingArray = (allRatings: number[]): void => {
    setRatingArray(allRatings);
  };
  return (
    <RestaurantInfoContext.Provider
      value={{
        restaurantId,
        updateRestaurantId,
        ratingArray,
        updateRatingArray,
      }}
    >
      {children}
    </RestaurantInfoContext.Provider>
  );
}
