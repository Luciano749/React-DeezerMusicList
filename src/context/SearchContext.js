import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchValue() {
  const context = useContext(SearchContext);
  const { searchValue, setSearchValue } = context;
  return { searchValue, setSearchValue };
}
