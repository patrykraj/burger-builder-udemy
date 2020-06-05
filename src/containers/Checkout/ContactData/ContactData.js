import React, { useState } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

// import axios from "../../../axios.orders";
import classes from "./ContactData.module.css";

import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/";

const ContactData = (props) => {
  const formValues = {
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
  };
  // formIsValid: false,
  // loading: false,

  const [orderForm, setOrderForm] = useState(formValues);
  const [formIsValid, setFormIsValid] = useState(false);

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    return isValid;
  };

  const orderHandler = (e) => {
    e.preventDefault();

    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier];
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price + 2,
      orderForm: formData,
      userId: props.userId,
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
    props.onPurchaseBurger(order, props.token);
  };

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedForm = {
      ...orderForm,
    };

    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedForm);
    setFormIsValid(true);

    // this.setState({
    //   orderForm: updatedForm,
    //   formIsValid,
    // });
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          changed={(e) => inputChangedHandler(e, formElement.id)}
        />
      ))}
      <Button variant="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  };
};

const mapDipatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (payload, token) =>
      dispatch(orderActions.purchaseBurger(payload, token)),
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(ContactData);
