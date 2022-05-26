const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Handlebars = require('handlebars')
const path = require('path')
const app = express()

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


//database
const db = require('./database/db')

//test db
db.authenticate()
    .then(()=>{
        console.log('connected to db')
    })

//handlebars
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs.engine({ 
    defaultLayout: 'main', 
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars')

//set static
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5005

//index route
app.get('/', (req, res) =>
 res.render('index')
)

//gig routes
app.use('/gigs', require('./routes/gigs'))


app.listen(PORT, console.log(`Server started on ${PORT}`))