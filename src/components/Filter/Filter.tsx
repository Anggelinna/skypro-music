import styles from "./Filter.module.css";
import { getUniqueValuesByKey, dateFormat } from "@/utils/helper";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { data } from "@/data";

type FilterProps = {
  name: string;
  onClick: (name: string | null) => void;
  activeFilter: string | null;
  filterName: keyof TrackType;
};

const Filter = ({ name, onClick, activeFilter, filterName }: FilterProps) => {
  return (
    <div className={styles.filter__button_group}>
      <div className={styles.filter__button} onClick={() => onClick(name)}>
        {name}
      </div>
      {activeFilter === name && (
        <div className={styles.filter__dropdown}>
          <div className={styles.filter__list}>
            {getUniqueValuesByKey(data, filterName).map((item, idx) => (
              <div
                key={String(item) + idx}
                className={styles.filter__list_element}
              >
                {filterName === "release_date"
                  ? dateFormat(String(item))
                  : String(item)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;