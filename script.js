"use strict";

let notesTitle = [];
let writingsNotes = [];
let removedNotesTitle = [];
let removedWritingsNotes = [];

/**
 * Load storage in to array.
 * Render notes content.
 */
async function init() {
  await load();
  await loadDeleteFiles();
  render();
}

/**
 *  Render notes content.
 */
function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < notesTitle.length; i++) {
    const titel = notesTitle[i];
    const note = writingsNotes[i];

    content.innerHTML += /*html*/ `
            <div class="card">
                <div class="title-notes">
                    <b>${titel}</b>  <br><br>
                </div>
                
                <div> ${note} </div><br>
                <button class="deleteButton" onclick="deleteNotes(${i})">-</button>
            </div>
        `;
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

    content.innerHTML += /*html*/ `
            <div class="cardInBasket">
                <div class="title-notes">
                    <b>${titel}</b> <br><br>
                </div>
                
                <div>${note}</div>
                <div class="btnBox">
                <button class="removedButton" onclick="removedNotes(${i})">-</button>
                <button class="recoverButton" onclick="recoverNotes(${i})">+</button>
                </div>
                
            </div>
        `;
  }
}

function recoverNotes(i) {
  notesTitle.push(removedNotesTitle[i]);
  writingsNotes.push(removedWritingsNotes[i]);
  removedNotesTitle.splice(i, 1);
  removedWritingsNotes.splice(i, 1);
  saveDelete();
  save();
  renderRemovedNotes();
}

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
  render();
  save();
}

/**
 *
 * @param {Currently index of delete notes} i
 */
function deleteNotes(i) {
  removedNotesTitle.push(notesTitle[i]);
  removedWritingsNotes.push(writingsNotes[i]);
  notesTitle.splice(i, 1);
  writingsNotes.splice(i, 1);
  saveDelete();
  save();
  render();
}

/**
 *  Save delete notes in to storage.
 */
function saveDelete() {
  let removedNotesTitleAsText = JSON.stringify(removedNotesTitle);
  localStorage.setItem("removedNotesTitleKey", removedNotesTitleAsText);

  let removedWritingsNotesAsText = JSON.stringify(removedWritingsNotes);
  localStorage.setItem("removedNotesKey", removedWritingsNotesAsText);
}

/**
 *  Save notes in to storage.
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
  input.classList.remove("d-none");
  button.classList.remove("d-none");
}

/**
 * Remove note content and add trash content.
 */
function binArea() {
  let content = document.getElementById("content");
  let removedContent = document.getElementById("removedContent");
  content.classList.add("d-none");
  removedContent.classList.remove("d-none");
  renderRemovedNotes();
}

/**
 * Remove trash content and add note content.
 */
function backToNotes() {
  let content = document.getElementById("content");
  let removedContent = document.getElementById("removedContent");
  content.classList.remove("d-none");
  removedContent.classList.add("d-none");
  render();
}
