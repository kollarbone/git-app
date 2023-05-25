import { useState } from "react"


export function usePagination(totalPages: number, currentPage: number) {
    const [page, setPage] = useState(currentPage);
    
    function goToPrevPage() {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  
    function goToNextPage() {
      setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  
    function goToPage(pageNumber:any) {
      setPage(Math.min(Math.max(pageNumber, 1), totalPages));
    }
  
    return {
        page,
        totalPages,
        goToPrevPage,
        goToNextPage,
        goToPage,
    };
  }