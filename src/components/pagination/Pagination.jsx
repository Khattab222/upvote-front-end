import React from 'react';
import "./pagination.css";

const Pagination = ({meta,setcurrentpage,currentpage}) => {
  // const POST_PER_PAGE = 3;
  let totalpages = [];
  for (let i = 1; i <= meta?.totalPages; i++) {
    totalpages.push(i)
    
  }


  return (
    <div className="pagination">
      <button
       className="page previous"
       onClick={() => setcurrentpage(prev => prev-1)}
       disabled={currentpage ===1}
       >
        Previous</button>
      {totalpages?.map((page) => (
        <div onClick={() => setcurrentpage(page)}
         className={currentpage === page?'page active' : 'page'} 
         key={page}>
          {page}
        </div>
      ))}
 
      <button className="page next"
      onClick={() => setcurrentpage(prev => prev+1)}
      disabled={currentpage ===meta?.totalPages}>
        Next</button>
    </div>
  );
};

export default Pagination;
