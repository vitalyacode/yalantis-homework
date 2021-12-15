import React, { useMemo, useEffect } from 'react';
import st from './index.module.css';

const Pagination = ({
  totalItems, perPage, handler, page,
}) => {
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [page]);
  const pageAmount = Math.ceil(totalItems / perPage);
  const pageLimit = 5;
  const pages = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= pageAmount; i += 1) arr.push(i);
    return arr;
  });
  const nextPage = () => {
    if (page !== pageAmount) {
      handler(page + 1);
    }
  };
  const prevPage = () => {
    if (page !== 1) {
      handler(page - 1);
    }
  };
  const changePage = (p) => {
    handler(p);
  };
  const getPaginationGroup = () => {
    const startIndex = Math.floor((page - 1) / pageLimit) * pageLimit;
    const group = pages.slice(startIndex, startIndex + 5);
    return group;
  };
  const group = getPaginationGroup();
  return (
    <div className={st.paginationContainer}>
      <span onClick={prevPage}>〈</span>
      {group.map((e) => (
        <span
          onClick={() => changePage(e)}
          key={e}
          className={e === page ? st.activePage : ''}
        >
          {e}
        </span>
      ))}
      <span onClick={nextPage}>〉</span>
    </div>
  );
};

export default Pagination;
