const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const weatherReport = require('./utils/forcast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location.
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

//setup static directory to serve.
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Guy Montal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Guy Montal'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Guy Montal',
        email: 'guymontal@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    const userAddress = req.query.address;
    if (!userAddress) {
        return res.send({
            error: 'Please write an address to get your forcast.'
        })
    }
    geoCode(userAddress, (error, { latitude, longtitude, placeName } = {}) => {
        if (error) {
            return res.send({
                error: 'Please write an address to get your forcast.'
            })
        }
        weatherReport(latitude, longtitude, placeName, (error, location, weatherData) => {
            if (error) {
                return res.send({
                    error: 'Please write an address to get your forcast.'
                })
            }
            res.send({
                forcast: weatherData,
                location,
                address: userAddress
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Guy Montal'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMessage: 'Page Not Found.',
        name: 'Guy Montal'
    })
})

app.listen(port, () => {
    console.log('The server is up and running...')
})