import { createContext, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

const FavoriteContext = createContext();

export default function FavoriteProvider({ children }) {
  const [favoriteList, setFavoriteList] = useLocalStorageState(
    "favoriteList",
    []
  );

  return (
    <FavoriteContext.Provider value={{ favoriteList, setFavoriteList }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavoriteList() {
  const context = useContext(FavoriteContext);
  const { favoriteList, setFavoriteList } = context;
  return { favoriteList, setFavoriteList };
}
