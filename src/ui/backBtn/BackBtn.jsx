import { useNavigate } from 'react-router-dom';
import styles from './BackBtn.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';

function BackBtn({ size = 24, nav = -1 }) {
  const navigate = useNavigate();

  function handleBackClick() {
    navigate(nav);
  }

  return (
    <button className={styles.backBtn} onClick={handleBackClick}>
      <IoMdArrowRoundBack size={size} />
    </button>
  );
}

export default BackBtn;
