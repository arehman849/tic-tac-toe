
var ticTacToebtnElems = function() {
	this.div='td';
	this.class='btn btn-default';
	this.text='+';
	this.isClicked=false;
	this.whoClicked='';
	this.position;
}

ticTacToebtnElems.prototype.createBtn = function(tr,i,j) {
	this.btn = document.createElement(this.div);
	this.btn.className = this.class;
	this.btn.textContent = this.text;
	this.position = i +'.'+j;
	this.btn.style.height = size/noofBtns+'px';
	this.btn.style.width = size/noofBtns+'px';
	this.btn.style.lineHeight = size/noofBtns+'px';
	this.btn.style.padding = '0px';
	this.btn.style.margin = '2px';
	this.btn.style.fontSize = size/(noofBtns*3)+'px';
		 tr.appendChild(this.btn);
	this.click = this.btn.addEventListener('click', clickFunc.bind(this));
};

var clickFunc = function() {

	if(this.isClicked)
	{
		alert('already selected');
	}
	else if(!this.isClicked)
	{
		this.isClicked = true;
		count % 2 > 0 ? this.text = 'X' : this.text = 'O';
		this.btn.textContent = this.text;
		this.whoClicked = this.text;

		if(this.text == 'X')
		{
			this.btn.style.backgroundColor = '#c9f9f9';
		}
		else if(this.text == 'O')
		{
			this.btn.style.backgroundColor = '#55a0aa';
		}

		count++;
		var whoWon = winCondition(this,this.text);

		if(whoWon == 1)
		{
			count = 0;
			deleteRow();
			createNewBtns();
			alert('It is a tie');
		}
		else if(whoWon == 'X')
		{
			x_win_id.value = ++x_win;
			btns.length = 0;
			count = 0;
			deleteRow();
			createNewBtns();
			alert('X won the game');
		}
		else if(whoWon == 'O')
		{
			o_win_id.value = ++o_win;
			btns.length = 0;
			count = 0;
			deleteRow();
			createNewBtns();
			alert('O won the game');
		}
	}
};

var winCondition = function(obj,text) {

	var res = obj.position.split('.');
	var player;
	text == 'O'?player = 'X':player = 'O'

	if(count == noofBtns*noofBtns)
	{
		return 1;
	}

	for(var i = 0; i < noofBtns; i++)
	{
		if(btns[res[0]][i].whoClicked == text)
		{
			arrHorWin.push(btns[res[0]][i].text);
		}
	}

	for(var i = 0; i < noofBtns; i++)
	{
		if(btns[i][res[1]].whoClicked == text)
		{
			arrVerWin.push(btns[i][res[1]].text);
		}
	}

	if((res[0] == 0) && (res[1] == 0) || 
	   (res[0] == 1) && (res[1] == 1) ||
	   (res[0] == 2) && (res[1] == 2) ||
	   (res[0] == 3) && (res[1] == 3) ||
	   (res[0] == 4) && (res[1] == 4) ||
	   (res[0] == 5) && (res[1] == 5) ||
	   (res[0] == 6) && (res[1] == 6) ||
	   (res[0] == 7) && (res[1] == 7) ||
	   (res[0] == 8) && (res[1] == 8) ||
	   (res[0] == 9) && (res[1] == 9) )
	{
	   	if(arrDiagWin.length == 0)
	   	{
			for (var i = 0; i < noofBtns; i++)
			{
				if(btns[i][i].whoClicked == text)
				{
					arrDiagWin.push(btns[i][i].text)
				}
			}
		}
	}
	if((res[0] == 0) && (res[1] == noofBtns-1) ||
	   (res[0] == 1) && (res[1] == noofBtns-2) ||
	   (res[0] == 2) && (res[1] == noofBtns-3) ||
	   (res[0] == 3) && (res[1] == noofBtns-4) ||
	   (res[0] == 4) && (res[1] == noofBtns-5) ||
	   (res[0] == 5) && (res[1] == noofBtns-6) ||
	   (res[0] == 6) && (res[1] == noofBtns-7) ||
	   (res[0] == 7) && (res[1] == noofBtns-8) ||
	   (res[0] == 8) && (res[1] == noofBtns-9) ||
	   (res[0] == 9) && (res[1] == noofBtns-10) )
	{
	   	if(arrDiagWin.length == 0)
	   	{
			for (var i = 0; i < noofBtns; i++)
			{
				if(btns[i][noofBtns-1-i].whoClicked == text)
				{
					arrDiagWin.push(btns[i][noofBtns-1-i].text)
				}
			}
		}
	}

	if(arrHorWin.length == noofBtns)
	{
		if(arrHorWin.indexOf(player) < 0)
		{
			return text;
		}
	}
	else
	{
		arrHorWin = [];
	}

	if(arrVerWin.length == noofBtns)
	{
		if(arrVerWin.indexOf(player) < 0)
		{
			return text;
		}
	}
	else
	{
		arrVerWin = [];
	}

	if(arrDiagWin.length == noofBtns)
	{
		if(arrDiagWin.indexOf(player) < 0)
		{
			return text;
		}
	}
	else
	{
		arrDiagWin = [];
	}
}

var deleteRow = function(){
	arrHorWin = [];
	arrVerWin = [];
	arrDiagWin = [];
	while(appendPlace.rows.length)
	{
		appendPlace.deleteRow(0);	
	}
}

var createNewBtns = function(){
	if(noofBtns < 3 || noofBtns > 10)
	{
		alert('please enter in range of 3 to 10');
		window.location.reload();
	}
	else
	{
		for (var i = 0; i<noofBtns; i++)
		{
			btns[i] = [];
			var tr = document.createElement('tr');
			appendPlace.appendChild(tr);
				
			for(var j=0; j<noofBtns; j++)
			{
				btns[i][j] = new ticTacToebtnElems();
				btns[i][j].createBtn(tr,i,j);
			}
		}
	}
}

var reset = function(){
	count = 0;
	deleteRow();
	createNewBtns();
}
//443743932339