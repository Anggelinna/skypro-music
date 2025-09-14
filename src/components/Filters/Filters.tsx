import styles from "./filters.module.css";
import Filter from "@components/Filter/Filter";

const Filters = () => {
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <Filter label="исполнителю" facet="artists" />
      <Filter label="году выпуска" facet="years" />
      <Filter label="жанру" facet="genres" />
    </div>
  );
};

export default Filters;