import React, { Component } from "react";

import "./brailleTranslation.css";

const liblouis = require("liblouis/easy-api");
// eslint-disable-next-line import/no-webpack-loader-syntax
const capi_url = require("file-loader!liblouis-build");
// eslint-disable-next-line import/no-webpack-loader-syntax
const easyapi_url = require("file-loader!liblouis/easy-api");

require.context("liblouis-build/tables/", false);
const table_url = "tables/";

const asyncLiblouis = new liblouis.EasyApiAsync({
  capi: capi_url,
  easyapi: easyapi_url
});

class Braille extends Component {
  state = {
    englishTrans: "",
    brailleTrans: ""
  };

  _englishTrans = evt => {
    /* const englishTranslate = new Worker(`./liblouisEnglish.js`);
    englishTranslate.postMessage(evt.target.value); */
    asyncLiblouis.backTranslateString(
      `unicode.dis,en-ueb-g2.ctb`,
      evt.target.value,
      engTrans => {
        this.setState({ englishTrans: engTrans });
      }
    );
    /* englishTranslate.onmessage = e => {
      let engTrans = e.data;
    }; */
  };

  _brailleTrans = evt => {
    /* const brailleTranslate = new Worker(`./liblouisBraille.js`);
    brailleTranslate.postMessage(evt.target.value); */
    asyncLiblouis.translateString(
      `unicode.dis,en-ueb-g2.ctb`,
      evt.target.value,
      brlleTrans => {
        this.setState({ brailleTrans: brlleTrans });
      }
    );
    /*     brailleTranslate.onmessage = e => {
      let brlleTrans = e.data;
    }; */
  };

  onComponentDidMount() {
    asyncLiblouis.enableOnDemandTableLoading(table_url);
  }

  render() {
    return (
      <div className="braille-trans">
        <p>
          This Liblouis Version using Easy API is: {asyncLiblouis.version()}
        </p>
        <p>
          Please input the Braille you would like tranlated:{"   "}
          <input
            id="braille-input"
            type="text"
            onChange={this._englishTrans.bind(this)}
          />
        </p>
        <p>That translates in English to:</p>
        <p>{this.state.englishTrans}</p>
        <br />
        <p>
          Please input the English:{" "}
          <input
            id="english-input"
            type="text"
            onChange={this._brailleTrans.bind(this)}
          />
        </p>
        <p>That translates in Braille to:</p>
        <p>{this.state.brailleTrans}</p>
      </div>
    );
  }
}

export default Braille;
