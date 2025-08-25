"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./sidebar.module.css";
import { useRouter } from "next/navigation";

const Bar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("_id");
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <div onClick={handleLogout}>
          <p className={styles.sidebar__personalName}></p>
          <div className={styles.sidebar__icon}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__lin} href="/music/category/1">
              <Image
                className={styles.sidebar__im}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__ite}>
            <Link className={styles.sidebar__lin} href="/music/category/2">
              <Image
                className={styles.sidebar__im}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__ite}>
            <Link className={styles.sidebar__lin} href="/music/category/3">
              <Image
                className={styles.sidebar__im}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bar;