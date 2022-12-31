import React, { Component } from "react";
import OtpInput from "react-otp-input";

export default class App extends Component {
  state = { otp: "" };

  handleChange = (otp) => this.setState({ otp });

  render() {
    return (
      <OtpInput
        value={this.state.otp}
        onChange={this.handleChange}
        numInputs={6}
        separator={<span>-</span>}
        className="w-11 h-10 text-2xl"
      />
    );
  }
}
