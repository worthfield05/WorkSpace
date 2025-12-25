const { inngest } = require("./client");
const { createGoogleGenerativeAI } = require("@ai-sdk/google");
const { generateText } = require("ai");

const google = createGoogleGenerativeAI();
const executeAI = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant",
      prompt: "what is 2 + 2 ?",
    });
    return steps;
  }
);
module.exports = { functions: [executeAI] };
