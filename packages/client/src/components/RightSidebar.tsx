import React from "react";

export interface RightSidebar {}

export class RightSidebar extends React.PureComponent<{}, RightSidebar> {
  render() {
    return (
      <aside className="right-sidebar">
        <div className="right-sidebar__message">
          See what your friends are playing
        </div>
      </aside>
    );
  }
}

export default RightSidebar;
