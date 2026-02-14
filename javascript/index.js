// do{
//     guess = parseInt(prompt("Guess a number"));

//     if(guess == 2) console.log("youwin")
// }while(guess != 0)



//! normal function\

// function addNumbers(){
//     console.log(a,b);
//     console.log(arguments[0]);  //! arguments 

//     console.log(typeof(arguments))
//     let ans = 0;
//     for (let index = 0; index < arguments.length; index++) {
//         ans += arguments[index]; 
//     }

//     console.log("answer is  " + ans);
// }

// function addNumbers(...numbers){
//     console.log(typeof(numbers));
//     console.log(numbers);

// }

// addNumbers(1,2,3,4,5,5);

//! arrow funciton

// const add = (a,b) => a+b;
// console.log(add(1,2));


//! hoisting

const sayHello=()=>{console.log("hi");}
sayHello();

//! this keyword

const obj = {
    value : 20,
    Myfunction : function(){
        console.log(  this.value);
    },

    arrowFunction: ()=>{
        console.log(this.value);
    }
}

obj.Myfunction();
obj.arrowFunction();



// alert("hi"); 
// prompt("hi ansh");