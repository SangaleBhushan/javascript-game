// 1. deposite money
// 2. Determine the number of line to bet on  
// 3. collect the bet ammount
// 4. spin the slot of machine
// 5. check if the user won 
// 6. give the user their winning prize
// 7. play again
const prompt = require("prompt-sync")();
const ROWS=3;
const COl=3;
const Symbol_cont={
     A:2,
     B:4,
     C:6,
     D:8
}
const Symbol_Value={
    A:5,
    B:4,
    D:2,
    C:3,
}

const deposite=()=>{
    while(true){
   const depositAmmount= prompt("Enter the deposite Money:  ");
   const numberDepositeammount=parseFloat(depositAmmount);
   if(isNaN(numberDepositeammount)|| numberDepositeammount <=0){
    console.log("Invalide Deposie Ammount , try again");
   }else{
    return depositAmmount;
   }
}
};
const getNumberOflines=()=>{
    while(true){
        const lines= prompt("Enter the line to be bet on(1-3):  ");
        const numberLines=parseInt(lines);
        if(isNaN(numberLines)|| numberLines <=0|| numberLines>3){
         console.log("Invalide number of line , try again");
        }else{
         return numberLines;
        }
     }

};

const getBet= (balance,Line) =>{
    while(true){
        const getBetn= prompt("Enter the   bet on per line:  ");
        const betnumber=parseFloat(getBetn);
        if(isNaN(betnumber)|| betnumber<=0 ||betnumber > balance/Line){
         console.log("Invalide Bet NO  , try again");
        }else{
         return betnumber;
        }
     }
}

const spin = () =>{
       const Symbols=[];
       for(const[Symbol, count] of Object.entries(Symbol_cont)){
         for(let i =0 ;i<count;i++){
            Symbols.push(Symbol);
         }
       }
       let reels = Array.from(Array(3),()=> new Array(3));// imp thing i learn from this
       
       for(let i =0; i <COl ;i++){
          const realSymbols=[...Symbols];
           for(let j=0; j< ROWS ;j++){
             const randomIndex= Math.floor(Math.random()*realSymbols.length);
             const selectedSymbol=realSymbols[randomIndex];
             reels[i][j]=selectedSymbol; 
             realSymbols.splice(randomIndex,1);
        }
       }
       return reels;
};

const transpose = (reel) =>{
    const row=Array.from(Array(3),()=> new Array(3));
    for(let i=0;i<ROWS;i++){
     for(let j=0;j<COl;j++){
        row[i][j]=reel[j][i];
     }
    }
    return row;
}

const  slowMachine=(rows)=>{
    for(const row of rows){
         let rowString ="";
         for(const[i,Symbol]of row.entries()){
            rowString+=Symbol;
            if(i != row.length-1){
                rowString+=" | ";
            }
         }
         console.log(rowString);
    }
};
const getWinnings= (rows, bet,line)=>{
 let wining =0;

     for(let i =0 ;i<line ;i++){ 
       const Symbols= rows[i];
       let allSame =true;
       
       for(const symbol of Symbols){
        if(symbol != Symbols[0]){
            allSame=false;
            break;        }
       }
       if(allSame){
        wining+= bet*Symbol_Value[Symbols[0]]
       }
 }
 return wining; 
};
const Game= () =>{
    let balance = deposite();
    while(true){
        console.log("you hav current balance is $"+ balance);
        const line = getNumberOflines();
        const bet=getBet(balance,line);
        balance-= bet*line;
        const reel=spin();
        const rows= transpose(reel);
        slowMachine(rows);
        const winning = getWinnings(rows,bet,line);
        if(winning===parseFloat(0)){
            console.log("you lose ,$"+bet*line);
        }
        balance=balance+winning;
        console.log("You won , $"+winning.toString());
        console.log("You current Balance  , $"+balance);
        if(balance<=0){
            console.log("you ran out of money !");
            break;
        }
        const playAgain= prompt("do you want to play again?(y/n)");
        if(playAgain!="y" ) break;
    
    }
        
};

Game();