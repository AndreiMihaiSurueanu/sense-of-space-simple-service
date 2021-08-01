const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')
const Jimp  = require('jimp')
dotenv.config();
const port = process.env.PORT || 6000;

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use( express.static('public'))
app.use('/js',  express.static(__dirname + 'public/js'))
app.use('/images',  express.static(__dirname + 'public/images'))

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/gallery', (req, res) => {
    res.render('gallery.ejs');
});


var storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

var upload = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 10},
    fileFilter: (req, file, callback) => {
        const acceptedFormats = /jpg|png|gif|jpeg/;
        const fileExt = acceptedFormats.test(path.extname(file.originalname).toLowerCase())
        const fileMime = acceptedFormats.test(file.mimetype)

        if(fileExt && fileMime){
            callback(null, true)
        } else {
            callback('Invalid image type', false)
        }
    }
}).single('image')

app.post('/addImageWatermark', async (req, res) => {   
    try {
        await upload(req, res, (err) => {
            if (err){
                return res.json({msg:"Image could not be uploaded", error: err})
            }
    
            const path = req.file.path
    
            Jimp.read(`${path}`)
            .then((tpl) => tpl.clone().write(path))
            .then(() =>  Jimp.read(path))
            .then((tpl) =>
                Jimp.read('watermark/feather-mark.png').then((logoTpl) => {
                    logoTpl.opacity(0.8)
                    return tpl.composite(logoTpl, 0, 50, [Jimp.BLEND_DESTINATION_OVER])
                }),
            )
            .then( (tpl) => tpl.write(path))
            res.json(req.file);
        })
    } catch (error) {
        console.log(error);
    }
});


app.listen(port, () => {
    console.log(`Sense of Space A-Frame Application listening at http://localhost:${port}`)
});

