"use client";
import React from "react";
import classNames from "classnames";
import styles from "./centerblock.module.css";
import TrackList from "@components/TrackList/TrackList";
import Filters from "@components/Filters/Filters";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFilterQuery } from "../../store/features/trackSlice";

type CenterBlockProps = {
  header: string;
  selectionId?: number;
};

const CenterBlock: React.FC<CenterBlockProps> = ({ header }) => {
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector((s) => s.tracks.filters?.query) ?? "";

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterQuery(e.target.value));
  };

  return (
    <div className={styles.centerblock}>
      {/* Поиск */}
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg} aria-hidden="true">
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      <h2 className={styles.centerblock__h2}>{header}</h2>
      <Filters />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg} aria-hidden="true">
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <TrackList />
      </div>
    </div>
  );
};

export default CenterBlock;