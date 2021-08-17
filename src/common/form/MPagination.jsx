import Pagination from "@material-ui/lab/Pagination";
import React from "react";

const MPagination = ({ postsPerPage, totalPosts, paginate, page }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Pagination count={pageNumbers.length} page={page} onChange={paginate} />
    </>
  );
};

export default MPagination;
