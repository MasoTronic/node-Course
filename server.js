const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url }`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
        if(err){
            console.log("unable to write to file");
        }
    })
    next();
});



hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
});

app.get('/',(request, response) => {
    // response.send({
    //     name: "Eldorado",
    //     Likes: [{d:0,name:'delor'},{id:1, name: 'marcelos'}]
    // });
    response.render('home.hbs',{
        title: "Home Side",
        welcomeMessage:"totallt some fun",
        copywrite: 2019
    })
});

app.get('/about', (request,response)=>{
    response.render('about.hbs', {
        title: "about this page again but the title",
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle: "projects page"
    })
});

app.get('/bad',(request, response)=>{
    response.send({
        errorMessage: "unable to handle request"
    });
});
app.use((req,res,next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log("server s up now" + port)
});