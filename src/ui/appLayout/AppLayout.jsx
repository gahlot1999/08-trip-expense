import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AiOutlineSetting } from 'react-icons/ai';

import styles from './AppLayout.module.css';

import BackBtn from '../backBtn/BackBtn';

function AppLayout() {
  const isHomePage = useLocation().pathname === '/home';

  return (
    <>
      <Toaster />
      {!isHomePage && <BackBtn size={24} />}
      <span className={styles.settingIcon}>
        <AiOutlineSetting size={26} />
      </span>
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>Travel Trip</h1>
        </div>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default AppLayout;
