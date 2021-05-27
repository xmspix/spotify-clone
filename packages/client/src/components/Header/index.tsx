import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import profilePic from "../../assets/me.jpg";
import SearchBox from "../SearchBox";
import NavButtons from "../NavButtons";

import { isMobile } from "../../utils/helper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export type HeaderState = {
  shade: number;
};

class Header extends React.PureComponent<{}, HeaderState> {
  state: HeaderState = {
    shade: 50,
  };

  componentDidMount() {
    const { shade } = this.state;
    // var selector: any = document.querySelector(".main__container__wrapper");
    var selector: HTMLElement | null = document.querySelector(".main__container__wrapper");
    selector?.addEventListener("scroll", (event: any) => {
      selector &&
        this.setState({
          shade: shade - selector?.scrollTop,
        });
    });
  }

  componentWillUnmount() {
    var selector: HTMLElement | null = document.querySelector(".main__container__wrapper");
    selector?.removeEventListener("scroll", () => {});
  }

  render() {
    const { shade } = this.state;

    const Profile = () => (
      <div className="header__container__profile">
        {/* <button className="btn btn-upgrade">Upgrade</button> */}
        <Link to="https://github.com/xmspix">
          <img src={profilePic} alt="Mark Stoler" className={"header__container__profile__image"} />
          <span>Mark Stoler</span>
        </Link>
      </div>
    );
    if (!isMobile) {
      return (
        <header
          className="header"
          style={{
            background: `linear-gradient(#3f3f3f, #000 ${shade}%) fixed no-repeat`,
          }}
        >
          <div className="header__container">
            <div className="header__container__nav">
              <NavButtons />
            </div>
            <div className="header__container__search">
              <SearchBox />
            </div>
          </div>
          <Profile />
        </header>
      );
    } else {
      return (
        <>
          <header
            className="mobile-header"
            style={{
              background: `linear-gradient(#3f3f3f, #000 ${shade}%) fixed no-repeat`,
            }}
          >
            <div className="header__container">
              <div className="header__container__nav">
                <NavButtons />
              </div>
            </div>
            <Profile />
            {/* <img
              src={profilePic}
              alt="Mark Stoler"
              className={"header__container__profile__image"}
            /> */}
          </header>
        </>
      );
    }
  }
}

export default Header;
