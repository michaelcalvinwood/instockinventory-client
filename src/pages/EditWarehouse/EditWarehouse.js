import axios from "axios";
import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Heading from "../../components/Heading/Heading";
import FormInput from "../../components/FormInput/FormInput";
import "./EditWarehouse.scss";
import phone from "phone";
import validator from "validator";
import Footer from "../../components/Footer/Footer";

export class EditWarehouse extends Component {
  state = {
    activeWarehouse: null,
    warehouseNameError: false,
    warehouseAddressError: false,
    warehouseCityError: false,
    warehouseCountryError: false,
    contactNameError: false,
    contactPositionError: false,
    contactPhoneError: false,
    contactEmailError: false,
    validNumber: true,
    validEmail: true,
  };

  goBack = () => {
    this.props.history.goBack();
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/warehouses/${this.props.match.params.id}`).then((res) => {
      this.setState({
        activeWarehouse: res.data,
      });
    });
  }

  phoneValidation = async (number) => {
    if (phone(number).isValid) {
      this.setState({
        validNumber: true,
        contactPhoneError: false,
      });
    } else {
      this.setState({
        validNumber: false,
        contactPhoneError: true,
      });
    }
  };

  emailValidation = async (email) => {
    if (validator.isEmail(email)) {
      this.setState({
        validEmail: true,
        contactEmailError: false,
      });
    } else {
      this.setState({
        validEmail: false,
        contactEmailError: true,
      });
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    const history = this.props.history;

    e.target.warehouseName.value ? this.setState({ warehouseNameError: false }) : this.setState({ warehouseNameError: true });
    e.target.warehouseAddress.value ? this.setState({ warehouseAddressError: false }) : this.setState({ warehouseAddressError: true });
    e.target.warehouseCity.value ? this.setState({ warehouseCityError: false }) : this.setState({ warehouseCityError: true });
    e.target.warehouseCountry.value ? this.setState({ warehouseCountryError: false }) : this.setState({ warehouseCountryError: true });
    e.target.contactName.value ? this.setState({ contactNameError: false }) : this.setState({ contactNameError: true });
    e.target.contactPosition.value ? this.setState({ contactPositionError: false }) : this.setState({ contactPositionError: true });
    e.target.contactPhone.value ? this.setState({ contactPhoneError: false }) : this.setState({ contactPhoneError: true });
    e.target.contactEmail.value ? this.setState({ contactEmailError: false }) : this.setState({ contactEmailError: true });

    this.phoneValidation(e.target.contactPhone.value)
      .then(this.emailValidation(e.target.contactEmail.value))
      .then(() => {
        if (
          this.state.warehouseNameError === false &&
          this.state.warehouseAddressError === false &&
          this.state.warehouseCityError === false &&
          this.state.warehouseCountryError === false &&
          this.state.contactNameError === false &&
          this.state.contactPositionError === false &&
          this.state.contactPhoneError === false &&
          this.state.contactEmailError === false &&
          this.state.validNumber === true
        ) {
          axios
            .put(`http://localhost:8080/warehouses/${this.props.match.params.id}`, {
              name: e.target.warehouseName.value,
              address: e.target.warehouseAddress.value,
              city: e.target.warehouseCity.value,
              country: e.target.warehouseCountry.value,
              contactName: e.target.contactName.value,
              contactPosition: e.target.contactPosition.value,
              contactPhone: e.target.contactPhone.value,
              contactEmail: e.target.contactEmail.value,
            })
            .then((res) => {
              history.push(`/warehouses`);
            });
        } else {
          return;
        }
      });
  };

  render() {
    const {
      activeWarehouse,
      warehouseNameError,
      warehouseAddressError,
      warehouseCityError,
      warehouseCountryError,
      contactNameError,
      contactPositionError,
      contactPhoneError,
      contactEmailError,
    } = this.state;

    if (!activeWarehouse) {
      return <div></div>;
    }

    return (
      <>
        <Header active="warehouses" />
        <section className="edit-form">
          <div className="edit-form__outer-shell">
            <div className="edit-form__page">
              <Heading backButton={this.props.history.goBack} title="Edit Warehouse" search={false} />

              <form className="edit-form__form" onSubmit={this.submitHandler}>
                <div className="edit-form__details-container">
                  <h3 className="edit-form__header">Warehouse Details</h3>
                  <FormInput
                    label="Warehouse Name"
                    name="warehouseName"
                    placeholder="Warehouse Name"
                    defaultValue={activeWarehouse.name}
                    error={warehouseNameError}
                  />
                  <FormInput
                    label="Street Address"
                    name="warehouseAddress"
                    placeholder="Street Address"
                    defaultValue={activeWarehouse.address}
                    error={warehouseAddressError}
                  />
                  <FormInput label="City" name="warehouseCity" placeholder="City" defaultValue={activeWarehouse.city} error={warehouseCityError} />
                  <FormInput
                    label="Country"
                    name="warehouseCountry"
                    placeholder="Country"
                    defaultValue={activeWarehouse.country}
                    error={warehouseCountryError}
                  />
                </div>

                <div className="edit-form__details-container edit-form__details-container--contact">
                  <h3 className="edit-form__header edit-form__header--contact ">Contact Details</h3>
                  <FormInput
                    label="Contact Name"
                    name="contactName"
                    placeholder="Contact Name"
                    defaultValue={activeWarehouse.contact.name}
                    error={contactNameError}
                  />
                  <FormInput
                    label="Position"
                    name="contactPosition"
                    placeholder="Position"
                    defaultValue={activeWarehouse.contact.position}
                    error={contactPositionError}
                  />
                  <FormInput
                    label="Phone Number"
                    name="contactPhone"
                    placeholder="Phone Number"
                    defaultValue={activeWarehouse.contact.phone}
                    error={contactPhoneError}
                    validNumber={this.state.validNumber}
                  />
                  <FormInput
                    label="Email"
                    name="contactEmail"
                    placeholder="Email"
                    defaultValue={activeWarehouse.contact.email}
                    error={contactEmailError}
                    validEmail={this.state.validEmail}
                  />
                </div>

                <div className="edit-form__button-container">
                  <div onClick={this.goBack} className="edit-form__cancel-button">
                    Cancel
                  </div>
                  <button onSubmit={this.submitHandler} className="edit-form__save-button">
                    Save
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

export default EditWarehouse;
