import { Link } from "react-router-dom";
import { useSearchValue } from "../../context/SearchContext";

const SearchBar = () => {
  const { searchValue, setSearchValue } = useSearchValue("");

  return (
    <>
      <input
        className="searchBar"
        placeholder="Busque uma música..."
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
      />
      <Link to="/favorites">LISTA DE FAVORITOS</Link>
    </>
  );
};
export default SearchBar;
