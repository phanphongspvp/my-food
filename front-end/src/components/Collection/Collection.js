import { Link } from "react-router-dom";

import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classnames from "classnames/bind";
import styles from "./Collection.module.scss";

const cx = classnames.bind(styles);

function Collection({ categorys }) {
  return (
    <div className={cx("category")}>
      {/* Header category */}
      <div className={cx("category-header")}>
        <h5 className={cx("category-header-title")}>Bộ sưu tập</h5>
        <Link
          to="/ha-noi/food/collection-list"
          className={cx("category-link-all")}
        >
          <FontAwesomeIcon
            icon={faListUl}
            className={cx("category-header-icon")}
          />
          Xem tất cả
        </Link>
      </div>

      {/* Main category */}
      <div className={cx("category-main")}>
        <div className={cx("category-list")}>
          {categorys.map((category) => (
            <div className={cx("category-item")} key={category._id}>
              <div className={cx("category-wrap-item")}>
                <img
                  className={cx("category-img")}
                  src={category.image}
                  alt={category.title}
                />
                <h6 className={cx("category-title")}>
                  {category.title.length > 21
                    ? category.title.substring(0, 21) + " ..."
                    : category.title}
                </h6>
                <p className={cx("category-location")}>
                  {category.numberLct} địa điểm
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
