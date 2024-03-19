let notesTitle = [];
let writingsNotes = [];
let removedNotesTitle = [];
let removedWritingsNotes = [];

/**
 * The note that the user wants to change.
 * @param {Currently note} i
 */
function editNotes(i) {
  let title = document.getElementById("title");
  let note = document.getElementById("note");
  title.value = notesTitle[i];
  note.value = writingsNotes[i];

  let addButton = document.getElementById("btnNote");
  addButton.innerText = "+";
  addButton.onclick = function () {
    updateNotes(i);
  };
}

/**
 * Save the note you want to change.
 */
function updateNotes() {
  let title = document.getElementById("title");
  let note = document.getElementById("note");
  notesTitle[i] = title.value;
  writingsNotes[i] = note.value;

  let addButton = document.getElementById("btnNote");
  addButton.innerText = "+";
  addButton.onclick = addNotes;

  title.value = "";
  note.value = "";
  renderNotes();
  save();
}

/**
 * Load storage in to array.
 * Render notes content.
 */
async function init() {
  await includeHTML();
  await load();
  await loadDeleteFiles();
  renderNotes();
}

/**
 * Render notes content.
 */
function renderNotes() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < notesTitle.length; i++) {
    const titel = notesTitle[i];
    const note = writingsNotes[i];

    content.innerHTML += renderNotesHTML(titel, note, i);
  }
}

/**
 * Render removed notes content.
 */
function renderRemovedNotes() {
  let content = document.getElementById("removedContent");
  content.innerHTML = "";

  for (let i = 0; i < removedNotesTitle.length; i++) {
    const titel = removedNotesTitle[i];
    const note = removedWritingsNotes[i];

    content.innerHTML += renderRemovedNotesHTML(i, titel, note);
  }
}

/**
 * Recover the note from the Trash.
 * @param {Currently index of recover notes}} i
 */
function recoverNotes(i) {
  notesTitle.push(removedNotesTitle[i]);
  writingsNotes.push(removedWritingsNotes[i]);
  removedNotesTitle.splice(i, 1);
  removedWritingsNotes.splice(i, 1);
  saveDelete();
  save();
  renderRemovedNotes();
}

/**
 * Move the note to the trash.
 * @param {Currently index of remove notes}} i
 */
function removedNotes(i) {
  removedNotesTitle.splice(i, 1);
  removedWritingsNotes.splice(i, 1);
  saveDelete();
  renderRemovedNotes();
}

/**
 * Push currently notes in to array.
 */
function addNotes() {
  let title = document.getElementById("title");
  let note = document.getElementById("note");

  notesTitle.push(title.value);
  writingsNotes.push(note.value);
  document.getElementById("title").value = "";
  document.getElementById("note").value = "";
  renderNotes();
  save();
}

/**
 * Permanently delete the note.
 * @param {Currently index of delete notes} i
 */
function deleteNotes(i) {
  removedNotesTitle.push(notesTitle[i]);
  removedWritingsNotes.push(writingsNotes[i]);
  notesTitle.splice(i, 1);
  writingsNotes.splice(i, 1);
  saveDelete();
  save();
  renderNotes();
}

/**
 * Save delete notes in to storage.
 */
function saveDelete() {
  let removedNotesTitleAsText = JSON.stringify(removedNotesTitle);
  localStorage.setItem("removedNotesTitleKey", removedNotesTitleAsText);

  let removedWritingsNotesAsText = JSON.stringify(removedWritingsNotes);
  localStorage.setItem("removedNotesKey", removedWritingsNotesAsText);
}

/**
 * Save notes in to storage.
 */
function save() {
  let notesTitleAsText = JSON.stringify(notesTitle);
  localStorage.setItem("notesTitleKey", notesTitleAsText);

  let writingsNotesAsText = JSON.stringify(writingsNotes);
  localStorage.setItem("writingsNotesKey", writingsNotesAsText);
}

/**
 * Load notes from localstorage in to array.
 */
function load() {
  let notesTitleAsText = localStorage.getItem("notesTitleKey");
  let writingsNotesAsText = localStorage.getItem("writingsNotesKey");
  if (notesTitleAsText && writingsNotesAsText) {
    notesTitle = JSON.parse(notesTitleAsText);
    writingsNotes = JSON.parse(writingsNotesAsText);
  }
}

/**
 * Load trash notes from storage in to array.
 */
function loadDeleteFiles() {
  let removedNotesTitleAsText = localStorage.getItem("removedNotesTitleKey");
  let removedNotesAsText = localStorage.getItem("removedNotesKey");
  if (removedNotesTitleAsText && removedNotesAsText) {
    removedNotesTitle = JSON.parse(removedNotesTitleAsText);
    removedWritingsNotes = JSON.parse(removedNotesAsText);
  }
}

/**
 * If you click input, show text-area.
 */
function showInputBox() {
  let input = document.getElementById("note");
  let button = document.getElementById("btnNote");
  input.classList.remove("dNone");
  button.classList.remove("dNone");
}

/**
 * Remove note content and add trash content.
 */
function binArea() {
  let content = document.getElementById("content");
  let removedContent = document.getElementById("removedContent");
  content.classList.add("dNone");
  removedContent.classList.remove("dNone");
  renderRemovedNotes();
}

/**
 * Remove trash content and add note content.
 */
function backToNotes() {
  let content = document.getElementById("content");
  let removedContent = document.getElementById("removedContent");
  content.classList.remove("dNone");
  removedContent.classList.add("dNone");
  renderNotes();
}
