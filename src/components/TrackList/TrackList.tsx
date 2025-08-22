"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./tracklist.module.css";
import Track from "@components/Track/Track";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { tracksGetAll, tracksGetSelection } from "@/services/tracks/tracksApi";
import { useAppDispatch } from "@/store/store";
import { setTracks as storeSetTracks } from "@/store/features/trackSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type TrackListProps = {
  selectionId?: number;
  tracks?: TrackType[];
};

const TrackList = ({ selectionId }: TrackListProps) => {
  const tracks = useSelector(
    (state: RootState): TrackType[] => state.tracks.currentTrackList
  );
  console.log("tracks1", tracks);
  return (
    <div className={styles.content__playlist}>
      {tracks.map((track: TrackType) => (
        <Track key={track._id} track={track} playList={tracks} />
      ))}
    </div>
  );
};

export default TrackList;