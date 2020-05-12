const path = require('path')
const express = require('express')




// call express to create new application
const app = express()

// We create the path to the public folder from src
// It's where all our web pages are
const publicDirectory = path.join(__dirname, '../public')

// We load this static public directory into express
// It recognizes all the web pages in the static directory
// and builds the routing by the names of the pages and their relation
// to the index.html page
app.use(express.static(publicDirectory))


// These other routes determine what is served for the other pages

app.get('/weather', (req, res) => {
    const weather = {
        forecast: 'Sunny, 20 degrees',
        location: 'Boston'
    }
    res.send(weather)
})

// starts server and has port listen at port 3000
app.listen(3000, () => {
    console.log('Server has started on port 3000')
})

// We can shut down the webserver with ctrl + c