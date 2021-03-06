import React from "react";
import { Icon } from "expo";

import Colors from "../constants/Colors";

export default class HeaderIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={32}
        style={{ marginBottom: -3 }}
        color={Colors.headerIcon}
      />
    );
  }
}
