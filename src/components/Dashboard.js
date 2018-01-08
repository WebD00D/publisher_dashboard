import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../App.css";
import "../Login.css";
import "../Dashboard.css";

import fire from "../firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as libraryActions from "../actions/libraryActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this._handleAccountSignIn = this._handleAccountSignIn.bind(this);
    this._handleAccountCreation = this._handleAccountCreation.bind(this);

    this._handleAuthentication = this._handleAuthentication.bind(this);

    this.state = {
      email: "",
      password: "",
      hasError: false,
      errorMessage: "",
      buttonText: "Login",
      signingIn: true,
      signingUp: false,
      helpText: "Forgot password?",
      publicationName: "",
      email: "",
      password: "",
      loading: false,
      contentURL: "",

      addingNewContent: false
    };
  }

  _handleAccountSignIn() {
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        function(user) {
          fire
            .database()
            .ref("publications/" + user.uid)
            .once("value")
            .then(
              function(snapshot) {
                console.log("SIGN IN SNAPSHOT", snapshot.val());
                this.props.libraryActions.setCurrentUser(
                  user.uid,
                  snapshot.val().email,
                  snapshot.val().publication
                );
              }.bind(this)
            );

          this.setState({
            loading: false,
            hasError: false
          });
        }.bind(this)
      )
      .catch(
        function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          this.setState({
            errorMessage,
            loading: false,
            hasError: true
          });

          // ...
        }.bind(this)
      );
  }

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

          this.props.libraryActions.createNewUser(
            user.uid,
            this.state.email,
            this.state.publicationName
          );

          this.setState({
            loading: false,
            hasError: false
          });

          // WILL NEED TO HIT AN API TO SEND WELCOME EMAIL. ( using PostMark ) ...
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
            errorMessage: errorMessage,
            loading: false,
            hasError: true
          });
        }.bind(this)
      );
  }

  _handleAuthentication() {
    this.setState({
      loading: true
    });

    this.state.signingIn
      ? this._handleAccountSignIn()
      : this._handleAccountCreation();
  }

  render() {
    return (
      <div className="App">
        <div className="dashboard">
          <div className="dashboard__nav">
            <div
              style={{
                color: "#252525",
                fontFamily: "basic-sans",
                fontSize: "30px",
                fontWeight: "700",
                paddingLeft: "40px"
              }}
            >
              The Library
            </div>
            <div
              style={{
                color: "#252525",
                fontFamily: "basic-sans",
                fontSize: "20px",
                fontWeight: "400",
                paddingRight: "40px"
              }}
            >
              {this.props.library.publication}
            </div>
          </div>
          <div className="dashboard__body">
            <div className="dashboard__menu">
              <div className="dashboard__menu-item dashboard__menu-item--active">
                Content
              </div>
              <div className="dashboard__menu-item ">Help Desk</div>
              <div className="dashboard__menu-item ">My Account</div>
              <div className="dashboard__menu-item ">Sign Out</div>
            </div>

            {this.state.addingNewContent ? (
              <div className="add-content-wrap">
                <div className="add-content-form">
                  <div className="login-input-wrap">
                    <div className="login-input__icon">
                      <img src={require("../images/icons8-website-50.png")} />
                    </div>
                    <div className="login-input__input">
                      <input
                        onChange={e =>
                          this.setState({ contentURL: e.target.value })
                        }
                        placeholder="Content URL"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* If billingInfoSetup is false, show them setup  */}
            {/* either add Paypal email, or addressee and address so we can send them a check */}

            {!this.props.library.billingInfoSetup ? (
              <div className="dashboard__content">
                <div className="dashboard__block">
                  <div className="dashboard__content-title">
                    <div style={{ paddingLeft: "40px" }}>
                      Welcome, {this.props.library.publication}!
                    </div>
                  </div>
                  <div className="dashboard__content-subtitle">
                    <div style={{ paddingLeft: "40px", opacity: 0.6, marginTop: "12px" }}>
                      Before you get started, tell us how you'd like to get your monthly payouts.
                    </div>
                  </div>

                  <div className="billing-options">


                    <div className="billing-option-label">
                      Send my funds via Paypal
                    </div>
                    <div className="login-input-wrap" style={{marginBottom: '32px'}}>
                      <div className="login-input__icon">
                        <img src={require("../images/icons8-paypal-50.png")} />
                      </div>
                      <div className="login-input__input">
                        <input
                          onChange={e =>
                            this.setState({ publicationName: e.target.value })
                          }
                          placeholder="Paypal email address"
                          type="text"
                        />
                      </div>
                    </div>


                    <div className="billing-option-label">
                      I'd like a check mailed to me
                    </div>
                    <div className="login-input-wrap">
                      <div className="login-input__icon">
                        <img src={require("../images/icons8-check-book-50.png")} />
                      </div>
                      <div className="login-input__input">
                        <input
                          onChange={e =>
                            this.setState({ publicationName: e.target.value })
                          }
                          placeholder="Mailing address"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="login-action-wrap">
                      <button>
                        Save
                      </button>
                    </div>

                    <div className="billing-option-error">
                      This is a sample error message.
                    </div>



                  </div>

                </div>
              </div>
            ) : (
              <div className="dashboard__content">
                <div className="dashboard__block">
                  <div className="dashboard__content-title">
                    <div style={{ paddingLeft: "40px" }}>
                      Your Premium Content
                    </div>
                    <button className="dashboard__button">Add New</button>
                  </div>

                  <div className="publisher-content">
                    <div className="publisher-content__headline">
                      <div className="slug">Content URL</div>
                      <div className="price">Price</div>
                      <div className="is-active">Active</div>
                    </div>

                    <div className="publisher-content__row">
                      <div className="slug">
                        /news/jake-paterson-i-wish-john-had-a-bit-of-andy-in-him/
                      </div>
                      <div className="price">$0.20</div>
                      <div className="is-active">
                        <input
                          className="styled-checkbox"
                          id="styled-checkbox-1"
                          type="checkbox"
                          value="value1"
                        />
                        <label htmlFor="styled-checkbox-1" />
                      </div>
                    </div>

                    <div className="publisher-content__row">
                      <div className="slug">
                        /news/jake-paterson-i-wish-john-had-a-bit-of-andy-in-him/
                      </div>
                      <div className="price">$0.20</div>
                      <div className="is-active">
                        <input
                          className="styled-checkbox"
                          id="styled-checkbox-2"
                          type="checkbox"
                          value="value1"
                        />
                        <label htmlFor="styled-checkbox-2" />
                      </div>
                    </div>

                    <div className="publisher-content__row">
                      <div className="slug">
                        /news/jake-paterson-i-wish-john-had-a-bit-of-andy-in-him/
                      </div>
                      <div className="price">$0.20</div>
                      <div className="is-active">
                        <input
                          className="styled-checkbox"
                          id="styled-checkbox-3"
                          type="checkbox"
                          value="value1"
                        />
                        <label htmlFor="styled-checkbox-3" />
                      </div>
                    </div>

                    <div className="publisher-content__row">
                      <div className="slug">
                        /news/jake-paterson-i-wish-john-had-a-bit-of-andy-in-him/
                      </div>
                      <div className="price">$0.20</div>
                      <div className="is-active">
                        <input
                          className="styled-checkbox"
                          id="styled-checkbox-4"
                          type="checkbox"
                          value="value1"
                        />
                        <label htmlFor="styled-checkbox-4" />
                      </div>
                    </div>

                    <div className="publisher-content__row">
                      <div className="slug">
                        /news/jake-paterson-i-wish-john-had-a-bit-of-andy-in-him/
                      </div>
                      <div className="price">$0.20</div>
                      <div className="is-active">
                        <input
                          className="styled-checkbox"
                          id="styled-checkbox-5"
                          type="checkbox"
                          value="value1"
                        />
                        <label htmlFor="styled-checkbox-5" />
                      </div>
                    </div>

                    <div className="publisher-content__row">
                      <div className="slug">
                        /news/jake-paterson-i-wish-john-had-a-bit-of-andy-in-him/
                      </div>
                      <div className="price">$0.20</div>
                      <div className="is-active">
                        <input
                          className="styled-checkbox"
                          id="styled-checkbox-6"
                          type="checkbox"
                          value="value1"
                        />
                        <label htmlFor="styled-checkbox-6" />
                      </div>
                    </div>

                    <div className="publisher-content__row">
                      <div className="slug">
                        /news/jake-paterson-i-wish-john-had-a-bit-of-andy-in-him/
                      </div>
                      <div className="price">$0.20</div>
                      <div className="is-active">
                        <input
                          className="styled-checkbox"
                          id="styled-checkbox-7"
                          type="checkbox"
                          value="value1"
                        />
                        <label htmlFor="styled-checkbox-7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        {/* end dashboard */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
