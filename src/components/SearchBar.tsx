import { Stack, Heading } from "@chakra-ui/react";
import { useState } from "react";
interface searchBarProps {
  setNameParams: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar = ({
  setNameParams,
  page,
  setPage,
}: searchBarProps): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameParams(inputValue);
    if (page > 1) setPage(1);
  };

  const [inputValue, setInputValue] = useState<string>("");
  const searchBar = (
    <form
      className="d-flex flex-wrap justify-content-end align-items-center me-5 mb-2"
      role="search"
      onSubmit={handleSubmit}
    >
      <div className="input-group">
        <input
          className="form-control  me-2 flex-grow-1 search-input "
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Restaurant name"
          aria-label="Search"
          style={{ borderRadius: 5 }}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
  return (
    <Stack marginTop={5} marginBottom={10}>
      <Heading as="h4" size="md">
        Search by restaurant name
      </Heading>
      {searchBar}
    </Stack>
  );
};

export default SearchBar;
