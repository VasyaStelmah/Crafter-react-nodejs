import MyBag from "./MyBag";
import React from "react";
import { Container, Modal, Row, Col, Spinner, CardDeck } from "react-bootstrap";

const DragDropMyBag = ({ isLogged, remoted, setRemoted, setMyBag, myBag }) => {
  const dragEnterHandler = (e) => {
    if (remoted !== null) {
      let rem = remoted[0];
      setMyBag((prev) => {
        let newMyBag = [...prev];
        newMyBag.splice(0, 0, rem);
        setRemoted(null);
        return setMyBag(newMyBag);
      });
    }
  };
  let items = [];
  for (let item of myBag) {
    if (item.name) {
      items.push(item.name);
    }
  }
  let itemsName = [];
  myBag.map((c) => {
    if (c.subjects) {
      c.subjects.map((c1) => {
        itemsName.push(c1);
      });
    }
  });
  let equals = [];
  for (let index = 0; index < items.length; index++) {
    const element1 = items[index];
    for (let index = 0; index < itemsName.length; index++) {
      let element2 = itemsName[index];
      if (element1 === element2) {
        equals.push(element1);
      }
    }
  }
  let includesSubjectsField = myBag.map((c) => {
    if ("subjects" in c) {
      for (let index = 0; index < c.subjects.length; index++) {
        const elementSubjects = c.subjects[index];
        for (let index = 0; index < equals.length; index++) {
          const elementEquals = equals[index];
          if (elementSubjects === elementEquals) {
            return true;
          }
          return false;
        }
      }
    }
    return false;
  });

  for (let index = 0; index < myBag.length; index++) {
    const element = myBag[index];
  }
  return (
    <div>
      <Modal.Header>
        <Modal.Title
          onDragLeave={(e) => {
            dragEnterHandler(e);
          }}
        >
          myBag
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {myBag.length === 0 ? (
          <>
            <div>Empty</div>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </>
        ) : (
          <Container>
            <Row>
              {myBag.map((object, index) => (
                <Col lg={6} key={index}>
                  <CardDeck>
                    <div
                      key={index}
                      className="dragrop"
                      draggable={isLogged}
                      onDragStart={(e) => {
                        const deleteRecipes = myBag.splice(index, 1);
                        setRemoted(deleteRecipes);
                        setMyBag(
                          myBag.filter((item) => item.name !== object.name)
                        );
                      }}
                    >
                      <MyBag object={object} index={index} />
                    </div>
                  </CardDeck>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Modal.Body>
    </div>
  );
};
export default DragDropMyBag;
