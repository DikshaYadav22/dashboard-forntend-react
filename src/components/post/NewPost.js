import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NewPost = () => {
  let history = useHistory();
  const [postsData, setPostsData] = useState({
    title: "",
    body: "",
    category_id: null,
  });

  const [categoriesData, setCategoriesData] = useState([]);
  let { title, body } = postsData;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const url = process.env.REACT_APP_API;
    const clientData = localStorage.getItem("clientData");
    const { token } = JSON.parse(clientData);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.get(`${url}/categories`, {
      headers,
    });
    if (res.data) {
      if (!res.data.error) {
        setCategoriesData(res.data.data);
      }
    }
  };
  const submitPostsData = async () => {
    const clientData = localStorage.getItem("clientData");
    const { token } = JSON.parse(clientData);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = process.env.REACT_APP_API;
    const res = await axios.post(`${url}/posts`, postsData, {
      headers,
    });
    if (res) {
      setPostsData({
        title: "",
        body: "",
        category_id: "",
      });
      history.push("/");
    }
  };

  return (
    <div className="mt-5">
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) =>
              setPostsData({ ...postsData, title: e.target.value })
            }
            name="title"
            id="title"
            placeholder="enter your username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input
            type="text"
            value={body}
            onChange={(e) =>
              setPostsData({ ...postsData, body: e.target.value })
            }
            name="email"
            id="email"
            placeholder="with a placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="category_id">Category</Label>

          <Input type="select" name="category_id" id="category_id">
            {categoriesData.length > 0
              ? categoriesData.map((category, index) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  );
                })
              : ""}
          </Input>
        </FormGroup>

        <Button onClick={submitPostsData} color="info">
          Add Post
        </Button>
      </Form>
    </div>
  );
};

export default NewPost;
