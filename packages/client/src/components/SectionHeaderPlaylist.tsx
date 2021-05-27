import React from "react";

type State = {
  sticky: boolean;
  shade: number;
};

type Props = {
  title?: string;
  artwork?: string;
  links?: [];
  children?: {};
};

export default class SectionHeader extends React.PureComponent<Props, State> {
  state: State = {
    sticky: false,
    shade: 50,
  };

  componentDidMount() {
    const { shade } = this.state;

    var selector: any = document.querySelector(".main__container__wrapper");

    selector.addEventListener("scroll", (event: any) => {
      this.setState({
        shade: shade - selector.scrollTop,
      });

      if (selector.scrollTop >= 120) {
        this.setState({
          sticky: true,
        });
      } else if (selector.scrollTop <= 20) {
        this.setState({
          sticky: false,
        });
      }
    });
  }

  render() {
    const { sticky, shade } = this.state;

    return (
      <div
        className={
          sticky ? "main__container__wrapper__header sticky" : "main__container__wrapper__header"
        }
        style={{
          background: `linear-gradient(#3f3f3f, #000 ${shade}%) fixed no-repeat`,
        }}
      >
        {/* {this.props.children} */}
        <div className="playlist__header">
          <img
            src={this.props.artwork}
            alt=""
            className="cover playlist__header__cover"
            style={{
              width: sticky ? "100px" : "",
              height: sticky ? "100px" : "",
            }}
          />
          <div className="playlist__header__container">
            <span>Playlist</span>
            <h4>{this.props.title}</h4>
            <div className="playlist__header__container__buttons">
              {/* <button className="btn btn-play">play</button>
                  <button className="btn btn-like">like</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
