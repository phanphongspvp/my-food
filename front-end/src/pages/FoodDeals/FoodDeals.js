import { useState, useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./FoodDeals.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronCircleLeft,
  faChevronCircleRight,
  faShieldHeart,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

const valueOption = [
  {
    id: 1,
    title: "Tất cả",
  },
  {
    id: 2,
    title: "Giảm nhiều nhất",
  },
  {
    id: 3,
    title: "Mới nhất",
  },
  {
    id: 4,
    title: "Sắp hết hạn",
  },
  {
    id: 5,
    title: "Không phí dịch vụ",
  },
  {
    id: 6,
    title: "Ưu đãi gần tôi",
  },
];

const valueAddress = [
  {
    id: 1,
    title: "Ba Đình",
    name: "ba-dinh",
  },
  {
    id: 2,
    title: "Cầu Giấy",
    name: "cau-giay",
  },
  {
    id: 3,
    title: "Đống Đa",
    name: "dong-da",
  },
  {
    id: 4,
    title: "Hà Đông",
    name: "ha-dong",
  },
  {
    id: 5,
    title: "Hai Bà Trưng",
    name: "hai-ba-trung",
  },
  {
    id: 6,
    title: "Hoàn Kiếm",
    name: "hoan-kiem",
  },
  {
    id: 7,
    title: "Hoàng Mai",
    name: "hoang-mai",
  },
  {
    id: 8,
    title: "Long Biên",
    name: "long-bien",
  },
  {
    id: 9,
    title: "Tây Hồ",
    name: "tay-ho",
  },
  {
    id: 10,
    title: "Thanh Xuân",
    name: "thanh-xuan",
  },
  {
    id: 11,
    title: "Gia Lâm",
    name: "gia-lam",
  },
  {
    id: 12,
    title: "Hoài Đức",
    name: "hoai-duc",
  },
  {
    id: 13,
    title: "Thanh Trì",
    name: "thanh-tri",
  },
  {
    id: 14,
    title: "Thường Tín",
    name: "thuong-tin",
  },
  {
    id: 15,
    title: "Bắc Từ Liêm",
    name: "bac-tu-liem",
  },
  {
    id: 16,
    title: "Nam Từ Liêm",
    name: "nam-tu-niem",
  },
];

function FoodDeals({ data }) {
  const [foods, setFoods] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalFoods, setTotalFoods] = useState(0);
  const [handleModal, setHandleModal] = useState(false);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`http://localhost:5000/api/${data}?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ total, totalPages, data }) => {
        setTotalFoods(total);
        setFoods(data);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber, data]);

  const handlePrev = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const handleNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const handleDropdown = () => {
    setHandleModal(!handleModal);
  };

  const handleCustomCheckbox = (name) => {
    console.log(name);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <h1 className={cx("header-title")}>Danh sách ưu đãi</h1>
          <div className={cx("header-control")}>
            <div className={cx("header-wrap-dropdown")}>
              <div
                className={cx("header-dropdown", handleModal && "active")}
                onClick={handleDropdown}
              >
                Khu Vực
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={cx("header-dropdown-icon")}
                />
              </div>
              {handleModal && (
                <div className={cx("modal")}>
                  {valueAddress.map((address) => (
                    <div className={cx("custom-checkbox")} key={address.id}>
                      <input
                        id={address.name}
                        className={cx("input-checkbox")}
                        type="checkbox"
                        checked={handleCustomCheckbox(address.name)}
                      />
                      <label
                        htmlFor={address.name}
                        className={cx("input-title")}
                      >
                        {address.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={cx("header-control_content")}>
              <p className={cx("header-control_result")}>
                {totalFoods} Kết quả
              </p>
              <select className={cx("header-control_select")}>
                {valueOption.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={cx("content-wrap")}>
          <div className={cx("content")}>
            {foods.map((category) => (
              <div className={cx("category-wrap")} key={category._id}>
                <div className={cx("category")}>
                  {category.active && (
                    <div className={cx("category-active")}></div>
                  )}
                  <img
                    src={category.image}
                    alt={category.title}
                    className={cx("category-img")}
                  />
                  <div className={cx("category-title")}>
                    <FontAwesomeIcon
                      className={cx("category-title-icon")}
                      icon={faShieldHeart}
                    />
                    <h6 className={cx("category-title-text")}>
                      {category.title.length > 20
                        ? category.title.substring(0, 20) + " ..."
                        : category.title}
                    </h6>
                  </div>
                  <p className={cx("category-address")}>
                    {category.address.length > 32
                      ? category.address.substring(0, 32) + " ..."
                      : category.address}
                  </p>
                  <div className={cx("category-sale")}>
                    <FontAwesomeIcon
                      className={cx("category-sale-icon")}
                      icon={faTag}
                    />
                    {category.sale === 0 ? (
                      <p className={cx("category-sale-title")}>Giảm món</p>
                    ) : (
                      <p className={cx("category-sale-title")}>
                        Giảm hết {category.sale}%
                      </p>
                    )}
                  </div>
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
    </div>
  );
}

export default FoodDeals;
