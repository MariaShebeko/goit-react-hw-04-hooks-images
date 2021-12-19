import { toast } from 'react-toastify';

const toastify = message => {
  return toast.warning(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  });
};

export default toastify;
