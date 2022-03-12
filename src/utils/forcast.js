const request = require('request')
const weatherReport = (latitude, longtitude, location, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=a0245ba47f1aa74afd95cddfce48bb1e&query=${latitude},${longtitude}`

    request({ url, json: true }, (error, {body : cast} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (cast.error) {
            callback('Unable to find location.')
        } else {
            const currentDay = cast.current
            callback(undefined, location,`${currentDay.weather_descriptions[0]}. It is currently ${currentDay.temperature} degress outside. It feels like ${currentDay.feelslike} degress out.`)
        }
    })
}

module.exports = weatherReport