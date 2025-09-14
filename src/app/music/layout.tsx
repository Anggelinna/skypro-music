"use client";
import styles from "./layout.module.css";
import MainNav from "@components/MainNav/MainNav";
import Bar from "@components/Bar/Bar";
import Sidebar from "@components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { tracksGetAll, tracksGetFavorites } from "@/services/tracks/tracksApi";
import {
  setTracks,
  setFavoriteTracks,
  setFetchError,
} from "@/store/features/trackSlice";
import Loading from "./loading";
import UseInitAuth from "@/hooks/useInitAuth";
import { useAppSelector } from "@/store/store";
import { withReauth } from "@/utils/withReauth";
import { ToastContainer, toast } from "react-toastify";

type MusicLayoutProps = {
  children: React.ReactNode;
};

const MusicLayout = ({ children }: MusicLayoutProps) => {
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  const fetchError = useAppSelector((state) => state.tracks.fetchError);
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
        const message = error instanceof Error ? error.message : String(error);
        if (fetchError !== message) {
          dispatch(setFetchError(message));
          toast.error(`Ошибка при получении треков: ${message}`);
        }
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
        const message = error instanceof Error ? error.message : String(error);
        if (fetchError !== message) {
          dispatch(setFetchError(message));
          toast.error(`Ошибка при получении избранных треков: ${message}`, {
            toastId: "music-layout-toast",
          });
        }
      } finally {
        setIsLoadingFavorites(false);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (fetchError) {
      toast.error(`Ошибка: ${fetchError}`, {
        toastId: "music-layout-toast",
      });
      dispatch(setFetchError(null));
    }
  }, [fetchError]);

  return (
    <div className={styles.wrapper}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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