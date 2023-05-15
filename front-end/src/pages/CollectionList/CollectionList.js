import { useEffect, useState } from "react";
import classnames from "classnames/bind";
import styles from "./CollectionList.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
const cx = classnames.bind(styles);

function CollectionList() {
  // const [active, setActive] = useState(false);
  const [deals, setDeals] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`http://localhost:5000/api/deals?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPages, data }) => {
        setDeals(data);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber]);

  const handlePrev = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const handleNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <h1 className={cx("title")}>Danh sách bộ sưu tập</h1>
        <div className={cx("content")}>
          {deals.map((category) => (
            <div className={cx("category-wrap")} key={category.id}>
              <div className={cx("category")}>
                <img
                  src={category.image}
                  alt={category.title}
                  className={cx("category-img")}
                />
                <h6 className={cx("category-title")}>{category.title}</h6>
                <p className={cx("category-location")}>
                  {category.numberLct} địa điểm
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={cx("pagination")}>
          <div className={cx("pagination-control")}>
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              className={cx("pagination-icon")}
              onClick={handlePrev}
            />
          </div>
          <div className={cx("pagination-page")}>
            {pages.map((pageIndex) => (
              <button
                className={
                  pageIndex === pageNumber
                    ? cx("pagination-page_num", "active")
                    : cx("pagination-page_num")
                }
                onClick={() => setPageNumber(pageIndex)}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
          <div className={cx("pagination-control")}>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className={cx("pagination-icon")}
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionList;
