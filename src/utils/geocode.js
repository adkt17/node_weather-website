const request = require ('request')


const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiYW5hbmRrdW1hd2F0IiwiYSI6ImNremR3aG9xczB3eXEycm82YWFjYWxoOHIifQ.wiOr_e487VX5B_KTgWPKOA'

    request({url:url, json:true},(error,{body}) =>{
        if (error){
            return callback("1. unable to connect to location...")
        }else if (body.features.length===0){
            return callback('2. - unable to find location ..',undefined)
        }else{
            return callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode