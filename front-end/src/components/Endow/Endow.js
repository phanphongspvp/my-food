import { Link } from "react-router-dom";

import { faListUl, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classnames from "classnames/bind";
import styles from "./Endow.module.scss";

const cx = classnames.bind(styles);

function Endow({ contents, to }) {
  return (
    <div className={cx("content")}>
      {/* Header content */}
      <div className={cx("content-header")}>
        <h5 className={cx("content-header-title")}>Ưu đãi</h5>
        <Link to={to} className={cx("content-link-all")}>
          <FontAwesomeIcon
            icon={faListUl}
            className={cx("content-header-icon")}
          />
          Xem tất cả
        </Link>
      </div>

      {/* Main content */}
      <div className={cx("content-main")}>
        <div className={cx("content-list")}>
          {contents.map((content) => (
            <div className={cx("content-item")} key={content._id}>
              <div className={cx("content-wrap-item")}>
                {content.active && <div className={cx("content-active")}></div>}
                <img
                  className={cx("content-img")}
                  src={content.image}
                  alt={content.title}
                />
                <h6 className={cx("content-title")}>
                  {content.title.length > 20
                    ? content.title.substring(0, 20) + " ..."
                    : content.title}
                </h6>
                <p className={cx("content-address")}>
                  {content.address.length > 26
                    ? content.address.substring(0, 26) + " ..."
                    : content.address}
                </p>
                <div className={cx("content-sale")}>
                  <FontAwesomeIcon
                    className={cx("content-sale-icon")}
                    icon={faTag}
                  />
                  {content.sale === 0 ? (
                    <p className={cx("content-sale-title")}>Giảm món</p>
                  ) : (
                    <p className={cx("content-sale-title")}>
                      Giảm hết {content.sale}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Endow;
