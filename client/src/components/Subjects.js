import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteSubject } from "../actions/subjects";

const Subjects = ({ setCurrentIdSubjects, subject }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  return subject ? (
    <Card key={subject._id}>
      <img
        draggable={false}
        variant="top"
        src={subject.image}
        alt=""
        height="50px"
        width="50px"
      />
      <Card.Body>
        <Card.Title>{subject.name}</Card.Title>
      </Card.Body>
      {user ? (
        <Card.Footer>
          <ButtonGroup size="sm" className="mb-2">
            <Button
              onClick={() => setCurrentIdSubjects(subject._id)}
              style={{ color: "white" }}
              size="small"
            >
              {"Edit"}
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => dispatch(deleteSubject(subject._id))}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Card.Footer>
      ) : null}
    </Card>
  ) : null;
};

export default Subjects;
