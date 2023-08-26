import { Toaster } from 'react-hot-toast';
import styles from './AppLayout.module.css';

import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <main className={styles.main}>
      <Toaster />
      <div className={styles.heading}>
        <h1>Travel</h1>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  );
}

export default AppLayout;
