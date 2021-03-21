import Recipes from "./Recipes";
import React from "react";
import { Container, Modal, Row, Col, Spinner, CardDeck } from "react-bootstrap";

const DragDropRecipes = ({
  setCurrentIdRecipes,
  isLogged,
  recipes,
  remoted,
  setRemoted,
  setRecipes,
}) => {
  const dragEnterHandler = (e) => {
    if (remoted !== null) {
      let rem = remoted[0];

      setRecipes((prev) => {
        let newMyBag = [...prev];
        newMyBag.splice(0, 0, rem);
        setRemoted(null);
        return setRecipes(newMyBag);
      });
    }
  };
  return (
    <>
      <div>
        <Modal.Header>
          <Modal.Title
            onDragLeave={(e) => {
              dragEnterHandler(e);
            }}
          >
            Recipes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {recipes.length === 0 ? (
            <>
              <div>Empty</div>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </>
          ) : (
            <Container>
              <Row>
                {recipes.map((recipe, index) => (
                  <Col lg={6} key={index}>
                    <CardDeck>
                      <div
                        className="dragrop"
                        draggable={isLogged}
                        key={index}
                        onDragStart={(e) => {
                          const deleteRecipes = recipes.splice(index, 1);
                          setRemoted(deleteRecipes);
                          setRecipes(
                            recipes.filter((item) => item.name !== recipe.name)
                          );
                        }}
                      >
                        <Recipes
                          recipe={recipe}
                          setCurrentIdRecipes={setCurrentIdRecipes}
                        />
                      </div>
                    </CardDeck>
                  </Col>
                ))}
              </Row>
            </Container>
          )}
        </Modal.Body>
      </div>
    </>
  );
};
export default DragDropRecipes;
