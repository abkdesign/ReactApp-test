/**
 * Created by Alex on 15-04-2017.
 */
import React from 'react';
import {formatPrice} from '../helpers';

class Order extends React.Component{
    constructor(){
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key){
        const {order, fishes} = this.props;
        const count = order[key];
        const  fish = fishes[key];
        const removeButton = <button onClick={()=> this.props.removeOrder(key)}>&times;</button>
        if(!fish || this.status === 'unavailable'){
            return(
                <li key={key}> sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}</li>
            );
        }
        return(
            <li key={key}>
                <span>{count}lbs {fish.name} {removeButton}</span>
                <span className="price">{formatPrice(count*fish.price)}</span>
            </li>
        );
    }
    render(){
        const {order, fishes} = this.props;
        const orderIds = Object.keys(order);
        const total = orderIds.reduce((prevTotal, key) =>{
           const fish = fishes[key];
           const count = order[key];
           const isAvailable = fish && fish.status === 'available';
           if(isAvailable){
               return prevTotal + (count* fish.price || 0)
           }
           return prevTotal;
        }, 0);
        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}

                    </li>
                </ul>
            </div>
        );
    }
}
export default Order;

Order.propTypes ={
    order: React.PropTypes.object.isRequired,
    fishes: React.PropTypes.object.isRequired,
    removeOrder: React.PropTypes.func.isRequired
};