import React, { Component } from "react";
import "./card.scss";

type Props = {
  title: string | undefined;
  callback?: any;
  artwork?: any;
};

class Card extends Component<Props> {
  constants() {}
  render() {
    const { title, artwork, callback } = this.props;

    return (
      <div className={"card"} onClick={(e) => callback(e)}>
        <div className={"card__wrapper"}>
          <img
            src={artwork}
            alt={title}
            className={"card__wrapper__cover"}
            width={150}
            height={150}
          />
          <div className={"card__wrapper__title"}>{title}</div>
        </div>
      </div>
    );
  }
}

export default Card;
