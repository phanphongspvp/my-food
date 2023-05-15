import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Dropdown.module.scss";

import { valueOption } from "~/data/dataOption";

const cx = classNames.bind(styles);

function DropDown({
  changeTitle,
  setChangeTitle,
  changeLocation,
  setChangeLocation,
}) {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  const handleChangeOption = (title, location) => {
    setChangeTitle(title);
    setChangeLocation(location);
    setActive(false);
  };

  return (
    <div className={cx("dropdown")}>
      <button className={cx("dropdown-btn")} onClick={handleActive}>
        {changeTitle}
        <FontAwesomeIcon className={cx("dropdown-icon")} icon={faCaretDown} />
      </button>
      {active && (
        <div className={cx("dropdown-content")}>
          {valueOption.map((option) => (
            <div
              className={cx("dropdown-item")}
              key={option.id}
              onClick={() => handleChangeOption(option.title, option.location)}
            >
              <div className={cx("dropdown-title")}>{option.title}</div>
              <div className={cx("dropdown-location")}>
                {option.location} địa điểm
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
