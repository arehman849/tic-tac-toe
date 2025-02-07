var noofBtns = prompt("Please enter number of rows required");

if (noofBtns == null || noofBtns == "") 
{
    alert("Player aborted the game.");
} 
else 
{
	try {
        const game = new TicTacToe(Number(noofBtns)); 
    } catch (error) {
        console.error(error.message);
    }
}




