import React, { Component } from 'react';
import { formatPrice } from '../../helpers';

class Order extends Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish.status === 'available';
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      );
    } else {
      return (
        <li key={key}>
          {count} lbs {fish.name} {formatPrice(count * fish.price)}
        </li>
      );
    }
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((acc, curr) => {
      const fish = this.props.fishes[curr];
      const count = this.props.order[curr];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return acc + count * fish.price;
      }
      return acc;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul>{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          <strong>Total: </strong>
          {formatPrice(total)}
        </div>
      </div>
    );
  }
}

export default Order;
