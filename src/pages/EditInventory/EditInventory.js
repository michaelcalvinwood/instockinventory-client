import React, { Component } from "react";
import FormInput from "../../components/FormInput/FormInput";
import axios from "axios";
import "./EditInventory.scss";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Header from "../../components/Header/Header";
import Heading from "../../components/Heading/Heading";
import Footer from "../../components/Footer/Footer";

export class EditInventory extends Component {
  state = {
    activeInventory: null,
    categoryList: [],
    warehouseList: [],
    nameError: false,
    descriptionError: false,
    categoryError: false,
    quantityError: false,
    warehouseError: false,
    inStock: "In Stock",
    activeCategory: true,
    activeWarehouse: null,
  };

  goBack = () => {
    this.props.history.goBack();
  }

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

    axios.get(`http://localhost:8080/inventory/${this.props.match.params.id}`).then((res) => {
      this.setState({
        activeInventory: res.data,
        activeCategory: res.data.category,
        activeWarehouse: { id: res.data.id, name: res.data.warehouseName },
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
          .put(`http://localhost:8080/inventory/${this.props.match.params.id}`, {
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
    if (!this.state.activeInventory) {
      return <div></div>;
    }

    return (
      <>
        <Header active="warehouses" />
        <section className="warehouse">
          <div className="warehouse__outer-shell">
            <div className="warehouse__page">
              <Heading backButton={this.props.history.goBack} title="Edit Inventory" search={false} />
              <form onSubmit={this.submitHandler} className="edit-inventory">
                <div className="edit-inventory__details-container">
                  <h3 className="edit-inventory__header">Item Details</h3>
                  <FormInput
                    label="Item Name"
                    name="itemName"
                    defaultValue={this.state.activeInventory.itemName}
                    placeholder="Item Name"
                    error={this.state.nameError}
                  />
                  <div className="edit-inventory__field-wrapper">
                    <label className="edit-inventory__label">Description</label>
                    <textarea
                      className={`edit-inventory__description ${this.state.descriptionError ? "edit-inventory__description--error" : null}`}
                      name="description"
                      placeholder="Please enter a brief item description..."
                      defaultValue={this.state.activeInventory.description}
                    />
                    {this.state.descriptionError ? <ErrorMessage /> : null}
                  </div>
                  <div className="edit-inventory__field-wrapper">
                    <label className="edit-inventory__label">Category</label>
                    <select
                      className={`edit-inventory__select ${this.state.categoryError ? "edit-inventory__select--error" : null}`}
                      name="category"
                      onChange={this.handleSelectChange}
                    >
                      <option selected="selected" className="edit-inventory__option">
                        {this.state.activeInventory.category}
                      </option>
                      {this.state.categoryList.map((inventory) => {
                        return (
                          <option className="edit-inventory__option" value={inventory}>
                            {inventory}
                          </option>
                        );
                      })}
                    </select>
                    {this.state.categoryError ? <ErrorMessage /> : null}
                  </div>
                </div>
                <div className="edit-inventory__details-container edit-inventory__details-container--availability">
                  <h3 className="edit-inventory__header edit-inventory__header--availability">Item Availability</h3>
                  <div className="edit-inventory__field-wrapper">
                    <label className="edit-inventory__label">Status</label>
                    <div className="edit-inventory__radio-wrapper">
                      <div className="edit-inventory__radio-item">
                        <input type="radio" onClick={this.handleRadioChange} name="stock" value="In Stock" defaultChecked="checked" />
                        <label
                          className={`edit-inventory__radio-text edit-inventory__radio-text--padding ${this.state.inStock === "In Stock" ? "edit-inventory__radio-text--active" : null
                            }`}
                        >
                          In Stock
                        </label>
                      </div>
                      <div className="edit-inventory__radio-item">
                        <input type="radio" onClick={this.handleRadioChange} name="stock" value="Out of Stock" />
                        <label
                          className={`edit-inventory__radio-text edit-inventory__radio-text--padding ${this.state.inStock === "Out of Stock" ? "edit-inventory__radio-text--active" : null
                            }`}
                        >
                          Out of stock
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="edit-inventory__quantity-wrapper">
                    {this.state.inStock === "In Stock" ? (
                      <FormInput label="Quantity" name="quantity" placeholder="Quantity" defaultValue="0" error={this.state.quantityError} />
                    ) : null}
                  </div>
                  <div className="edit-inventory__field-wrapper">
                    <label className="edit-inventory__label">Warehouse</label>
                    <select
                      className={`edit-inventory__select ${this.state.warehouseError ? "edit-inventory__select--error" : null}`}
                      onChange={this.handleSelectChange}
                      name="warehouse"
                    >
                      <option className="edit-inventory__option" value={this.state.activeInventory.warehouseName} selected="selected">
                        {this.state.activeInventory.warehouseName}
                      </option>

                      {this.state.warehouseList.map((warehouse) => {
                        return (
                          <option className="edit-inventory__option" id={warehouse.id} value={warehouse.name}>
                            {warehouse.name}
                          </option>
                        );
                      })}
                    </select>
                    {this.state.warehouseError ? <ErrorMessage /> : null}
                  </div>
                </div>
                <div className="edit-inventory__button-container">
                  <div onClick={this.goBack} className="edit-inventory__cancel-button">
                    Cancel
                  </div>
                  <button onSubmit={this.submitHandler} className="edit-inventory__add-button">
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

export default EditInventory;
