import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK per gemini-api guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, channelName, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const conversationHistory = Array.isArray(history)
      ? history.slice(-6).map((m: { user: string; text: string }) => `${m.user}: ${m.text}`).join('\n')
      : '';

    const prompt = `Channel: #${channelName || 'Chat'}
Recent conversation:
${conversationHistory}

New message from You (Guest): "${message}"

Reply as an active community member in this Discord server.`;

    const systemInstruction = `You are a real active community member in the "Thattukada" Discord server (a Kerala late-night chai and hangout community).
Pick ONE of the following server members to reply as:
- "neha_plays" (gaming enthusiast, likes valorant and tea, avatarBg: "bg-amber-600")
- "kiran_vibes" (monsoon lover, late-night tea lover, avatarBg: "bg-emerald-600")
- "amal_k" (server host, warm, welcoming, avatarBg: "bg-teal-600")
- "devika_m" (night owl, lofi & acoustic music fan, avatarBg: "bg-purple-600")
- "anand_tunes" (musician, guitarist, avatarBg: "bg-blue-600")
- "fayiz_cam" (photographer, backwaters & rain shots, avatarBg: "bg-rose-600")

Guidelines:
- Reply naturally and authentically in under 20 words like real Discord chat.
- In Malayalam or general channels, use friendly Malayalam / Manglish slang (e.g. "machane", "adipoli", "chaya kudicho?", "scene", "set aanu", "nammal ivide undu"). In English-chat, speak casual English.
- Return a valid JSON object with user, avatarBg, and text.`;

    let text = '';
    // Try fast & reliable gemini-3.1-flash-lite first, then fallback to gemini-3.8-flash
    const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let lastError: unknown = null;

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });
        if (response.text) {
          text = response.text.trim();
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next:`, err);
      }
    }

    if (!text && lastError) {
      throw lastError;
    }

    let parsed: { user: string; avatarBg: string; text: string };
    try {
      parsed = JSON.parse(text);
      if (!parsed.text) throw new Error('No text in JSON');
    } catch {
      parsed = {
        user: 'kiran_vibes',
        avatarBg: 'bg-emerald-600',
        text: 'Machane, welcome! Have some hot kattan chaya ☕',
      };
    }

    return res.json(parsed);
  } catch (err: unknown) {
    console.error('Error generating AI chat response:', err);
    // Authentic fallback replies from community members
    const fallbackResponses = [
      { user: 'kiran_vibes', avatarBg: 'bg-emerald-600', text: 'Machane! Kattan chaya ready aanu ☕ Welcome to the table!' },
      { user: 'amal_k', avatarBg: 'bg-teal-600', text: 'Adipoli! Great to have you hanging out with us here in Thattukada ✨' },
      { user: 'neha_plays', avatarBg: 'bg-amber-600', text: 'Hey there! Jump into the veranda voice lounge if you want to chat 🎙️' },
      { user: 'devika_m', avatarBg: 'bg-purple-600', text: 'Late night vibes are the best here. Hope you are having a peaceful evening 🌧️' },
    ];
    const picked = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return res.json(picked);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
