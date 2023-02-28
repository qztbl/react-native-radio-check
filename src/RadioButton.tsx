import * as React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

interface RadioButtonProps {
  style?: StyleProp<ViewStyle>
  icon?: RadioIcon
  iconStyle?: StyleProp<ImageStyle>
  text?: string
  textStyle?: StyleProp<TextStyle>
  textCheckedStyle?: StyleProp<TextStyle>
  id?: number
  value?: any
  checked?: boolean
  disabled?: boolean
  onChecked?: (checked: boolean, pressed: boolean) => void
}

interface RadioIcon {
  normal: ImageSourcePropType
  checked: ImageSourcePropType
}

interface RadioButtonState {
  checked: boolean
}

export default class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {

  private parent?: RadioGroup

  constructor(props: RadioButtonProps) {
    super(props)
    this.state = { checked: props.checked == true }
  }

  shouldComponentUpdate(nextProps: Readonly<RadioButtonProps>, nextState: Readonly<RadioButtonState>, nextContext: any) {
    const nextPropsChecked = nextProps.checked == true
    if (this.props.checked != nextProps.checked && this.state.checked != nextPropsChecked) {
      this.setState({ checked: nextPropsChecked }, () => {
        this.props.onChecked && this.props.onChecked(this.state.checked, false)
        if (this.state.checked) {
          if (this.parent) {
            this.parent.onCheck(this.props.id!!, this.props.value)
          }
        }
      })
      return false
    }
    return true
  }

  render() {
    let checked = this.state.checked
    return (
      <TouchableWithoutFeedback
        disabled={this.props.disabled}
        onPress={() => {
          if (!checked) {
            this.setState({ checked: true }, () => {
              this.props.onChecked && this.props.onChecked(true, true)
              if (this.parent) {
                this.parent.onCheck(this.props.id!!, this.props.value)
              }
            })
          }
        }}>
        <View style={[styles.radioContainer, this.props.style]}>
          {this.renderRadio(checked)}
          {this.renderText(checked)}
          {this.getContextInfo()}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderRadio(checked?: boolean) {
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

  getContextInfo() {
    return (
      <contextRadioGroup.Consumer >
        {value => {
          this.parent = value.root
          return null
        }}
      </contextRadioGroup.Consumer>
    )
  }

}


interface RadioGroupProps {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  icon?: RadioIcon
  iconStyle?: StyleProp<ImageStyle>
  textStyle?: StyleProp<TextStyle>
  textCheckedStyle?: StyleProp<TextStyle>
  checkedId?: number
  onChecked?: (id: number, value: any) => void
}

interface RadioGroupState {
  checkedId?: number
}

export class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {

  constructor(props: RadioGroupProps) {
    super(props)
    this.state = { checkedId: this.props.checkedId }
  }

  onCheck(id: number, value: any) {
    if (this.state.checkedId != id) {
      this.setState({ checkedId: id })
    }
    this.props.onChecked && this.props.onChecked(id, value)
  }

  shouldComponentUpdate(nextProps: Readonly<RadioGroupProps>, nextState: Readonly<RadioGroupState>, nextContext: any) {
    if (this.props.checkedId != nextProps.checkedId && this.state.checkedId != nextProps.checkedId) {
      this.setState({ checkedId: nextProps.checkedId })
      return false
    }
    return true
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.renderChildren()}
      </View>
    )
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child, index) => {
      if (React.isValidElement(child) && child.type.toString() === RadioButton.toString()) {
        let tempId = child.props.id ? child.props.id : index
        return (
          <contextRadioGroup.Provider value={{ root: this }}>
            <RadioButton
              icon={this.props.icon}
              iconStyle={this.props.iconStyle}
              textStyle={this.props.textStyle}
              textCheckedStyle={this.props.textCheckedStyle}
              {...child.props}
              id={tempId}
              group={this}
              checked={this.state.checkedId == tempId} />
          </contextRadioGroup.Provider>
        )
      }
      return child
    })
  }
}

const contextRadioGroup = React.createContext<{ root?: RadioGroup }>({})

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
    color: '#606266',
    includeFontPadding: false
  },
});
