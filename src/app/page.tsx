import Image from 'next/image';
import './page.css';
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <nav className={styles.main__nav}>
            <div className={styles.nav__logo}>
              {/*TODO: img –> Image*/}
              <Image
                width={250}
                height={170}
                className={styles.logo__image}
                src="/img/logo.png"
                alt={'logo'}
              />
            </div>
            <div className={styles.nav__burger}>
              <span className={styles.burger__line}></span>
              <span className={styles.burger__line}></span>
              <span className={styles.burger__line}></span>
            </div>
            <div className={styles.nav__menu}>
              <ul className={styles.menu__list}>
                <li className={styles.menu__item}>
                  {/*TODO: a -> Link*/}
                  <a href="#" className={styles.menu__link}>
                    Главное
                  </a>
                </li>
                <li className={styles.menu__item}>
                  <a href="#" className={styles.menu__link}>
                    Мой плейлист
                  </a>
                </li>
                <li className={styles.menu__item}>
                  <a href="../signin.html" className={styles.menu__link}>
                    Войти
                  </a>
                </li>
              </ul>
            </div>
          </nav>
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
            <h2 className={styles.centerblock__h2}>Треки</h2>
            <div className={styles.centerblock__filter}>
              <div className={styles.filter__title}>Искать по:</div>
              <div className={styles.filter__button}>исполнителю</div>
              <div className={styles.filter__button}>году выпуска</div>
              <div className={styles.filter__button}>жанру</div>
            </div>
            <div className={styles.centerblock__content}>
              <div className={styles.content__title}>
                <div className={'playlistTitle__col col01'}>Трек</div>
                <div className={'playlistTitle__col col02'}>Исполнитель</div>
                <div className={'playlistTitle__col col03'}>Альбом</div>
                <div className={'playlistTitle__col col04'}>
                  <svg className={styles.playlistTitle__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                  </svg>
                </div>
              </div>
              <div className={styles.content__playlist}>
                <div className={styles.playlist__item}>
                  <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                      <div className={styles.track__titleImage}>
                        <svg className={styles.track__titleSvg}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <a className={styles.track__titleLink} href="">
                          Guilt <span className={styles.track__titleSpan}></span>
                        </a>
                      </div>
                    </div>
                    <div className={styles.track__author}>
                      <a className={styles.track__authorLink} href="">
                        Nero
                      </a>
                    </div>
                    <div className={styles.track__album}>
                      <a className={styles.track__albumLink} href="">
                        Welcome Reality
                      </a>
                    </div>
                    <div className="track__time">
                      <svg className={styles.track__timeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={styles.track__timeText}>4:44</span>
                    </div>
                  </div>
                </div>

                <div className={styles.playlist__item}>
                  <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                      <div className={styles.track__titleImage}>
                        <svg className={styles.track__titleSvg}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <a className={styles.track__titleLink} href="">
                          Elektro <span className={styles.track__titleSpan}></span>
                        </a>
                      </div>
                    </div>
                    <div className={styles.track__author}>
                      <a className={styles.track__authorLink} href="">
                        Dynoro, Outwork, Mr. Gee
                      </a>
                    </div>
                    <div className={styles.track__album}>
                      <a className={styles.track__albumLink} href="">
                        Elektro
                      </a>
                    </div>
                    <div className="track__time">
                      <svg className={styles.track__timeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={styles.track__timeText}>2:22</span>
                    </div>
                  </div>
                </div>

                <div className={styles.playlist__item}>
                  <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                      <div className={styles.track__titleImage}>
                        <svg className={styles.track__titleSvg}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <a className={styles.track__titleLink} href="">
                          I’m Fire <span className={styles.track__titleSpan}></span>
                        </a>
                      </div>
                    </div>
                    <div className={styles.track__author}>
                      <a className={styles.track__authorLink} href="">
                        Ali Bakgor
                      </a>
                    </div>
                    <div className={styles.track__album}>
                      <a className={styles.track__albumLink} href="">
                        I’m Fire
                      </a>
                    </div>
                    <div className="track__time">
                      <svg className={styles.track__timeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={styles.track__timeText}>2:22</span>
                    </div>
                  </div>
                </div>

                <div className={styles.playlist__item}>
                  <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                      <div className={styles.track__titleImage}>
                        <svg className={styles.track__titleSvg}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <a className={styles.track__titleLink} href="">
                          Non Stop
                          <span className={styles.track__titleSpan}>(Remix)</span>
                        </a>
                      </div>
                    </div>
                    <div className={styles.track__author}>
                      <a className={styles.track__authorLink} href="">
                        Стоункат, Psychopath
                      </a>
                    </div>
                    <div className={styles.track__album}>
                      <a className={styles.track__albumLink} href="">
                        Non Stop
                      </a>
                    </div>
                    <div className="track__time">
                      <svg className={styles.track__timeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={styles.track__timeText}>4:12</span>
                    </div>
                  </div>
                </div>

                <div className={styles.playlist__item}>
                  <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                      <div className={styles.track__titleImage}>
                        <svg className={styles.track__titleSvg}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div>
                        <a className={styles.track__titleLink} href="">
                          Run Run
                          <span className={styles.track__titleSpan}>
                            (feat. AR/CO)
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className={styles.track__author}>
                      <a className={styles.track__authorLink} href="">
                        Jaded, Will Clarke, AR/CO
                      </a>
                    </div>
                    <div className={styles.track__album}>
                      <a className={styles.track__albumLink} href="">
                        Run Run
                      </a>
                    </div>
                    <div className="track__time">
                      <svg className={styles.track__timeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={styles.track__timeText}>2:54</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.main__sidebar}>
            <div className={styles.sidebar__personal}>
              <p className={styles.sidebar__personalName}>Sergey.Ivanov</p>
              <div className={styles.sidebar__icon}>
                <svg>
                  <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </div>
            <div className={styles.sidebar__block}>
              <div className={styles.sidebar__list}>
                <div className={styles.sidebar__item}>
                  <a className={styles.sidebar__link} href="#">
                    <Image
                      className={styles.sidebar__img}
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </a>
                </div>
                <div className={styles.sidebar__item}>
                  <a className={styles.sidebar__link} href="#">
                    <Image
                      className={styles.sidebar__img}
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </a>
                </div>
                <div className={styles.sidebar__item}>
                  <a className={styles.sidebar__link} href="#">
                    <Image
                      className={styles.sidebar__img}
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className={styles.bar}>
          <div className={styles.bar__content}>
            <div className={styles.bar__playerProgress}></div>
            <div className={styles.bar__playerBlock}>
              <div className={styles.bar__player}>
                <div className={styles.player__controls}>
                  <div className={styles.player__btnPrev}>
                    <svg className={styles.player__btnPrevSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className={'player__btnPlay btn'}>
                    <svg className={styles.player__btnPlaySvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </div>
                  <div className={styles.player__btnNext}>
                    <svg className={styles.player__btnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div className={'player__btnRepeat btnIcon'}>
                    <svg className={styles.player__btnRepeatSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                  </div>
                  <div className={'player__btnShuffle btnIcon'}>
                    <svg className={styles.player__btnShuffleSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                    </svg>
                  </div>
                </div>

                <div className={styles.player__trackPlay}>
                  <div className={styles.trackPlay__contain}>
                    <div className={styles.trackPlay__image}>
                      <svg className={styles.trackPlay__svg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                      </svg>
                    </div>
                    <div className={styles.trackPlay__author}>
                      <a className={styles.trackPlay__authorLink} href="">
                        Ты та...
                      </a>
                    </div>
                    <div className={styles.trackPlay__album}>
                      <a className={styles.trackPlay__albumLink} href="">
                        Баста
                      </a>
                    </div>
                  </div>

                  <div className={styles.trackPlay__dislike}>
                    <div className={'player__btnShuffle btnIcon'}>
                      <svg className={styles.trackPlay__likeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                    </div>
                    <div className={'trackPlay__dislike btnIcon'}>
                      <svg className={styles.trackPlay__dislikeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.bar__volumeBlock}>
                <div className={styles.volume__content}>
                  <div className={styles.volume__image}>
                    <svg className={styles.volume__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div className={'volume__progress btn'}>
                    <input
                      className={'volume__progressLine btn'}
                      type="range"
                      name="range"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}