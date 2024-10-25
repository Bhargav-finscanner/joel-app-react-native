import {success_occur} from '../redux/authSlice';
import store from '../redux/store';

export const showSuccessModel = (message: string) => {
  store.dispatch(success_occur(message));
};
