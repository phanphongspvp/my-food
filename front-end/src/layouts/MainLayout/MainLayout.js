import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
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
          <div className={cx("container-wrap")}>
            <Sidebar
              changeTitle={changeTitle}
              changeLocation={changeLocation}
            />
            <div className={cx("content")}>{children}</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
