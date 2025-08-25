"use client";

import styles from "./layout.module.css";
import MainNav from "@components/MainNav/MainNav";
import Bar from "@components/Bar/Bar";
import Sidebar from "@components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { tracksGetAll } from "@/services/tracks/tracksApi";
import { setTracks } from "@/store/features/trackSlice";
import Loading from "./loading"; // путь к компоненту загрузки

type MusicLayoutProps = {
  children: React.ReactNode;
};

const MusicLayout = ({ children }: MusicLayoutProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await tracksGetAll();
        dispatch(setTracks(response));
      } catch (error) {
        console.error("Ошибка при получении треков:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <MainNav />
          {isLoading ? <Loading /> : children}
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default MusicLayout;