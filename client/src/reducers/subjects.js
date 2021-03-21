export const subjects = (subjects = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_SUBJECTS":
      return action.payload;
    case "UPDATE_SUBJECT":
      return subjects.map((subject) =>
        subject._id === action.payload._id ? action.payload : subject
      );
    case "DELETE_SUBJECT":
      return subjects.filter((subject) => subject._id !== action.payload);
    case "CREATE_SUBJECT":
      return [...subjects, action.payload];
    default:
      return subjects;
  }
};
