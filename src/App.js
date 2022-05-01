import React from 'react';
import './styles/_global.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Warehouses from './pages/Warehouses/Warehouses';
import Warehouse from './pages/Warehouse/Warehouse';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import Inventory from './pages/Inventory/Inventory';
import AddInventory from './pages/AddInventory/AddInventory';
import EditInventory from './pages/EditInventory/EditInventory';
import TotalInventory from './pages/TotalInventory/TotalInventory';

class App extends React.Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route 
              path="/warehouses" 
              exact component={Warehouses} />
            <Route 
              path="/warehouses/:id/edit"
              component={EditWarehouse} />
            <Route 
              path="/warehouses/add" 
              component={AddWarehouse} />
            <Route 
              path="/warehouses/:id" 
              component={Warehouse} />
            <Route 
              path="/inventory/:id/edit" 
              component={EditInventory} />
            <Route 
              path="/inventory/add" 
              component={AddInventory} />
            <Route 
              path="/inventory/:id" 
              component={Inventory} />
            <Route 
              path="/inventory" 
              component={TotalInventory} />
            <Redirect to="/warehouses" />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
