import React, { Component } from 'react'
import './Warehouses.scss';
import Heading from '../../components/Heading/Heading';
import { Redirect } from 'react-router-dom';
import * as api from '../../utils/instockApi';
import LabelledInfoList from '../../components/LabelledInfoList/LabelledInfoList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export class Warehouses extends Component {

  state = {
    warehouses: null,
    pageLoadError: false,
    searchString: ''
  }

  updateSearchString = str => {
    this.setState({
      searchString: str,
    })
  }

  refresh = () => {
    this.setState({
      warehouses: null
    })
  }

  deleteHandler = id => {
    alert(id);
  }

  updateState = newState => {
    this.setState(newState);
  }

  componentDidUpdate = () => {
    if (!this.state.warehouses) {
      api.getWarehouses(this.updateState);
    }
  }

  componentDidMount = () => {
    if (this.state.pageLoadError && this.props.match.url === '/') {
      this.setState({
        pageLoadError: false
      })
    }

    if (this.props.match.path === '/warehouses') {
      api.getWarehouses(this.updateState,);
    }
  }

  render() {
    if (this.state.pageLoadError && this.props.match.url !== '/') {
      return <Redirect to="/" />
    }

    if (!this.state.warehouses) {
      return <div>Loading...</div>
    }

    const warehousesList = this.state.warehouses.map(warehouse => {
      let detail = [];
      let { name, id, address, city, country } = warehouse;

      detail[0] = {};
      detail[0].label = 'WAREHOUSE';
      detail[0].line1 = name;
      detail[0].line1To = '/warehouses/' + id;
      detail[0].line2 = '';
      detail[0].line2To = '';

      detail[1] = {};
      detail[1].label = 'ADDRESS';
      detail[1].line1 = address + ', ' + city + ', ' + country;
      detail[1].line1To = '';
      detail[1].line2 = '';
      detail[1].line2To = '';

      detail[2] = {};
      detail[2].label = 'CONTACT NAME';
      detail[2].line1 = warehouse.contact.name;
      detail[2].line1To = '';
      detail[2].line2 = '';
      detail[2].line2To = '';

      detail[3] = {};
      detail[3].label = 'CONTACT INFORMATION';
      detail[3].line1 = warehouse.contact.phone;
      detail[3].line1To = '';
      detail[3].line2 = warehouse.contact.email;
      detail[3].line2To = '';

      return { id: warehouse.id, detail: detail };
    })

    return (
      <>
        <Header active="warehouses" />
        <section className="warehouses">
          <div className='warehouse__outer-shell'>
            <div className="warehouse__page">
              <Heading
                backButton=""
                title="Warehouses"
                search={this.updateSearchString}
                buttonIcon=""
                buttonText='+ Add New Warehouse'
                buttonTo='/warehouses/add' />
              <div className="warehouses__section">
                <LabelledInfoList
                  type="warehouses"
                  list={warehousesList}
                  refresh={this.refresh}
                  search={this.state.searchString} />
              </div>
              <Footer />
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Warehouses