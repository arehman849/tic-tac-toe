var appendPlace = document.getElementById('tttBtns');
var btns = [];
var count = 0;
var noofBtns;
var size = 400;
var sum = 1;
var o_win = 0;
var x_win = 0;
var o_win_id = document.getElementById('o_win');
var x_win_id = document.getElementById('x_win');
var arrHorWin = [];
var arrVerWin = [];
var arrDiagWin = [];
var resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click',reset);


var noofBtns = prompt("Please enter number of rows required");

if (noofBtns == null || noofBtns == "") 
{
    alert("Player aborted the game.");
} 
else 
{
	createNewBtns();
}




