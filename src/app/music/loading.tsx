import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <rect width="17" height="17" rx="4" fill="#ece9f1" />
        </svg>
        <div
          className={styles.search__text}
          style={{
            background: "#ece9f1",
            borderRadius: "6px",
            width: "100%",
            height: "24px",
          }}
        ></div>
      </div>
      <div
        className={styles.centerblock__h2}
        style={{
          background: "#ece9f1",
          borderRadius: "12px",
          width: "340px",
          height: "56px",
          marginBottom: "24px",
        }}
      ></div>
      <div className={styles.centerblock__filter}>
        <div
          className={styles.filter__title}
          style={{
            background: "#ece9f1",
            borderRadius: "8px",
            width: "110px",
            height: "24px",
          }}
        ></div>
        <div
          className={styles.filter__button}
          style={{
            background: "#ece9f1",
            color: "transparent",
            width: "120px",
            height: "36px",
          }}
        ></div>
        <div
          className={styles.filter__button}
          style={{
            background: "#ece9f1",
            color: "transparent",
            width: "120px",
            height: "36px",
          }}
        ></div>
        <div
          className={styles.filter__button}
          style={{
            background: "#ece9f1",
            color: "transparent",
            width: "120px",
            height: "36px",
          }}
        ></div>
      </div>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div
            className={`${styles.playlistTitle__col} ${styles.col01}`}
            style={{
              background: "#ece9f1",
              borderRadius: "6px",
              height: "18px",
            }}
          ></div>
          <div
            className={`${styles.playlistTitle__col} ${styles.col02}`}
            style={{
              background: "#ece9f1",
              borderRadius: "6px",
              height: "18px",
            }}
          ></div>
          <div
            className={`${styles.playlistTitle__col} ${styles.col03}`}
            style={{
              background: "#ece9f1",
              borderRadius: "6px",
              height: "18px",
            }}
          ></div>
          <div
            className={`${styles.playlistTitle__col} ${styles.col04}`}
            style={{
              background: "#ece9f1",
              borderRadius: "6px",
              height: "18px",
            }}
          ></div>
        </div>
        <div className={styles.content__playlist}>
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              className={styles.skeletonTrack}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div
                className={styles.track__title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "447px",
                }}
              >
                <div
                  className={styles.track__titleImage}
                  style={{
                    width: "51px",
                    height: "51px",
                    background: "#ece9f1",
                    borderRadius: "8px",
                    marginRight: "17px",
                  }}
                ></div>
                <div
                  className={styles.track__titleLink}
                  style={{
                    background: "#ece9f1",
                    borderRadius: "6px",
                    width: "120px",
                    height: "14px",
                  }}
                ></div>
              </div>
              <div className={styles.track__author} style={{ width: "321px" }}>
                <div
                  className={styles.track__authorLink}
                  style={{
                    background: "#ece9f1",
                    borderRadius: "6px",
                    width: "100px",
                    height: "14px",
                  }}
                ></div>
              </div>
              <div className={styles.track__album} style={{ width: "245px" }}>
                <div
                  className={styles.track__albumLink}
                  style={{
                    background: "#ece9f1",
                    borderRadius: "6px",
                    width: "100px",
                    height: "14px",
                  }}
                ></div>
              </div>
              <div
                className={styles.track__time}
                style={{ width: "60px", display: "flex", alignItems: "center" }}
              >
                <div
                  className={styles.track__timeText}
                  style={{
                    background: "#ece9f1",
                    borderRadius: "6px",
                    width: "40px",
                    height: "14px",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;