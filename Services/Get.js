export default class Users {
  static async getUsers() {
    try {
      const data = await fetch(
        "https://magic-coffee-878ad-default-rtdb.firebaseio.com/"
      );
      const users = await data.json(users);
      return users;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
