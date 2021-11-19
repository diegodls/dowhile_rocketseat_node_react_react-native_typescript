import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ColorValue,
  ActivityIndicator,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  isLoading?: boolean;
  icon?: string;
  //icon?: React.ComponentProps<typeof AntDesign>['name'];
};

export function Button({
  title,
  color,
  backgroundColor,
  icon,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={isLoading}
        style={[
          styles.button,
          {
            backgroundColor,
          },
        ]}
        {...rest}>
        {isLoading ? (
          <ActivityIndicator color={color} />
        ) : (
          <>
            {icon !== undefined ? (
              <AntDesign name={icon} size={24} style={styles.icon} />
            ) : null}
            <Text style={[styles.title, { color }]}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );
}
