//export default class Users {
//  fetch('https://magic-coffee-878ad-default-rtdb.firebaseio.com/');
//  static async getUsers() {}
//}

export default class Users {
  static async getUsers() {
    try {
      const users = await fetch(
        "https://magic-coffee-878ad-default-rtdb.firebaseio.com/users"
      );
      const data = await users.json();
      return data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
