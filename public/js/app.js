console.log('Client side javascrip file is loaded')

fetch('https://puzzle.mead.io/puzzle').then((response) => { //el fetch llama a la url y cuando esta responda, se ejecuta el then, que regresa el response, luego el response lo convertimos a JSON y luego extraemos los datos que mostramos por consila
    response.json().then((data) => {
        console.log(data)
    })
})





const weatherForm = document.querySelector('form')   //pongo form porque es el lugar de la pagina donde se encuentra el dato que quiero recuperar
const search = document.querySelector('input') //obtengo el valor del elemento input de la pagina
const messageOne = document.querySelector('#message-1') //hago referencia al parrafo p, que tiene como id= message-1
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (event) => {   //queremos escuchar el evento del submit, para recuperar el valor que se pasa como location por la pantalla
    
    event.preventDefault() //evita que la pagina se recargue al apretar el boton Search
    const location = search.value


    messageOne.textContent = 'Loading...' //seteo un valor al elemento messageOne de la pagina
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else{

                //muestro los valores por pantall
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                
                console.log(data.forecast)
                console.log(data.location)
                console.log(data.address)
            }
            
        })
    })


})