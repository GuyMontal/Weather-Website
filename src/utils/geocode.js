const request = require('request');
const geoCode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZ3V5bW9udCIsImEiOiJja3p4MGY2b3MwMjdpMnVra3pkZTM5cHp3In0.d0A30N3sejdqin-QKv7XFA`

    request({ url, json: true }, (error, {body : geoInfo} = {}) => {
        if (error) {
            callback('Unable to connect to location service!')
        } else if (geoInfo.features.length === 0) {
            callback('Unable to find location.')
        } else {
            callback(undefined, {
                latitude: geoInfo.features[0].center[1],
                longtitude: geoInfo.features[0].center[0],
                placeName: geoInfo.features[0].place_name
            })
        }
    })
}

module.exports = geoCode