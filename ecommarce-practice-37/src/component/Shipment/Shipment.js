import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  document.title = "Shipment";

  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue = {loggedInUser.name} ref={register({ required: true })} />
      {errors.name && (
        <span className="error">***Name is required</span>
      )}

      <input name="email" defaultValue = {loggedInUser.email} ref={register({ required: true })} placeholder="Your name" />
      {errors.email && (
        <span className="error">***Email is required</span>
      )}

      <input name="address" defaultValue = {loggedInUser.address} ref={register({ required: true })} placeholder="Your email" />
      {errors.address && (
        <span className="error">***Address is required</span>
      )}

      <input name="phone" defaultValue = {loggedInUser.phone} ref={register({ required: true })} placeholder="Your phone" />
      {errors.phone && (
        <span className="error">***Phone is required</span>
      )}
      


      <input style={{ width: "102%" }} type="submit" />
    </form>
  );
};

export default Shipment;
