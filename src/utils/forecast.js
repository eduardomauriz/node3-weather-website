
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0f6e1038e4220c3371a692a60eab419d&query=' + latitude + ',' + longitude 
    
    request({ url, json: true }, (error, {body}) => {//callback recibe los parametros: error y response(response es un objeto que tiene un atributo llamado Body, por eso lo desestructuro y paso solo body)
    
         //si en los parametros le pongo json:true entonces no necesito las siguientes 2 lineas, porque el request lo parsea a JSON en forma automatica, es mas facil
        if(error){
            callback('Unabled to conect to internet service', undefined)
        }else if(body.error){
            callback('unabled to find location', undefined)
        }
        else{

            callback(undefined, 'It is current ' + body.current.temperature + ' degrees out. This feels like ' + body.current.feelslike + ' degress')
            
        }
        
    })

}

module.exports = forecast