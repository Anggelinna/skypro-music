import styles from "./centerblock.module.css";
import classNames from "classnames";
import Link from "next/link";
import TrackList from "@components/TrackList/TrackList";
import Track from "@components/Track/Track";
import Filters from "@components/Filters/Filters";

type CenterBlockProps = {
  header: string;
  selectionId?: number;
};

const CenterBlock = ({ header, selectionId }: CenterBlockProps) => {
  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
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
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <TrackList selectionId={selectionId} />
      </div>
    </div>
  );
};

export default CenterBlock;