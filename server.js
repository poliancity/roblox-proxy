const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

async function proxyRoblox(robloxUrl, res) {
  try {
    const response = await fetch(robloxUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(502).json({ error: 'Failed to reach Roblox API' });
  }
}

app.get('/friends/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!/^\d+$/.test(userId)) return res.status(400).json({ error: 'Invalid user ID' });
  await proxyRoblox(`https://friends.roblox.com/v1/users/${userId}/friends`, res);
});

app.get('/friends/:userId/find', async (req, res) => {
  const { userId } = req.params;
  if (!/^\d+$/.test(userId)) return res.status(400).json({ error: 'Invalid user ID' });
  const query = new URLSearchParams(req.query).toString();
  await proxyRoblox(`https://friends.roblox.com/v1/users/${userId}/friends/find?${query}`, res);
});

app.get('/friends/:userId/count', async (req, res) => {
  const { userId } = req.params;
  if (!/^\d+$/.test(userId)) return res.status(400).json({ error: 'Invalid user ID' });
  await proxyRoblox(`https://friends.roblox.com/v1/users/${userId}/friends/count`, res);
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
