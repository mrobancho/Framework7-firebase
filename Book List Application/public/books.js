import 'https://cdnjs.cloudflare.com/ajax/libs/framework7/5.7.10/js/framework7.bundle.js';
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-database.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.1/firebase-auth.min.js";
import app from "./F7App.js";

const $$ = Dom7;

$$("#tab2").on("tab:show", () => {
    //put in firebase ref here
    const sUser = firebase.auth().currentUser.uid;
    firebase.database().ref("books/" + sUser).on("value", (snapshot) =>{
        const oItems = snapshot.val();
        $$("#bookList").html("");
        Object.keys(oItems).forEach(key => {
            let sCard = `
            <div class="card">
            `
            if(oItems[key].datePurchased){
                sCard += `
                <strike><h2>${oItems[key].title}</h2></strike>
                <p>${oItems[key].author}</p>
                `
                sCard += `<p><b>Date of Purchased:</b> ${oItems[key].datePurchased}</p>`
            }            
            else{
                sCard += `
                <h2>${oItems[key].title}</h2>
                <p>${oItems[key].author}</p>
                `
            }
            sCard += `
                <img src="${oItems[key].featured_image}" alt="">
                <button class="button button-active" onclick="boughtBook('${key}')")>I bought this</a>
                <button class="button" onclick="deleteBook('${key}')">I don't need this</button>
            </div>
            `
            $$("#bookList").append(sCard);
          });
    });

});

export function deleteItem(key){
    const sUser = firebase.auth().currentUser.uid;
    firebase.database().ref("books/" + sUser + "/" + key).remove();
}

export function updateItem(key){
    const sUser = firebase.auth().currentUser.uid;
    alert("books/" + sUser + "/" + key + "/datePurchased");
    firebase.database().ref("books/" + sUser + "/" + key + "/datePurchased").set(new Date().toString());
    ///books/VqoV8KC8gIQ7T9gGqaAUWK7btY33/2022-04-19T20:22:00_289Z
}

$$(".my-sheet").on("submit", e => {
    //submitting a new note
    e.preventDefault();
    const oData = app.form.convertToData("#addItem");
    const sUser = firebase.auth().currentUser.uid;
    const sId = new Date().toISOString().replace(".", "_");
    firebase.database().ref("books/" + sUser + "/" + sId).set(oData);
    app.sheet.close(".my-sheet", true);
});