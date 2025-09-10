"use client";
import React, { use, useEffect } from "react";
import CenterBlock from "@components/CenterBlock/CenterBlock";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { TrackType } from "@/sharedTypes/sharedTypes";
import {
  setCurrentTrackList,
  setCurrentPlaylist,
} from "@/store/features/trackSlice";
import { RootState } from "@/store/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const tracks = useSelector(
    (state: RootState): TrackType[] => state.tracks.tracks
  );

  useEffect(() => {
    dispatch(setCurrentTrackList(tracks));
    dispatch(setCurrentPlaylist(tracks));
  }, [tracks, dispatch]);

  return <CenterBlock header="Треки" />;
}