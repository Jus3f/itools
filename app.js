const express = require('express')
const bodyParser = require('body-parser')
const ejs = require("ejs");
const app = express()

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res) {
    res.render('home' ,{defaultText : '...' , fix : ''} )
})
app.get('/URL', function(req,res) {
    res.render('url' ,{defaultText : '' , fix : ''} )
})
app.post('/', function(req,res) {

    let data1 = req.body.textData
    let choosed = req.body.radio
    if (choosed === 'Encode') {
        const encodeText = Buffer.from(data1).toString('base64')
        res.render('home' ,{defaultText : encodeText, fix : data1} )
        } else if (choosed === 'Decode') {
            const decodedText = Buffer.from(data1, 'base64').toString('utf-8')
            res.render('home' ,{defaultText : decodedText, fix : data1} )
    }
})
app.post('/URL', function(req,res) {

    let data1 = req.body.textData
    let choosed = req.body.radio
    if (choosed === 'Encode') {
        const encodeURL = encodeURIComponent(data1)
        res.render('home' ,{defaultText : encodeURL, fix : data1} );
        } else if (choosed === 'Decode') {
            const decodedURL = decodeURIComponent(data1);
            res.render('home' ,{defaultText : decodedURL, fix : data1} )
    }
})
app.listen(3000, function() { console.log('Live') })