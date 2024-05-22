/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

async function sleep(milliseconds) {
    let pro = new Promise (async (resolve, reject)=>{
        await setTimeout(()=>{
            resolve();
        }, milliseconds);
    });
    return pro;
}


module.exports = sleep;
