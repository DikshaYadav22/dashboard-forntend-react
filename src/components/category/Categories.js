import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardTitle } from "reactstrap";

const Categories = ({ categoriesData, setCategoriesData }) => {
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const url = process.env.REACT_APP_API;
    const clientData = localStorage.getItem("clientData");
    const { token } = JSON.parse(clientData);
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const res = await axios.get(`${url}/categories`, { headers });
    console.log(res);
    if (res.data) {
      if (!res.data.error) setCategoriesData(res.data.data);
    }
  };
  const renderCategories = () => {
    return (
      <Card className="mt-3 p-3">
        {categoriesData.map((category, index) => {
          return <CardTitle key={index}>{category.name}</CardTitle>;
        })}
      </Card>
    );
  };
  return <>{categoriesData.length > 0 ? renderCategories() : ""}</>;
};
export default Categories;
