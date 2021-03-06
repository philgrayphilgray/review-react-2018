import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Icon from './Icon';
import StarRating from './StarRating';
import pencil from '../icons/pencil.svg';
import bin from '../icons/bin.svg';

const propTypes = {
  card: PropTypes.shape({
    art: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    rating: PropTypes.number
  })
};

const defaultProps = {
  card: {
    art: 'http://via.placeholder.com/300x300',
    title: 'Unknown title',
    artist: 'Unknown artist',
    year: 'Unknown year',
    rating: 0
  }
};

const CardWrapper = styled.div`
  position: relative;
  width: 310px;
  padding: 1em 0.5em;
  box-shadow: 1px 4px 2px 1px #aaa;
  margin: 0.5em;
  background: #eee;
`;

const CardImage = styled.img`
  flex: 100%;
  width: 100%;
  height: auto;
  position: relative;
`;

const CardBody = styled.div`
  display: flex;
  background: #ddd;
  padding: 0.25em;
`;

const CardDetails = styled.div`
  flex: 60%;
  padding: 1em;

  & > h3 {
    margin: 0;
    line-height: 1.5;
  }

  & > h3 + p {
    margin-top: 0;
  }
`;

const CardControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 2em;
  justify-content: center;
  align-items: center;
`;

const CardButton = styled.button`
  padding: 0.25em;
  background: transparent;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Card = ({ card }) => {
  return (
    <CardWrapper>
      <CardImage src={card.art} />
      <CardBody>
        <CardDetails>
          <h3>{card.title}</h3>
          <p>
            by {card.artist}
            <br />
            {card.year}
          </p>
          <StarRating rating={card.rating} />
        </CardDetails>
        <CardControls>
          <CardButton aria-label="Edit this album">
            <Icon glyph={pencil} fillColor="#000" />
          </CardButton>
          <CardButton aria-label="Delete this album">
            <Icon glyph={bin} fillColor="#000" />
          </CardButton>
        </CardControls>
      </CardBody>
    </CardWrapper>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
export default Card;
