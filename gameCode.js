class TicTacToe {
    static SIZE = 300;
    static MIN_BUTTONS = 3;
    static MAX_BUTTONS = 10;

    constructor(size) {
        this.size = this.validateSize(size);
        this.count = 0;
        this.btns = [];
        this.x_win = 0;
        this.o_win = 0;
        this.appendPlace = document.getElementById('tttBtns');
        this.createNewBtns();
		this.statusElem = document.getElementById('status');
		this.o_win_id = document.getElementById('o_win');
		this.x_win_id = document.getElementById('x_win');
    }

    validateSize(size) {
        if (typeof size !== 'number' || size < TicTacToe.MIN_BUTTONS || size > TicTacToe.MAX_BUTTONS) {
            throw new Error('Size must be a number between 3 and 10');
        }
        return size;
    }

    createNewBtns() {
        for (let i = 0; i < this.size; i++) {
            this.btns[i] = [];
            const tr = document.createElement('tr');
            this.appendPlace.appendChild(tr);
            for (let j = 0; j < this.size; j++) {
                const btnElem = new TicTacToeBtnElem(this, i, j);
                btnElem.createBtn(tr);
                this.btns[i][j] = btnElem;
            }
        }
    }

    reset() {
        this.count = 0;
        this.clearBoard();
        this.createNewBtns();
    }

    clearBoard() {
        while (this.appendPlace.rows.length) {
            this.appendPlace.deleteRow(0);
        }
    }

    checkWinCondition(obj, text) {
        const [row, col] = obj.position.split('.').map(Number);

        if (this.count === this.size * this.size) return 'tie';

        const checkLine = (line) => line.every(cell => cell.whoClicked === text);

        const rowWin = checkLine(this.btns[row]);
        const colWin = checkLine(this.btns.map(r => r[col]));
        const diag1Win = row === col && checkLine(this.btns.map((r, i) => r[i]));
        const diag2Win = row + col === this.size - 1 && checkLine(this.btns.map((r, i) => r[this.size - 1 - i]));

        if (rowWin || colWin || diag1Win || diag2Win) return text;
    }

    updateStatus(message) {
		this.statusElem.textContent = message;
		
		this.o_win_id.value = this.o_win;
		this.x_win_id.value = this.x_win;

        // if (statusElem) {
        //     statusElem.textContent = message;
        // }
    }
}

class TicTacToeBtnElem {
    constructor(game, i, j) {
        this.game = game;
        this.div = 'td';
        this.class = 'btn btn-default';
        this.text = '+';
        this.isClicked = false;
        this.whoClicked = '';
        this.position = `${i}.${j}`;
    }

    createBtn(tr) {
        this.btn = document.createElement(this.div);
        this.btn.className = this.class;
        this.btn.textContent = this.text;
        this.btn.style.height = TicTacToe.SIZE / this.game.size + 'px';
        this.btn.style.width = TicTacToe.SIZE / this.game.size + 'px';
        this.btn.style.lineHeight = TicTacToe.SIZE / this.game.size + 'px';
        this.btn.style.padding = '0px';
        this.btn.style.margin = '2px';
        this.btn.style.fontSize = TicTacToe.SIZE / (this.game.size * 3) + 'px';
        tr.appendChild(this.btn);
        this.btn.addEventListener('click', this.clickFunc.bind(this));
    }

    clickFunc() {
        if (this.isClicked) {
            this.game.updateStatus('Already selected');
            return;
        }
		this.game.statusElem.textContent = '';
        this.isClicked = true;
        this.text = this.game.count % 2 === 0 ? 'X' : 'O';
        this.btn.textContent = this.text;
        this.whoClicked = this.text;
        this.btn.style.backgroundColor = this.text === 'X' ? '#c9f9f9' : '#55a0aa';

        this.game.count++;
        const result = this.game.checkWinCondition(this, this.text);
		console.log('result', result);
        if (result === 'tie') {
            this.game.updateStatus('It is a tie');
            this.game.reset();
        } else if (result) {
			result === 'X' ? this.game.x_win++ : this.game.o_win++;
            this.game.updateStatus(`${result} won the game`);
            // this.game[result === 'X' ? 'x_win' : 'o_win']++;
			console.log('this.game.x_win', this.game.x_win);
			console.log('this.game.o_win', this.game.o_win);
            this.game.reset();
        }
    }
}