import React from 'react';
import {getFunName} from '../helpers';
class StorePicker extends React.Component{
    constructor(){
        super();
        this.goToStore = this.goToStore.bind(this);
    }
    goToStore(event){
        event.preventDefault();
        // first grab the text from the box
        const storeId = this.storeInput.value;
        // second we're going to transition from to store/:storeid
        this.context.router.transitionTo(`/store/${storeId}`);
    }
    render(){
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input)=> this.storeInput = input}/>
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}
StorePicker.contextTypes = {
    router: React.PropTypes.object
};
export default StorePicker;