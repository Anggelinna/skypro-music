"use client";

import { useState } from "react";
import styles from "./mainnav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import { clearUser } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const MainNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { accessToken } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearUser());
    if (!accessToken) {
      router.push("/auth/signin");
    } else {
      router.push("/music/main");
    }
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main">
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={"logo"}
          />
        </Link>
      </div>
      <div className={styles.nav__burger} onClick={toggleMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div className={styles.nav__menu}>
        {isOpen && (
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            {accessToken && (
              <li className={styles.menu__item}>
                <Link href="/music/favorite" className={styles.menu__link}>
                  Мой плейлист
                </Link>
              </li>
            )}
            <li className={styles.menu__item}>
              <div onClick={handleLogout} className={styles.menu__link}>
                {accessToken ? "Выйти" : "Войти"}
              </div>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default MainNav;