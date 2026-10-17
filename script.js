// Each note is { id, text, category, createdAt }, with createdAt kept as readable text.
let notes = [];

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

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

    noteItem.appendChild(noteText);
    noteItem.appendChild(noteCategoryLabel);
    noteItem.appendChild(noteDate);
    noteItem.appendChild(deleteButton);
    notesList.appendChild(noteItem);
  });
};

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const noteText = noteInput.value.trim();

  const note = {
    id: Date.now(),
    text: noteText,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  render();
  noteInput.value = "";
});

// Show the current notes immediately when the page loads.
render();
