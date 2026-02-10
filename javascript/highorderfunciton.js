//! high order funciton


function add(a,b,cb){
    let result = a+b;
    cb(result);
}

function showResult(result){
    console.log(result);
}

add(2,30,showResult);