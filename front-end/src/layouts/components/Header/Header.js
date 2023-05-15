import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { valueBtn } from "~/data/dataBtn";
import DropDown from "~/components/Dropdown";

import images from "~/assets/images";

import Modal from "~/components/Modal";

const cx = classNames.bind(styles);

function Header({
  changeTitle,
  setChangeTitle,
  changeLocation,
  setChangeLocation,
}) {
  const [customValueBtn, setCustomValueBtn] = useState({
    indexBtn: valueBtn[0],
    valueBtn: valueBtn,
  });

  const [changeModal, setChangeModal] = useState(false);

  const handleClickChange = (id) => {
    setCustomValueBtn({
      ...customValueBtn,
      indexBtn: customValueBtn.valueBtn[id],
    });
  };

  const handleChangeSearch = () => {
    setChangeModal(!changeModal);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        {/* Logo */}
        <Link to="/" onClick={() => handleClickChange(0)}>
          <img className={cx("logo")} src={images.logo} alt="logo" />
        </Link>

        <div className={cx("header-main")}>
          {/* Select */}
          <DropDown
            changeTitle={changeTitle}
            setChangeTitle={setChangeTitle}
            changeLocation={changeLocation}
            setChangeLocation={setChangeLocation}
          />

          {/* Navigation */}
          <ul className={cx("navbar-list")}>
            <li>
              {customValueBtn.valueBtn.map((btn, index) => (
                <Link
                  to={btn.path}
                  key={index}
                  className={
                    customValueBtn.valueBtn[index] === customValueBtn.indexBtn
                      ? cx("navbar-item", "active")
                      : cx("navbar-item")
                  }
                  onClick={() => handleClickChange(index)}
                >
                  <button className={cx("navbar-btn")}>{btn.title}</button>
                </Link>
              ))}
            </li>
          </ul>
        </div>

        {/* Control */}
        <div className={cx("control")}>
          <button className={cx("btn-search")} onClick={handleChangeSearch}>
            <img
              className={cx("icon-search")}
              src={images.search}
              alt="iconSearch"
            />
          </button>
          {changeModal && (
            <Modal
              handleChangeSearch={handleChangeSearch}
              changeLocation={changeLocation}
              changeTitle={changeTitle}
            />
          )}
          <button className={cx("btn-login")}>Đăng nhập</button>
        </div>

        {/* Language */}
      </div>
    </div>
  );
}

export default Header;
