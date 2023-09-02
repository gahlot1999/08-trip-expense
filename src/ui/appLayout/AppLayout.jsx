import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AiOutlineSetting } from 'react-icons/ai';

import styles from './AppLayout.module.css';

import BackBtn from '../backBtn/BackBtn';

function AppLayout() {
  return (
    <>
      <Toaster />
      <BackBtn size={24} />
      <span className={styles.settingIcon}>
        <AiOutlineSetting size={26} />
      </span>
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>Travel</h1>
        </div>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default AppLayout;
