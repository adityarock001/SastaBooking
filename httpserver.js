const http = require('http');
const url = require('url');

const port = 4000

// var DATABASE = [
//     {
//         id : 1,
//         name : "Bhilai",
//         adventurePlaces : 0
//     },
//     {
//         id : 2,
//         name : "Mumbai",
//         adventurePlaces : 10
//     },
//     {
//         id : 3,
//         name : "Delhi",
//         adventurePlaces : 8
//     }

// ]

const server = http.createServer((request, response) => {
    // console.log(request.url)
    
    if(request.url == "/cities"){
        const cities = [
            "raipur", 
            "patna",
            "bihar"
        ]
        response.end(JSON.stringify(cities));
    }

    if(request.url == "/cities/update"){
        console.log("cities updated");
        console.log(request.url)
        response.end("Success");
    }

    if(request.url == "/cities/delete"){
        console.log("city deleted");
        console.log(request.url)
        response.end("success");
    }

    if(request.url == "/cities/add"){
        console.log("city added");
        console.log(request.url)
        response.end("Success");
    }

    // request.on("data", (chunk) => {
    //     body += chunk.toString();
    // })
    


    
    
    

    
})

// const server  = http.createServer(serverHandler);


server.listen(port, () => {
    console.log("server successfully started! - ", port);
})


//200 ok
//201 created
//404 not found
//500 internal server error

//every API contains 4 parts- routing part, service part, model part, controller part
//model- piece of code that directly connects with mongodb
//service- piece of code that connects with model, it cannot close api request and may use multiple api
//controller- connects with service, it can close api request and unique for each api
//routes- communicate with controller

//middleware- 