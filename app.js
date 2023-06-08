console.log("Welcome to Swift Notes");
let addBtn = document.getElementById("addBtn");

//Show Notes
showNotes = () => {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let card = "";
    notesObj.forEach((elem, index) => {
        console.log
        card += `
        <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${elem.title}</h5>
        <hr>
        <p class="card-text">${elem.value}</p>
        <button class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
        </div>
        </div>
        `;
    });
    let noteselm = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteselm.innerHTML = card;
    }
    else {
        noteselm.innerHTML = "No Notes Found";
    }
}
showNotes();

// Add Notes
addBtn.addEventListener("click", () => {
    let inpTxt = document.getElementById("inpTxt");
    let title = document.getElementById("title");

    if (inpTxt.value !== "") {

        if (title.value === "") {
            title.value = "Untitled"
        }

        notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        let noteTitle = title.value;
        let noteValue = inpTxt.value;
        let myNote = { title: noteTitle, value: noteValue }

        notesObj.push(myNote);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        console.log(notesObj);
        noteAlert("success", "SUCCESS", "Your note was added successfully");
        showNotes();
        inpTxt.value = "";
        title.value = "";
    } else {
        noteAlert("warning", "CAUTION", "Make Sure to fill the note Field before proceeding");
    }
})

//Delete Notes
deleteNote = (index) => {
    console.log(`note ${index + 1} Deleted`);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    noteAlert("danger", "DELETED", "Note Has been successfully deleted");
}

//Alerts
noteAlert = (type, value, message) => {
    let alerts = document.getElementById("alerts");
    let alertBody = "";

    alertBody =
    `<div class="alert alert-${type} mb-1" role="alert">
        <strong>${value}!!</strong>  ${message}.
    </div>`

    alerts.innerHTML = alertBody;

    setTimeout(() => {
        alerts.innerHTML = "";
    }, 2000);
}

//Search Notes
searchNote = () => {
    let searchValue = search.value.toLowerCase();
    console.log(searchValue);

    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach((element) => {

        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTitle.includes(searchValue) || cardText.includes(searchValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        console.log(cardText);
    });
}

let search = document.getElementById("search");
search.addEventListener("input", searchNote); 