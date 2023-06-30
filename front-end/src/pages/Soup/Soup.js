import { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import classnames from "classnames/bind";

import ContentMainLayout from "~/layouts/ContentMainLayout";

import styles from "./Soup.module.scss";

const cx = classnames.bind(styles);

function Soup() {
  const [deals, setDeals] = useState([]);
  const [noodles, setNoodle] = useState([]);

  useEffect(() => {
    const fetchRiceApi = async () => {
      fetch("http://localhost:5000/api/soups/main")
        .then((response) => response.json())
        .then((noodles) => setNoodle(noodles));
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
            contents={noodles}
            categorys={deals}
            to={"/soup/ha-noi/food/deals"}
          />
        </div>
      </div>
    </Scrollbars>
  );
}

export default Soup;
