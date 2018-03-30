import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import starFull from '../icons/star-full.svg';

const StarRatingWrapper = styled.div``;

const StarRatingButton = styled.button`
  background: transparent;
  border-color: transparent;
  cursor: ${props => (props.disabled ? 'cursor' : 'pointer')};
`;

class StarRating extends React.Component {
  state = {
    stars: [false, false, false, false, false],
    hoverStars: [false, false, false, false, false]
  };

  /**Set the stars to the rating */
  componentDidMount() {
    this.setState(({ stars }) => {
      return { stars: this.updatedStars(this.props.rating - 1, stars) };
    });
  }
  updatedStars = (rating, prevStars) =>
    prevStars.map((star, index) => index <= rating);

  calculateNewRating = arr => arr.filter(Boolean).length;

  clickHandler = index => {
    this.setState(({ stars }) => {
      const newStars = this.updatedStars(index, stars);
      // console.log(this.calculateNewRating(newStars)); // update rating in store
      return { stars: newStars };
    });
  };

  mouseEnterHandler = index => {
    if (!this.props.editable) return;
    this.setState(({ hoverStars }) => {
      const newStars = this.updatedStars(index, hoverStars);
      return { hoverStars: newStars };
    });
  };

  mouseLeaveHandler = () => {
    if (!this.props.editable) return;
    this.setState(prevState => {
      const newStars = prevState.stars;
      return { hoverStars: [false, false, false, false, false] };
    });
  };

  render() {
    return (
      <StarRatingWrapper
        aria-labelledby={`${this.calculateNewRating(this.state.stars)} out of ${
          this.state.stars.length
        } stars`}
      >
        {this.state.stars
          ? this.state.stars.map((star, i) => (
              <StarRatingButton
                onClick={() => this.clickHandler(i)}
                key={i}
                aria-labelledby="star"
                aria-pressed={this.state.stars[i]}
                onMouseEnter={() => this.mouseEnterHandler(i)}
                onMouseLeave={this.mouseLeaveHandler}
                disabled={!this.props.editable}
              >
                <Icon
                  glyph={starFull}
                  noFill={!this.state.stars[i] && !this.state.hoverStars[i]}
                  altText={`${i + 1} of ${this.state.stars.length} stars`}
                />
              </StarRatingButton>
            ))
          : null}
      </StarRatingWrapper>
    );
  }
}

export default StarRating;
