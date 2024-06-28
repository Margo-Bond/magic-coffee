//для страниц: #2-4, 6-19

// Функция для получения данных пользователя из Local Storage
export default function getUserData() {
  // Получение данных пользователя из Local Storage
  const userData = localStorage.getItem("user");

  // Проверка наличия данных
  if (userData) {
    // Парсинг данных из JSON и возврат
    return JSON.parse(userData);
  } else {
    // Если данных нет, возвращаем null и выводим сообщение
    console.log("No user data available in Local Storage");
    return null;
  }
}
