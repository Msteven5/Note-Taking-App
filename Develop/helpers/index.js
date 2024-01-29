const noteTitle =document.querySelector('.note-title')
const noteText = document.querySelector('.note-textarea')
// const noteForm = document.querySelector('form')
const saveBtn = document.querySelector('.save-note')
const fs = require('fs')

const saveNote = () => {
saveBtn.addEventListener('click', (event) => {
    event.preventDefault();
  
    fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: noteTitle.value.trim(),
        text: noteText.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => fs.appendFile("db.json", data, (err) =>
    err
      ? console.error(err)
      : console.log(
          `Review for ${newReview.product} has been written to JSON file`
        )))
    .catch((err) => console.error(err));
  })
}

const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};


module.export {
    uuid,
    saveNote
}