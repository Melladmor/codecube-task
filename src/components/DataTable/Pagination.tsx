import type { PaginationProps } from "./type";
import style from "./style.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={style.pagination}>
      <div className={style.pagination_info}>
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      <div className={style.pagination_controls}>
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page">
          <RxDoubleArrowLeft />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page">
          <IoIosArrowBack />
        </button>
        <span className={style.page_number}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page">
          <IoIosArrowForward />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page">
          <RxDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}
