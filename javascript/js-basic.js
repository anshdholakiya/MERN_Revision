let an = "ansh";
console.log(an);

const nums = [1, 2, 3, 4];
nums.forEach((n)=>console.log(n))

function fakeapi(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve("data reciverd")
        }, 1000);
    }) 
}

async function getData(){
    const result = await fakeapi();
    console.log( result);
}

getData();

