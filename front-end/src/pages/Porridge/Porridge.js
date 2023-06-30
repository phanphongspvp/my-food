import { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import classnames from "classnames/bind";

import ContentMainLayout from "~/layouts/ContentMainLayout";

import styles from "./Porridge.module.scss";

const cx = classnames.bind(styles);

function Porridge() {
  const [deals, setDeals] = useState([]);
  const [porridges, setPorridges] = useState([]);

  useEffect(() => {
    const fetchRiceApi = async () => {
      fetch("http://localhost:5000/api/porridges/main")
        .then((response) => response.json())
        .then((porridges) => setPorridges(porridges));
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
            contents={porridges}
            categorys={deals}
            to={"/porridge/ha-noi/food/deals"}
          />
        </div>
      </div>
    </Scrollbars>
  );
}

export default Porridge;
