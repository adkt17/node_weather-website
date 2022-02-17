// const request = require ('request')

// const forecast = (latitude,longitude,callback)=>{
//     const url = 'http://api.weatherstack.com/current?access_key=56f12f51d0201e39d69b6bac51373635&query=' + latitude+','+ longitude + '&units=f'

//     request({uri:url,json:true},(error,response)=>{
//         if (error){
//             callback("1. unable to connect ",undefined)
//         }else if (response.body.error){
//             callback("2. pease write the correct sytax..")
//         }else{
//             callback(undefined,
//                 response.body.daily.data[0].summary +"It is cureently "+ response.body.currently.precipProbability
//             )
//         }
//     })
// }

const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=56f12f51d0201e39d69b6bac51373635&query='+ latitude +',' + longitude + '&units=f'

    request ({url:url,json:true},(error,response)=>{
        if (error){
            return callback('1. unable to connect')

        }else if(response.body.error){
            return callback('2. unable to connect')

        }else{
            return callback(
                response.body.current.weather_descriptions[0] +". original temperature "+(response.body.current.temperature)
                )

        }
    })
}
module.exports = forecast