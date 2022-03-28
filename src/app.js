
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app= express()
const port=3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { send } = require('process')


//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public') //sirve para acceder a los directorios del proyecto que queramos
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

app.listen(port,()=>{
    console.log(' at port ',port)
    console.log('')
})

//Setup handlersbar engine and view location, view engine y views son palabras reservadas de app.set() , esto sale en la doc de nodejs
app.set('view engine','hbs') //esto se utiliza para configurar la handlerbar
app.set('views', viewsPath)// le digo a express que use esta ruta, en donde estan todas las views
hbs.registerPartials(partialPath)


//Setuo static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {//el nombre index tiene que ser el mismo que el que sale en views -> index.hbs, esto sale en la documentacion de nodejs, en la parte de request
        title: 'Weather app',
        name: 'Eduardo Mauriz'
    }) 
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name:'Eduardo Mauriz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a Help message',
        title: 'Help',
        name: 'Eduardo Mauriz'
    })
})

app.get('',(req,res)=>{
    res.send('<h1>Weather</h1>')
})
 

app.get('/weather', (req, res) => {  //cuando pongo en el navegador: weather?address=mendoza

    if(!req.query.address){
        return res.send({
             error: 'You must provide a location'
         })
     }

     geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // todo esto sale de la funcion gepcode y forecast., El "={}" es para que se tomen valores nulos por defecto, si no se pasa ninguna location por el navegador
        if(error){
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error})
            }

            res.send({
                forecast: forecastData, //el valor del forecast es lo que obtengo en el forecastData
                location,  //location es lo que devuelvo del geocode
                address: req.query.address

            })
        })

     })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    
    
    res.send({
            products: []
        })
    })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Eduardo Mauriz',
        errorMesagge: 'Help Article not FOUND'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Eduardo Mauriz',
        errorMesagge: 'PAGE NOT FOUND'
    })
})


