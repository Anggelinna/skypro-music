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
  const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);

  const { toggleLike } = useLikeTrack(track);
  const isLike = favoriteTracks.some((favTrack) => favTrack._id === track._id);

  const currentTrack = useAppSelector(
    (state) => state.tracks.currentTrack.track
  );

  const isCurrentTrack = currentTrack?._id === track._id;

  const handlerClickCurrentTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playList));
  };

  const likeIcon = () => {
    if (!accessToken) {
      return "dislike-notauth";
    } else {
      return isLike ? "like" : "dislike";
    }
  };

  const getSvgClass = () => {
    if (!accessToken) {
      return `${styles.track__timeSvg} ${styles.track__timeSvgDisabled} ${styles.track__timeSvgNotAuth}`;
    }
    if (isLike) {
      return `${styles.track__timeSvg} ${styles.track__timeSvgLiked}`;
    }
    return `${styles.track__timeSvg} ${styles.track__timeSvgNormal}`;
  };

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
                <use xlinkHref={`/img/icon/sprite.svg#icon-note`}></use>
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
            className={getSvgClass()}
            onClick={(e) => {
              e.stopPropagation();
              if (accessToken) {
                toggleLike();
              }
            }}
          >
            <use xlinkHref={`/img/icon/sprite.svg#icon-${likeIcon()}`}></use>
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