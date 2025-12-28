const { z } = require("zod");
const mongoose = require("mongoose");
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid workflow id",
  });

exports.createWorkflowSchema = z.object({});
exports.updateWorkflowSchema = z.object({
  name: z.string().trim().min(1, "Workflow name is required"),
});
exports.workflowIdParamSchema = z.object({
  id: objectId,
});
