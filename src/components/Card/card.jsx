import React from "react";
import styles from "./style.module.scss";

const Card = ({ IpAddress, location, timeZone, ISP }) => {
  return (
    <div className={styles.card__container}>
      <div>
        <h5 className={styles.card__heading}>Ip Address</h5>
        <h2 className={styles.card__content}>{IpAddress}</h2>
      </div>
      <div>
        <h5 className={styles.card__heading}>Location</h5>
        <h2 className={styles.card__content}>{location}</h2>
      </div>
      <div>
        <h5 className={styles.card__heading}>TimeZone</h5>
        <h2 className={styles.card__content}>{timeZone}</h2>
      </div>
      <div>
        <h5 className={styles.card__heading}>ISP</h5>
        <h2 className={styles.card__content}>{ISP}</h2>
      </div>
    </div>
  );
};

export default Card;
