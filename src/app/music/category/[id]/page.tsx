"use client";
import { useParams } from "next/navigation";
import CenterBlock from "@components/CenterBlock/CenterBlock";
import { useEffect } from "react";
import { tracksGetSelection } from "@/services/tracks/tracksApi";
import { useState } from "react";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { useAppDispatch } from "@/store/store";
import { setCurrentTrackList } from "@/store/features/trackSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loading from "../../loading";

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [playListName, setPlayListName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const tracks = useSelector(
    (state: RootState): TrackType[] => state.tracks.tracks
  );

  const formTrackList = (tracks: TrackType[], playListItems: number[]) => {
    return tracks.filter((track) => playListItems.includes(track._id));
  };

  useEffect(() => {
    const getSelection = async () => {
      try {
        const response = await tracksGetSelection({ id: Number(id) + 1 });
        setPlayListName(response.name);
        dispatch(setCurrentTrackList(formTrackList(tracks, response.items)));
      } catch (error) {
        console.error("Ошибка при получении плейлиста:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getSelection();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  return <CenterBlock header={playListName} />;
};

export default CategoryPage;