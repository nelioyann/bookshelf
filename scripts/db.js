console.log("db lauched");

const db = firebase.firestore();
// offline data
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    // multiple tabs open at once
    console.log("persistence failed");
  } else if (err.code == "unimplemented") {
    console.log("persistence is not available");
  }
});

// real time listener
db.collection("users").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      render_document(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      // remove the document from the page
      remove_document(change.doc.id);
    }
  });
});

const delete_document = (e) => {
  let id = e.target.getAttribute("data-id");
  db.collection("users").doc(id).delete();
};

const add_document = (data, id) => {
  id = id ? id : `word${Date.now()}`;
  db.collection("users")
    .doc(id)
    .set(data)
    .then(() => afficherFeedback("Token sent to server"))
    .catch((error) => console.log(error));
};

// const users = document.querySelector(".users");
const render_document = (document, id) => {
  //   console.log(document, id);
  return null;
  //   users.innerHTML = `<li>${document.fcm}</li>` + users.innerHTML
};
const remove_document = (id) => {
  console.log(id);
};
