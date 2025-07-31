//import { ReactNode } from "react";
import styles from "./tracklist.module.css";
import { data } from "../../data";
import Track from "../Track/Track";
import { TrackType } from "../../sharedTypes/sharedTypes";
import { formatTime } from "../../utils/helper";

const TrackList = () => {
  return (
    <div className={styles.content__playlist}>
      {data.map((track: TrackType) => (
        <Track
          key={track._id}
          title={track.name}
          author={track.author}
          album={track.album}
          time={formatTime(track.duration_in_seconds)}
        />
      ))}
    </div>
  );
};

export default TrackList;