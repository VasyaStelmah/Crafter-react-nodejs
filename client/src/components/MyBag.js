import React from "react";
import { Card } from "react-bootstrap";

const MyBag = ({ object }) => {
  return object ? (
    <Card key={object._id}>
      <img
        draggable={false}
        variant="top"
        src={object.image}
        alt=""
        height="50px"
        width="50px"
      />
      <Card.Body>
        <Card.Title>{object.name}</Card.Title>

        {object.subject?.length !== 0 || object.subject?.length !== undefined
          ? object?.subjects?.map((s, index) => (
              <Card.Text key={index}>
                Consist of: {index + 1} {s}
              </Card.Text>
            ))
          : null}
      </Card.Body>
    </Card>
  ) : null;
};
export default MyBag;
