// Each note is { id, text, category, createdAt }, with createdAt kept as readable text.
// `let` because loading saved notes and deleteNote both reassign the array.
let notes = [];

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");

const savedNotes = localStorage.getItem("notes");
if (savedNotes) notes = JSON.parse(savedNotes);

const render = () => {
  // Clear stale cards first so the list always matches the current notes array.
  notesList.replaceChildren();

  notes.forEach((note) => {
    const noteItem = document.createElement("li");
    noteItem.classList.add("note", `category-${note.category}`);

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const noteCategoryLabel = document.createElement("span");
    noteCategoryLabel.classList.add("note-category");
    noteCategoryLabel.textContent = `Category: ${note.category}`;

    const noteDate = document.createElement("span");
    noteDate.classList.add("note-date");
    noteDate.textContent = `Created At: ${note.createdAt}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    noteItem.appendChild(noteText);
    noteItem.appendChild(noteCategoryLabel);
    noteItem.appendChild(noteDate);
    noteItem.appendChild(deleteButton);
    notesList.appendChild(noteItem);
  });

  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
};

const saveNotesToLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Ignore surrounding whitespace so whitespace-only input counts as empty.
  const noteText = noteInput.value.trim();
  if (noteText === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  } else if (noteText.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  const note = {
    id: Date.now(),
    text: noteText,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  render();
  noteInput.value = "";
  errorMessage.textContent = "";

  saveNotesToLocalStorage();
});

const deleteNote = (noteId) => {
  notes = notes.filter((note) => note.id !== noteId);
  render();

  saveNotesToLocalStorage();
};

// Show the current notes and count immediately when the page loads.
render();
