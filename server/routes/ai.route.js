const { Router } = require("express");
const { google, createGoogleGenerativeAI } = require("@ai-sdk/google");
const { generateText } = require("ai");

// const google = createGoogleGenerativeAI({
//   // custom settings
//   apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
// });
const router = Router();
router.route("/").get(async (req, res, next) => {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });
  return res.send(text);
});
module.exports = router;
