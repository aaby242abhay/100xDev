// <!-- ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout) -->

let i = 0;

function call(){
    setTimeout(()=>{
        console.log(i++);
        call();
    },1*1000);
}
call();
