const errorController = (err, req, res, next) => {
  try {
    console.log("congrats you hit the error middleware");
    if (err.name === "ValidationError")
      return (err = handleValidationError(err, res));
    if (err.code && err.code == 11000)
      console.log("ValidationError")
  } catch (err) {
    res.status(500).send("An unknown error occurred.");
  }
};

module.exports = errorController