const con=require("./connection");
const ejs = require('ejs');
const bodyParser=require('body-parser')
const express=require('express');
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/register.html');
});

app.get('/property',function(req,res){
    con.getConnection(function(error) {
       if(error) {
        console.log(error);
       }
       const sql="select * from property";
       con.query(sql,function(error,result){
           if(error) console.log(error);
           res.render(__dirname+"/property",{properties:result});
       });
    });
});


app.get('/users',function(req,res){
    con.getConnection(function(error) {
       if(error) {
        console.log(error);
       }
       const sql="select * from user";
       con.query(sql,function(error,result){
           if(error) console.log(error);
           res.render(__dirname+"/users",{users:result});
       });
    });
});

app.get('/searchstudents',function(req,res){
    con.getConnection(function(error) {
       if(error) {
        console.log(error);
       }
       let sql="select * from user";
       con.query(sql,function(error,result){
           if(error) console.log(error);
           res.render(__dirname+"/search",{users:result});
       });
    });
});

app.get('/properties',function(req,res){
    let name=req.query.name;
    let city=req.query.city;

    con.getConnection(function(error){
        if (error) {
            console.log(error);
        }
        let sql="SELECT * FROM property;";
        con.query(sql,function(erroe,result){
            if (error) {
                console.log(error);
            }
           res.render(__dirname+"/properties",{properties:result});
        })
    })
});

app.get('/search',function(req,res){
    let name=req.query.name;
    let city=req.query.city;
    con.getConnection(function(error){
        if (error) {
            console.log(error);
        }
        let sql="SELECT * FROM property WHERE property_name LIKE '"+name+"%' AND property_city LIKE '"+city+"%' ;";
        con.query(sql,function(erroe,result){
            if (error) {
                console.log(error);
            }
           res.render(__dirname+"/properties",{properties:result});
        })
    })
});

app.get('/deleteproperty',function(req,res){
    let id=req.query.id;
    con.getConnection(function(error) {
       if(error) {
        console.log(error);
       }
       const sql="DELETE from property where property_id="+id+";";
       con.query(sql,function(error,result){
           if(error) console.log(error);
           res.redirect('/property');
       });
    });
});

app.get('/updateproperty',function(req,res){
    let id=req.query.id;
    con.getConnection(function(error) {
       if(error) {
        console.log(error);
       }
       const sql="SELECT * from property where property_id="+id+";";
       con.query(sql,function(error,result){
           if(error) console.log(error);
           res.render(__dirname+"/updateproperty",{properties:result});
       });
    });
});

app.post('/updateproperty',function(req,res){
    let name=req.body.name;
    let id=req.body.id;
    let city=req.body.city;
    let phno=req.body.phno;
    let type=req.body.property_type;
    con.getConnection(function(error) {
       if(error) {
        console.log(error);
       }
       const sql="UPDATE property SET property_name='"+name+"',property_city='"+city+"',propertytype_id="+type+", property_contact="+phno+" where property_id="+id+";";
       con.query(sql,function(error,result){
           if(error) console.log(error);
           res.redirect('/property');
       });
    });
});

app.listen(80);


