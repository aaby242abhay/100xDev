// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');
const path = require('path');

const readPath = path.join(__dirname,'/read.txt');
const writePath = path.join(__dirname,'/write.txt');

var a = fs.readFile(readPath,"utf8",(err,data)=>{
    if(err) console.log("Error in reading the file");
    else {
        let newData = data.replace(/\s+/g, ' ').trim();
        fs.writeFile(writePath,newData,(err)=>{
            if(err) console.log("Error in writing the file");
            console.log("I have written --->",newData);
        })
    }
})


