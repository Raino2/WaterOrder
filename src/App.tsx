import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styles from "./styles/index.module.scss";
import { Button } from "antd";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className={styles.pink}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button>Hello</Button>
      </header>
    </div>
  );
}

export default App;
