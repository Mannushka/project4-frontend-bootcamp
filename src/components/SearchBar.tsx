import { Stack, Heading } from "@chakra-ui/react";
interface searchBarProps {
  nameParams: string;
  setNameParams: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({
  nameParams,
  setNameParams,
}: searchBarProps): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Redirect the user to the restaurants page with the restaurant name as a query parameter
  };
  const searchBar = (
    // <form className=" d-flex me-5 mb-2" role="search" onSubmit={handleSubmit}>
    //   <input
    //     className="form-control me-2"
    //     type="text"
    //     value={nameParams}
    //     onChange={(event) => setNameParams(event.target.value)}
    //     placeholder="Restaunrant name"
    //     aria-label="Search"
    //   />
    //   <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
    //     Search
    //   </button>
    // </form>
    <form
      className="d-flex flex-wrap justify-content-end align-items-center me-5 mb-2"
      role="search"
      onSubmit={handleSubmit}
    >
      <div className="input-group">
        <input
          className="form-control  me-2 flex-grow-1 search-input "
          type="text"
          value={nameParams}
          onChange={(event) => setNameParams(event.target.value)}
          placeholder="Restaurant name"
          aria-label="Search"
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
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
