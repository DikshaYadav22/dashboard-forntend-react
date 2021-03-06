import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Table,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Jumbotron,
  Container,
} from "reactstrap";

const Post = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const [commentsData, setCommentsData] = useState([]);

  const [singleReplyData, setSingleReplyData] = useState("");

  useEffect(() => {
    getPost();
  }, []);
  const { title, body } = postData;

  const submitReplyData = async () => {
    const url = process.env.REACT_APP_API;
    const clientData = localStorage.getItem("clientData");
    const { token } = JSON.parse(clientData);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let postData = {
      comment: singleReplyData,
    };
    const res = await axios.post(`${url}/post/${id}/add-reply`, postData, {
      headers,
    });
    if (res.data) {
      if (!res.data.error) {
        let tempData = [...commentsData, postData];
        setCommentsData(tempData);
        setSingleReplyData("");
      }
    } else {
      console.log(res.data);
    }
  };

  const getPost = async () => {
    const url = process.env.REACT_APP_API;
    const clientData = localStorage.getItem("clientData");
    const { token } = JSON.parse(clientData);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get(`${url}/posts/${id}`, { headers });
    if (res.data) {
      if (!res.data.error) {
        setPostData(res.data.data);
        setCommentsData(res.data.comment);
      }
    } else {
      console.log(res.data);
    }
  };

  return (
    <div>
      <h2 className="text-center mt-3">Post Data</h2>
      <Table striped className="table">
        <thead>
          <tr>
            <th>
              <h3 className="display-6">Title</h3>
            </th>
            <th>
              <h3 className="display-6">Content:</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {title}</td>
            <td>
              <p className="lead">{body}</p>
            </td>
          </tr>
        </tbody>
      </Table>

      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="add-reply">Add Reply</Label>
              <Input
                type="text"
                name="add-reply"
                id="add-reply"
                value={singleReplyData}
                onChange={(e) => setSingleReplyData(e.target.value)}
                placeholder="Enter Reply"
              />
              <Button color="info" onClick={submitReplyData}>
                Add
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      <Card>
        {commentsData.length > 0
          ? commentsData.map((data, index) => {
              return <CardBody>{data.comment}</CardBody>;
            })
          : []}
      </Card>
    </div>
  );
};

export default Post;
