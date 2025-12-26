import React from "react";
import { useParams } from "react-router";

const CredentialDetail = () => {
  const param = useParams();
  console.log(param);
  return <div>details</div>;
};

export default CredentialDetail;
