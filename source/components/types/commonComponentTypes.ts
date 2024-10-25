import { ReactNode } from 'react';
import { TextProps, TextStyle } from 'react-native';

export type FontProps = {
    children: ReactNode; // Allows any type of child element
    style?: TextStyle | TextStyle[]; // Optional additional styles
    config?: TextProps; // Additional props for the Text component
};
