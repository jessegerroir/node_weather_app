// Gather all our enviornment variabels in one place
module.exports = {
    weatherApiKey: process.env.WEATHER_API_KEY,
    mapboxApiKey:process.env.MAPBOX_API_KEY,
    port: process.env.PORT || 3000
}