import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../actions/recipes";
import { getSubjects } from "../actions/subjects";
import { useSelector } from "react-redux";

import { Container, Row, Col, Modal } from "react-bootstrap";

import Recipes from "./Recipes";
import Subjects from "./Subjects";
import FormSubjects from "./FormSubjects";
import FormRecipes from "./FormRecipes";
import MyBag from "./MyBag";

export const Home = () => {
  const [currentIdRecipes, setCurrentIdRecipes] = useState(0);
  const [currentIdSubjects, setCurrentIdSubjects] = useState(0);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubjects());
  }, [setCurrentIdSubjects]);
  useEffect(() => {
    dispatch(getRecipes());
  }, [setCurrentIdRecipes]);

  const recipes = useSelector((state) => state.recipes);
  const subjects = useSelector((state) => state.subjects);
  const object = "";
  useEffect(() => {
    setData([
      { title: "Subjects", items: subjects },
      { title: "MyBag", items: object },
      { title: "Recipes", items: recipes },
    ]);
  }, [subjects, recipes, object]);
  console.log("result", data);
  data.map((c) => console.log(c.title, c.items));

  return (
    <>
      <Container>
        <Row>
          <Col xs={4} md={4}>
            <Modal.Dialog>
              <FormSubjects
                currentIdSubjects={currentIdSubjects}
                setCurrentIdSubjects={setCurrentIdSubjects}
              />
              <Modal.Header>
                <Modal.Title>Subject</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div>
                  <Subjects setCurrentIdSubjects={setCurrentIdSubjects} />
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Col>
          <Col xs={6} md={4}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>My bag</Modal.Title>
              </Modal.Header>
              <MyBag />

              <Modal.Body></Modal.Body>
            </Modal.Dialog>
          </Col>
          <Col xs={6} md={4}>
            <Modal.Dialog>
              <FormRecipes
                currentIdRecipes={currentIdRecipes}
                setCurrentIdRecipes={setCurrentIdRecipes}
              />
              <Modal.Header>
                <Modal.Title>Recipes</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div>
                  <Recipes setCurrentIdRecipes={setCurrentIdRecipes} />
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Col>
        </Row>
      </Container>
    </>
  );
};
