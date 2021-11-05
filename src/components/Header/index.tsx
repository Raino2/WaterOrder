import React from "react";
import IndexLinkList from "./components/LinkList";
import IndexLogo from "./components/Logo";

const WebHeader = () => {
  return (
    <React.Fragment>
      <IndexLogo />
      <IndexLinkList />
    </React.Fragment>
  );
};

export default WebHeader;
