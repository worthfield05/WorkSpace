const { Router } = require("express");
const { inngest } = require("../inngest/client");
const router = Router();
router.route("/").get(async (req, res, next) => {
  await inngest
    .send({
      name: "execute/ai",
    })
    .catch((err) => next(err));
  res.json({ message: "job queue!" });
});
module.exports = router;
