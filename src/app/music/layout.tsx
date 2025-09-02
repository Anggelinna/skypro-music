"use client";

import styles from "./layout.module.css";
import MainNav from "@components/MainNav/MainNav";
import Bar from "@components/Bar/Bar";
import Sidebar from "@components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { tracksGetAll, tracksGetFavorites } from "@/services/tracks/tracksApi";
import { setTracks, setFavoriteTracks } from "@/store/features/trackSlice";
import Loading from "./loading";
import UseInitAuth from "@/hooks/useInitAuth";
import { useAppSelector } from "@/store/store";
import { withReauth } from "@/utils/withReauth";

type MusicLayoutProps = {
  children: React.ReactNode;
};

const MusicLayout = ({ children }: MusicLayoutProps) => {
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  UseInitAuth();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(
    accessToken ? true : false
  );

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await tracksGetAll();
        dispatch(setTracks(response));
      } catch (error) {
        console.error("Ошибка при получении треков: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      try {
        const fetchFavoriteTracks = async () => {
          withReauth(
            (newToken) => tracksGetFavorites(newToken || accessToken),
            refreshToken,
            dispatch
          ).then((favoritesResponse) => {
            dispatch(setFavoriteTracks(favoritesResponse));
          });
        };
        fetchFavoriteTracks();
      } catch (error) {
        console.error("Ошибка при получении избранных треков: ", error);
      } finally {
        setIsLoadingFavorites(false);
      }
    }
  }, [accessToken]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <MainNav />
          {isLoading || isLoadingFavorites ? <Loading /> : children}
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default MusicLayout;