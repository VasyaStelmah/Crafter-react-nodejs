import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, updateRecipe } from "../actions/recipes";

import { Button, FormGroup, Form, Card, ButtonGroup } from "react-bootstrap";

const FormRecipes = ({ currentIdRecipes, setCurrentIdRecipes }) => {
  const [postData, setPostData] = useState({
    name: "",
    subjects: "",
    image: "",
  });
  const post = useSelector((state) =>
    currentIdRecipes
      ? state.recipes.find((recipe) => recipe._id === currentIdRecipes)
      : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentIdRecipes(0);
    setPostData({ name: "", subjects: "", image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentIdRecipes === 0) {
      dispatch(createRecipe(postData));
      clear();
    } else {
      dispatch(updateRecipe(currentIdRecipes, postData));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div>
        <div variant="h6" align="center">
          Please Sign In to create your Recipes
        </div>
      </div>
    );
  }

  return (
    <div>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <FormGroup>
          <h3>
            {currentIdRecipes ? `Editing "${post.name}"` : "Creating a Recipe"}
          </h3>
        </FormGroup>
        <FormGroup>
          <Form.Control
            placeholder="Name Recipes"
            name="name"
            label="Name"
            value={postData.name}
            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            placeholder="Name Subjects"
            name="subjects"
            label="subjects"
            value={postData.subjects}
            onChange={(e) =>
              setPostData({ ...postData, subjects: e.target.value.split(",") })
            }
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
            <Button variant="danger" onClick={clear}>
              Clear
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Form>
    </div>
  );
};
export default FormRecipes;
