const express = require('express')
const morgan = require('morgan')

// -- Variables
const app = express()
const port = 3002

// -- Models
const consoles = [
    { id: 1, name: "PlayStation 5", manufacturer: "Sony", releaseYear: 2020 },
    { id: 2, name: "Xbox Series X", manufacturer: "Microsoft", releaseYear: 2020 },
    { id: 3, name: "Nintendo Switch", manufacturer: "Nintendo", releaseYear: 2017 },
    { id: 4, name: "PlayStation 4", manufacturer: "Sony", releaseYear: 2013 },
    { id: 5, name: "Xbox One", manufacturer: "Microsoft", releaseYear: 2013 }
];

// * Define a "Schema" for our contacts
// A Schema defines the fields for our data entity. In this case, our data entity is a contact.
// We want two fields for each contact; "name" & "email"

// * Define the "Model" that will create a collection in our database.
// A schema alone won't achieve anything, it needs to be assigned to a model.
// A mongoose model corresponds to a collection within a MongoDB database. Examples of models/collections might be "movies" and "users".
// In this example, the model will be for "Contacts" and will contain an array of single contact documents
// The Schema defines which fields those documents should have.



// -- Middleware
// Convert JSON data in the request body into JS, saving it on `req.body`
app.use(express.json())

// Use Morgan to log each request received to the console
app.use(morgan('dev'))

// Delete Middleware
const deleteItemById = (consoles, foundConsole) =>{

}

// -- Route Handlers
// Index-Route
app.get('/consoles', (req, res) => {//GETTING DATA < ('/the location (PATH) we are working with')(REQest, RESponse)
    try { //This structure is just like TRY EXCEPT
        return res.send(consoles)  //If what we tried worked, our RESPONSE is to SEND THE ITEM (consoles)
    } catch (error) {
        return res.status(500).send('Something went wrong') //If it didn't work our RESPONSE is to SEND and error message
    }
})

// Create-Route
app.post('/consoles', (req, res) => { //This time we are POSTING DATA to the database >
    try {
        req.body.id = consoles.length + 1 // Setting out that what will be sent back will automatically  
        consoles.push(req.body) // give an id number of one larger than the size of the current list to the 
        return res.send(req.body) //newly created record
    } catch (error) {
        consoles.log(error)
        return res.status(500).send('Something went wrong')
    }
})

// Show-Route
app.get('/consoles/:consoleId', (req, res) => { // Targeting in on the thing based on a url parameter VITAL /:
    try {    
            
        //Create a variable that picks the target as the request.parameter.contactID (req.params.consoleId)
        //and converts that to a number, remembering that all data is being sent as strings
        const consoleId = Number(req.params.consoleId)
        const foundConsole = consoles.find(console => { //Declaring a variable to put the result of the find method running on consoles to find the one with the Id value that was in the request.
            return console.id === consoleId //returning IF a console.id(reference to our object)matches the consoleID (request paramiter)
        })
        if (foundConsole){  //If there is a matching ID number then return the coresponding record 
            return res.send(foundConsole)
        } else { //Otherwise send the error message to show that record doesn't exist
            return res.status(404).send('Console not found')
        }       
    } catch (error) { //If something else occures send generic error message
        console.log(error)
        return res.status(500).send('Something went wrong')
    }                                         
})                                             


// Update-Route
app.put('/consoles/:consoleId', (req, res) => {
    try {
        const consoleId = Number(req.params.consoleId)
        const foundConsole = consoles.find(console => {
            return console.id === consoleId
        })
        if (foundConsole) {
            return res.send('Got a DELETE request at /consoles/:consoleId')
        } else {
            return res.status(404).send('Console not found')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Something went wrong')
    }
}) 


// Delete-Route
app.delete('/consoles/:consoleId', (req, res) => { 
    try {
        const consoleId = Number(req.params.consoleId)
        const foundConsole = consoles.find(console => {
            return console.id === consoleId 
        })
        if (foundConsole) { 
            return res.send('Got a DELETE request at /consoles/:consoleId')
        } else { 
            return res.status(404).send('Console not found')
        }
    } catch (error) { 
        console.log(error)
        return res.status(500).send('Something went wrong')
    }
}) 


// 404 Handler
app.get('*', (req, res) => {
    return res.status(404).send('<h1>Page not found!</h1>')
})

app.listen(port, () => {
    console.log(`Server launched on port ${port}`)
})