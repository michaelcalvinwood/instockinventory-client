import React, { Component } from 'react'
import './Warehouse.scss';
import Heading from '../../components/Heading/Heading';
import editIcon from '../../assets/images/icons/edit-white.svg';
import { Redirect } from 'react-router-dom';
import * as api from '../../utils/instockApi';
import LabelledInfoList from '../../components/LabelledInfoList/LabelledInfoList';
import LabelledInfo from '../../components/LabelledInfo/LabelledInfo';
import Delete from '../../components/Delete/Delete';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export class Warehouse extends Component {

  state = {
    warehouseDetails: null,
    pageLoadError: false,
  } 

  deleteHandler = id => {
    alert(id); 
  } 

  updateState = newState => {
    this.setState(newState);
  }

  componentDidMount = () => {
    if (this.state.pageLoadError && this.props.match.url === '/') {
        this.setState({
            pageLoadError: false
        })
    }

    if (this.props.match.path === '/warehouses/:id') {
        api.getWarehouseDetails(this.props.match.params.id, this.updateState, );
    }
}

  render() {
    if (this.state.pageLoadError && this.props.match.url !== '/') {
      return <Redirect to="/" />
    }
    
    if (!this.state.warehouseDetails) {
      return <div>Loading...</div>
    }

    let info = [];
    if (this.state.warehouseDetails.inventory.length) {
      info = this.state.warehouseDetails.inventory.map(item => {
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
  
        return {id: item.id, detail: detail};
      })
    } 
   
    return (
      <>      
        <Header active="warehouses" />
        <section className="warehouse">
          <div className='warehouse__outer-shell'>
            <div className="warehouse__page">
                <Heading 
                  backButton={this.props.history.goBack}
                  title={this.state.warehouseDetails.name}
                  search={false}
                  buttonIcon={editIcon}
                  buttonText='Edit'
                  buttonTo={`/warehouses/${this.state.warehouseDetails.id}/edit`}/>

                <div className="warehouse__contact-section">
                  <div className="warehouse__address">
                    <LabelledInfo 
                      label="WAREHOUSE ADDRESS"
                      line1={this.state.warehouseDetails.address}
                      line1To=''
                      line2={this.state.warehouseDetails.city}
                      line2To=''
                      fixed={true}/>
                  </div>
                  <div className="warehouse__name-info-container">
                    <LabelledInfo
                      label="CONTACT NAME:"
                      line1={this.state.warehouseDetails.contact.name}
                      line1To=''
                      line2={this.state.warehouseDetails.contact.position}
                      line2To=''
                      fixed={true} />
                    
                    <LabelledInfo
                      label="CONTACT INFORMATION:"
                      line1={this.state.warehouseDetails.contact.phone}
                      line1To=''
                      line2={this.state.warehouseDetails.contact.email}
                      line2To=''
                      fixed={true} />
                    </div>
                </div>

                <div className="warehouse__detail-section">
                  <LabelledInfoList 
                    type="inventory"
                    list={info} />
                </div>
              <Footer />
            </div>
          </div>
        </section>
        
      </>

    )
  }
}

export default Warehouse