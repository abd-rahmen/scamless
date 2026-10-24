import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { heuristicAnalyzeMessage } from "./src/lib/messageEngine";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
  const model = env.GEMINI_MODEL || process.env.GEMINI_MODEL || "gemini-1.5-flash";

  return {
    plugins: [
      react(),
      {
        name: "scamless-api-middleware",
        configureServer(server) {
          server.middlewares.use("/api/analyze", async (req, res) => {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }

            let rawBody = "";
            req.on("data", (chunk) => {
              rawBody += chunk;
            });

            req.on("end", async () => {
              res.setHeader("Content-Type", "application/json; charset=utf-8");
              try {
                const parsed = JSON.parse(rawBody || "{}");
                const message = parsed.message;

                if (!message || typeof message !== "string" || !message.trim()) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: "Message is required" }));
                  return;
                }

                // If no Gemini key is provided, execute heuristic engine
                if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.trim() === "") {
                  const fallbackResult = heuristicAnalyzeMessage(message);
                  res.end(
                    JSON.stringify({
                      ...fallbackResult,
                      engineNotice: "Analyzed via Scamless Heuristic Rule Engine (Configure GEMINI_API_KEY for Gemini AI)",
                    })
                  );
                  return;
                }

                // Gemini API Call
                const prompt = `You are Scamless, a defensive cybersecurity anti-phishing assistant.
Analyze this message (SMS, WhatsApp, email) for social engineering manipulation:
- Artificial urgency (threat of account closure, deadline)
- Fear / intimidation (fines, court, police, bank freeze)
- Reward bait (lottery win, cash recharge, prize)
- Fake authority (Tunisian bank, La Poste Tunisienne, Telecom, police, judge)
- Credential harvesting (requests for OTP, SMS code, card numbers, passwords, money transfer)

Text to analyze:
"""
${message}
"""

Respond ONLY in valid raw JSON with this exact schema (no markdown fences, no extra text):
{
  "verdict": "safe" | "suspicious" | "scam",
  "score": number,
  "language": "ar" | "fr" | "en",
  "summary": "Concise 1-sentence verdict in the message language",
  "redFlags": ["exact phrase 1 from message", "exact phrase 2"],
  "tacticsDetected": [
    {
      "tactic": "urgency" | "fear" | "reward_bait" | "fake_authority" | "credential_harvesting",
      "label": "Short label in message language",
      "description": "Explanation of how this tactic manipulates the victim"
    }
  ],
  "explanation": "Clear explanation of why this message is safe or dangerous in the message language",
  "actionPlan": [
    "Step 1 to take right now",
    "Step 2 to take right now"
  ]
}`;

                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

                const aiResponse = await fetch(geminiUrl, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    contents: [
                      {
                        role: "user",
                        parts: [{ text: prompt }],
                      },
                    ],
                    generationConfig: {
                      temperature: 0.1,
                      responseMimeType: "application/json",
                    },
                  }),
                });

                if (!aiResponse.ok) {
                  const fallbackResult = heuristicAnalyzeMessage(message);
                  res.end(
                    JSON.stringify({
                      ...fallbackResult,
                      engineNotice: `Gemini API fallback (HTTP ${aiResponse.status}). Heuristic engine engaged.`,
                    })
                  );
                  return;
                }

                const data = await aiResponse.json();
                let candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

                if (candidateText.startsWith("```json")) {
                  candidateText = candidateText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
                } else if (candidateText.startsWith("```")) {
                  candidateText = candidateText.replace(/^```\s*/, "").replace(/\s*```$/, "");
                }

                const parsedAi = JSON.parse(candidateText.trim());
                res.end(
                  JSON.stringify({
                    ...parsedAi,
                    isAiPowered: true,
                    engineNotice: `Powered by Google Gemini (${model})`,
                  })
                );
              } catch (err) {
                console.warn("Analysis fallback engaged:", err);
                const fallbackResult = heuristicAnalyzeMessage(rawBody || "");
                res.end(JSON.stringify(fallbackResult));
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
  };
});
