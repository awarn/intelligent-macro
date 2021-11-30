import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import MacroDisplay from "./features/macro/MacroDisplay";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/button3" element={<Button3 />}></Route>
          <Route path="/button4" element={<Button4 />}></Route>
        </Routes>
      </header>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Counter />
      <MacroDisplay />
      <p>
        <Link to="/button3">Button 3</Link>
      </p>
    </div>
  );
};

function Button3() {
  return (
    <div>
      <Counter />
      <MacroDisplay />
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}

function Button4() {
  console.log("button4");
  return (
    <div>
      <button class="button button-s" onClick={onClickFinal} type="button">
        Button Final 1
      </button>
      <button class="button button-s" onClick={onClickFinal} type="button">
        Button Final 2
      </button>
    </div>
  );
}

const onClickButton1 = () => {
  console.log("button1");
  return window.open("https://www.ericsson.com", "_blank");
};

const onClickButton2 = () => {
  console.log("button2");
  return window.open("https://www.google.com", "_blank");
};

const onClickButton3 = () => {
  console.log("button3");
  return window.open("/Button3");
};
const onClickButton4 = () => {
  console.log("button4");
  return window.open("/Button4", "_blank");
};

const onClickButton5 = () => {
  console.log("button5");
  return window.open("https://www.github.com", "_blank");
};

const onClickFinal = () => {
  console.log("Final");
  return window.open(
    "https://www.youtube.com/watch?v=w9km01hvP4w&ab_channel=EuropeVEVO",
    "_blank"
  );
};

export default App;
