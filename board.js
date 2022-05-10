const winningPos = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[1,4,7],
	[2,5,8],
	[3,6,9],
	[1,5,9],
	[3,5,7]
];
let currentPlayer = 0;

const players = [
	{
		name: "Me",
		symbol: 'X'
	},
	{
		name: "You",
		symbol: 'O'
	}
];

alreadyChecked = (ev) => {
	return ev.currentTarget.classList.contains('X') || ev.currentTarget.classList.contains('O');
}

checkWinner = (currentPlayer) => {
	let checkedArray = [],
		playerWon = false, 
		playedSymbol = players[currentPlayer].symbol;
	document.querySelectorAll('.' + playedSymbol).forEach((el) => {
		checkedArray.push(Number(el.getAttribute('postion')))
	})
	
	winningPos.forEach(set => {
		let hasLost = false;
		set.forEach(pos => {
			if (!checkedArray.includes(pos)) {
				hasLost = true;
				return;
			}
		})
		if (!hasLost) {
			playerWon = true;
			return;
		}
	});

	return playerWon;
}

let count = 1;

document.querySelectorAll("li").forEach(box => {
	box.addEventListener('click', ev => {
		console.log(count)
		if (alreadyChecked(ev)) {
			alert('Already checked');
		} else {
			ev.currentTarget.innerHTML = players[currentPlayer].symbol;
			ev.currentTarget.classList.add('class', players[currentPlayer].symbol);
		}
		if (checkWinner(currentPlayer)) {
			document.querySelector(".disable-board").classList.add('is-faded-out')
			alert(`Game Over!, ${players[currentPlayer].name} won`);
		} else if (count === 9) {
			document.querySelector(".disable-board").classList.add('is-faded-out')
			alert('Game ended in tie');
		} else {
			currentPlayer = currentPlayer === 0 ? 1 : 0;
			count++;
		}
	})

})
