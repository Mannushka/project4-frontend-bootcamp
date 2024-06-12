import React from "react";
import ReactPaginate from "react-paginate";
import { Flex } from "@chakra-ui/react";
import "./Pagination.css";

interface PaginationComponentProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPagesNum: number;
  totalItemsNum: number;
}
const PaginationComponent = ({
  page,
  setPage,
  totalPagesNum,
}: PaginationComponentProps): JSX.Element => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <Flex justifyContent="center">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPagesNum}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        forcePage={page - 1}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </Flex>
  );
};

export default PaginationComponent;
