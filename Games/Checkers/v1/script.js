(function(){
  const BOARD_SIZE = 8;
  const boardEl = document.getElementById('board');
  const turnIndicator = document.getElementById('turn-indicator');
  const turnLabel = document.getElementById('turn-label');
  const capturedRedEl = document.getElementById('captured-red');
  const capturedBlueEl = document.getElementById('captured-blue');
  const gameEndEl = document.getElementById('game-end');
  const endText = document.getElementById('end-text');
  const resetBtn = document.getElementById('reset-btn');

  let board = [], currentPlayer = 'red', selected = null;
  let validMoves = [], captured = { red:0, blue:0 }, gameStatus = 'playing';

  const inBounds = (r,c) => r>=0 && r<BOARD_SIZE && c>=0 && c<BOARD_SIZE;

  function createInitial(){
    board = Array.from({length:BOARD_SIZE}, ()=>Array(BOARD_SIZE).fill(null));
    for(let r=0;r<3;r++) for(let c=0;c<BOARD_SIZE;c++) if((r+c)%2===1) board[r][c]={player:'red',type:'regular'};
    for(let r=5;r<8;r++) for(let c=0;c<BOARD_SIZE;c++) if((r+c)%2===1) board[r][c]={player:'blue',type:'regular'};
  }

  function getValid(r,c){
    const piece = board[r][c]; if(!piece) return [];
    const dirs = piece.type==='king'
      ? [[-1,-1],[-1,1],[1,-1],[1,1]]
      : (piece.player==='red' ? [[1,-1],[1,1]] : [[-1,-1],[-1,1]]);
    const moves=[];
    dirs.forEach(([dr,dc])=>{
      const [nr,nc] = [r+dr,c+dc];
      if(inBounds(nr,nc)&&!board[nr][nc]) moves.push({row:nr,col:nc});
      const jr=r+2*dr,jc=c+2*dc;
      if(inBounds(jr,jc)&&board[nr][nc]&&board[nr][nc].player!==piece.player&&!board[jr][jc])
        moves.push({row:jr,col:jc,capture:{row:nr,col:nc}});
    });
    return moves;
  }

  function canCapture(player){
    return board.some((row,r)=>row.some((pc,c)=>{
      return pc && pc.player===player && getValid(r,c).some(m=>m.capture);
    }));
  }

  function render(){
    boardEl.innerHTML='';
    gameEndEl.classList.add('hidden');
    turnIndicator.className = `w-4 h-4 rounded-full border-2 ${currentPlayer==='red'?'bg-red-500 border-red-600':'bg-blue-500 border-blue-600'}`;
    turnLabel.textContent = currentPlayer.charAt(0).toUpperCase()+currentPlayer.slice(1);
    turnLabel.className = currentPlayer==='red'?'text-red-400 font-medium':'text-blue-400 font-medium';
    capturedRedEl.textContent = captured.red;
    capturedBlueEl.textContent = captured.blue;

    const forced = [];
    board.forEach((row, r) => row.forEach((pc, c) => {
      if (pc && pc.player === currentPlayer) {
        const moves = getValid(r, c);
        if (moves.some(m => m.capture)) forced.push(`${r},${c}`);
      }
    }));

    board.forEach((row,r)=>row.forEach((pc,c)=>{
      const sq = document.createElement('button');
      sq.dataset.row=r; sq.dataset.col=c;
      const isDark=(r+c)%2===1;
      sq.className = `aspect-square relative flex items-center justify-center transition-all duration-200 rounded-lg ${
        isDark? 'bg-amber-800 hover:bg-amber-700'
               : 'bg-amber-100 hover:bg-amber-50'
      }`;

      const coord = `${r},${c}`;
      if (forced.includes(coord)) sq.classList.add('ring-2', 'ring-red-400');

      if(selected && selected.row===r && selected.col===c) sq.classList.add('ring-4','ring-yellow-400');
      if(validMoves.some(m=>m.row===r && m.col===c)) sq.classList.add('ring-4','ring-green-400');
      sq.disabled = gameStatus!=='playing';

      if(pc){
        const div = document.createElement('div');
          div.className = `piece-hover pawn-base ${
            pc.player==='red' ? 'bg-red-500' : 'bg-blue-500'
          } border border-gray-700 shadow-inner transition-all duration-200 ease-in-out`;


        const top = document.createElement('div');
        top.className = `pawn-top ${
          pc.player==='red' ? 'bg-red-400' : 'bg-blue-400'
        }`;

        if(pc.type==='king') top.classList.add('ring-2','ring-yellow-400');

        div.appendChild(top);
        sq.appendChild(div);
      } else if(validMoves.some(m=>m.row===r && m.col===c)){
        const hint = document.createElement('div');
        hint.className = "w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-400 opacity-80 animate-pulse";
        sq.appendChild(hint);
      }
      sq.addEventListener('click', onClick);
      boardEl.appendChild(sq);
    }));

    if(gameStatus!=='playing'){
      endText.textContent = gameStatus==='red-wins' ? 'Red Wins!' :
                            gameStatus==='blue-wins' ? 'Blue Wins!' : 'Draw!';
      gameEndEl.classList.remove('hidden');
    }
  }

  function onClick(e){
    const r=+e.currentTarget.dataset.row, c=+e.currentTarget.dataset.col;
    const piece = board[r][c];
    if(selected){
      const mv = validMoves.find(m=>m.row===r && m.col===c);
      if(mv){ doMove(selected.row, selected.col, mv); return; }
    }
    if(piece && piece.player===currentPlayer){
      selected={row:r,col:c};
      validMoves = getValid(r,c);
      if(canCapture(currentPlayer)) validMoves = validMoves.filter(m=>m.capture);
    } else selected=null, validMoves=[];
    render();
  }

  function doMove(fr,fc,move){
    const pc = board[fr][fc];
    board[move.row][move.col] = pc;
    board[fr][fc] = null;
    if(move.capture){
      board[move.capture.row][move.capture.col] = null;
      captured[ currentPlayer==='red'?'blue':'red' ]++;
    }
    if((pc.player==='red'&&move.row===BOARD_SIZE-1)||(pc.player==='blue'&&move.row===0)){
      board[move.row][move.col]={...pc,type:'king'};
    }
    const more = move.capture && getValid(move.row,move.col).some(m=>m.capture);
    currentPlayer = more ? currentPlayer : (currentPlayer==='red'?'blue':'red');
    selected = more ? {row:move.row,col:move.col} : null;
    validMoves = more ? getValid(move.row,move.col).filter(m=>m.capture) : [];

    if(!board.flat().some(p=>p&&p.player!==currentPlayer)) gameStatus = currentPlayer+'-wins';
    render();
  }

  resetBtn.onclick = ()=>{ currentPlayer='red'; captured={red:0,blue:0}; gameStatus='playing'; selected=null; validMoves=[]; createInitial(); render(); };

  createInitial(); 
  render();
})();
