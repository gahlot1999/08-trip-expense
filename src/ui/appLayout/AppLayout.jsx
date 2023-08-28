import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { BsAirplaneEngines } from 'react-icons/bs';

import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <main className={styles.main}>
      <Toaster />
      <div className={styles.heading}>
        <h1>Travel</h1>
        <span>{/* <BsAirplaneEngines size={28} /> */}</span>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  );
}

export default AppLayout;
