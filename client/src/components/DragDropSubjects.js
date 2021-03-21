import Subjects from "./Subjects";
import React from "react";
import { Container, Modal, Row, Col, Spinner, CardDeck } from "react-bootstrap";

const DragDropSubjects = ({
  isLogged,
  subjects,
  setSubjects,
  remoted,
  setRemoted,
  setCurrentIdSubjects,
}) => {
  const dragEnterHandler = (e) => {
    if (remoted !== null) {
      let rem = remoted[0];

      setSubjects((prev) => {
        let newSubject = [...prev];
        newSubject.splice(0, 0, rem);
        setRemoted(null);
        return setSubjects(newSubject);
      });
    }
  };
  return (
    <>
      <div>
        <Modal.Header>
          <Modal.Title
            onDragEnter={(e) => {
              dragEnterHandler(e);
            }}
          >
            Subjects
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subjects.length === 0 ? (
            <>
              <div>Empty</div>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </>
          ) : (
            <Container>
              <Row>
                {subjects.map((subject, index) => (
                  <Col lg={6} key={index}>
                    <CardDeck>
                      <div
                        className="dragrop"
                        draggable={isLogged}
                        key={index}
                        onDragStart={(e) => {
                          const deleteRecipes = subjects.splice(index, 1);
                          setRemoted(deleteRecipes);
                          setSubjects(
                            subjects.filter(
                              (item) => item.name !== subject.name
                            )
                          );
                        }}
                      >
                        <Subjects
                          subject={subject}
                          setCurrentIdSubjects={setCurrentIdSubjects}
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
export default DragDropSubjects;
