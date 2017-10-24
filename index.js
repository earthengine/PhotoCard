'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(fileUpload());
app.use(express.static('./'));

app.get('/', (req, res) => {
    res.render('index', {title: 'Upload image'});
});

app.get('/youtube', (req,res) => {
    res.render('youtube',{videos:['E9lNI5vX_p8', 'jS4Z--kVtgo']});
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

app.get('/uploaded', (req, res) => {
    var fl = fs.readdirSync("./upload");
    res.render('uploaded',{imgs: fl})
    res.end();
})

if (module === require.main) {
    const server = app.listen(process.env.PORT || 80, () => {
        const port = server.address().port;
        console.log(`App listening on port ${port}`);
    })
}