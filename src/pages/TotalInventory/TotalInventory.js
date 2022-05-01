import React, { Component } from 'react'
import './TotalInventory.scss';
import Heading from '../../components/Heading/Heading';
import { Redirect } from 'react-router-dom';
import * as api from '../../utils/instockApi';
import LabelledInfoList from '../../components/LabelledInfoList/LabelledInfoList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export class TotalInventory extends Component {

  state = {
    inventory: null,
    pageLoadError: false,
    searchString: ''
  } 

  updateSearchString = str => {
    this.setState({
      searchString: str,
    })
  }

  updateState = newState => {
    this.setState(newState);
  }

  refresh = () => {
    this.setState({
      inventory: null
    })
  }

  deleteHandler = id => {
    alert(id);
  }

  componentDidUpdate = () => {
    if (!this.state.inventory) {
      api.getInventory(this.updateState);
    }
  }

  componentDidMount = () => {
    if (this.state.pageLoadError && this.props.match.url === '/') {
        this.setState({
            pageLoadError: false
        })
    }

    if (this.props.match.path === '/inventory') {
        api.getInventory(this.updateState);
    }
}

  render() {
    if (this.state.pageLoadError && this.props.match.url !== '/') {
      return <Redirect to="/" />
    }
    
    if (!this.state.inventory) {
      return <div>Loading...</div>
    }

    const info = this.state.inventory
      .sort((a, b) => {
        if (a.itemName < b.itemName) {
          return -1;
        }
        if (a.itemName > b.itemName) {
          return 1;
        }
        return 0;
      })
      .map(item => {
      let id = item.id;
      let detail=[];
      
      detail[0] = {};
      detail[0].label = 'INVENTORY ITEM';
      detail[0].line1 = item.itemName;
      detail[0].line1To = '/inventory/' + item.id;
      detail[0].line2 = '';
      detail[0].line2To = '';

      detail[1] = {};
      detail[1].label = 'CATEGORY';
      detail[1].line1 = item.category;
      detail[1].line1To = '';
      detail[1].line2 = '';
      detail[1].line2To = '';
      
      detail[2] = {};
      detail[2].label = 'STATUS';
      detail[2].line1 = item.status;
      detail[2].line1To = '';
      detail[2].line2 = '';
      detail[2].line2To = '';
      
      detail[3] = {};
      detail[3].label = 'QTY';
      detail[3].line1 = item.quantity;
      detail[3].line1To = '';
      detail[3].line2 = '';
      detail[3].line2To = '';

      detail[4] = {};
      detail[4].label = 'WAREHOUSE';
      detail[4].line1 = item.warehouseName;
      detail[4].line1To = '';
      detail[4].line2 = '';
      detail[4].line2To = '';

      return {id: item.id, detail: detail};
    })

    return (
      <> 
        <Header active="inventory" />     
        <section className="total-inventory">
        <div className='total-inventory__outer-shell'>
            <div className="total-inventory__page">
              <Heading 
                backButton={this.props.history.goBack}
                title="Inventory"
                search={this.updateSearchString}
                buttonIcon=''
                buttonText='+ Add New Item'
                buttonTo="/inventory/add" />

              <div className="total-inventory__detail-section">
                <LabelledInfoList 
                  type="inventory"
                  list={info} 
                  refresh={this.refresh}
                  search={this.state.searchString}/>
              </div>
              <Footer />
            </div>
          </div>
        </section>
      </>

    )
  }
}

export default TotalInventory