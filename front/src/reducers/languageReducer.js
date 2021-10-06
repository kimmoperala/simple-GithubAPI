const languageReducer = (state = "Suomi", action) => {
  switch (action.type) {
    case "FIN":
      return "Suomi";
    case "ENG":
      return "English";
    case "SWE":
      return "Svenska";
    default:
      return state;
  }
};
export default languageReducer;
