"use client";

import React from "react";
import styles from "./signin.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { urerSignIn, userGetToken } from "@/services/auth/authApi";
import { useRouter } from "next/navigation";
import { Axios, AxiosError } from "axios";
import {
  setAccessToken,
  setRefreshToken,
  setUserName,
} from "@/store/features/authSlice";
import { useDispatch } from "react-redux";

type Inputs = {
  login: string;
  password: string;
};

export default function Signin() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = () => {
    setIsLoading(true);
    setErrorMessage(null);
    urerSignIn({ email: watch("login"), password: watch("password") })
      .then((res) => {
        if (res.status.toString().startsWith("2")) {
          // localStorage.setItem("email", res.data.email);
          // localStorage.setItem("username", res.data.username);
          // localStorage.setItem("_id", res.data._id.toString());
          dispatch(setUserName(res.data.username)); 
          userGetToken({
            email: watch("login"),
            password: watch("password"),
          }).then((token) => {
            console.log("Токен получен:", token);
            // localStorage.setItem("token", token.access);
            dispatch(setAccessToken(token.access));
            dispatch(setRefreshToken(token.refresh));
          });
          router.push("/music/main");
        }
        if (res.status.toString().startsWith("4")) {
          alert("Неверный логин или пароль");
        }
        if (res.status.toString().startsWith("5")) {
          alert("Ошибка сервера. Пожалуйста, попробуйте позже.");
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.error("Ошибка:", error);
            setErrorMessage(error.response?.data?.message);
          }
          if (error.request) {
            console.error("Ошибка запроса:", error.request);
            setErrorMessage(
              "Не найдено активной учетной записи с указанными данными."
            );
          } else {
            console.error("Ошибка настройки:", error.message);
            setErrorMessage("Произошла неизвестная ошибка, попробуйте позже.");
          }
        } else {
          console.error("Неизвестная ошибка:", error);
          setErrorMessage("Произошла неизвестная ошибка, попробуйте позже.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className={styles.modal__form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.modal__logo}>
        <img src="/img/logo_modal.png" alt="logo" />
      </div>

      <div className={styles.modal__inputContainer}>
        <input
          className={classNames(styles.modal__input)}
          type="text"
          placeholder="Почта"
          {...register("login", {
            required: "Введите почту",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Неверный формат почты",
            },
          })}
        />
        <div className={classNames(styles.errorContainer, styles.login)}>
          {errors.login?.message}
        </div>
      </div>
      <div className={styles.modal__inputContainer}>
        <input
          className={classNames(styles.modal__input)}
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 6,
              message: "Минимум 6 символов",
            },
          })}
        />
        <div className={styles.errorContainer}>{errors.password?.message}</div>
      </div>
      {errorMessage && (
        <div className={styles.errorContainer}>{errorMessage}</div>
      )}
      <button className={styles.modal__btnEnter} disabled={isLoading}>
        Войти
      </button>

      <Link
        href="/auth/signup"
        className={styles.modal__btnSignup}
        aria-disabled={isLoading}
      >
        Зарегистрироваться
      </Link>
    </form>
  );
}