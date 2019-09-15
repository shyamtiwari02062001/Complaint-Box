var express=require('express');
var moment=require('moment');
var bodyParser = require('body-parser');
const { Pool,Client} =require('pg')
var path=require('path')
/*  end      */



/* Configuration to connect to database */


const connectionString =(process.env.pg_URI ||"postgres://st:shyam02@localhost:5432")

const client = new Client({
    connectionString:connectionString
})

client.connect()
/*  end      */



//creating express object
app=express();



//seting view engine to ejs
app.set('view engine','ejs');


// using bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

//file handeling

app.get('/',function(req,res){
    res.render("home");
   });
   app.get('/todirector', function(req, res) {
    client.query("SELECT * FROM maketodirectors",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('todirector',{maketodirectors:result.rows});
    });
  });
 
  app.get('/toprincipal', function(req, res) {
    client.query("SELECT * FROM maketoprincipals",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('toprincipal',{maketoprincipals:result.rows});
    });
  });
  app.get('/toteacher', function(req, res) {
    client.query("SELECT * FROM maketoteachers",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('toteacher',{maketoteachers:result.rows});
    });
  });
   
   app.get('/maketodirector',function(req,res){
    res.render("maketodirector");
   });
   app.get('/maketoprincipal',function(req,res){
    res.render("maketoprincipal");
   });
   app.get('/maketoteacher',function(req,res){
    res.render("maketoteacher");
   });

   app.post('/maketoteacher',function(req,res){
    console.log(req.body.email);
 client.query("INSERT INTO maketoteachers(name,tname,problem,solution)values($1,$2,$3,$4);",[req.body.name,req.body.tname,req.body.problem,req.body.solution],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("maketoteacher");}
});

});
app.post('/maketoprincipal',function(req,res){
    console.log(req.body.email);
 client.query("INSERT INTO maketoprincipals(name,problem,solution)values($1,$2,$3);",[req.body.name,req.body.problem,req.body.solution],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("maketoprincipal");}
});

});
app.post('/maketodirector',function(req,res){
    console.log(req.body.email);
 client.query("INSERT INTO maketodirectors(name,problem,solution)values($1,$2,$3);",[req.body.name,req.body.problem,req.body.solution],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("maketodirector");}
});

});

 app.get('/maketocollegedirector',function(req,res){
    res.render("maketocollegedirector");
   });

  app.post('/maketocollegedirector',function(req,res){
    
 client.query("INSERT INTO maketocollegedirectors(name,problem,solution)values($1,$2,$3);",[req.body.name,req.body.problem,req.body.solution],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("maketocollegedirector");}
});

});
app.get('/tocollegedirector', function(req, res) {
    client.query("SELECT * FROM maketocollegedirectors",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('tocollegedirector',{maketocollegedirectors:result.rows});
    });
  });

  app.get('/maketocollegeprincipal',function(req,res){
    res.render("maketocollegeprincipal");
   });

  app.post('/maketocollegeprincipal',function(req,res){
    
 client.query("INSERT INTO maketocollegeprincipals(name,problem,solution)values($1,$2,$3);",[req.body.name,req.body.problem,req.body.solution],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("maketocollegeprincipal");}
});

});
app.get('/tocollegeprincipal', function(req, res) {
    client.query("SELECT * FROM maketocollegeprincipals",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('tocollegeprincipal',{maketocollegeprincipals:result.rows});
    });
  });




  app.get('/maketocollegehod',function(req,res){
    res.render("maketocollegehod");
   });

  app.post('/maketocollegehod',function(req,res){
    
 client.query("INSERT INTO maketocollegehods(name,branch,problem,solution)values($1,$2,$3,$4);",[req.body.name,req.body.branch,req.body.problem,req.body.solution],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("maketocollegehod");}
});

});
app.get('/tocollegehod', function(req, res) {
    client.query("SELECT * FROM maketocollegehods",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('tocollegehod',{maketocollegehods:result.rows});
    });
  });


  app.get('/maketocollegeprofessor',function(req,res){
    res.render("maketocollegeprofessor");
   });

  app.post('/maketocollegeprofessor',function(req,res){
    
 client.query("INSERT INTO maketocollegeprofessors(name,branch,problem,solution)values($1,$2,$3,$4);",[req.body.name,req.body.branch,req.body.problem,req.body.solution],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("maketocollegeprofessor");}
});

});
app.get('/tocollegeprofessor', function(req, res) {
    client.query("SELECT * FROM maketocollegeprofessors",function(err,result){
        if(err){
            return console.error('error running query',err);
        }
        res.render('tocollegeprofessor',{maketocollegeprofessors:result.rows});
    });
  });
//port
app.listen(7000); //our app is running on port no 8080
console.log('Server started at port 7000');
