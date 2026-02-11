const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // 👈 加这一行

app.post('/exhub', async (req, res) => {
  const { token, cookie, body } = req.body;

  try {
    const response = await axios.post(
      'https://api.exhub.pro/api/agent/accounts',
      body,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: token,
          "content-type": "application/json",
          cookie: `CF_Authorization=${cookie}`
        },
        timeout: 10000  
      }
    );
    res.json(response.data);
  } catch (e) {
    res.status(500).json({
      error: e.response?.data || e.message
    });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('🚀 代理服务运行在 0.0.0.0:3000');
});
