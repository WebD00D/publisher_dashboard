import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../App.css"
import fire from "../firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as libraryActions from "../actions/libraryActions";
import PropTypes from "prop-types";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: "",
      adding: false,
      newSlug: "",
      newPrice: "",
      newActive: ""
    };
  }

  render() {
    return (
      <div className="App">
        <div
          style={{
            height: "48px",
            display: "flex",
            justifyContent: "flexStart",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            backgroundColor: "#000000",
            color: "#FFFFFF"
          }}
        >
          The Library
        </div>
        <div
          style={{
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "60px",
            textAlign: "left"
          }}
        >Login Form</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    library: state.library
  };
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators(libraryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
