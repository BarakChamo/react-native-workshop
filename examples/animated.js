import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native'


const RADIUS = 36
const { height, width } = Dimensions.get('window')

export default class App extends Component {
  state = {
    showDraggable: true,
    dropZoneValues: null,
    pan: new Animated.ValueXY(),
  }

  constructor(props) {
    super()
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null,{
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }]),
        onPanResponderRelease: (e, gesture) => {
          if(this.isDropZone(gesture)){
            this.setState({ showDraggable: false })
          }else{
            Animated.spring(
              this.state.pan,
              { toValue: { x: 0, y: 0 } }
            ).start();
          }
        }
      })
    }

    isDropZone(gesture) {
      const drop = this.state.dropZoneValues
      return gesture.moveY > drop.y && gesture.moveY < drop.y + drop.height
    }

    setDropZoneValues(event) {
      this.setState({
        dropZoneValues : event.nativeEvent.layout
      })
    }

    render() {
      return (
        <View style={styles.mainContainer}>
          <View
            onLayout={this.setDropZoneValues.bind(this)}
            style={styles.dropZone}
          >
            <Text style={styles.text}>Drop me here!</Text>
          </View>
          {this.renderDraggable()}
        </View>
      )
    }

    renderDraggable(){
      if(this.state.showDraggable){
        return (
        <View style={styles.draggableContainer}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout(), styles.circle]}>
            <Text style={styles.text}>Drag me!</Text>
          </Animated.View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  dropZone    : {
    height: 100,
    backgroundColor:'#2c3e50'
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff'
  },

  draggableContainer: {
    position: 'absolute',
    top: height / 2 - RADIUS,
    left: width / 2 - RADIUS,
  },

  circle: {
    backgroundColor: '#1abc9c',
    width: RADIUS*2,
    height: RADIUS*2,
    borderRadius: RADIUS
  }
})
