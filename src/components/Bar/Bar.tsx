"use client";

import { useRef, useEffect } from "react";
import styles from "./bar.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { togglePlay } from "@/store/features/trackSlice";

const Bar = () => {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  const isPlaying = useAppSelector(
    (state) => state.tracks.currentTrack.isPlaying
  );

  const currentTrack = useAppSelector(
    (state) => state.tracks.currentTrack.track
  );

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

  const handlerOtherButtons = () => {
    alert("Еще не реализовано");
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} src={currentTrack.track_file} controls></audio>
      <div className={styles.bar}>
        <div className={styles.bar__content}>
          <div className={styles.bar__playerProgress}></div>
          <div className={styles.bar__playerBlock}>
            <div className={styles.bar__player}>
              <div className={styles.player__controls}>
                <div
                  className={styles.player__btnPrev}
                  onClick={handlerOtherButtons}
                >
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
                <div
                  className={styles.player__btnNext}
                  onClick={handlerOtherButtons}
                >
                  <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.player__btnRepeat,
                    styles.btnIcon
                  )}
                  onClick={handlerOtherButtons}
                >
                  <svg className={styles.player__btnRepeatSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon
                  )}
                  onClick={handlerOtherButtons}
                >
                  <svg className={styles.player__btnShuffleSvg}>
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
                      Ты та...
                    </Link>
                  </div>
                  <div className={styles.trackPlay__album}>
                    <Link className={styles.trackPlay__albumLink} href="">
                      Баста
                    </Link>
                  </div>
                </div>

                <div className={styles.trackPlay__dislike}>
                  <div
                    className={classNames(
                      styles.player__btnShuffle,
                      styles.btnIcon
                    )}
                  >
                    <svg className={styles.trackPlay__likeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                    </svg>
                  </div>
                  <div
                    className={classNames(
                      styles.trackPlay__dislike,
                      styles.btnIcon
                    )}
                  >
                    <svg className={styles.trackPlay__dislikeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                    </svg>
                  </div>
                </div>
              </div>
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
                  />
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