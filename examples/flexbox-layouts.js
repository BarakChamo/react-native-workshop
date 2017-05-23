import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.halfHeight} />
            <View style={styles.quarterHeight} />
            <View style={[styles.quarterHeight, {backgroundColor: '#CCC'}]} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexDirection: 'column'
    },
    halfHeight: {
        flex: 2,
        backgroundColor: '#FF6600'
    },
    quarterHeight: {
        flex: 1,
        backgroundColor: '#eee'
    }
});
