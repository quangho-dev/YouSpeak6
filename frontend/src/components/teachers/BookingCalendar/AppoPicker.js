import React from 'react'

import AppointmentPicker from 'appointment-picker'
import '../../../../node_modules/appointment-picker/dist/appointment-picker.css'
import { Button } from '@material-ui/core'

class AppoPicker extends React.Component {
  constructor(props) {
    super(props)
    this.options = {
      leadingZero: true,
      interval: 30,
      large: true,
      disabled: ['1:30 pm', '2:00 pm', '7:30 pm'],
    }
    this.state = { time: {} }
    this.pickerRef = React.createRef()
    this.onTimeSelect = this.onTimeSelect.bind(this)
  }

  onTimeSelect(event) {
    console.log('change.appo.picker', event.time)
    this.setState({ time: event.time })
    // Or do something different with your time object
  }

  render() {
    return (
      <div>
        <input ref={this.pickerRef}></input>
        <code>{JSON.stringify(this.state.time)}</code>
      </div>
    )
  }

  componentDidMount() {
    this.picker = new AppointmentPicker(this.pickerRef.current, this.options)
    this.pickerRef.current.addEventListener(
      'change.appo.picker',
      this.onTimeSelect
    )
  }

  componentWillUnmount() {
    this.pickerRef.current.removeEventListener(
      'change.appo.picker',
      this.onTimeSelect
    )
    this.picker.destroy()
  }
}

export default AppoPicker
