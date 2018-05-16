import React, { Component } from "react";
import liblouis from "liblouis";

import "./brailleTranslation.css";

const liblouisTableWorker = new Worker("./liblouisTables.js");
console.log(liblouisTableWorker);

class Braille extends Component {
  state = {
    englishTrans: "",
    brailleTrans: ""
  };

  _englishTrans = evt => {
    let engTrans = liblouis.backTranslateString(
      `${liblouisTableWorker}/unicode.dis,${liblouisTableWorker}/en-us-comp8-ext.utb`,
      evt.target.value
    );
    this.setState({ englishTrans: engTrans });
  };

  _brailleTrans = evt => {
    let brailleTrans = liblouis.translateString(
      `${liblouisTableWorker}/unicode.dis,${liblouisTableWorker}/en-us-comp8-ext.utb`,
      evt.target.value
    );
    this.setState({ brailleTrans });
  };

  render() {
    return (
      <div className="braille-trans">
        <p>This Liblouis Version using Easy API is: {liblouis.version()}</p>
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
