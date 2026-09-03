import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 Add your Gemini API Key here
const genAI = new GoogleGenerativeAI("AIzaSyBrmMqT8cZkXOU2jnB3l3qXgdT4mwuyWSg");

// ================================
// ✅ 1. GENERATE QUESTIONS
// ================================
export async function generateQuestions(skills, level) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
You are a professional AI interviewer.

Candidate Skills: ${skills}
Difficulty Level: ${level}

Instructions:
- Beginner → ask basic concept questions
- Intermediate → ask practical and scenario-based questions
- Advanced → ask deep technical and problem-solving questions

Generate 5 interview questions.
Return ONLY questions in numbered format.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Convert text → array
        const questions = text
            .split("\n")
            .filter((q) => q.trim() !== "");

        return questions;

    } catch (error) {
        console.error("Error generating questions:", error);
        return ["Error generating questions"];
    }
}

// ================================
// ✅ 2. EVALUATE ANSWER
// ================================
export async function evaluateAnswer(question, answer) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
You are an AI interviewer.

Question: ${question}
Candidate Answer: ${answer}

Evaluate the answer and provide:

1. Score (out of 10)
2. Strengths
3. Weaknesses
4. Correct/Improved Answer

Keep response clear and structured.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;

    } catch (error) {
        console.error("Error evaluating answer:", error);
        return "Error evaluating answer";
    }
}