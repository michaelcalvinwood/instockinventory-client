import React, { Component } from 'react';
import './Delete.scss';
import close from '../../assets/images/icons/close-24px.svg'
import * as api from '../../utils/instockApi';

class Delete extends Component {
    state = {
        active: true,
        lastUpdated: Date.now()
    }

    deleteItem = (type, id) => {
        api.deleteItem(type, id, this.props.turnOff);
        this.setState({
            active: false
        })
    }

    componentDidUpdate = () => {
        const currentTime = Date.now();
        if ((currentTime - this.state.lastUpdated) < 1000) {
            return;
        }

        if (this.state.active === false) {
            this.setState({
                active: true,
                lastUpdated: Date.now()
            })
        }
    }

    componentDidMount = () => {
        this.setState({
            active: true,
            lastUpdated: Date.now()
        })
    }

    turnOff = () => {
        this.setState({
            active: false,
            lastUpdated: Date.now()
        })
    }

    render() {
        const { type, name, id } = this.props
        let heading = '';
        let comment = '';

        switch (type) {
            case 'warehouse':
            case 'warehouses':
                heading = `Delete ${name} warehouse?`
                comment = `Please confirm that you'd like to delete the 
                ${name} from the list of warehouses. You won't be
                able to undo this action.`
                break;
            case 'inventories':
            case 'inventory':
                heading = `Delete ${name} inventory item?`
                comment = `Please confirm that you'd like to delete 
                ${name} from the inventory list. You won't be
                able to undo this action.`
        }
        let sectionClassName = 'delete'
        let overlayClassName = 'delete__overlay'

        if (this.state.active === false) {
            sectionClassName += ' delete--off'
            overlayClassName += ' delete__overlay--off'
        } else {
            sectionClassName += ' delete--active';
        }

        return (
            <>
                <section className={sectionClassName}>
                    <div className='delete__holder'>
                        <button className='delete__exit-button'>
                            <img className='delete__exit' src={close} alt='exit-icon'
                                onClick={this.turnOff} />
                        </button>
                        <p className='delete__heading'>{heading}</p>
                        <p className='delete__comment'>{comment}</p>
                        <div className='delete__button-holder'>
                            <button className='delete__cancel-button'
                                onClick={this.turnOff}>Cancel</button>
                            <button className='delete__delete-button'
                                onClick={() => { this.deleteItem(type, id) }} >Delete</button>
                        </div>
                    </div>
                </section>
                <div className={overlayClassName}></div>
            </>
        )
    }
}

export default Delete;


