import { onRequest } from "firebase-functions/v2/https";
import fetch from "node-fetch";
import cors from "cors";
const corsHandler = cors({ origin: true });

// Функция для обработки запросов и решения проблемы с CORS
export const getFirebaseConfig = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=AIzaSyBvgHN-lMUXTVVCjD_o2BFfJR8gZyBTq0w"
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ошибка при получении данных из Firebase" });
    }
  });
});

// Пример функции для логирования
export const helloWorld = onRequest((request, response) => {
  console.log("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
