import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createSubject, updateSubject } from "../actions/subjects";

import { Button, FormGroup, Form, Card, ButtonGroup } from "react-bootstrap";

const FormSubjects = ({ currentIdSubjects, setCurrentIdSubjects }) => {
  const [postData, setPostData] = useState({
    name: "",
    image: "",
  });
  const post = useSelector((state) =>
    currentIdSubjects
      ? state.subjects.find((subject) => subject._id === currentIdSubjects)
      : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentIdSubjects(0);
    setPostData({ name: "", image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentIdSubjects === 0) {
      dispatch(createSubject(postData));
      clear();
    } else {
      dispatch(updateSubject(currentIdSubjects, postData));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div>
        <h3>Please Sign In to create your Subjects.</h3>
      </div>
    );
  }

  return (
    <div>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <FormGroup>
          <h3>
            {currentIdSubjects
              ? `Editing "${post.name}"`
              : "Creating a Subject"}
          </h3>
        </FormGroup>
        <FormGroup>
          <Form.Control
            placeholder="Name Subject"
            name="name"
            label="Name"
            value={postData.name}
            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <div className="inputFileBase">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, image: base64 })
              }
            />
          </div>
        </FormGroup>
        <Card.Footer>
          <ButtonGroup className="mb-2">
            <Button color="primary" size="lg" type="submit">
              Submit
            </Button>
            <Button variant="danger" size="lg" onClick={clear}>
              Clear
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Form>
    </div>
  );
};
export default FormSubjects;
