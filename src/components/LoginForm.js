import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../App.css";
import "../Login.css";

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
        <div className="login">
          <div className="login-form">
            <div
              style={{
                marginBottom: "18px",
                fontWeight: "600",
                textAlign: "left",
                color: "#000000",
                fontSize: "36px",
                fontFamily: "basic-sans"
              }}
            >
              The Library
            </div>
            <div
              style={{
                marginBottom: '18px',
                textAlign: "left",
                color: "#000000",
                fontSize: "19px",
                fontFamily: "karmina"
              }}
            >
              Login to your publisher dashboard
            </div>


            <div className="login-input-wrap">
              
            </div>


          </div> {/* end login form */}
          <div className="login-background">
            <div
              style={{
                fontWeight: "600",
                textAlign: "left",
                color: "#FFFFFF",
                fontSize: "66px",
                fontFamily: "basic-sans"
              }}
            >
              Help preserve the true <br /> art of storytelling.
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "50px",
                right: "40px",
                fontFamily: "sans",
                color: "#FFFFFF",
                fontSize: "18px",
                letterSpacing: ".25px",
                fontFamily: "karmina"
              }}
            >
              Publisher's Dashboard
            </div>
          </div>
        </div>

        <div
          style={{
            display: "none",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "60px",
            textAlign: "left",
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
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
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px"
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
