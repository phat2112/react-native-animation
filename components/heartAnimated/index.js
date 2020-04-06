import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

let heartCount = 1;
const {width, height} = Dimensions.get('window');

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};
const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;

const getRandomColor = () => {
  return `rgb(${getRandomNumber(100,144)}, ${getRandomNumber(10, 200)}, ${getRandomNumber(200, 244)})`
}

export default class HeartAnimated extends Component {
  state = {
    hearts: [],
  };
  addToHeart = () => {
    this.setState(
      {
        hearts: [
          ...this.state.hearts,
          {
            id: heartCount,
            right: getRandomNumber(20, 150),
            color: getRandomColor()
          },
        ],
      },
      () => {
        heartCount++;
      },
    );
  };
  removeHeart = (idHeart) => {
    this.setState({
      hearts: this.state.hearts.filter((heart) => heart.id !== idHeart),
    });
  };
  render() {
    return (
      <View style={[styles.container, {width: width, height: height}]}>
        {this.state.hearts.map((heart) => (
          <HeartContainer
            key={heart.id}
            style={{right: heart.right}}
            onComplete={() => {
              this.removeHeart(heart.id);
            }}
            color={heart.color}
          />
        ))}
        <TouchableOpacity onPress={this.addToHeart} style={styles.addButton}>
          <Icon name="plus" color="#fff" size={40} />
        </TouchableOpacity>
      </View>
    );
  }
}

class HeartContainer extends Component {
  constructor(){
    super();
    this.yAnimation = this.state.position.interpolate({
      inputRange: [negativeEndY, 0],
      outputRange: [animationEndY, 0],
    });
    this.opacityAnimation = this.yAnimation.interpolate({
      inputRange: [0, animationEndY],
      outputRange: [1, 0],
    });
    this.scaleAnimation = this.yAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 1.4, 1],
      extrapolate: 'clamp',
    });
    this.xAnimation = this.yAnimation.interpolate({
      inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
      outputRange: [0, 25, 15, 0, 10]
    })
  }
  state = {
    position: new Animated.Value(0),
  };

  static defaultProps = {
    onComplete() {},
  };

  componentDidMount() {
    Animated.timing(this.state.position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(this.props.onComplete);
  }

  getHeaderStyle = () => {
    return {
      transform: [{translateY: this.state.position}, {scale: this.scaleAnimation}, {translateX: this.xAnimation}],
      opacity: this.opacityAnimation,
    };
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.heartContainer,
          this.getHeaderStyle(),
          this.props.style,
        ]}>
        <Heart color={this.props.color} />
      </Animated.View>
    );
  }
}

const Heart = (props) => (
  <View {...props} style={[styles.heart, props.style]}>
    <Icon name="heart" size={48} color={props.color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: 32,
    left: 32,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartContainer: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'transparent',
  },
});
