import React from "react";
import IndexLinkList from "./LinkList";
import IndexLogo from "./Logo";

const WebHeader = () => {
  return (
    <React.Fragment>
      <IndexLogo />
      <IndexLinkList />
    </React.Fragment>
  );
};

export default WebHeader;
