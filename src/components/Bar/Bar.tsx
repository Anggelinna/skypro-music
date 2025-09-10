"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./bar.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  togglePlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from "@/store/features/trackSlice";
import { getTimePanel } from "@utils/helper";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useLikeTrack } from "@/hooks/useLikeTracks";

const Bar = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [loadedTrack, setLoadedTrack] = useState(false);
  const [volueme, setVolume] = useState(0.5);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  const isPlaying = useAppSelector(
    (state) => state.tracks.currentTrack.isPlaying
  );

  const currentTrack = useAppSelector(
    (state) => state.tracks.currentTrack.track
  );

  const { accessToken } = useAppSelector((state) => state.auth);

  const { toggleLike, isLike } = useLikeTrack(currentTrack);

  useEffect(() => {
    setLoadedTrack(false);
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      dispatch(togglePlay());
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      dispatch(togglePlay());
    }
  };

  const handleLoopToggle = () => {
    setIsLoop((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
    }
  };

  useEffect(() => {
    if (audioRef.current && currentTrack && isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay failed", err);
      });
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      dispatch(togglePlay());
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch]);

  if (!currentTrack) {
    return null;
  }

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setLoadedTrack(true);
      dispatch(togglePlay(true));
    }
  };

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value) / 100;
    console.log(newVolume);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlerProgressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (audioRef.current) {
      const newTime = parseFloat(event.target.value);
      audioRef.current.currentTime = newTime;
    }
  };

  const nextTrack = () => {
    dispatch(setNextTrack());
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCurrentTime(0);
  };

  const prevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    setIsShuffled((prev) => !prev);
    dispatch(toggleShuffle());
  };

  const likeIcon = () => {
    if (!accessToken) {
      return "dislike-notauth"; // используем обычную иконку dislike
    } else {
      return isLike ? "like" : "dislike";
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (accessToken) {
      toggleLike();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        loop={isLoop}
        autoPlay
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={nextTrack}
      ></audio>
      <div className={styles.bar}>
        <div className={styles.bar__content}>
          <ProgressBar
            max={audioRef.current?.duration || 0}
            step={0.1}
            readOnly={!loadedTrack}
            value={currentTime}
            onChange={handlerProgressChange}
          />
          <div className={styles.bar__playerBlock}>
            <div className={styles.bar__player}>
              <div className={styles.player__controls}>
                <div className={styles.player__btnPrev} onClick={prevTrack}>
                  <svg className={styles.player__btnPrevSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                  </svg>
                </div>
                <div
                  className={classNames(styles.player__btnPlay, styles.btn)}
                  onClick={handlePlayPause}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use
                      xlinkHref={`/img/icon/sprite.svg#icon-${
                        isPlaying ? "pause" : "play"
                      }`}
                    ></use>
                  </svg>
                </div>
                <div className={styles.player__btnNext} onClick={nextTrack}>
                  <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.player__btnRepeat,
                    styles.btnIcon
                  )}
                  onClick={handleLoopToggle}
                >
                  <svg
                    className={classNames(styles.player__btnRepeatSvg, {
                      [styles.player__btnRepeat_on]: isLoop,
                    })}
                  >
                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon
                  )}
                  onClick={onToggleShuffle}
                >
                  <svg
                    className={classNames(styles.player__btnShuffleSvg, {
                      [styles.player__btnShuffle_on]: isShuffled,
                    })}
                  >
                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                  </svg>
                </div>
              </div>

              <div className={styles.player__trackPlay}>
                <div className={styles.trackPlay__contain}>
                  <div className={styles.trackPlay__image}>
                    <svg className={styles.trackPlay__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </div>
                  <div className={styles.trackPlay__author}>
                    <Link className={styles.trackPlay__authorLink} href="">
                      {currentTrack.name}
                    </Link>
                  </div>
                  <div className={styles.trackPlay__album}>
                    <Link className={styles.trackPlay__albumLink} href="">
                      {currentTrack.author}
                    </Link>
                  </div>
                </div>

                <div className={styles.trackPlay__likeDis}>
                  <div
                    className={classNames(
                      styles.trackPlay__dislike,
                      styles.btnIcon,
                      {
                        [styles.trackPlay__dislikeLiked]: isLike && accessToken,
                        [styles.trackPlay__dislikeNotAuth]: !accessToken,
                      }
                    )}
                    onClick={handleLikeClick}
                  >
                    <svg className={styles.trackPlay__dislikeSvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#icon-${likeIcon()}`}
                      ></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bar__rightBlock}>
              <div className={styles.bar__timeBlock}>
                {getTimePanel(currentTime, audioRef.current?.duration || 0)}
              </div>
              <div className={styles.bar__volumeBlock}>
                <div className={styles.volume__content}>
                  <div className={styles.volume__image}>
                    <svg className={styles.volume__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div
                    className={classNames(styles.volume__progress, styles.btn)}
                  >
                    <input
                      className={classNames(
                        styles.volume__progressLine,
                        styles.btn
                      )}
                      type="range"
                      name="range"
                      onChange={onVolumeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bar;