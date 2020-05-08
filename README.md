# react-native-load-shimmer
![](https://github.com/dearmondk/react-native-load-shimmer/blob/media/shimmer-example.gif?raw=true)

Add a simple shimmer effect to any UI loading state.
No native dependencies!

## Installation

```sh
yarn add react-native-load-shimmer
```



### Properties
| Prop           | Description                                               | Required |
|----------------|-----------------------------------------------------------|----------|
| children       | React native elements that you want to apply a shimmer to | Y        |
| isShimmering   | Boolean - Dictates whether shimmer effect is occurring    | Y        |
| containerStyle | Style to apply to wrapper on shimmer component            | N        |
| shimmerConfig  | Config object for shimmer effect                          | Y        |

### Shimmer Config Options
| Key             | Description                                                 | Required | Default                                     |
|-----------------|-------------------------------------------------------------|----------|---------------------------------------------|
| skewX           | Slant applied to shimmer                                    | N        | "-30deg"                                    |
| gradientWidth   | Width of each gradient                                      | N        | 20                                          |
| startX          | Starting position for shimmer effect                        | N        | Variable                                    |
| duration        | Duration in ms of 1 loop of shimmer effect                  | N        | 1500                                        |
| useNativeDriver | Uses the native driver when true.                           | N        | True                                        |
| shimmerColor    | Color of shimmer effect. Should match background of screen. | Y        |                                             |
| toValue         | Ending position of shimmer effect                           | N        | Variable                                    |
| opacityArr      | Array of opacity values to create shimmer                   | N        | [.05, .15, .25, .3, .35, .3, .25, .15, .05] |

## Usage
```js
/**
 * @flow strict-local
 */

import React from 'react';
import Shimmer from 'react-native-simple-shimmer';

export default function LoadingWithShimmer({children}) {
  const shimmerConfig = {
    startingX: -200,
    useNativeDriver: true,
    shimmerColor: '#FFF',
    toValue: Dimensions.get('window').width + 100,
  };

  return (
      <SafeAreaView>
        <ScrollView
          style={styles.scrollView}>
          <Shimmer shimmerConfig={shimmerConfig} containerStyle={containerStyle} isShimmering={true}>
            {children}
          </Shimmer>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

```

## License

[MIT License](http://opensource.org/licenses/mit-license.html). react-native-load-shimmer is under MIT license. © Kevin DeArmond 2020 - present
