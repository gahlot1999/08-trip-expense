import styles from './AppLayout.module.css';

import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <main className={styles.main}>
      <h1>Travel</h1>
      <Outlet />
    </main>
  );
}

export default AppLayout;
