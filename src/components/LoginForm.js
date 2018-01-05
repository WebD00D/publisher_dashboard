import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../App.css";
import fire from "../firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as libraryActions from "../actions/libraryActions";
import PropTypes from "prop-types";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this._handleAccountSignIn = this._handleAccountSignIn.bind(this);
    this._handleAccountCreation = this._handleAccountCreation.bind(this);

    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  _handleAccountSignIn() {}

  _handleAccountCreation() {
    console.log(
      `creating account with user ${this.state.email}, and password: ${
        this.state.password
      }`
    );

    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        function(user) {
          const newUser = fire.auth().currentUser;

          this.props.libraryActions.createNewUser(user.uid, this.state.email);

          // fetch(
          //   `https://boardgrab-api.herokuapp.com/send-welcome-email?email=${
          //     this.state.email
          //   }`
          // ).then(function(response) {
          //   console.log("RESPONSE", response);
          // });
        }.bind(this)
      )
      .catch(
        function(error) {
          // handle errors.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            `encountered an error with code ${errorCode}, and message ${
              errorMessage
            }`
          );
          this.setState({
            error: errorMessage
          });
        }.bind(this)
      );
  }

  render() {
    return (
      <div className="App">
        <div
          style={{
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "60px",
            textAlign: "left",
            backgroundColor: "#FFFFFF",

            borderRadius: "12px",
            position: "relative"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                height: "60px",
                width: "400px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#000000",
                alignItems: "center",
                position: "absolute",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px"
              }}
            >
              <div style={{ paddingLeft: "20px" }}>
                <div style={{ fontWeight: "400", color: "#FFFFFF" }}>
                  The Library
                </div>
              </div>

              <div style={{ paddingRight: "20px" }}>
                <div
                  style={{
                    fontWeight: "400",
                    color: "#FFFFFF",
                    opacity: "0.5",
                    fontSize: "12px"
                  }}
                >
                  Publisher's Dashboard
                </div>
              </div>
            </div>

            <div
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "100px",
                paddingBottom: "40px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <label
                style={{
                  marginBottom: "8px",
                  fontSize: "10px",
                  letterSpacing: ".75px"
                }}
              >
                EMAIL
              </label>
              <input
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                className="form-input"
                type="textbox"
              />

              <label
                style={{
                  marginBottom: "8px",
                  fontSize: "10px",
                  letterSpacing: ".75px"
                }}
              >
                PASSWORD
              </label>
              <input
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
                className="form-input"
                type="password"
              />

              <button
                className="login-button login-button--black"
                style={{ marginTop: "22px" }}
              >
                Sign In
              </button>

              <div className="or">
                <div className="or__line" />
                <div className="or__word">or</div>
              </div>

              <button
                onClick={() => this._handleAccountCreation()}
                className="login-button login-button--white"
                style={{ marginTop: "28px" }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
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
