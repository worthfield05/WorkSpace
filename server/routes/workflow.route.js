const { Router } = require("express");
const {
  create,
  list,
  singleWorkflow,
  update,
  remove,
} = require("../controllers/workflow.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const router = Router();
router.route("/").post(isAuthenticated, create).get(isAuthenticated, list);
router
  .route("/:id")
  .get(isAuthenticated, singleWorkflow)
  .put(isAuthenticated, update)
  .delete(isAuthenticated, remove);
module.exports = router;
