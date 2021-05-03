const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser');
const { json } = require('express');

const PORT = process.env.PORT || 3001

// var usersobj = {users: __dirname + './public'};

app.use(bodyparser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.get('/notes', (req, res) => res.sendFile(`${__dirname}/public/notes.html`));

app.get('/api/notes', (req, res) => {
    console.log('/api/notesget')
    let json = getJson();
    console.log(json);
    res.json(json);
})

app.post('/api/notespost', (req, res) => {
    console.log('/api/notespost')
    // let json = getJson();
    console.log(req.body);
    addNoteToJSON(req.body)
    res.json(getJson());
})

app.delete('/api/notes/:id', (req, res) => {
    console.log('/api/notes/:iddelete')
    deleteNotesFromJSON(req.params.id);
    res.json(getJson());
})

app.listen(PORT, () => console.log(`Express HTTP server is listening on port: ${PORT}`))

function getJson() {
    let data = fs.readFileSync(__dirname + 'db/db.json');
    let json = JSON.parse(data);
    // console.log('got the data');
    return json;
}

function createNoteObject(data) {
    let obj = {title: data.title,
               text: data.text,
               complete: false,
               hidden: false}
    return json;           
}

function addNoteToJSON(note) {
    let json = getJson();
    let newNote = createNoteObject(note);
    json.push(newNote);
    saveJSON(json);
}

function saveJSON(jsonData) {
    let data = JSON.stringify(jsonData);
    fs.writeFileSync(__dirname + '/db/db.json', data);
}

function deleteNoteFromJSON(id) {
    let json = getJson();
    json(id).hide = true
    save.JSON(json);
}

