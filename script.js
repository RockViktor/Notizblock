'use strict'

let notesTitle = [];
let writingsNotes = [];
let removedNotesTitle = [];
let removedWritingsNotes = [];

async function init() {
    await load();
    await loadDeleteFiles();
    render();
  }

function render(){
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < notesTitle.length; i++) {
        const titel = notesTitle[i];
        const note = writingsNotes[i];

        content.innerHTML += /*html*/ `
            <div class="card">
                <div class="title-notes">
                    <b>${titel}</b>  <br><br>
                </div>
                
                <div> ${note} </div><br>
                <button class="delete-button" onclick="deleteNotes(${i})">-</button>
            </div>
        `;
    }
}

function renderRemovedNotes(){
    let content = document.getElementById('removedContent');
    content.innerHTML = '';

    for (let i = 0; i < removedNotesTitle.length; i++) {
        const titel = removedNotesTitle[i];
        const note = removedWritingsNotes[i];

        content.innerHTML += /*html*/ `
            <div class="card">
                <div class="title-notes">
                    <b>${titel}</b> <br><br>
                </div>
                
                <div>${note}</div> <br>
                <button class="delete-button" onclick="deleteNotes(${i})">-</button>
            </div>
        `;
    }
}

function addNotes(){
    let title = document.getElementById('title');
    let note = document.getElementById('note');

    notesTitle.push(title.value);
    writingsNotes.push(note.value);
    document.getElementById('title').value='';
    document.getElementById('note').value='';
    render();
    save();
}

function deleteNotes(i) {
    removedNotesTitle.push(notesTitle[i]);
    removedWritingsNotes.push(writingsNotes[i]);
    notesTitle.splice(i, 1);
    writingsNotes.splice(i, 1);
    saveDelete();
    save();
    render(); 
}

function saveDelete() {
    let removedNotesTitleAsText = JSON.stringify(removedNotesTitle);
    localStorage.setItem('removedNotesTitleKey', removedNotesTitleAsText);

    let removedWritingsNotesAsText = JSON.stringify(removedWritingsNotes);
    localStorage.setItem('removedNotesKey', removedWritingsNotesAsText);
}

function save() {
    let notesTitleAsText = JSON.stringify(notesTitle);
    localStorage.setItem('notesTitleKey', notesTitleAsText);

    let writingsNotesAsText = JSON.stringify(writingsNotes);
    localStorage.setItem('writingsNotesKey', writingsNotesAsText);
}

function load() {
    let notesTitleAsText = localStorage.getItem('notesTitleKey');
    let writingsNotesAsText = localStorage.getItem('writingsNotesKey');
    if (notesTitleAsText && writingsNotesAsText) {
        notesTitle = JSON.parse(notesTitleAsText);
        writingsNotes = JSON.parse(writingsNotesAsText);
    }
}

function loadDeleteFiles() {
    let removedNotesTitleAsText = localStorage.getItem('removedNotesTitleKey');
    let removedNotesAsText = localStorage.getItem('removedNotesKey');
    if (removedNotesTitleAsText && removedNotesAsText) {
        removedNotesTitle = JSON.parse(removedNotesTitleAsText);
        removedWritingsNotes = JSON.parse(removedNotesAsText);
    }
}

function showInputBox() {
    let input = document.getElementById('note');
    let button = document.getElementById('btnNote');
    input.classList.remove('d-none');
    button.classList.remove('d-none');
}

function binArea(){
    let content = document.getElementById('content');
    let removedContent = document.getElementById('removedContent');
    content.classList.add('d-none');
    removedContent.classList.remove('d-none');
    renderRemovedNotes();
}

function backToNotes(){
    render();
}