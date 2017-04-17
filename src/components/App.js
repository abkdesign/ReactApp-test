import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import _ from 'lodash';
import base from '../base';
import sampleFishes from '../sample-fishes';
class App extends React.Component{
    constructor(){
        super();

        // bind this
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeOrder = this.removeOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        //getinitialstate
        this.state ={
            fishes: {},
            order: {}
        };
    }
    componentWillMount(){
        //this.runs right before the <App> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // check if there is any order in localstorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if(localStorageRef){
            //update our App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    componentWillUpdate(nextProps, nextState){
        localStorage.setItem(`order-${this.props.params.storeId}`,
            JSON.stringify(nextState.order));
    }
    addFish(fish){
        //update our state
        const fishes = {...this.state.fishes};
        // add in our new fish
        const id = _.uniqueId(fish);
        fishes[`${id}`] = fish;
        // set state
        this.setState({fishes: fishes});

    }
    updateFish(key, updatedFish){
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes:fishes});
    }
    removeFish(key){
        const fishes ={...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes:fishes});

    }
    loadSamples(){
        this.setState({
            fishes: sampleFishes
        });
    }
    addToOrder(key){
        // take a copy our state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] +1 || 1;

        // update or state
        this.setState({order: order});
    }
    removeOrder(key){
        const order ={...this.state.order};
        //Remove the selected order
        delete order[key];
        // update state
        this.setState({
           order: order
        });
    }
    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh seefood market" age={50} cool={true}/>
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key=> <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeOrder={this.removeOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                />
            </div>
        );
    }
}

export default App;
App.propTypes ={
    params: React.PropTypes.object.isRequired
};