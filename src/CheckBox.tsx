import * as React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

interface CheckBoxProps {
  style?: StyleProp<ViewStyle>
  icon?: CheckIcon
  iconStyle?: StyleProp<ImageStyle>
  text?: string
  textStyle?: StyleProp<TextStyle>
  textCheckedStyle?: StyleProp<TextStyle>
  checked?: boolean
  disabled?: boolean
  onChecked?: (checked: boolean, pressed: boolean) => void
}

interface CheckIcon {
  normal: ImageSourcePropType
  checked: ImageSourcePropType
}

interface CheckBoxState {
  checked: boolean
}

export default class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {

  constructor(props: CheckBoxProps) {
    super(props)
    this.state = { checked: props.checked == true }
  }

  shouldComponentUpdate(nextProps: Readonly<CheckBoxProps>, nextState: Readonly<any>, nextContext: any) {
    if (this.props.checked != nextProps.checked && this.state.checked != nextProps.checked) {
      this.setState({ checked: nextProps.checked == true }, () => {
        this.props.onChecked && this.props.onChecked(this.state.checked, false)
      })
      return false
    }
    return true
  }

  render() {
    return (
      <TouchableWithoutFeedback
        disabled={this.props.disabled}
        onPress={() => {
          this.setState({ checked: !this.state.checked }, () => {
            this.props.onChecked && this.props.onChecked(this.state.checked, true)
          })
        }}>
        <View style={[styles.checkContainer, this.props.style]}>
          {this.renderCheckBtn(this.state.checked)}
          {this.renderText(this.state.checked)}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderCheckBtn(checked?: boolean) {
    let icons = this.props.icon
    if (icons) {
      return (<Image style={this.props.iconStyle} source={checked ? icons.checked : icons.normal} />)
    }
  }

  renderText(checked?: boolean) {
    if (this.props.text) {
      return (<Text style={[styles.label, this.props.textStyle, checked ? this.props.textCheckedStyle : null]}>{this.props.text}</Text>)
    }
  }

}

const styles = StyleSheet.create({
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
    color: '#606266',
    includeFontPadding: false,
  },
});
