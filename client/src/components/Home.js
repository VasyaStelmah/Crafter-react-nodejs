import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../actions/recipes";
import { getSubjects } from "../actions/subjects";
import { useSelector } from "react-redux";

import { Container, Row, Col, Modal } from "react-bootstrap";

import FormSubjects from "./FormSubjects";
import FormRecipes from "./FormRecipes";

import DragDropSubjects from "./DragDropSubjects";
import DragDropMyBag from "./DragDropMyBag";
import DragDropRecipes from "./DragDropRecipes";

export const Home = () => {
  const [currentIdRecipes, setCurrentIdRecipes] = useState(0);
  const [currentIdSubjects, setCurrentIdSubjects] = useState(0);
  const [dragStart, setDragStart] = useState();
  const [remoted, setRemoted] = useState(null);
  const [myBag, setMyBag] = useState([]);

  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));
  const isLogged = user?.toString() !== undefined;
  const subjec = useSelector((state) => state.subjects);
  const recip = useSelector((state) => state.recipes);

  const [recipes, setRecipes] = useState(recip);
  const [subjects, setSubjects] = useState(subjec);
  useEffect(() => {
    setRecipes(recip);
  }, [recip]);
  useEffect(() => {
    setSubjects(subjec);
  }, [subjec]);

  useEffect(() => {
    dispatch(getSubjects());
  }, [setCurrentIdSubjects, dispatch]);
  useEffect(() => {
    dispatch(getRecipes());
  }, [setCurrentIdRecipes, dispatch]);

  const objects = [{ name: "1" }];
  useEffect(() => {
    setData([
      {
        title: "Subjects",

        form: (
          <FormSubjects
            items={subjects}
            currentIdSubjects={currentIdSubjects}
            setCurrentIdSubjects={setCurrentIdSubjects}
          />
        ),
        component: (
          <DragDropSubjects
            setCurrentIdSubjects={setCurrentIdSubjects}
            subjects={subjects}
            isLogged={isLogged}
            dragStart={dragStart}
            setDragStart={setDragStart}
            remoted={remoted}
            setSubjects={setSubjects}
            setRemoted={setRemoted}
          />
        ),
      },
      {
        title: "MyBag",
        form: null,
        component: (
          <DragDropMyBag
            isLogged={isLogged}
            objects={objects}
            myBag={myBag}
            remoted={remoted}
            setRemoted={setRemoted}
            setMyBag={setMyBag}
            setDragStart={setDragStart}
          />
        ),
      },
      {
        title: "Recipes",
        form: (
          <FormRecipes
            items={recipes}
            currentIdRecipes={currentIdRecipes}
            setCurrentIdRecipes={setCurrentIdRecipes}
          />
        ),
        component: (
          <DragDropRecipes
            dragStart={dragStart}
            setDragStart={setDragStart}
            setCurrentIdRecipes={setCurrentIdRecipes}
            recipes={recipes}
            setRecipes={setRecipes}
            isLogged={isLogged}
            setData={setData}
            setRemoted={setRemoted}
            setMyBag={setMyBag}
            remoted={remoted}
          />
        ),
      },
    ]);
  }, [
    subjects,
    recipes,
    myBag,
    setMyBag,
    currentIdRecipes,
    setCurrentIdRecipes,
    currentIdSubjects,
    setCurrentIdSubjects,
    dragStart,
    setDragStart,
    setSubjects,
    setRecipes,
  ]);

  return (
    <>
      <Container>
        <Row>
          {data.map((value, index) => (
            <Col xs={4} md={4} key={index}>
              <Modal.Dialog>
                {value.form}
                {value.component}
              </Modal.Dialog>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
