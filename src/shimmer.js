// @flow

import * as React from 'react';
import { View, Dimensions, Animated } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type PropsT = {
  children: React$Node,
  isShimmering: boolean,
  containerStyle?: ViewStyleProp,
  shimmerConfig: {
    skewX?: 'string',
    gradientWidth?: number,
    startX: number,
    duration?: number,
    useNativeDriver?: boolean,
    shimmerColor: string,
    toValue?: number,
    opacityArr?: Array<number>,
  },
};

export default function GhostUI({
  children,
  isShimmering,
  containerStyle,
  shimmerConfig,
}: PropsT) {
  const shimmerAnimation = React.useRef(
    new Animated.Value(shimmerConfig.startX)
  ).current;

  const gradientOpacity = shimmerConfig.opacityArr || [
    0.05,
    0.15,
    0.25,
    0.3,
    0.35,
    0.3,
    0.25,
    0.15,
    0.05,
  ];

  React.useEffect(() => {
    if (isShimmering) {
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue:
            shimmerConfig.toValue || Dimensions.get('window').width + 100,
          duration: shimmerConfig.duration || 1500,
          useNativeDriver: shimmerConfig.useNativeDriver || true,
        })
      ).start();
    } else {
      shimmerAnimation.stopAnimation();
      shimmerAnimation.setValue(shimmerConfig.startX);
    }
  }, [
    isShimmering,
    shimmerConfig.duration,
    shimmerConfig.startX,
    shimmerConfig.toValue,
    shimmerConfig.useNativeDriver,
  ]);

  return (
    <View style={containerStyle || {}}>
      <Animated.View
        style={{
          transform: [
            {
              translateX: shimmerAnimation,
            },
          ],
          top: 0,
          bottom: 0,
          zIndex: 100,
          position: 'absolute',
          flexDirection: 'row',
        }}
      >
        {gradientOpacity.map((opacity, i) => (
          <View
            key={i}
            style={{
              transform: [
                {
                  skewX: shimmerConfig.skewX || '-30deg',
                },
              ],
              width: shimmerConfig.gradientWidth || 20,
              height: '100%',
              backgroundColor: shimmerConfig.shimmerColor,
              opacity: opacity,
            }}
          />
        ))}
      </Animated.View>
      {children}
    </View>
  );
}
