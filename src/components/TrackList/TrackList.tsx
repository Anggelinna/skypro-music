//import { ReactNode } from "react";
import styles from "./tracklist.module.css";
import { data } from "../../data";
import Track from "../Track/Track";
import { TrackType } from "../../sharedTypes/sharedTypes";

const TrackList = () => {
  return (
    <div className={styles.content__playlist}>
      {data.map((track: TrackType) => (
        <Track key={track._id} {...track} />
      ))}
    </div>
  );
};

export default TrackList;