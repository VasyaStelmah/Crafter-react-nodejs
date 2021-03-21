import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { deleteRecipe } from "../actions/recipes";
import { useDispatch } from "react-redux";

const Recipes = ({ setCurrentIdRecipes, recipe }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  return recipe ? (
    <Card key={recipe._id}>
      <img
        draggable={false}
        variant="top"
        src={recipe.image}
        alt=""
        height="50px"
        width="50px"
      />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        {recipe.subject?.length !== 0 || recipe.subject?.length !== undefined
          ? recipe?.subjects?.map((s, index) => (
              <Card.Text key={index}>
                Consist of: {index + 1} {s}
              </Card.Text>
            ))
          : null}
      </Card.Body>
      {user ? (
        <Card.Footer>
          <ButtonGroup size="sm" className="mb-2">
            <Button
              onClick={() => setCurrentIdRecipes(recipe._id)}
              style={{ color: "white" }}
              size="small"
            >
              {"Edit"}
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => dispatch(deleteRecipe(recipe._id))}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Card.Footer>
      ) : null}
    </Card>
  ) : null;
};
export default Recipes;
