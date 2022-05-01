import axios from "axios";
import React, { Component } from "react";
import FormInput from "../../components/FormInput/FormInput";
import './AddWarehouse.scss';
import Header from '../../components/Header/Header';
import Heading from '../../components/Heading/Heading';
import Footer from '../../components/Footer/Footer';
import phone from "phone";
import validator from "validator";

export class AddWarehouse extends Component {
  state = {
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
          this.state.contactEmailError === false
        ) {
          axios
            .post("http://localhost:8080/warehouses/", {
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
              this.props.history.goBack();
            });
        } else {
          return;
        }
      });
  };

  render() {
    const {
      warehouseNameError,
      warehouseAddressError,
      warehouseCityError,
      warehouseCountryError,
      contactNameError,
      contactPositionError,
      contactPhoneError,
      contactEmailError,
    } = this.state;

    return (
      <>
        <Header active="warehouses" />
        <section className="add-warehouse">
          <div className="add-warehouse__outer-shell">
            <div className="add-warehouse__page">
              <Heading
                backButton={this.props.history.goBack}
                title="Add New Warehouse"
                search={false}
                buttonIcon=''
                buttonText=''
                buttonTo='' />
              <form className="add-form" onSubmit={this.submitHandler}>
                <div className="add-form__details-container">
                  <h3 className="add-form__header">Warehouse Details</h3>
                  <FormInput
                    label="Warehouse Name"
                    name="warehouseName"
                    placeholder="Warehouse Name"
                    error={warehouseNameError}
                  />
                  <FormInput
                    label="Street Address"
                    name="warehouseAddress"
                    placeholder="Street Address"
                    error={warehouseAddressError}
                  />
                  <FormInput
                    label="City"
                    name="warehouseCity"
                    placeholder="City"
                    error={warehouseCityError}
                  />
                  <FormInput
                    label="Country"
                    name="warehouseCountry"
                    placeholder="Country"
                    error={warehouseCountryError}
                  />
                </div>

                <div className="add-form__details-container add-form__details-container--contact">
                  <h3 className="add-form__header add-form__header--contact ">Contact Details</h3>
                  <FormInput
                    label="Contact Name"
                    name="contactName"
                    placeholder="Contact Name"
                    error={contactNameError}
                  />
                  <FormInput
                    label="Position"
                    name="contactPosition"
                    placeholder="Position"
                    error={contactPositionError}
                  />
                  <FormInput
                    label="Phone Number"
                    name="contactPhone"
                    placeholder="Phone Number"
                    error={contactPhoneError}
                    validNumber={this.state.validNumber}
                  />
                  <FormInput
                    label="Email"
                    name="contactEmail"
                    placeholder="Email"
                    error={contactEmailError}
                    validEmail={this.state.validEmail}
                  />
                </div>

                <div className="add-form__button-container">
                  <div onClick={this.goBack} className="add-form__cancel-button">Cancel</div>
                  <button onSubmit={this.submitHandler} className="add-form__save-button">
                    + Add Warehouse
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

export default AddWarehouse;