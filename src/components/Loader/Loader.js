import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function ImageLoader() {
  return (
    <div className={s.Loader}>
      <Loader
        type="Plane"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
      />
    </div>
  );
}
