"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./sidebar.module.css";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { clearUser } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";

const Bar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userName = useAppSelector((state) => state.auth.userName);

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/auth/signin");
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <div className={styles.sidebar__upperblock} onClick={handleLogout}>
          <p className={styles.sidebar__personalName}>{userName}</p>
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