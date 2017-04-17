/**
 * Created by Alex on 16-04-2017.
 */
import React from 'react';
import {formatPrice} from '../helpers';
class Fish extends React.Component{
 render(){
     const {index, addToOrder, details} = this.props;
     const isAvaiable = details.status === 'available';
     const buttonText = isAvaiable ? 'Add To Order' : 'Sold Out!';
     return(
         <li className="menu-fish">
             <img src={details.image} alt={details.name}/>
             <h3 className="fish-name">
                 {details.name}
                 <span className="price">{formatPrice(details.price)}</span>
             </h3>
             <p>{details.desc}</p>
             <button onClick={()=> addToOrder(index)} disabled={!isAvaiable}> {buttonText}</button>
         </li>
     );
 }
}

export default Fish;
Fish.propTypes ={
    details: React.PropTypes.func.isRequired,
    index: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired
};