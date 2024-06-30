//функция на получение данных в корзине пользователя, нам нужно получать эти данные и отправлять через set добавки, выбор кофе, что пользователь пропишет для заказа
//для страниц: #7-16, 18-19

import { database, ref, get, child } from "../main.js";

export default function getCart(userUid) {
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userUid}/cart`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const cartData = snapshot.val();
        return cartData;
      } else {
        console.log("No data available in a cart");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error getting cart:", error);
    });
}

/*вызов этой функции:
getCart(userUid);
отправляем uid конкретного пользователя, чтобы получить список его корзины*/
