import axios from "axios";
import { useEffect, useState } from "react";
import {
  faAppStoreIos,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function Sidebar({ changeTitle, changeLocation }) {
  const btnContent = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Đồ ăn",
    },
    {
      id: 3,
      title: "Đồ uống",
    },
    {
      id: 4,
      title: "Đồ chay",
    },
    {
      id: 5,
      title: "Bánh kem",
    },
    {
      id: 6,
      title: "Tráng miệng",
    },
    {
      id: 7,
      title: "Homemade",
    },
    {
      id: 8,
      title: "Vỉa hè",
    },
    {
      id: 9,
      title: "Pizza/Burger",
    },
    {
      id: 10,
      title: "Món gà",
    },
    {
      id: 11,
      title: "Món lẩu",
    },
    {
      id: 12,
      title: "Sushi",
    },
    {
      id: 13,
      title: "Mì phở",
    },
    {
      id: 14,
      title: "Cơm hộp",
    },
  ];

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [modelActive, setModelActive] = useState(false);

  const debounce = useDebounce(query, 1000);

  useEffect(() => {
    if (!debounce.trim()) {
      setData([]);
      return;
    }

    // eslint-disable-next-line
    const fetchShops = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/search?q=${debounce}`
      );
      setData(res.data);
      setModelActive(true);
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
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <div className={cx("title")}>
            <p className={cx("title-one")}>Đặt Đồ ăn, giao hàng từ 20'...</p>
            <p className={cx("title-two")}>
              Có {changeLocation} Địa Điểm Ở {changeTitle} Từ 00:00 - 23:59
            </p>
          </div>
        </div>
        <div className={cx("input")}>
          <input
            className={cx("input-main")}
            placeholder="Tìm địa điểm, món ăn, địa chỉ..."
            value={query}
            onChange={handleChangeInput}
          />
          <button className={cx("input-btn")}>
            <FontAwesomeIcon icon={faSearch} className={cx("input-icon")} />
          </button>
        </div>
        {modelActive && (
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
                    <h6 className={cx("modal-idea-title")}>
                      {shop.title.length > 45
                        ? shop.title.substring(0, 45) + " ..."
                        : shop.title}
                    </h6>
                    <p className={cx("modal-idea-address")}>
                      {shop.address.length > 45
                        ? shop.address.substring(0, 45) + " ..."
                        : shop.address}
                    </p>
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
        )}
        <div className={cx("content")}>
          {btnContent.map((btn) => (
            <button className={cx("content-btn")} key={btn.id}>
              {btn.title}
            </button>
          ))}
        </div>
        <div className={cx("contact-app")}>
          <p className={cx("contact-title")}>
            Sử dụng App FongFood để có nhiều giảm giá và trải nghiệm tốt hơn
          </p>
          <div className={cx("contact-wrap")}>
            <a
              href="https://apps.apple.com/us/app/fongfood"
              className={cx("contact-link")}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faAppStoreIos}
                className={cx("contact-icon-ios")}
              />
              <div className={cx("contact-info")}>
                <p className={cx("contact-get")}>Available on the</p>
                <h3 className={cx("contact-name")}>App Store</h3>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.fongfood"
              className={cx("contact-link")}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faGooglePlay}
                className={cx("contact-icon-android")}
              />
              <div className={cx("contact-info")}>
                <p className={cx("contact-get")}>Get it on</p>
                <h3 className={cx("contact-name")}>Google play</h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
