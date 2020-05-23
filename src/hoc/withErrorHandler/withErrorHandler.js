import React, { useEffect, useState } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    useEffect(() => {
      axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (err) => {
          setError(err);
        }
      );
    });

    function handleErrorConfirmed() {
      setError(null);
    }

    return (
      <>
        <Modal show={error} handleCancelPurchase={handleErrorConfirmed}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
