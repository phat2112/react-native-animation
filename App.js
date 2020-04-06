/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  Button,
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import HeartAnimated from './components/heartAnimated';

const App = () => {
  const [springItem] = useState(new Animated.Value(0.5));
  const [rotateItem] = useState(new Animated.Value(0));
  const [moveItem] = useState(new Animated.Value(0));
  const {width, height} = Dimensions.get('window');

  // const handleScale = () => {
  // Animated.spring(springItem, {
  //   toValue: 1,
  //   friction: 1,
  //   duration: 1000,
  //   easing: Easing.linear,
  // }).start();
  // Animated.sequence([
  //   Animated.timing(rotateItem,{
  //     toValue: 100,
  //     duration: 1000,
  //     easing: Easing.linear,
  //   }),
  //   Animated.timing(rotateItem,{
  //     toValue: 0,
  //     duration: 1000,
  //     easing: Easing.linear,
  //   }),
  // ]).start(() => {
  //   handleScale();
  // });
  // Animated.parallel([
  //   Animated.timing(moveItem,{
  //     toValue: width - 100,
  //     duration: 1000,
  //     easing: Easing.back(),
  //   }),
  //   Animated.sequence([
  //     Animated.timing(rotateItem,{
  //       toValue: 0,
  //       duration: 1000,
  //       easing: Easing.linear,
  //     }),
  //     Animated.timing(rotateItem,{
  //       toValue: 100,
  //       duration: 1000,
  //       easing: Easing.linear,
  //     }),
  //   ]),
  // ]).start(() => {
  //   handleScale();
  // })
  // scale: springItem,
  // {transform: [{ rotate: interpolate,  }],
  //   Animated.sequence([
  //     Animated.timing(moveItem, {
  //       toValue: width - 100,
  //       duration: 1000,
  //       easing: Easing.back(),
  //     }),
  //     Animated.timing(moveItem, {
  //       toValue: 0,
  //       duration: 1000,
  //       easing: Easing.back(),
  //     }),
  //   ]).start(() => {
  //     handleScale();
  //   });
  // };
  const interpolate = rotateItem.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <>
      {/* <TouchableWithoutFeedback>
        <View>
          <Animated.Image
            source={require('./assets/images/download.png')}
            style={[styles.imageView, {left: moveItem}]}></Animated.Image>
          <Button
            title="Click me"
            onPress={() => {
              handleScale();
            }}
          />
          <TextInput />
        </View>
      </TouchableWithoutFeedback> */}
      <View>
        <HeartAnimated />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 100,
    width: 100,
  },
});

export default App;
