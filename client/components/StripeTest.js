import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const StripeTest = (props) => {
  return (
    <>
    <form action="/charge" method="POST" className="flex flex-col w-1/3">
    <input className="bg-transparent text-white p-2 h-10 mb-4" type="text" name="name" placeholder="Name" />
    <input type="email" className="bg-transparent text-white p-2 h-10 mb-4" name="email" placeholder="Email" />
    <input className="bg-transparent text-white p-2 h-10 mb-4" type="text" name="amount" placeholder="Amount" />

    <div id="card-element" className="bg-transparent text-white p-2 h-10 mb-4"></div>
    <div id="card-errors" role="alert"></div>
    <button className="text-white bg-purple-900 p-4 rounded">Submit Payment</button>
    </form>
    </>
  );
};

export default StripeTest;
