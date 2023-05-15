import { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import {
  faChevronRight,
  faCircleXmark,
  faMapPin,
  faRightLong,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classnames from "classnames/bind";
import styles from "./Location.module.scss";

const cx = classnames.bind(styles);

function Location() {
  const [model, setModel] = useState(false);
  const [valueInput, setValueInput] = useState(
    "Phòng 16 Số 9 58/23/4 Trần BÌnh, Tổ dân phố số 24, Cầu Giấy, Hà Nội, Việt Nam"
  );

  const handleResetInput = () => {
    setValueInput("");
  };

  const handleCloseModel = () => {
    setModel(!model);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("location")} onClick={handleCloseModel}>
        <p className={cx("location-title")}>Đồ ăn</p>
        <FontAwesomeIcon className={cx("location-icon")} icon={faRightLong} />
        <p className={cx("address")}>
          Phòng 16 Số 9 58/23/4 Trần BÌnh, Tổ dân phố số 24, Cầu Giấy, Hà Nội,
          Việt Nam
        </p>
        <FontAwesomeIcon
          className={cx("location-icon")}
          icon={faChevronRight}
        />
      </div>
      {model && (
        <div className={cx("model")}>
          <div className={cx("model-wrap")}>
            <button
              className={cx("model-btn-close")}
              onClick={handleCloseModel}
            >
              <FontAwesomeIcon
                className={cx("model-icon-close")}
                icon={faXmark}
              />
            </button>
            <div className={cx("model-header")}>
              <h5 className={cx("model-header-title")}>
                Bạn muốn giao đến đâu?
              </h5>
            </div>
            <div className={cx("model-input-wrap")}>
              <FontAwesomeIcon
                className={cx("model-input-iconSearch")}
                icon={faSearch}
              />
              <input
                className={cx("model-input")}
                placeholder="Nhập địa chỉ giao hàng"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
              />
              <FontAwesomeIcon
                className={cx("model-input-iconXmark")}
                icon={faCircleXmark}
                onClick={handleResetInput}
              />
            </div>
            <div className={cx("model-footer")}>
              <div className={cx("model-map")}>
                <FontAwesomeIcon
                  className={cx("model-map-iconMapPin")}
                  icon={faMapPin}
                />
                <p className={cx("model-map-title")}>Tìm trên bản đồ</p>
              </div>
              <FontAwesomeIcon
                className={cx("model-map-iconChevronRight")}
                icon={faChevronRight}
              />
            </div>
            <GoogleMap
              zoom={10}
              center={{ lat: 44, lng: -80 }}
              mapContainerClassName={cx("map-container")}
            ></GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;
