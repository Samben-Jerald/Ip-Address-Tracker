import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Input from "../../components/Input/input";
import Card from "../../components/Card/card";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  ZoomControl,
} from "react-leaflet";
import ErrorBoundary from "../../ErrorBoundard";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserIpAddress, fetchIpAddressDetails } from "../../action";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import Loader from "../../components/Loader/loader";
const { LeaftURL } = window.__conf__;

const PinMarker = (_iconSize) => {
  return L.icon({
    iconUrl: require("../../images/location.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

//Just comment text

const Homepage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { response, isLoading, error, errorMessage } = useSelector(
    (state) => state.UserIp
  );
  const { ipAddress, location, timeZone, ISP, lat, lng } = response;
  const [map, setMap] = useState({
    pos: {},
    map: null,
  });

  const changeHandler = (e) => {};
  const submitHandler = (e, data) => {
    dispatch({ type: "USER_DETAILS", payload: data });
    dispatch(fetchIpAddressDetails(data.value, history));
  };

  useEffect(() => {
    dispatch(getUserIpAddress(history));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setMap((prev) => {
      return {
        ...prev,
        pos: {
          lat: lat,
          lng: lng,
        },
      };
    });
  }, [lat, lng]);

  const stateHandler = () => {
    setMap((prev) => {
      return {
        ...prev,
        pos: {
          lat: lat,
          lng: lng,
        },
      };
    });
    const { map: useMap } = map;
    useMap.flyTo(map.pos, 14);
    console.log(map.map);
  };

  return (
    <ErrorBoundary>
      <div className={styles.main__container}>
        <div className={styles.input__container}>
          <div className={styles.input__widthContainer}>
            <div className={styles.input__heading}>
              <h2>Ip Address Tracker</h2>
            </div>
            <div className={styles.input}>
              <Input
                placeholder={"Search for a Ip address"}
                statushandler={changeHandler}
                submitHandler={submitHandler}
                maxLength={15}
                minLength={11}
              />
              <p style={{ color: "white", fontSize: "1.4rem" }}>
                {error && errorMessage}
              </p>
            </div>
          </div>
          <div>
            <div className={styles.card}>
              <Card
                ISP={ISP}
                IpAddress={ipAddress}
                location={location}
                timeZone={timeZone}
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.maps__container}>
            <MapContainer
              center={{
                lat: lat,
                lng: lng,
              }}
              zoom={14}
              maxBounds={20}
              style={{
                height: "65vh",
              }}
              minZoom={3}
              zoomControl={false}
              whenCreated={(map) =>
                setMap((prev) => {
                  return {
                    ...prev,
                    map,
                  };
                })
              }
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={LeaftURL}
              />
              <Marker
                position={{
                  lat: lat,
                  lng: lng,
                }}
                icon={PinMarker()}
              >
                <Popup>Your Location : {ipAddress}</Popup>
              </Marker>
              <ZoomControl position="bottomright" />
            </MapContainer>
            <button
              id="refreshButton"
              className={styles.refreshButton}
              onClick={stateHandler}
            ></button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Homepage;
