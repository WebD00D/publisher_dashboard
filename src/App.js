import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";

import fire from "./firebase";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: "",
      adding: false
    };
  }

  componentWillMount() {
    // const timeStamp = Date.now();
    // const clientId = document
    //   .getElementById("root")
    //   .getAttribute("data-client");
    //
    // const contentId = document
    //   .getElementById("root")
    //   .getAttribute("data-content-container");
    //
    // console.log(contentId);
    //
    // this.setState({
    //   clientId,
    //   contentId
    // });
  }

  componentDidMount() {
    // ex url: http://www.mysite.com/news/article-name
    console.log(window.location.pathname); // would return "/news/article-name"

    // fire
    //   .database()
    //   .ref(this.state.clientId + "/protected")
    //   .once("value")
    //   .then(
    //     function(snapshot) {
    //       const protectedArticles = snapshot.val();
    //
    //       Object.keys(protectedArticles).map(
    //         function(key) {
    //           console.log(protectedArticles[key]);
    //           if (protectedArticles[key].path === window.location.pathname) {
    //             this.setState({
    //               protected: true
    //             });
    //           }
    //         }.bind(this)
    //       );
    //     }.bind(this)
    //   );
  }

  render() {
    return (
      <div className="App">
        {this.state.adding ?
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(01,01,01,0.8)',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                height: '320px',
                width: '500px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
                padding: '30px',
                paddingTop: '0px'
              }}>
                <h2>Add New Content</h2>
                <label style={{fontSize: '13px', paddingBottom: '8px'}}> Slug </label>
                <input
                placeholder="ex: /news/article-name"
                style={{
                  height: '38px',
                  width: '80%',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  marginBottom: '12px'
                }} />
                <label style={{fontSize: '13px', paddingBottom: '8px'}}>Price</label>
                <input
                type="number"
                style={{
                  height: '38px',
                  width: '80%',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  marginBottom: '12px'
                }} />
                <div style={{display:'flex', alignItems: 'center'}}>
                  <label style={{fontSize: '13px', paddingBottom: '0px', paddingRight: '8px' }}>Active</label>
                <input
                type="checkbox" />
                </div>
                <button
                  style={{
                    marginTop: '24px',
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
          </div> : ""}
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
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h1>Stab Magazine</h1>
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
                this.setState({ adding: true });
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
