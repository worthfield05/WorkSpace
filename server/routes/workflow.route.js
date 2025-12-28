const { Router } = require("express");
const {
  create,
  list,
  singleWorkflow,
  update,
  remove,
} = require("../controllers/workflow.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate");
const {
  workflowIdParamSchema,
  updateWorkflowSchema,
} = require("../schemas/workflow.schema");
const router = Router();
router.route("/").post(isAuthenticated, create).get(isAuthenticated, list);
router
  .route("/:id")
  .get(
    isAuthenticated,
    validate(workflowIdParamSchema, "params"),
    singleWorkflow
  )
  .put(
    isAuthenticated,
    validate(workflowIdParamSchema, "params"),
    validate(updateWorkflowSchema),
    update
  )
  .delete(
    isAuthenticated,

    validate(workflowIdParamSchema, "params"),
    remove
  );
module.exports = router;
