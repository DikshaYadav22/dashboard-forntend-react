import axios from "axios";
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

const Payment = (props) => {
  let history = useHistory();
  const paypal = useRef();

  window.paypal
    .Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "Cool Looking table",

              amount: {
                value: "0.01",
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const res = await actions.order.capture();
        console.log(res);
        if (res.status == "COMPLETED") {
          const url = process.env.REACT_APP_API;
          const clientData = localStorage.getItem("clientData");
          const { token } = JSON.parse(clientData);
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(`${url}/update-user`, {
            headers,
          });
          if (response.data) {
            if (!response.data.error) {
              props.history.push("/post/create");
            }
          }
        }
      },
      onError: (err) => {
        console.log(err);
      },
    })
    .render(paypal.current);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default Payment;
