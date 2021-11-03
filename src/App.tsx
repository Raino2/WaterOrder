import React from "react";
import "./App.css";
import styles from "./styles/index.module.scss";
import { Button } from "antd";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        <Button type="primary" danger className={styles.pink}>
          hay
        </Button>
      </header>
    </div>
  );
}

export default App;
