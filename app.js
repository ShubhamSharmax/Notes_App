let addBtn = document.getElementById("addBtn");
let inpTxt = document.getElementById("inpTxt");
let title = document.getElementById("title")

// Add Notes
addBtn.addEventListener("click", () => {
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
    shownotes();
    inpTxt.value = "";
})

//Show Notes
shownotes = () => {
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
        <div class="card my-2 mx-2" style="width: 18rem;">
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
    if (notesObj.length != 0){
        noteselm.innerHTML = card;
    }
    else{
        noteselm.innerHTML = "No Notes Found";
    }
}

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
    shownotes();
}

//Showing Notes Stored in Local Storage
shownotes();