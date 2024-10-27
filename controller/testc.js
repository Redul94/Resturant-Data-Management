const testController = (req, res) => {
  try {
    res.status(200).send("Api called");
  } catch (er) {
    console.log("Api called failed", er);
  }
};
module.exports = testController;