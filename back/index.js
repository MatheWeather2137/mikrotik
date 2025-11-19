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
});

app.get("/tool/internet/:serwis/:pakiety", async (req, res) => {
  const m_res = await fetch(`http://${m_host}/rest/ping`, {
    method: "POST",
    body: JSON.stringify({
      address: req.params.serwis,
      count: req.params.pakiety,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Basic YWRtaW46TWF0aTAwNjYx`,
    },
  });
  const json = await m_res.json();
  res.json(json);
});

app.get("/tool/firewall", async (req, res) => {
  const m_res = await fetch(`http://${m_host}/rest/ip/firewall/filter`, {
    headers: {
      Authorization: `Basic YWRtaW46TWF0aTAwNjYx`,
    },
  });
  const json = await m_res.json();
  res.json(json);
});
app.get("/tool/firewall/toggle/:id", async (req, res) => {
  const { id } = req.params;
  const { currentDisabled } = req.body;

  const newDisabled = currentDisabled === "true" ? "false" : "true";

  const m_res = await fetch(`http://${m_host}/rest/ip/firewall/filter/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic YWRtaW46TWF0aTAwNjYx`,
    },
    body: JSON.stringify({
      disabled: newDisabled,
    }),
  });

  const json = await m_res.json();
  res.json(json);
});

app.listen(3000, () => {
  console.log("aplikacja dziala na porcie 3000");
});
