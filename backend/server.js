const { query } = require('express')
const express=require('express')
const req = require('express/lib/request')
const app=express()
const db=require('./db')
const Todo=require('./todo')
app.use(express.json())
//-----------------------
app.get('/',(req,res)=>{

    res.json('GET/is working')
})
//-----------------------
app.get("/complete",(req,res)=>{
Todo.find({isCompleted:true},(err,data)=>{
    if(err){
        console.log("ERR",err);
    }else{
        // console.log(data);
        res.json(data);
    }
})
})
//-----------------------
app.get("/not_complete",(req,res)=>{
    Todo.find({isCompleted:false},(err,data)=>{
        if(err){
            console.log("ERR",err);
        }else{
            console.log(data);
            res.json(data);
        }
    })
    })
//-----------------------
   app.get("/filter",(req,res)=>{
       console.log(req,query);
    Todo.find({isCompleted:false},(err,data)=>{
        if(err){
            console.log("ERR",err);
        }else{
            // console.log(data);
            res.json(data);
        }
    })
    })
   //-----------------------  
app.listen(5000,()=>{
    console.log('SERVER IS WORKING ');
});
//-----------------------
app.post('/tasks',(req,res)=>{
    console.log('25:',req.body);
    Todo.create(req.body,(err,newTask)=>{
        if(err){
            console.log("ERROR: ",err);  
        }else{
            res.status(201).json(newTask);
        } });
}) ;
//----------------------- 
app.get('/tasks',(req,res)=>{
    Todo.find({},(err,data)=>{
        if(err){
            console.log('ERROR: ',err);  
        }else{
            res.json(data);
        }});
}) ;
//-----------------------
app.delete('/tasks/:id',(req,res)=>{
    console.log('37:',req.body);
    Todo.create(req.body,(err,newTask)=>{
        if(err){
            console.log("ERROR: ",err);  
        }else{
            res.status(201).json(newTask);
        } });
}) ;
//--------------------
app.put('/tasks/:id',(req,res)=>{
    Todo.updateOne(
    { _id:req.params.id}
    ,{title:req.body.newTitle},
    (err,updatObj) =>{
        if(err){
            console.log("ERROR: ",err);  
            res.status(500).json(err);
        }else{
            console.log(updatObj); 
            updatObj.modifiedCount === 1
            ? res.json("Delete one todo successfully")
            : res.status(404).json("This todo is not found")
            ;
        }
}
);
}) ;