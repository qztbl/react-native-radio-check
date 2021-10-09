import React, { Component, PureComponent } from "react";
import { Text, View } from "react-native";


interface Props {
  test: string
}

export default class TestView extends Component<Props> {

  constructor(props: Props) {
    super(props)
  }

  // shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<any>, nextContext: any) {
  //   // if (nextProps.checkedId &&
  //   //   this.props.checkedId != nextProps.checkedId &&
  //   //   this.state.checkedId != nextProps.checkedId) {
  //   //   this.setState({ checkedId: nextProps.checkedId })
  //   //   return false
  //   // }
  //   // return this.state != nextState
  //   return super.shouldComponentUpdate(nextProps, nextState, nextContext)
  // }

  render() {
    return (
      <View>
        <Text>{this.props.test}</Text>
      </View>
    )
  }
}