import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <>
      <Toaster />
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
