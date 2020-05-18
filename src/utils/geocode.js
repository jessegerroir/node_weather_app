const request = require('request') 
const config = require('../../config.js')

const geoCode = (address, callback) => {
    const url =  "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + config.mapboxApiKey + "&limit=1"

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            result = {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            }
            callback(undefined, result)
        }
    })
}

module.exports = geoCode