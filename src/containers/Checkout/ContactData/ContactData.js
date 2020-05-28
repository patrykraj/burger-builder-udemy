import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

// import axios from "../../../axios.orders";
import classes from "./ContactData.module.css";

import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "asap", displayValue: "ASAP" },
            { value: "hour", displayValue: "Select Time" },
          ],
        },
        value: "asap",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    return isValid;
  }

  orderHandler = (e) => {
    e.preventDefault();

    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ];
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price + 2,
      orderForm: formData,
    };

    // axios
    //   .post("/orders.json", order)
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: true });
    //     console.log(err);
    //   });
    this.props.onPurchaseBurger(order);
  };

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedForm = {
      ...this.state.orderForm,
    };

    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedForm,
      formIsValid,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(e) => this.inputChangedHandler(e, formElement.id)}
          />
        ))}
        <Button variant="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orderReducer.loading,
  };
};

const mapDipatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (payload) =>
      dispatch(orderActions.purchaseBurger(payload)),
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(ContactData);
