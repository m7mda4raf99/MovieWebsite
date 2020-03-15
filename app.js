const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
const fs = require('fs')
var session = require('express-session');

app.use(session({secret:'apatchy',saveUninitialized: true,resave: true}));

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views') )

app.use(bodyParser.urlencoded({ extended: false }))

if(process.env.PORT){
    app.listen(process.env.PORT);
  }
  else{
  app.listen(3000);
  }
//load users array from a file
let loadUsers = function(){
    try {
        let bufferedData = fs.readFileSync('User.json')
        let dataString = bufferedData.toString()
        let usersArray = JSON.parse(dataString)
        return usersArray
    } catch (error) {
        return []
    }
}
//load wishlist array from a file
let loadWishList = function(){
    try {
        let bufferedData = fs.readFileSync('WatchList.json')
        let dataString = bufferedData.toString()
        let wishlistArray = JSON.parse(dataString)
        return wishlistArray
    } catch (error) {
        return []
    }
}



//opens login page when we run
app.get('/', function(req,res){
    var flag = 0;
    res.render('login',{ 
       f : flag 
    })
})

app.get('/registration', function(req,res){
    var flag = 0;
    res.render('registration',{f:flag});
})

app.get('/drama', function(req,res){
    res.render('drama')
})

app.get('/horror', function(req,res){
    res.render('horror')
})

app.get('/action', function(req,res){
    res.render('action')
})



app.get('/godfather', function(req,res){
    let flag = true;
    res.render('godfather',{f:flag})
})


app.get('/godfather2', function(req,res){
    let flag = true;
    res.render('godfather2',{f:flag})})



app.get('/scream', function(req,res){
    let flag = true;
    res.render('scream',{f:flag})})


app.get('/conjuring', function(req,res){
    let flag = true;
    res.render('conjuring',{f:flag})})



app.get('/fightclub', function(req,res){
    let flag = true;
    res.render('fightclub',{f:flag})})


app.get('/darkknight', function(req,res){
    let flag = true;
    res.render('darkknight',{f:flag})})


app.get('/watchlist', function(req,res){
    let watchlist = loadWishList()
    res.render('watchlist', {
       watch: watchlist , username : req.session.username
    })
})

app.get('/searchresults',function(req,res){
    let f1,f2,f3,f4,f5,f6 = true;
    res.render('searchresults',{
        checkgodfather : f1, checkgodfather2 : f2, checkconjuring: f3,checkdarkknight:f4,checkfightclub:f5,checkscream:f6

    })
})


let getAllSubstrings = function(str) {
    var i, j, result = [];
  
    for (i = 0; i < str.length; i++) {
        for (j = i + 1; j < str.length + 1; j++) {
            result.push(str.slice(i, j));
        }
    }
    return result;
  }
let checkgodfather = function (str,subgodfather){
    for(var i =0;i<subgodfather.length;i++){
        if(str==subgodfather[i])
            return true
    }
    return false;
}
let checkgodfather2 = function (str,subgodfather2){
    for(var i =0;i<subgodfather2.length;i++){
        if(str==subgodfather2[i])
            return true
    }
    return false;
}
let checkconjuring = function (str,subconjuring){
    for(var i =0;i<subconjuring.length;i++){
        if(str==subconjuring[i])
            return true
    }
    return false;
}
let checkdarkknight = function (str,subdarkknight){
    for(var i =0;i<subdarkknight.length;i++){
        if(str==subdarkknight[i])
            return true
    }
    return false;
}
let checkfightclub = function (str,subfightclub){
    for(var i =0;i<subfightclub.length;i++){
        if(str==subfightclub[i])
            return true
    }
    return false;
}
let checkscream = function (str,subscream){
    for(var i =0;i<subscream.length;i++){
        if(str==subscream[i])
            return true
    }
    return false;
}
var subgodfather = getAllSubstrings('the godfather')

var subgodfather2 = getAllSubstrings('the godfather2')

var subconjuring = getAllSubstrings('the conjuring')

var subdarkknight = getAllSubstrings('the dark knight')

var subfightclub = getAllSubstrings('fight club')

var subscream = getAllSubstrings('swcream')



app.post('/wishgodfather',function(req,res){
    let wishlist = loadWishList()
    let flag = true
    for(var i=0;i<wishlist.length;i++){
        if(wishlist[i].Username == req.session.username){
            for(var j=0;j<wishlist[i].Movie.length;j++){
                if(wishlist[i].Movie[j] == 'The Godfather'){
                    flag = false;
                    break;
                }
            }
        }

    }

    if(!flag){
        //res.send('This film already exists in your wishlist!')
        res.render('godfather',{f:flag})

    }
    else{
        for(var i=0;i<wishlist.length;i++){
            if(wishlist[i].Username == req.session.username){
               
                (wishlist[i].Movie).push('The Godfather')
            
        }
    }


         //save array back in file
         fs.writeFileSync('WatchList.json', JSON.stringify(wishlist))
         res.render('godfather',{f:flag})

    }
})
app.post('/wishgodfather2',function(req,res){
    let wishlist = loadWishList()
    let flag = true
    for(var i=0;i<wishlist.length;i++){
        if(wishlist[i].Username == req.session.username){
            for(var j=0;j<wishlist[i].Movie.length;j++){
                if(wishlist[i].Movie[j] == 'The Godfather2'){
                    flag = false;
                    break;
                }
            }
        }

    }

    if(!flag){
        //res.send('This film already exists in your wishlist!')
        res.render('godfather2',{f:flag})

    }
    else{
        for(var i=0;i<wishlist.length;i++){
            if(wishlist[i].Username == req.session.username){
               
                (wishlist[i].Movie).push('The Godfather2')
            
        }
    }


         //save array back in file
         fs.writeFileSync('WatchList.json', JSON.stringify(wishlist))
         res.render('godfather2',{f:flag})

    }
})

app.post('/wishconjuring',function(req,res){
    let wishlist = loadWishList()
    let flag = true
    for(var i=0;i<wishlist.length;i++){
        if(wishlist[i].Username == req.session.username){
            for(var j=0;j<wishlist[i].Movie.length;j++){
                if(wishlist[i].Movie[j] == 'The Conjuring'){
                    flag = false;
                    break;
                }
            }
        }

    }

    if(!flag){
        //res.send('This film already exists in your wishlist!')
        res.render('conjuring',{f:flag})

    }
    else{
        for(var i=0;i<wishlist.length;i++){
            if(wishlist[i].Username == req.session.username){
               
                (wishlist[i].Movie).push('The Conjuring')
            
        }
    }


         //save array back in file
         fs.writeFileSync('WatchList.json', JSON.stringify(wishlist))
         res.render('conjuring',{f:flag})

    }
})

app.post('/wishdarkknight',function(req,res){
    let wishlist = loadWishList()
    let flag = true
    for(var i=0;i<wishlist.length;i++){
        if(wishlist[i].Username == req.session.username){
            for(var j=0;j<wishlist[i].Movie.length;j++){
                if(wishlist[i].Movie[j] == 'The Dark Knight'){
                    flag = false;
                    break;
                }
            }
        }

    }

    if(!flag){
        //res.send('This film already exists in your wishlist!')
        res.render('darkknight',{f:flag})

    }
    else{
        for(var i=0;i<wishlist.length;i++){
            if(wishlist[i].Username == req.session.username){
               
                (wishlist[i].Movie).push('The Dark Knight')
            
        }
    }


         //save array back in file
         fs.writeFileSync('WatchList.json', JSON.stringify(wishlist))
         res.render('darkknight',{f:flag})

    }
})

app.post('/wishfightclub',function(req,res){
    let wishlist = loadWishList()
    let flag = true
    for(var i=0;i<wishlist.length;i++){
        if(wishlist[i].Username == req.session.username){
            for(var j=0;j<wishlist[i].Movie.length;j++){
                if(wishlist[i].Movie[j] == 'Fight Club'){
                    flag = false;
                    break;
                }
            }
        }

    }

    if(!flag){
        //res.send('This film already exists in your wishlist!')
        res.render('fightclub',{f:flag})

    }
    else{
        for(var i=0;i<wishlist.length;i++){
            if(wishlist[i].Username == req.session.username){
               
                (wishlist[i].Movie).push('Fight Club')
            
        }
    }


         //save array back in file
         fs.writeFileSync('WatchList.json', JSON.stringify(wishlist))
         res.render('fightclub',{f:flag})

    }
})


app.post('/wishscream',function(req,res){
    let wishlist = loadWishList()
    let flag = true
    for(var i=0;i<wishlist.length;i++){
        if(wishlist[i].Username == req.session.username){
            for(var j=0;j<wishlist[i].Movie.length;j++){
                if(wishlist[i].Movie[j] == 'Scream'){
                    flag = false;
                    break;
                }
            }
        }

    }

    if(!flag){
        //res.send('This film already exists in your wishlist!')
        res.render('scream',{f:flag})

    }
    else{
        for(var i=0;i<wishlist.length;i++){
            if(wishlist[i].Username == req.session.username){
               
                (wishlist[i].Movie).push('Scream')
            
        }
    }


         //save array back in file
         fs.writeFileSync('WatchList.json', JSON.stringify(wishlist))
         res.render('scream',{f:flag})

    }
})



app.post('/search',function(req,res){
let search1 = req.body.Search
let search = search1.toLowerCase();
let f1 = checkgodfather(search,subgodfather)  
let f2 = checkgodfather2(search,subgodfather2)  
let f3 = checkconjuring(search,subconjuring)  
let f4 = checkdarkknight(search,subdarkknight)  
let f5 = checkfightclub(search,subfightclub)  
let f6 = checkscream(search,subscream)  

 res.render('searchresults', {
        checkgodfather : f1, checkgodfather2 : f2, checkconjuring: f3,checkdarkknight:f4,checkfightclub:f5,checkscream:f6
    })
    

    
})



app.post('/register', function(req,res){
    let watchlist = loadWishList()
    let password = req.body.password
    var flag = 0;
    
    //load users array
    let users = loadUsers()
    //check if new username exists before?
    for(var i=0;i<users.length;i++){
        //if already used registered username
        if(req.body.username == users[i].Username ) {
            if(password == ""){
               // res.send("Please enter a password!")
               flag = 1;
               res.render('registration',{
                f : flag
            });
            }else{
               // res.send("Sorry, someone already has this username! Try another one.")
               flag = 2;
               res.render('registration',{
                f : flag
            });
            }
            return;
        }       
    }
    //if new username and empty password
    if(req.body.username == "" & password == ""){
        //res.send("Please enter username and password!");
        flag = 3;
        res.render('registration',{
            f : flag
        });
        
    //if new username and non-empty password    
    }else{
        if(req.body.username == ""){
            //res.send("Please enter username!");
            flag = 4;
            res.render('registration',{
                f : flag
            });
        }else{
            if(password==""){
                //res.send("Please enter password!");
                flag=5;
                res.render('registration',{
                    f : flag
                });
            }else{
                var User = {
                    Username : req.body.username,
                    Password : password
                }
                var WishList = {
                    Username :  req.body.username,
                    Movie : []
                }

                //push new user in array
                users.push(User)
                watchlist.push(WishList)
                //save array back in file
                fs.writeFileSync('User.json', JSON.stringify(users))
                fs.writeFileSync('WatchList.json', JSON.stringify(watchlist))

                //res.send("You have signed up successfully!")
                flag = 7 ; 
                res.render('login',{
                    f : flag
                });
            }

        }
    }

    
})

app.post('/login',function(req,res){
    let users = loadUsers()
    var flag = 0;
    req.session.username = req.body.username

    for(i=0 ; i<users.length ; i++){
        if(users[i].Username==req.session.username){
            if(users[i].Password==req.body.password){
                res.redirect('home');
                return;
            }else{
                if(req.body.password==""){
                    //res.send("Please enter a password!");
                    flag = 1;
                    res.render('login',{
                        f: flag
                     });
                    return;
                }else{
                   //res.send("Incorrect password!");
                    flag = 2;
                    res.render('login',{
                        f: flag
                     });
                    return;
                }
            }
        }
    }
    if(req.session.username== "" & req.body.password == ""){
        //res.send("Please enter username and password!");
        flag = 3;
        res.render('login',{
            f: flag
         });
       
    }else{
        if(req.session.username== ""){
            //res.send("Please enter username!");
            flag = 4;
            res.render('login',{
                f: flag
             });
        }else{
            if(req.body.password == ""){
                //res.send("Please enter password!");
                flag = 5;
                res.render('login',{
                    f: flag
                 });
            }else{
               // res.send("Sorry, this username doesn't exist! Please enter a different one.");
               flag = 6;
               res.render('login',{
                f: flag
             });
             
            }
        }
    }
   
   
    
    
    
})

app.get('/home', function(req,res){
    res.render('home')

})






