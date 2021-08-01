const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')
const Jimp  = require('jimp')
dotenv.config();
const port = process.env.PORT || 6000;

app.set('view-engine', 'ejs')
app.use( express.static('public'))
app.use('/js',  express.static(__dirname + 'public/js'))
app.use('/images',  express.static(__dirname + 'public/images'))

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/gallery', (req, res) => {
    res.render('gallery.ejs', {path: imagePath});
});


var storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

var upload = multer({ storage });

var imagePath;

app.post('/addImageWatermark', upload.single('image') , (req, res) => {   
    const path = req.file.path
    imagePath = path;
    imagePath = imagePath.substring(7);

    Jimp.read(`${path}`)
    .then((tpl) => tpl.clone().write(path))
    .then(() =>  Jimp.read(path))
    .then((tpl) => Jimp.read('watermark/feather-mark.png').then((logoTpl) => {
            logoTpl.opacity(0.8)
            return tpl.composite(logoTpl, 0, 50, [Jimp.BLEND_DESTINATION_OVER])
        }),
    )
    .then( (tpl) => tpl.write(path))
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Sense of Space A-Frame Application listening at http://localhost:${port}`)
});

