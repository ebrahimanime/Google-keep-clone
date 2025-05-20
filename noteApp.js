const addTitle = document.getElementById("addTitle");
const addText = document.getElementById("addText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const archiveContainer = document.getElementById("archiveContainer");

let notes = [];
let archive = [];

addNoteBtn.addEventListener("click", () => {
  const title = addTitle.value.trim();
  const text = addText.value.trim();

  if (!title || !text) {
    alert("Please enter a title and some text.");
    return;
  }

  const note = { title, text };
  notes.push(note);
  addTitle.value = "";
  addText.value = "";

  renderNotes();
});

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.text}</p>
      <div class="note-buttons">
        <button onclick="archiveNote(${index})">Archive</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    notesContainer.appendChild(noteEl);
  });

  renderArchived();
}

function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
}

function archiveNote(index) {
  archive.push(notes[index]);
  notes.splice(index, 1);
  renderNotes();
}

function renderArchived() {
  archiveContainer.innerHTML = "";
  archive.forEach((note, index) => {
    const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.text}</p>
      <div class="note-buttons">
        <button onclick="unarchiveNote(${index})">Unarchive</button>
      </div>
    `;
    archiveContainer.appendChild(noteEl);
  });
}

function unarchiveNote(index) {
  notes.push(archive[index]);
  archive.splice(index, 1);
  renderNotes();
}
