import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("footer")}>
          <div className={cx("category")}>
            <h5 className={cx("title")}>Công ty</h5>
            <ul className={cx("category-list")}>
              <li className={cx("category-item")}>Giới thiệu</li>
              <li className={cx("category-item")}>Trung tâm Trợ giúp</li>
              <li className={cx("category-item")}>Quy chế</li>
              <li className={cx("category-item")}>Điều khoản sử dụng</li>
              <li className={cx("category-item")}>Bảo mật thông tin</li>
              <li className={cx("category-item")}>Giải quyết khiếu nại</li>
              <li className={cx("category-item")}>Liên hệ</li>
              <li className={cx("category-item")}>Hợp tác giao nhận</li>
              <li className={cx("category-item")}>Đăng ký quán</li>
            </ul>
          </div>

          <div className={cx("app")}>
            <h5 className={cx("title")}>Ứng dụng FongFood</h5>
            <ul className={cx("app-list")}>
              <li className={cx("app-item")}>
                <img
                  src={images.imgAppStore}
                  alt="App-Store"
                  className={cx("app-img")}
                />
              </li>
              <li className={cx("app-item")}>
                <img
                  src={images.imgGooglePlay}
                  alt="Google-Play"
                  className={cx("app-img")}
                />
              </li>
              <li className={cx("app-item")}>
                <img
                  src={images.imgAppGallery}
                  alt="App-Gallery"
                  className={cx("app-img")}
                />
              </li>
            </ul>
          </div>

          <div className={cx("block")}>
            <img className={cx("block-img")} src={images.logo} alt="logo" />
            <p className={cx("block-font")}>© 2023 ShopeeFood</p>
            <div className={cx("block-social")}>
              <FontAwesomeIcon icon={faFacebook} className={cx("block-icon")} />
              <FontAwesomeIcon
                icon={faInstagram}
                className={cx("block-icon")}
              />
            </div>
          </div>

          <div className={cx("address")}>
            <h5 className={cx("title")}>Địa chỉ công ty</h5>
            <div className={cx("address-content")}>
              <p className={cx("address-text")}>Công Ty Cổ Phần Foody</p>
              <p className={cx("address-text")}>Lầu G, Tòa nhà Jabes 1,</p>
              <p className={cx("address-text")}>
                số 244 đường Cống Quỳnh, phường Phạm Ngũ Lão, Quận 1, TPHCM
              </p>
              <p className={cx("address-text")}>Giấy CN ĐKDN số: 0311828036</p>
              <p className={cx("address-text")}>
                sửa đổi lần thứ 23, ngày 10/12/2020
              </p>
              <p className={cx("address-text")}>
                Chịu trách nhiệm quản lý nội dung: Phan Văn Phong
              </p>
              <p className={cx("address-text")}>
                Điện thoại liên hệ: 088 8845200
              </p>
              <div className={cx("address-text")}>
                Email:
                <a
                  href="mailto:phanphongspvp@gmail.com"
                  className={cx("address-mail")}
                >
                  support@fongfood.vn
                </a>
              </div>
              <img
                className={cx("address-registered")}
                src={images.imgRegistered}
                alt="ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
