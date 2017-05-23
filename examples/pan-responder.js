import React, { Component } from 'react'
import { PanResponder, StyleSheet, View } from 'react-native'

var CIRCLE_SIZE = 80

export default class App extends Component {
  panResponder = {}
  previousLeft = 0
  previousTop = 0
  circleStyles = {}
  circle = null

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this::this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this::this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this::this.handlePanResponderGrant,
      onPanResponderMove: this::this.handlePanResponderMove,
      onPanResponderRelease: this::this.handlePanResponderEnd,
      onPanResponderTerminate: this::this.handlePanResponderEnd,
    })

    this.previousLeft = 20;
    this.previousTop = 84;
    this.circleStyles = {
      style: {
        left: this.previousLeft,
        top: this.previousTop,
        backgroundColor: 'green',
      }
    }
  }

  componentDidMount() {
    this.updateNativeStyles()
  }

  render() {
    return (
      <View
        style={styles.container}>
        <View
          ref={(circle) => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this.panResponder.panHandlers}
        />
      </View>
    );
  }

  highlight() {
    this.circleStyles.style.backgroundColor = 'blue'
    this.updateNativeStyles()
  }

  unHighlight() {
    this.circleStyles.style.backgroundColor = 'green'
    this.updateNativeStyles()
  }

  updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this.circleStyles)
  }

  handleStartShouldSetPanResponder() {
    // Should we become active when the user presses down on the circle?
    return true
  }

  handleMoveShouldSetPanResponder() {
    // Should we become active when the user moves a touch over the circle?
    return true
  }

  handlePanResponderGrant() {
    this.highlight()
  }

  handlePanResponderMove(e, gestureState) {
    this.circleStyles.style.left = this.previousLeft + gestureState.dx
    this.circleStyles.style.top = this.previousTop + gestureState.dy
    this.updateNativeStyles()
  }
  handlePanResponderEnd(e, gestureState) {
    this.unHighlight()
    this.previousLeft += gestureState.dx
    this.previousTop += gestureState.dy
  }
}

var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    paddingTop: 64,
  }
})
