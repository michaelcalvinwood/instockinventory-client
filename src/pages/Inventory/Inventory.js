import React, { Component } from 'react';
import './Inventory.scss';
import Heading from '../../components/Heading/Heading';
import editIcon from '../../assets/images/icons/edit-white.svg';
import LabelledInfo from '../../components/LabelledInfo/LabelledInfo';
import * as api from '../../utils/instockApi';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export class Inventory extends Component {
  state = {
    inventoryDetails: null,
    pageLoadError: false,
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

    if (this.props.match.path === '/inventory/:id') {
      api.getInventoryDetails(this.props.match.params.id, this.updateState,);
    }
  }

  render() {
    if (this.state.pageLoadError && this.props.match.url !== '/') {
      return <Redirect to="/" />
    }

    if (!this.state.inventoryDetails) {
      return <div>Loading...</div>
    }

    return (
      <>
        <Header active="inventory" />
        <section className='inventoryDetails'>
          <Heading
            backButton={this.props.history.goBack}
            title={this.state.inventoryDetails.itemName}
            search={false}
            buttonIcon={editIcon}
            buttonText='Edit' 
            buttonTo={`/inventory/${this.props.match.params.id}/edit`}/>
          <section className="inventoryDetails__container">
            <div className="inventoryDetails__description">
              <div className="inventoryDetails__description-text">
                <LabelledInfo
                  label="ITEM DESCRIPTION:"
                  line1={this.state.inventoryDetails.description}
                  line1To=''
                  line2=''
                  line2To=''
                  fixed={true} />
              </div>
              <div className="inventoryDetails__category">
                <LabelledInfo
                  label="CATEGORY:"
                  line1={this.state.inventoryDetails.category}
                  line1To=''
                  line2=''
                  line2To=''
                  fixed={true} />
              </div>
            </div>
            <div className="inventoryDetails__availability">
              <div className="inventoryDetails__status">
                <LabelledInfo
                  label="STATUS:"
                  line1={this.state.inventoryDetails.status}
                  line1To=''
                  line2=''
                  line2To=''
                  fixed={true} />
              </div>
              <div className="inventoryDetails__quantity">
                <LabelledInfo
                  label="QUANTITY:"
                  line1={this.state.inventoryDetails.quantity}
                  line1To=''
                  line2=''
                  line2To=''
                  fixed={true} />
              </div>
              <LabelledInfo
                label="WAREHOUSE:"
                line1={this.state.inventoryDetails.warehouseName}
                line1To=''
                line2=''
                line2To=''
                fixed={true} />
            </div>
          </section>
          <Footer />
        </section>

      </>
    )
  }
}

export default Inventory