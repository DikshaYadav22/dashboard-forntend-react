import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const Posts = () => {
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const url = process.env.REACT_APP_API;
    const clientData = localStorage.getItem("clientData");
    const { token } = JSON.parse(clientData);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get(`${url}/posts`, { headers });
    if (res.data) {
      if (!res.data.error) {
        setPostsData(res.data.data);
      }
    } else {
      console.log(res.data);
    }
  };

  const renderPosts = () => {
    if (postsData.length > 0) {
      console.log(postsData);
      return postsData.map((post, index) => {
        return (
          <Row>
            <Col>
              <Card>
                <CardTitle>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </CardTitle>
              </Card>
            </Col>
          </Row>
        );
      });
    }
  };

  return <>{postsData.length > 0 ? renderPosts() : "Loading..."}</>;
};
export default Posts;
