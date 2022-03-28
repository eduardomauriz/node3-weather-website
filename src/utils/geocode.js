const request = require('request')

const geocode = (address, callback) =>{
  

    const urls = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWR1YXJkb21hdXJpeiIsImEiOiJja3k4eW1kcWgwMTl2MnF0ZmlreWVoYWw0In0.2QoTfL55KBMYQYWhj6kJww&limit=1'
    
    request({ url: urls, json: true}, (error, {body}) => {//callback recibe los parametros: error y response(response es un objeto que tiene un atributo llamado Body, por eso lo desestructuro y paso solo body)
        if(error){
            callback('imposible conectar con Internet')// callback es la funcion que se llama en el const goecode (en relidad es una funcion parametro)
        } else if(body.features.length === 0){
            callback('Unabled to find the location')

        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
            
        }
    })
}


module.exports = geocode