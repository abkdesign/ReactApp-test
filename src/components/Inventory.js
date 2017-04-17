/**
 * Created by Alex on 15-04-2017.
 */
/**
 * Created by Alex on 15-04-2017.
 */
import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component{
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e, key){
        const fish = this.props.fishes[key];
        // take a copy of that fish and update it with the new data
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key,updatedFish);

    }
    renderInventory(key){
        const fish = this.props.fishes[key];
        return(
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish name" onChange={(e)=>this.handleChange(e,key)}/>
                <input type="number" name="price"  value={fish.price} placeholder="Fish price" onChange={(e)=>this.handleChange(e,key)}/>
                <select type="text" name="status" value={fish.status} onChange={(e)=>this.handleChange(e,key)}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold out</option>
                </select>
                <textarea type="text" name="desc"  value={fish.desc} placeholder="Fish desc" onChange={(e)=>this.handleChange(e,key)}/>
                <input type="text" name="image" value={fish.image} placeholder="Fish image" onChange={(e)=>this.handleChange(e,key)}/>
                <button onClick={()=> this.props.removeFish(key)}>Remove Fish</button>
            </div>
        );
    }
    render(){
        const {addFish, loadSamples} = this.props;
        return(
          <div>
              <h2>Inventory</h2>
              {Object.keys(this.props.fishes).map(this.renderInventory)}
              <AddFishForm addFish={addFish}/>
              <button onClick={loadSamples}> load sample fishes</button>
          </div>
        );
    }
}
export default Inventory;
Inventory.propTypes ={
    fishes: React.PropTypes.object.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadsamples: React.PropTypes.func.isRequired,
};