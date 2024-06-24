import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase_config";
import { getDatabase, ref, runTransaction, set } from "firebase/database";


import { btn } from "./vars";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const form = document.querySelector('form');
const inputName = form.Name;
const inputEmail = form.Email;


function save() {
  const nameValue = inputName.value;
  const emailValue = inputEmail.value;
  const countRef = ref(database, 'userCount');

  runTransaction(countRef, (currentCount) => {
    if (currentCount === null) {
      return 1;
    } else {
      return Number(currentCount) + 1;
    }
  })
    .then((result) => {
      if (result.committed) {
        const newUserCount = result.snapshot.val();
        const userId = User${newUserCount};

        const userRef = ref(database, 'users/' + userId);

        set(userRef, {
          name: nameValue,
          email: emailValue
        })
          .then((data) => {
            console.log('data created')
          })
          .catch((error) => {
            console.log('Error');
          })
      } else {
        console.log('Transaction wasnt committed');
      }
    })
    .catch((error) => {
      console.log('error');
    })
}


btn.addEventListener('click', (e) => {
  e.preventDefault();
  save();
});