import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../App.css";
import "../Login.css";

import fire from "../firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as libraryActions from "../actions/libraryActions";
import PropTypes from "prop-types";

import SyntaxHighlighter from "react-syntax-highlighter";
import { hybrid } from "react-syntax-highlighter/styles/hljs";

class CodeSnippet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const codeString = `

    <script>
      (function(d, p) {
        var b, s, c, j, r;
        b = d.getElementsByTagName('body')[0];
        s = d.createElement('script');s.src='https://js.stripe.com/v3/';
        b.appendChild(s); r = d.createElement("div");r.id = 'quietcorner-app';
        r.setAttribute('data-publication', p);b.appendChild(r);c=d.createElement('link');
        c.type = 'text/css';c.rel = 'stylesheet';c.href='https://s3.us-east-2.amazonaws.com/quietcorner/quietcorner.css';
        d.getElementsByTagName('head')[0].appendChild(c);j = d.createElement('script');j.id = 'quietcorner-js';
        j.async=true;j.src = 'https://s3.us-east-2.amazonaws.com/quietcorner/quietcorner.js';b.appendChild(j);
      })(document, '${this.props.library.publicationId}');
    </script>

       `;

    return (
      <div>
        <div
          className="dashboard__content-subtitle"
          style={{ opacity: 0.5, marginTop: "12px" }}
        >
          Copy and paste the code below, directly after the opening body tag.
        </div>
        <div style={{ marginTop: "25px", maxWidth: "1000px" }}>
          <SyntaxHighlighter  language="javascript" style={hybrid}>
            {codeString}
          </SyntaxHighlighter>
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

export default connect(mapStateToProps, mapDispatchToProps)(CodeSnippet);
