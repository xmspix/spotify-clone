import React from "react";

type State = {
  sticky: string;
  shade: number;
};

type Props = {
  title: string;
  links?: [];
};

export default class SectionHeader extends React.PureComponent<Props, State> {
  state: State = {
    sticky: "",
    shade: 50,
  };

  componentDidMount() {
    const { shade } = this.state;

    var selector: HTMLElement | null = document.querySelector(".main__container__wrapper");

    selector?.addEventListener("scroll", (event: any) => {
      selector &&
        this.setState({
          shade: shade - selector.scrollTop,
        });

      if (selector && selector?.scrollTop >= 120) {
        this.setState({
          sticky: "sticky",
        });
      } else if (selector && selector?.scrollTop <= 20) {
        this.setState({
          sticky: "",
        });
      }
    });
  }

  componentWillUnmount() {
    var selector: HTMLElement | null = document.querySelector(".main__container__wrapper");
    selector?.removeEventListener("scroll", () => null);
  }

  render() {
    const { sticky, shade } = this.state;

    const links = this.props.links?.map((e: any) => (
      <span className={e.class} key={e.name}>
        {e.name}
      </span>
    ));

    return (
      <div
        className={
          sticky ? "main__container__wrapper__header sticky" : "main__container__wrapper__header"
        }
        style={{
          background: `linear-gradient(#3f3f3f, #000 ${shade}%) fixed no-repeat`,
        }}
      >
        <h1>{this.props.title}</h1>
        {links && <div className="main__container__wrapper__category">{links}</div>}
      </div>
    );
  }
}
