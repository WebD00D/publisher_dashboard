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
import cx from "classnames";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this._handleAccountSignIn = this._handleAccountSignIn.bind(this);
    this._handleAccountCreation = this._handleAccountCreation.bind(this);
    this._handleAuthentication = this._handleAuthentication.bind(this);
    this._handleBillingSetup = this._handleBillingSetup.bind(this);

    this.state = {
      paypalEmail: "",
      billingAddress: "",
      initialPayoutOptionSaved: false, // change back to false..

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

      addingNewContent: false,
      newContentPrice: "Select a Price"
    };
  }

  _handleBillingSetup() {
    const sendCheckToAddress = this.state.billingAddress;
    const paypalEmail = this.state.paypalEmail;

    // ..In firebase we're going to always be updating .. currentPayoutMethod..
    // ..We can also be saving / creating / updating endpoints for paypalEmail, and mailingAddress..
    // ..First thing is to check to make sure we've got at least one, and only one type filled out..

    if (!sendCheckToAddress.trim() && !paypalEmail.trim()) {
      this.setState({
        errorMessage: "A valid Paypal email or mailing address is required."
      });
      return;
    } else {
      // at least one is filled out. But now we've got to make sure it's only one.

      if (sendCheckToAddress.trim() && paypalEmail.trim()) {
        this.setState({
          errorMessage: "Please complete only one payout option."
        });
        return;
      } else {
        // update firebase here, and update props..
        console.log("publication id", this.props.library.publicationId);

        this.props.libraryActions.addBillingInfo(
          this.props.library.publicationId,
          this.state.paypalEmail,
          this.state.billingAddress
        );

        return;
        this.setState({
          errorMessage: "",
          initialPayoutOptionSaved: true
        });
      }
    }
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

                  <div className="login-input-wrap">
                    <div className="login-input__icon">
                      <img src={require("../images/icons8-money-50.png")} />
                    </div>
                    <div className="login-input__input">
                      <select className={cx({ "greyed-out": this.state.newContentPrice === "Select a Price" })} >
                        <option>Select a Price</option>
                        <option>$0.20 USD</option>
                        <option>$0.30 USD</option>
                        <option>$0.45 USD</option>
                        <option>$0.50 USD</option>
                        <option>$0.60 USD</option>
                        <option>$0.70 USD</option>
                        <option>$0.80 USD</option>
                        <option>$0.90 USD</option>
                        <option>$1.00 USD</option>
                      </select>
                    </div>
                  </div>


                  <div className="login-action-wrap">
                    <button onClick={() => this._handleBillingSetup()}>
                      Save
                    </button>
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
                    <div
                      style={{
                        paddingLeft: "40px",
                        opacity: 0.6,
                        marginTop: "12px"
                      }}
                    >
                      Before you get started, tell us how you'd like to get your
                      monthly payouts.
                    </div>
                  </div>

                  <div className="billing-options">
                    <div className="billing-option-label">
                      Send my funds via Paypal
                    </div>
                    <div
                      className="login-input-wrap"
                      style={{ marginBottom: "32px" }}
                    >
                      <div className="login-input__icon">
                        <img src={require("../images/icons8-paypal-50.png")} />
                      </div>
                      <div className="login-input__input">
                        <input
                          onChange={e =>
                            this.setState({ paypalEmail: e.target.value })
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
                        <img
                          src={require("../images/icons8-check-book-50.png")}
                        />
                      </div>
                      <div className="login-input__input">
                        <input
                          onChange={e =>
                            this.setState({ billingAddress: e.target.value })
                          }
                          placeholder="Mailing address"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="login-action-wrap">
                      <button onClick={() => this._handleBillingSetup()}>
                        Save
                      </button>
                    </div>

                    <div className="billing-option-error">
                      {this.state.errorMessage}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* this part should only ever be shown once, after they complete their initia billing info stuff.. by default initialPayoutOptionSaved is false. */}

            {this.props.library.billingInfoSetup &&
            this.state.initialPayoutOptionSaved ? (
              <div className="dashboard__content">
                <div className="dashboard__block">
                  <div className="dashboard__content-title">
                    <div style={{ paddingLeft: "40px" }}>
                      Got it! Your payout info has been updated.
                    </div>
                  </div>
                  <div className="dashboard__content-subtitle">
                    <div
                      style={{
                        paddingLeft: "40px",
                        opacity: 0.6,
                        marginTop: "12px"
                      }}
                    >
                      Ready to add your first piece of content?
                    </div>
                  </div>
                  <div
                    className="login-action-wrap"
                    style={{
                      marginLeft: "40px",
                      marginTop: "12px",
                      borderBottom: "none"
                    }}
                  >
                    <button
                      onClick={() =>
                        this.setState({ initialPayoutOptionSaved: false })
                      }
                    >
                      Let's get to it
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {this.props.library.billingInfoSetup &&
            !this.state.initialPayoutOptionSaved ? (
              <div className="dashboard__content">
                <div className="dashboard__block">
                  <div className="dashboard__content-title">
                    <div style={{ paddingLeft: "40px" }}>
                      Your Premium Content
                    </div>
                    <button onClick={ () => this.setState({ addingNewContent: true }) } className="dashboard__button">Add New</button>
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
            ) : (
              ""
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
