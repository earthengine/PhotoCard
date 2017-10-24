'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(fileUpload());

app.get('/', (req, res) => {
    res.render('index', {title: 'Upload image'});
});

app.post('/post', (req, res) => {
    console.log('Comment: ' + req.body.comment);
    var dir = "./upload";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(path.join(dir,req.files.image.name), req.files.image.data, (err) => {
        if (err) {
            res.render("message", {message: JSON.stringify(err), comment: req.body.comment});
        } else {
            res.render('message', {message: 'File saved.', comment: req.body.comment});
        }
    });    
});

if (module === require.main) {
    const server = app.listen(process.env.PORT || 80, () => {
        const port = server.address().port;
        console.log(`App listening on port ${port}`);
    })
}