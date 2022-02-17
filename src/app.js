const hbs = require('hbs')
const express= require('express')
const path = require('path')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// const send = require('process')
const app = express()

// // console.log(__filename)
// console.log(path.join(__dirname,'../public2'))

//define path
const filepath = path.join(__dirname,'../public2')
const viewspath= path.join(__dirname,'templates/views')
const partialspath=path.join(__dirname,'templates/partials')

// console.log(path.join())

//setup handlebars, views and engine locations
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)


//static directory to serve
app.use(express.static(filepath))

//Routing and display pages
app.get('',(req,res)=>{
    res.render('index',{
        title: "Index Page",
        title2: " Created by Anand Kumawat"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Fealty Technologies",
        address:"Rajendra Nagar",
        title2: "Anand Kumawat"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide a term'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            res.send({error})
        }
        forecast(latitude,longitude,(error,forecasteddata)=>{
            if (error){
                res.send({error})
            }
            
            res.send({
                forecast: forecasteddata,
                location,
                address:req.query.address
            })
        })
    })

    // console.log(req.query.search)
    // res.send({
    //     forecast:"It is snowing",
    //     location: "Indore",
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
           error:'you must provide a term' 
        })
    }

    console.log(req.query.search) 
    res.send({
       products:[]
   }
    )})



app.get('/help',(req,res)=>{
    res.render("help",{
    help:"what kind of help you need",
    title:"Help Page",
    title2:"Anand Kumawat"    
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:"ERROR...can't find the page you are requesting.",
        title:"404 page not found",
        title2:"you can visit the pages from here"
    })
})
app.get('*',(rq,res)=>{
    res.render('404',{
        error:"ERROR...can't find the page you are requesting.",
        title:"404 page not found",
        title2: "you can the route the pages from here"
    })
})


//hosting part
app.listen(3000,()=>{
    console.log("server is up at http://localhost:3000/")
})

