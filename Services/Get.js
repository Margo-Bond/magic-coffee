export default class Cafes {
  static async getCafes() {
    try {
      console.log("Fetching cafes...");
      const data = await fetch(
        "https://magic-coffee-878ad-default-rtdb.firebaseio.com/cafes.json"
      );
      const cafes = await data.json();
      console.log("Cafes fetched:", cafes);
      return cafes;
    } catch (err) {
      console.error("Error fetching cafes:", err);
      return err;
    }
  }
}
