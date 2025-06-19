"use client";

import styles from "./filters.module.css";
import { useState } from "react";
import Filter from "@/components/Filter/Filter";

const Filters = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const handleFilterClick = (name: string | null) => {
    setActiveFilter(activeFilter === name ? null : name);
  };
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <Filter
        name="исполнителю"
        onClick={handleFilterClick}
        activeFilter={activeFilter}
        filterName="author"
      />
      <Filter
        name="году выпуска"
        onClick={handleFilterClick}
        activeFilter={activeFilter}
        filterName="release_date"
      />
      <Filter
        name="жанру"
        onClick={handleFilterClick}
        activeFilter={activeFilter}
        filterName="genre"
      />
    </div>
  );
};

export default Filters;