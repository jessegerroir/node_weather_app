const request = require('request')
const config = require('../../config/config');

const forecast = (latitude, longitdue, callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key=" + config.weatherApiKey + "&query=" + longitdue + ',' + latitude 
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to service', undefined)
        } else if (body.error){
            callback(body.error, undefined)
        } else {
            const currentTemp = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            const final = description + ". It is currently " + currentTemp + " it feels like " + feelsLike + " and the humidity is " + humidity

            callback(undefined, final)
        }
    })
}

module.exports = forecast