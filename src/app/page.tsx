import './page.css';
import styles from './page.module.css'
//import classNames from 'classnames';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Sidebar/Sidebar';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import MainNav from '@/components/MainNav/MainNav';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <MainNav />
          <CenterBlock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}