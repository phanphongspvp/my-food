import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./OnlyHeaderLayout.module.scss";

import Header from "../components/Header";

const cx = classNames.bind(styles);

function OnlyHeaderLayout({ children }) {
  const [changeTitle, setChangeTitle] = useState("Hà Nội");
  const [changeLocation, setChangeLocation] = useState(45121);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Header
          changeTitle={changeTitle}
          setChangeTitle={setChangeTitle}
          changeLocation={changeLocation}
          setChangeLocation={setChangeLocation}
        />
        <div className={cx("container")}>
          <div className={cx("container-wrap")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default OnlyHeaderLayout;
