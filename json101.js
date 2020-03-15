const fs = require('fs')

let User =[{Username : 'mohamed',
            Password : '123456'
}] 

let WishList = [{
    Username : 'mohamed',
    Movie : []
}
]
    

let bookjson = JSON.stringify(User)
let data = fs.readFileSync('User.json')
let StringData = data.toString()
let parsedData = JSON.parse(StringData)

let bookjson1 = JSON.stringify(WishList)
let data1 = fs.readFileSync('WatchList.json')
let StringData1 = data1.toString()
let parsedData1 = JSON.parse(StringData1)


