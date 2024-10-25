export type AuthParamStackList = {
  SIGN_IN: undefined;
  SIGN_UP: undefined;
};

export type AppStackParamList = {
  BOTTOM_STACK: NavigatorScreenParams<BottomStackPramList>;
  POST_DETAIL :undefined
};

export type BottomStackPramList = {
  HOME: undefined;
};

export type AppNavigationProp = NavigationProp<AppStackParamList>;
