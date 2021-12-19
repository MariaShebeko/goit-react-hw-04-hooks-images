import { BiLoader } from 'react-icons/bi';
import s from './LoadMoreButton.module.css';

const LoadMoreButton = ({ onClick }) => {
  return (
    <button className={s.button} type="button" onClick={() => onClick()}>
      <BiLoader className={s.icon} /> <span>Load more</span>
    </button>
  );
};

export default LoadMoreButton;
