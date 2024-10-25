import {Permission, requestMultiple, RESULTS} from 'react-native-permissions';

export const RequestPermissions = async (multipleRequests: Permission[]) => {
  try {
    const permissionStatus = await requestMultiple(multipleRequests);

    if (
      Object.values(permissionStatus).every(
        status => status === RESULTS.GRANTED || status === RESULTS.LIMITED,
      )
    ) {
      return 1;
    } else if (
      Object.values(permissionStatus).some(status => status === RESULTS.DENIED)
    ) {
      return 0;
    } else if (
      Object.values(permissionStatus).some(
        status => status === RESULTS.BLOCKED || status === RESULTS.UNAVAILABLE,
      )
    ) {
      return -1;
    }
    return -1;
  } catch (error) {
    console.error('Error requesting permissions:', error);
    return -1;
  }
};
