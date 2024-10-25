import {checkMultiple, Permission, RESULTS} from 'react-native-permissions';

export const CheckPermissions = async (permissionRequest: Permission[]) => {
  const permissionStatus = await checkMultiple(permissionRequest);

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
  } else {
    return -1;
  }
};
