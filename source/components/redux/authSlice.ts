import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/stateTypes';

type UserState = {
    user: null | UserType;
    error: string | boolean | null;
    success: string | boolean | null;
    is_fist_time: boolean;
    is_unauthenticated: boolean;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        success: null,
        is_fist_time: true,
        is_unauthenticated: false,
    } as UserState,

    reducers: {
        login: (state: UserState, action: PayloadAction<UserType>) => {
            state.user = action.payload;
            state.is_unauthenticated = false;
            state.is_fist_time = true;
        },
        logout: state => {
            state.user = null;
            state.is_unauthenticated = false;
        },
        update_user: (state, action: PayloadAction<UserType>) => {
            state.user = { ...state.user, ...action.payload };
        },
        update_is_unauthenticated: state => {
            state.is_unauthenticated = true;
        },
        update_is_fist_time: state => {
            state.is_fist_time = false;
        },
        error_occur: (state, action: PayloadAction<string | boolean | null>) => {
            state.error = action.payload;
        },
        success_occur: (state, action: PayloadAction<string | boolean | null>) => {
            state.success = action.payload;
        },
    },
});

export const authReducer = authSlice.reducer;

export const {
    login,
    logout,
    update_user,
    update_is_unauthenticated,
    error_occur,
    success_occur,
    update_is_fist_time,
} = authSlice.actions;


export type ActionsTypeForAuthReducer =
    | ReturnType<typeof login>
    | ReturnType<typeof logout>
    | ReturnType<typeof update_user>
    | ReturnType<typeof update_is_unauthenticated>
    | ReturnType<typeof update_is_fist_time>
    | ReturnType<typeof error_occur>
    | ReturnType<typeof success_occur>;

