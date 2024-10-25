import {Platform} from 'react-native';
import {CheckPermissions} from './CheckPermissions';
import {permissionDenied} from './PermissionDenied';
import {RequestPermissions} from './RequestPermissions';
const {PERMISSIONS} = require('react-native-permissions');

export const getLocation = async () => {
  const permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
      : [
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ];

  try {
    const checkResult = await CheckPermissions(permissions);

    switch (checkResult) {
      case 0:
        const checkRequest = await RequestPermissions(permissions);
        switch (checkRequest) {
          case 1:
            return true;
          case 0:
          case -1:
            permissionDenied();
            break;
        }
        break; // Added break to prevent fall-through
      case 1:
        return true;
      case -1:
        permissionDenied();
        break; // Added break to prevent fall-through
      default:
        throw new Error('Unexpected permission status');
    }
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    return false;
  }
};

export const getAddress = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${'GOOGLE_API_KEY'}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch address!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
};
