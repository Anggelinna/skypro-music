"use client";
import styles from "./tracklist.module.css";
import Track from "@components/Track/Track";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { useSelector } from "react-redux";
import { selectVisibleTracks } from "@/store/selectors/tracks";

type TrackListProps = {
  selectionId?: number;
  tracks?: TrackType[];
};

const TrackList = ({ selectionId }: TrackListProps) => {
  const tracks = useSelector(selectVisibleTracks);

  return (
    <div className={styles.content__playlist}>
      {tracks.map((track: TrackType) => (
        <Track key={track._id} track={track} playList={tracks} />
      ))}
    </div>
  );
};

export default TrackList;