import axios from "axios";
import { useEffect, useState } from "react";
import {
  faSearch,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import styles from "./Modal.module.scss";

import images from "~/assets/images";
import { useDebounce } from "~/hooks";

const cx = classnames.bind(styles);

function Modal({ handleChangeSearch, changeLocation, changeTitle }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const debounce = useDebounce(query, 1000);

  useEffect(() => {
    if (!debounce.trim()) {
      setData([]);
      return;
    }

    const fetchShops = async () => {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/search?q=${debounce}`
      );
      setData(res.data);

      setLoading(false);
    };

    fetchShops();
  }, [debounce]);

  const handleChangeInput = (e) => {
    const query = e.target.value;

    if (!query.startsWith(" ")) {
      setQuery(query);
    }
  };

  return (
    <div className={cx("modal")}>
      <div className={cx("modal-wrap")}>
        <button className={cx("model-btn")} onClick={handleChangeSearch}>
          <FontAwesomeIcon className="model-icon" icon={faXmark} />
        </button>
        <img
          className={cx("modal-img")}
          src={images.imgSearch}
          alt="Đặt Đồ ăn"
        />
        <p className={cx("modal-title")}>
          Đặt Đồ ăn, giao hàng từ 20'... có {changeLocation} địa điểm ở{" "}
          {changeTitle} từ 00:00 - 23:59
        </p>
        <input
          className={cx("modal-input")}
          value={query}
          onChange={handleChangeInput}
        />
        {loading && (
          <div className={cx("loading")}>
            <FontAwesomeIcon className={cx("loading-icon")} icon={faSpinner} />
          </div>
        )}
        <div className={cx("modal-idea-list")}>
          {data.map((shop) => (
            <div className={cx("modal-idea-item")} key={shop.id}>
              <div className={cx("modal-idea-wrap")}>
                <img
                  className={cx("modal-idea-img")}
                  src={shop.image}
                  alt={shop.title}
                />
                <div className={cx("modal-idea-content")}>
                  <h6 className={cx("modal-idea-title")}>{shop.title}</h6>
                  <p className={cx("modal-idea-address")}>{shop.address}</p>
                </div>
              </div>
              <div className={cx("modal-idea-status")}>
                Mở cửa
                <span className={cx("modal-idea-on")}></span>
              </div>
            </div>
          ))}
          {debounce.length > 0 ? (
            <div className={cx("modal-idea-more")}>
              <div className={cx("modal-idea-icon")}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <div className={cx("modal-idea-what")}>
                Tìm thêm kết quả cho
                <p className={cx("modal-idea-key")}>{debounce}</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
