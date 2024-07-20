import { database, ref, get, remove, set } from "../main.js";

async function moveOrderToHistory(lastOrder, lastKey, userUid) {
  const historyOrderRef = ref(database, `users/${userUid}/orders/history`);
  const ongoingOrderRef = ref(
    database,
    `users/${userUid}/orders/on-going/${lastKey}`
  );

  try {
    const snapshot = await get(historyOrderRef);
    const history = snapshot.exists() ? snapshot.val() : {};
    history[lastOrder.order_time] = lastOrder;

    await set(historyOrderRef, history);
    console.log("Order moved to history successfully.");

    await remove(ongoingOrderRef);
  } catch (error) {
    console.error("Error moving order to history: ", error);
  }
}

function setDeletionTimer(delay, lastOrder, lastKey, userUid) {
  setTimeout(async () => {
    await moveOrderToHistory(lastOrder, lastKey, userUid);
    let order = JSON.parse(localStorage.getItem("order")) || {};
    delete order[lastKey];
    localStorage.setItem("order", JSON.stringify(order));
    console.log("Order removed after specified time.");
  }, delay);
}

async function checkAndRestoreTimers() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userUid = user ? user.uid : null;

  if (!userUid) return;

  const ordersRef = ref(database, `users/${userUid}/orders/on-going`);
  const snapshot = await get(ordersRef);
  if (snapshot.exists()) {
    const ongoingOrders = snapshot.val();
    const now = Date.now();

    for (const key in ongoingOrders) {
      const order = ongoingOrders[key];
      if (order.delete_at && order.delete_at <= now) {
        await moveOrderToHistory(order, key, userUid);
      } else if (order.delete_at) {
        setDeletionTimer(order.delete_at - now, order, key, userUid);
      }
    }
  }
}

// Автоматически проверять и восстанавливать таймеры при загрузке модуля
document.addEventListener("DOMContentLoaded", checkAndRestoreTimers);

export default {
  checkAndRestoreTimers,
  moveOrderToHistory,
  setDeletionTimer,
};
