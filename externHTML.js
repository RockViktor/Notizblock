function renderRemovedNotesHTML(i, titel, note) {
  return `
    <div class="cardInBasket">
      <div class="titelNoteBox">
        <div class="titleNotes"><b>${titel}</b></div>
        <div>${note}</div>
      </div>
      <div class="btnBox">
        <button class="removedButton" onclick="removedNotes(${i})">-</button>
        <button class="recoverButton" onclick="recoverNotes(${i})">+</button>
      </div>
    </div>
    `;
}
