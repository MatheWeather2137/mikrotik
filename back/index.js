const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const m_host = "172.16.15.196";
const m_user = "admin";
const m_pass = "Mati00661";

app.get("/status", async (req, res) => {
  const m_res = await fetch(`http://${m_host}/rest/system/resource`, {
    headers: {
      Authorization: `Basic YWRtaW46TWF0aTAwNjYx`,
    },
  });
  const json = await m_res.json();
  res.json(json);
  console.log(json);
});

app.listen(3000, () => {
  console.log("aplikacja dziala na porcie 3000");
});
