// call express to create new application
// express is our webserver
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Functionality for getting the forcast and geodata
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Define paths for express config
// these let us manage paths to different folders easier
const path = require('path')
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
// (handlebars is what handles rendering pages based off of templates)
const hbs = require('hbs')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory for express to serve
// (It recognizes all the web pages in the static directory 
// and builds the routing)
app.use(express.static(publicDirectory));

// Routing -----
// The following will route the user to the correct page depending on url (using handlebar)

// Index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jesse G.'
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jesse G.'
    })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page.',
        name: 'Jesse G.'
    })
})

// Weather page
app.get('/weather', (req, res) => {
    
    const city = req.query.address

    if (!city) {
        return res.send({
            error: 'You must provide a city'
        })
    }

    // Call geoCode to translate city to it's coordinates
    geocode(city, (error, {latitude, longitude, location} = {}) => {
        // if we get an error return it
        if (error) {
            return res.send({
                error
            })
        }
        // Use the results from geocode to call forecast
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            // return forecast data
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
    
})

// Products page
app.get('/products', (req, res) => {
    // Make sure they provide a search term
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

// If they try to search for anything under help
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404: Page Not Found',
        name: 'Jesse G.',
        errorMessage: 'Unable to find help article'
    })
})

// Generic 404 page (matches anything that hasn't been matched above)
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404: Page Not Found',
        name: 'Jesse G.',
        errorMessage: 'Unable to find the requested page.'
    })
})

// starts server and has port listen at port 3000
app.listen(port, () => {
    console.log('Server has started on port ' + port)
})
