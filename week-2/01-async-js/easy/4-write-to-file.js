// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs')
const path = require('path');

const filePath = path.join(__dirname + '/write.txt');

const data = "Tomorrow I am going back to college."

const a = fs.writeFile(filePath, data, err=>{
    if(err) console.log("ERROR!!!");
    else console.log(data);
})


