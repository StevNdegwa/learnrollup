import React from "react";
import ReactDOM from "react-dom";
import { Rollup } from "./components";
import "./index.css";

const App = () => {
  return (
    <div>
      <Rollup/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
