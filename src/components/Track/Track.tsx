"use client";
import Link from "next/link";
import styles from "./track.module.css";
import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  setCurrentTrack,
  setCurrentPlaylist,
} from "@/store/features/trackSlice";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { formatTime } from "@utils/helper";
import classNames from "classnames";
import { useLikeTrack } from "@/hooks/useLikeTracks";

type TrackProps = {
  track: TrackType;
  playList: TrackType[];
};

const Track = ({ track, playList }: TrackProps) => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(
    (state) => state.tracks.currentTrack.isPlaying
  );

  const { accessToken } = useAppSelector((state) => state.auth);
  const { toggleLike, isLike } = useLikeTrack(track);
  const currentTrack = useAppSelector(
    (state) => state.tracks.currentTrack.track
  );

  const isCurrentTrack = currentTrack?._id === track._id;

  const handlerClickCurrentTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playList));
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (accessToken) {
      toggleLike();
    }
  };


  const getLikeIcon = () => {
    if (!accessToken) {
      return "dislike"; // Для неавторизованных - обычный dislike
    }
    return isLike ? "like" : "dislike";
  };


  const svgClasses = classNames(styles.track__timeSvg, {
    [styles.track__timeSvgAuth]: accessToken, // Стили для авторизованных
    [styles.track__timeSvgNotAuth]: !accessToken, // Стили для неавторизованных
    [styles.track__timeSvgLiked]: accessToken && isLike, // Стили для лайкнутых
  });

  return (
    <div className={styles.playlist__item} onClick={handlerClickCurrentTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isCurrentTrack ? (
              <>
                {isPlaying ? (
                  <div className={styles.track__playingDot}></div>
                ) : (
                  <div className={styles.track__currentDot}></div>
                )}
              </>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div>
            <Link className={styles.track__titleLink} href="">
              {track.name}
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg
            className={svgClasses}
            onClick={handleLikeClick}
          >
            <use xlinkHref={`/img/icon/sprite.svg#icon-${getLikeIcon()}`}></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;