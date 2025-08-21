import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <svg className={styles.loading__spinner} viewBox="0 0 50 50">
        <circle
          className={styles.loading__path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        ></circle>
      </svg>
    </div>
  );
};

export default Loading;