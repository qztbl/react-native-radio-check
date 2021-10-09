import React, { Component } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CheckBox, RadioButton, RadioGroup } from "react-native-radio-check";

interface Props {

}

interface State {
  check: boolean
  index: number
}

export default class AppTest extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { check: true, index: 0 }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{ padding: 10 }}>
          <Button title="test" onPress={() => {
            this.setState({ index: 1, check: false })
          }}></Button>
          <Text style={{ marginTop: 30 }}>CheckBox</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <CheckBox
              checked={this.state.check}
              icon={{
                normal: require('./icon/ic_normal.png'),
                checked: require("./icon/ic_check.png")
              }}
              textStyle={{ marginLeft: 5 }}
              text="A"
              onChecked={(checked, pressed) => {

              }} />
            <CheckBox
              style={{ marginLeft: 20 }}
              icon={{
                normal: require('./icon/ic_normal.png'),
                checked: require("./icon/ic_check.png")
              }}
              textStyle={{ marginLeft: 5 }}
              textCheckedStyle={{ color: 'green' }}
              text="B"
              onChecked={(checked, pressed) => {

              }} />
          </View>

          <Text style={{ marginTop: 30 }}>RadioButton</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <RadioButton
              icon={{
                normal: require('./icon/ic_normal.png'),
                checked: require("./icon/ic_radio_check.png")
              }}
              textStyle={{ marginLeft: 5 }}
              text="AA"
              onChecked={(checked, pressed) => {

              }} />
            <RadioButton
              style={{ marginLeft: 20 }}
              icon={{
                normal: require('./icon/ic_normal.png'),
                checked: require("./icon/ic_radio_check.png")
              }}
              textStyle={{ marginLeft: 5 }}
              textCheckedStyle={{ color: 'green' }}
              text="BB"
              onChecked={(checked, pressed) => {

              }} />
          </View>

          <Text style={{ marginTop: 30 }}>RadioGroup</Text>
          <RadioGroup
            style={{ flexDirection: 'row', marginTop: 10 }}
            checkedId={this.state.index}
            icon={{
              normal: require('./icon/ic_normal.png'),
              checked: require("./icon/ic_radio_check.png")
            }}
            textStyle={{ marginLeft: 5 }}
            onChecked={(id, value) => {
              console.info("Group===", id)
              console.info("Value===", value)
            }}>
            <RadioButton
              text="AAA"
              value={1} />
            <RadioButton
              style={{ marginLeft: 20 }}
              text="BBB"
              disabled
              value={2} />
            <RadioButton
              style={{ marginLeft: 20 }}
              text="CCC"
              value={3} />
          </RadioGroup>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  group: {
    marginTop: 30
  },
  group2: {
    marginLeft: 30
  }
})