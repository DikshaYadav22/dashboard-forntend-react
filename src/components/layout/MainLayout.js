import React, { useState } from "react";
import Categories from "../category/Categories";
import Posts from "../post/Posts";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";

const MainLayout = () => {
  const [modal, setModal] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [singleCategoryData, setSingleCategoryData] = useState({
    name: "",
  });
  const toggle = () => setModal(!modal);
  const { name } = singleCategoryData;

  const createCategory = async () => {
    toggle();
    const url = process.env.REACT_APP_API;
    const clientData = localStorage.getItem("clientData");
    const { token } = JSON.parse(clientData);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.post(`${url}/categories`, singleCategoryData, {
      headers,
    });
    if (res.data) {
      console.log(res.data);
      let tempData = [...categoriesData, singleCategoryData];
      setCategoriesData(tempData);
      setSingleCategoryData({
        name: "",
      });
    }
  };
  return (
    <Row className="mt-4">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Category</ModalHeader>
        <ModalBody>
          <Form inline>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) =>
                  setSingleCategoryData({
                    ...singleCategoryData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter category name"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={createCategory}>
            Submit
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Col md={3}>
        <Button color="danger" onClick={toggle}>
          Add Category
        </Button>

        <Categories
          categoriesData={categoriesData}
          setCategoriesData={(data) => setCategoriesData(data)}
        />
      </Col>
      <Col md={8}>
        <Posts />
      </Col>
    </Row>
  );
};

export default MainLayout;
