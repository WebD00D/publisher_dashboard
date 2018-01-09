import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../App.css";
import "../Login.css";

import fire from "../firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as libraryActions from "../actions/libraryActions";
import PropTypes from "prop-types";

class HelpDesk extends Component {
  constructor(props) {
    super(props);

    this._sendPasswordReset = this._sendPasswordReset.bind(this);

    this.state = {
      publicationName: "",
      loginEmailAddress: "",
      paypal: "",
      mailingAddress: "",
      accountErrorMessage: "",
      passResetText: "I want to change my password"
    };
  }

  _handleAccountUpdates() {
    if (this.state.loginEmailAddress.trim()) {
      var user = fire.auth().currentUser;

      user
        .updateEmail(this.state.loginEmailAddress)
        .then(
          function() {
            var updates = {};
            updates[
              `publications/${this.props.library.publicationId}/email`
            ] = this.state.loginEmailAddress;

            fire
              .database()
              .ref()
              .update(updates);

              console.log("account email updated")
          }.bind(this)
        )
        .catch(
          function(error) {
            // An error happened...
            this.setState({
              accountErrorMessage: error
            });
          }.bind(this)
        );
    }

    if (this.state.publicationName.trim()) {
      var pubNameUpdates = {};
      pubNameUpdates[
        `publications/${this.props.library.publicationId}/publication`
      ] = this.state.publicationName;

      fire.database().ref().update(pubNameUpdates)
      console.log("pub name updated");
    }

    if (this.state.paypal.trim()) {
      var paypalUpdates = {};
      paypalUpdates[
        `publications/${this.props.library.publicationId}/paypalEmail`
      ] = this.state.paypal;

      fire.database().ref().update(paypalUpdates)
      console.log("pay pal updated");
    }

    if (this.state.mailingAddress.trim()) {
      var mailingUpdates = {};
      mailingUpdates[
        `publications/${this.props.library.publicationId}/mailingAddress`
      ] = this.state.mailingAddress;

      fire.database().ref().update(mailingUpdates)
      console.log("mailing updated");
    }




  } // end _handleAccountUpdates

  _sendPasswordReset() {

    const accountEmail = this.props.library.accountEmail;
    var auth = fire.auth();

    auth
      .sendPasswordResetEmail(accountEmail)
      .then(
        function() {
          // Email sent.
          this.setState({
            passResetText: `Password email send to ${
              this.props.library.accountEmail
            }!`
          });
        }.bind(this)
      )
      .catch(
        function(error) {
          // An error happened.
          this.setState({
            accountErrorMessage: error
          });
        }.bind(this)
      );
  }

  render() {
    return (
      <div>
        <div
          className="dashboard__content-subtitle"
          style={{ opacity: 0.5, marginTop: "0px" }}
        >
         Have questions? We've got answers.
        </div>
        <div style={{ marginTop: "25px" }}>

          <div className="question-block">
            <div className="question">Lorem ipsum dolar set amit?</div>
            <div className="answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>
          </div>

          <div className="question-block">
            <div className="question">Lorem ipsum dolar set amit?</div>
            <div className="answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>
          </div>

          <div className="question-block">
            <div className="question">Lorem ipsum dolar set amit?</div>
            <div className="answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpDesk);
