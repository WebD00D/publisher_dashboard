import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import fire from "./firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as libraryActions from "./actions/libraryActions";

import LoginForm from "./components/LoginForm";
import PropTypes from "prop-types";

class App extends Component {
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

 componentDidMount() {}

  render() {
    return (
      <div className="App">
        {!this.props.library.authenticated ? <LoginForm /> : "" }

        {this.props.library.firstTimeLogin ? (
          <div className="first-time-container">
            <h1 style={{ textAlign: "center", fontWeight: "400" }}>Welcome, let's get started!</h1>
            <p
              style={{
                fontFamily: "sans-serif",
                textAlign: "center",
                fontSize: "14px",
                lineHeight: "22px"
              }}
            >
              Your digital content has likely always been free. And, today you
              start the difficult transition to re-educate your audience that
              your best content is no longer free.
            </p>

            <p
              style={{
                fontFamily: "sans-serif",
                textAlign: "center",
                fontSize: "14px",
                lineHeight: "22px"
              }}
            >
              But first thing is first, let's finish setting up your account.
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
              <label
                style={{
                  marginBottom: "8px",
                  fontSize: "10px",
                  letterSpacing: ".75px"
                }}
              >
                PUBLICATION NAME
              </label>
              <input
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                className="form-input"
                style={{ width: '300px'}}
                type="textbox"

              />
            </div>
          </div>
        ) : (
          " "
        )}

        {this.props.library.authenticated ? (
          <div>
            {this.state.adding ? (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "rgba(01,01,01,0.8)",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    height: "320px",
                    width: "500px",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    padding: "30px",
                    paddingTop: "0px"
                  }}
                >
                  <h2>Add New Content</h2>
                  <label style={{ fontSize: "13px", paddingBottom: "8px" }}>
                    {" "}
                    Slug{" "}
                  </label>
                  <input
                    placeholder="ex: /news/article-name"
                    style={{
                      height: "38px",
                      width: "80%",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      marginBottom: "12px"
                    }}
                  />
                  <label style={{ fontSize: "13px", paddingBottom: "8px" }}>
                    Price
                  </label>
                  <input
                    type="number"
                    style={{
                      height: "38px",
                      width: "80%",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      marginBottom: "12px"
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label
                      style={{
                        fontSize: "13px",
                        paddingBottom: "0px",
                        paddingRight: "8px"
                      }}
                    >
                      Active
                    </label>
                    <input type="checkbox" />
                  </div>
                  <button
                    style={{
                      marginTop: "24px",
                      height: "32px",
                      width: "160px",
                      border: "none",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      backgroundColor: "#000000"
                    }}
                    onClick={() => {
                      this.setState({ adding: false });
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
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
            </div>{" "}
            {/* NAV */}
            <div
              style={{
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "60px",
                textAlign: "left"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <h1>{this.props.library.publication}</h1>
                <button
                  style={{
                    height: "32px",
                    width: "160px",
                    border: "none",
                    fontSize: "13px",
                    color: "#FFFFFF",
                    backgroundColor: "#000000"
                  }}
                  onClick={() => {
                    // this.setState({ adding: true });
                    this.props.libraryActions.changePublicationName("New Name");
                  }}
                >
                  Add New
                </button>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "2px solid black",
                    paddingBottom: "8px"
                  }}
                >
                  <div style={{ width: "60%" }}>
                    <b>Slug</b>
                  </div>
                  <div style={{ width: "20%" }}>
                    <b>Price</b>
                  </div>
                  <div style={{ width: "20%" }}>
                    <b>Active</b>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "22px",
                    paddingBottom: "22px",
                    borderBottom: "1px solid #f5f5f5"
                  }}
                >
                  <div style={{ width: "60%" }}>
                    /style/photolyfe-tanner-olthoff
                  </div>
                  <div style={{ width: "20%" }}>$0.20</div>
                  <div style={{ width: "20%" }}>
                    <input type="checkbox" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "22px",
                    paddingBottom: "22px",
                    borderBottom: "1px solid #f5f5f5"
                  }}
                >
                  <div style={{ width: "60%" }}>
                    /style/photolyfe-tanner-olthoff
                  </div>
                  <div style={{ width: "20%" }}>$0.20</div>
                  <div style={{ width: "20%" }}>
                    <input type="checkbox" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "22px",
                    paddingBottom: "22px",
                    borderBottom: "1px solid #f5f5f5"
                  }}
                >
                  <div style={{ width: "60%" }}>
                    /style/photolyfe-tanner-olthoff
                  </div>
                  <div style={{ width: "20%" }}>$0.20</div>
                  <div style={{ width: "20%" }}>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>{" "}
              {/* AUTHENTICATED SECTION */}
            </div>
          </div>
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
