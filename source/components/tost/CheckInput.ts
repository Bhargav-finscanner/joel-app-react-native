import {error_occur} from '../redux/authSlice';
import store from '../redux/store';

export const checkInput = (
  string: string | undefined,
  message: string,
  key?: string,
) => {
  if (!string || string?.toString()?.trim().length === 0) {
    store.dispatch(error_occur(message));
    return true;
  }
  if (key === 'MobileNumber' && string.toString()?.trim().length < 10) {
    store.dispatch(error_occur(message));
    return true;
  }
  if (key === 'MobileNumber' && !string?.toLowerCase()?.match(/^\d{10}$/)) {
    store.dispatch(error_occur(message));
    return true;
  }
  if (
    key === 'Email' &&
    !string
      ?.toLowerCase()
      ?.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  ) {
    store.dispatch(error_occur(message));
    return true;
  }
  if (
    key === 'Password' &&
    !string?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
  ) {
    store.dispatch(error_occur(message));
    return true;
  }
  return false;
};
