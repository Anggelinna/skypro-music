"use client";
import React, { useEffect } from "react";
import CenterBlock from "@components/CenterBlock/CenterBlock";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { TrackType } from "@/sharedTypes/sharedTypes";
import {
  setCurrentPlaylist,
  setCurrentTrackList,
} from "@/store/features/trackSlice";
import { RootState } from "@/store/store";

export default function Favorite() {
  const dispatch = useAppDispatch();
  const favoriteTracks = useSelector(
    (state: RootState): TrackType[] => state.tracks.favoriteTracks
  );

  useEffect(() => {
    dispatch(setCurrentTrackList(favoriteTracks));
    dispatch(setCurrentPlaylist(favoriteTracks));
  }, [favoriteTracks, dispatch]);

  return <CenterBlock header="Мой плейлист" />;
}