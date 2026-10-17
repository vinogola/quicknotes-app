# QuickNotes

QuickNotes is a small note-taking app in plain HTML, CSS and JavaScript, with no frameworks. You add a note of up to 200 characters, pick a category, search your notes, and delete the ones you don't need. Everything's saved in the browser's localStorage, so a refresh doesn't wipe it. I built it as Project 1 of the PLP Web Foundations module.

## Features

- Add a note with a category (Personal, Work or Study); each card shows the text, category and the date and time it was created
- Colour-coded left border per category
- Validation: an empty or whitespace-only note, or one over 200 characters, shows an error instead of being added
- Delete any note
- Live count: "You have no notes yet.", "You have 1 note." or "You have N notes."
- Search as you type, not case-sensitive, with "No notes match your search." when nothing matches
- Notes saved to `localStorage` and restored on page load
- Responsive: the form stacks vertically on screens 600px wide or narrower

## Getting started

```bash
git clone https://github.com/vinogola/quicknotes-app.git
cd quicknotes-app
```

Then open `index.html` in a browser (double-click it, or use the VS Code Live Server extension). There's nothing to install or build.

## What I learned

- `render()` clears the list and rebuilds every card from the `notes` array, and add, delete, load and search all just change the data and call it. Cards are built with `createElement` and `textContent`, so a note typed as `<b>hi</b>` shows up as plain text. My first version left the count blank on page load, because `render()` only ran after an add or delete. One extra call at the bottom of the script fixed it.
- My stylesheet colours each note's left border through `category-personal`, `category-work` and `category-study`. I'd only ever seen those colours because I added the classes by hand in DevTools. The cards my script built had just `note`, so every real note looked the same. Building the class name from `note.category` fixed it.
- A single long word with no spaces broke the 400px layout. It spilled out of its card and stretched the page, which left the header at half width. `overflow-wrap: anywhere` on `.note` fixed it.
- I'd assumed an empty first visit would just leave `notes` empty. It doesn't: `localStorage.getItem` returns `null`, and `JSON.parse(null)` returns `null` instead of throwing. Loaded straight into `notes`, that would crash the first `forEach`. So the script only parses when something was saved.
