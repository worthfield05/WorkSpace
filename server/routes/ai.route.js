const { Router } = require("express");
const { google } = require("@ai-sdk/google");
const { generateText } = require("ai");

const router = Router();
router.route("/").get(async (req, res, next) => {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });
  return res.send(text);
});
module.exports = router;
