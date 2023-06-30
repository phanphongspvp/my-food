import { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import classnames from "classnames/bind";

import ContentMainLayout from "~/layouts/ContentMainLayout";

import styles from "./Home.module.scss";

const cx = classnames.bind(styles);

function Home() {
  const [deals, setDeals] = useState([]);
  const [rices, setRices] = useState([]);

  useEffect(() => {
    const fetchRiceApi = async () => {
      fetch("http://localhost:5000/api/rices/main")
        .then((response) => response.json())
        .then((rices) => setRices(rices));
    };

    fetchRiceApi();
  }, []);

  useEffect(() => {
    const fetchDealApi = async () => {
      fetch("http://localhost:5000/api/deals/main")
        .then((response) => response.json())
        .then((deals) => setDeals(deals));
    };

    fetchDealApi();
  }, []);

  return (
    <Scrollbars
      style={{ width: 670 }}
      renderThumbVertical={({ style }) => (
        <div style={{ ...style, display: "none" }} />
      )}
    >
      <div className={cx("container")}>
        <div className={cx("inner")}>
          <ContentMainLayout
            contents={rices}
            categorys={deals}
            to={"/ha-noi/food/deals"}
          />
        </div>
      </div>
    </Scrollbars>
  );
}

export default Home;
