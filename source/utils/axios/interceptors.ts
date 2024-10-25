import instance from './instance';
import store from '../../components/redux/store';

instance.interceptors.request.use(request => {
  const storeData = store.getState();

  if (storeData.auth?.user?.access_token) {
    request.headers.Authorization = 'Bearer 3jbkux6tgtaez2jbrxdkz4jkqeeq1rje';
  }

  return request;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error?.response) {
      throw error.response;
    } else {
      throw error;
    }
  },
);

export default instance;
