const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClint, Payloand } = require("dialogflow-fulfillment");
const port = 4000;

//create sever
const app = express();

//middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome, this is a webhook for Line Chatbot</h1>");
});

app.post("/webhook", (req, res) => {
  //create webhook client
  const agent = new WebhookClint({
    request: req,
    response: res,
  });
  console.log("Dialogflow Request headers: " + JSON.stringify(request.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function bodyMassIndex(agent) {
    let weight = agent.parameters.weight;
    let height = agent.parameters.height / 100;
    let bmi = (weight / (height * height)).toFixed(2);
    let result = "ขออภัย หนูไม่เข้าใจ";

    if (bmi < 18.5) {
      result = "คุณผอมไป กินข้าวบ้างนะ";
    } else if (bmi >= 18.5 && bmi <= 22.9) {
      result = "คุณหุ่นดีจุงเบย";
    } else if (bmi >= 23 && bmi <= 24.9) {
      result = "คุณเริ่มจะท้วมแล้วนะ";
    } else if ((bmi >= 25.8) & (bmi <= 29.9)) {
      result = "คุณอ้วนละ ออกกำลังกายหน่อยนะ";
    } else if (bmi > 30) {
      result = "คุณอ้วนเกินไปละ ออกกําลังกายเหอะ";
    }
    const fliexMessage = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://lh3.googleusercontent.com/proxy/zzlo6uR-Sn3i_INjgmmLnFMxTdnw713WhBDRcZbz1heMVPmqpnOlFPQgiwt_U1li9ZniF0K-VsH61q3ApIGpUJiWGjPnG8q3cDlXEo6S1lQ",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            uri: "https://line.me/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "น้ำหนักส่วนสูงคุณ",
              weight: "bold",
              size: "xl",
            },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "น้ำหนักคุณ 110",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "ส่วนสูงคุณ 165",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "BMI:38.5",
                      size: "xxl",
                    },
                  ],
                },
              ],
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "link",
              height: "sm",
              action: {
                type: "uri",
                label: "ดูเพิ่มเติม",
                uri: "https://line.me/",
              },
            },
            {
              type: "box",
              layout: "vertical",
              contents: [],
              margin: "sm",
            },
          ],
          flex: 0,
        },
      },
    };

    let Payloand = new playloand("LINE", fliexMessage, { sendAsMessage: true });
    //agent.add(result);
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);

  intentMap.set("BMI - custom - yes", bodyMassIndex);

  agent.handleRequest(intentMap);
});
app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
