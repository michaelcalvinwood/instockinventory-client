import React, { Component } from "react";
import FormInput from "../../components/FormInput/FormInput";
import axios from "axios";
import "./AddInventory.scss";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Header from "../../components/Header/Header";
import Heading from "../../components/Heading/Heading";
import Footer from "../../components/Footer/Footer";

export class AddInventory extends Component {
  state = {
    categoryList: [],
    warehouseList: [],
    nameError: false,
    descriptionError: false,
    categoryError: false,
    quantityError: false,
    warehouseError: false,
    inStock: "In Stock",
    activeCategory: null,
    activeWarehouse: null,
  };

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/warehouses/`).then((res) => {
      let warehouseList = [];
      res.data.forEach((warehouse) => {
        if (!warehouseList.includes(warehouse.name)) {
          warehouseList.push({ id: warehouse.id, name: warehouse.name });
        }
      });

      this.setState({
        warehouseList: warehouseList,
      });
    });
    axios.get(`http://localhost:8080/inventory/`).then((res) => {
      let categoryList = [];
      res.data.forEach((inventory) => {
        if (!categoryList.includes(inventory.category)) {
          categoryList.push(inventory.category);
        }
      });

      this.setState({
        categoryList: categoryList,
      });
    });
  }

  handleRadioChange = (e) => {
    e.target.value === "In Stock"
      ? this.setState({
        inStock: "In Stock",
      })
      : this.setState({
        inStock: "Out of stock",
      });
  };

  handleSelectChange = (e) => {
    if (e.target.name === "category") {
      this.setState({
        activeCategory: e.target.options[e.target.selectedIndex].value,
      });
    }
    if (e.target.name === "warehouse") {
      this.setState({
        activeWarehouse: { id: e.target.options[e.target.selectedIndex].id, name: e.target.options[e.target.selectedIndex].value },
      });
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    const history = this.props.history;
    let quantity = 0;

    e.target.itemName.value ? this.setState({ nameError: false }) : this.setState({ nameError: true });
    e.target.description.value ? this.setState({ descriptionError: false }) : this.setState({ descriptionError: true });
    this.state.activeCategory ? this.setState({ categoryError: false }) : this.setState({ categoryError: true });
    if (e.target.quantity) {
      e.target.quantity.value ? this.setState({ quantityError: false }) : this.setState({ quantityError: true });
      quantity = e.target.quantity.value;
    }
    this.state.activeWarehouse ? this.setState({ warehouseError: false }) : this.setState({ warehouseError: true });

    setTimeout(() => {
      if (
        this.state.nameError === false &&
        this.state.descriptionError === false &&
        this.state.quantityError === false &&
        !this.state.activeCategory === false &&
        !this.state.activeWarehouse === false
      ) {
        axios
          .post(`http://localhost:8080/inventory/`, {
            warehouseID: this.state.activeWarehouse.id,
            warehouseName: this.state.activeWarehouse.name,
            itemName: e.target.itemName.value,
            description: e.target.description.value,
            category: this.state.activeCategory,
            status: this.state.inStock,
            quantity: quantity,
          })
          .then((res) => {
            this.props.history.goBack();
          });
      } else {
        return;
      }
    }, 100);
  };

  render() {
    return (
      <>
        <Header active="warehouses" />
        <section className="warehouse">
          <div className="warehouse__outer-shell">
            <div className="warehouse__page">
              <Heading backButton={this.props.history.goBack} title="Add Inventory" search={false} />
              <form onSubmit={this.submitHandler} className="inventory-form">
                <div className="inventory-form__details-container">
                  <h3 className="inventory-form__header">Item Details</h3>
                  <FormInput label="Item Name" name="itemName" placeholder="Item Name" error={this.state.nameError} />
                  <div className="inventory-form__field-wrapper">
                    <label className="inventory-form__label">Description</label>
                    <textarea
                      className={`inventory-form__description ${this.state.descriptionError ? "inventory-form__description--error" : null}`}
                      name="description"
                      placeholder="Please enter a brief item description..."
                    />
                    {this.state.descriptionError ? <ErrorMessage /> : null}
                  </div>
                  <div className="inventory-form__field-wrapper">
                    <label className="inventory-form__label">Category</label>
                    <select
                      className={`inventory-form__select ${this.state.categoryError ? "inventory-form__select--error" : null}`}
                      name="category"
                      onChange={this.handleSelectChange}
                    >
                      <option className="inventory-form__option" value="" disabled selected hidden>
                        Please Select
                      </option>
                      {this.state.categoryList.map((inventory) => {
                        return (
                          <option className="inventory-form__option" value={inventory}>
                            {inventory}
                          </option>
                        );
                      })}
                    </select>
                    {this.state.categoryError ? <ErrorMessage /> : null}
                  </div>
                </div>
                <div className="inventory-form__details-container inventory-form__details-container--availability">
                  <h3 className="inventory-form__header inventory-form__header--availability">Item Availability</h3>
                  <div className="inventory-form__field-wrapper">
                    <label className="inventory-form__label">Status</label>
                    <div className="inventory-form__radio-wrapper">
                      <div className="inventory-form__radio-item">
                        <input type="radio" onClick={this.handleRadioChange} name="stock" value="In Stock" defaultChecked="checked" />
                        <label
                          className={`inventory-form__radio-text inventory-form__radio-text--padding ${this.state.inStock === "In Stock" ? "inventory-form__radio-text--active" : null
                            }`}
                        >
                          In Stock
                        </label>
                      </div>
                      <div className="inventory-form__radio-item">
                        <input type="radio" onClick={this.handleRadioChange} name="stock" value="Out of Stock" />
                        <label
                          className={`inventory-form__radio-text inventory-form__radio-text--padding ${this.state.inStock === "Out of Stock" ? "inventory-form__radio-text--active" : null
                            }`}
                        >
                          Out of stock
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="inventory-form__quantity-wrapper">
                    {this.state.inStock === "In Stock" ? (
                      <FormInput label="Quantity" name="quantity" placeholder="Quantity" defaultValue="0" error={this.state.quantityError} />
                    ) : null}
                  </div>
                  <div className="inventory-form__field-wrapper">
                    <label className="inventory-form__label">Warehouse</label>
                    <select
                      className={`inventory-form__select ${this.state.warehouseError ? "inventory-form__select--error" : null}`}
                      onChange={this.handleSelectChange}
                      name="warehouse"
                    >
                      <option className="inventory-form__option" value="" disabled selected hidden>
                        Please select
                      </option>

                      {this.state.warehouseList.map((warehouse) => {
                        return (
                          <option className="inventory-form__option" id={warehouse.id} value={warehouse.name}>
                            {warehouse.name}
                          </option>
                        );
                      })}
                    </select>
                    {this.state.warehouseError ? <ErrorMessage /> : null}
                  </div>
                </div>
                <div className="inventory-form__button-container">
                  <div onClick={this.goBack} to={`/inventory`} className="inventory-form__cancel-button">
                    Cancel
                  </div>
                  <button onSubmit={this.submitHandler} className="inventory-form__add-button">
                    + Add Item
                  </button>
                </div>
              </form>
              <Footer />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default AddInventory;
