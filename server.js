const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/friends/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!/^\d+$/.test(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const response = await fetch(
      `https://friends.roblox.com/v1/users/${userId}/friends`
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to reach Roblox API' });
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));