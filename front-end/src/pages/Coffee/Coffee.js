import { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import classnames from "classnames/bind";

import ContentMainLayout from "~/layouts/ContentMainLayout";

import styles from "./Coffee.module.scss";

const cx = classnames.bind(styles);

function Coffee() {
  const [deals, setDeals] = useState([]);
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    const fetchRiceApi = async () => {
      fetch("http://localhost:5000/api/coffees/main")
        .then((response) => response.json())
        .then((coffees) => setCoffees(coffees));
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
            contents={coffees}
            categorys={deals}
            to={"/coffee/ha-noi/food/deals"}
          />
        </div>
      </div>
    </Scrollbars>
  );
}

export default Coffee;
