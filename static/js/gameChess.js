let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
let blackPieces = ["bR", "bN", "bP", "bK", "bQ", "bB"];
let whitePieces = ["wR", "wN", "wP", "wK", "wQ", "wB"];
let LEGAL_MOVES = [];
let user_color;
let board_fen;
//Create Board
function create_board(u_color) {
  const board = document.querySelector("#board");
  if (u_color == "black") {
    letters.reverse();
  }
  for (let i = 1; i <= 8; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    if (u_color == "white") {
      row.id = 9 - i;
    } else {
      row.id = i;
    }
    let comment = document.createComment(`row ${i}`);
    board.appendChild(comment);
    board.appendChild(row);
    for (e in letters) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      if (u_color == "white") {
        cell.id = letters[e] + (9 - i);
      } else {
        cell.id = letters[e] + i;
      }
      cell.setAttribute("ondragover", "allowDrop(event)");
      let x = +e + 1;
      if ((i % 2 !== 0 && x % 2 === 0) || (i % 2 === 0 && x % 2 !== 0)) {
        cell.classList.add("gray");
      }
      row.appendChild(cell);
    }
  }
  const edge = document.querySelector(".left-edge");
  const edgeb = document.querySelector(".bottom_edge");
  if (u_color == "white") {
    edge.classList.add("w_mode");
    edgeb.classList.add("bw_m");
  } else {
    edge.classList.add("b_mode");
    edgeb.classList.add("bb_m");
  }
}

//Set Pieces in start of game
function set_start_pieces_state(board_f, u_color) {
  let board_arr = board_f.split(" ")[0].split("/");
  if (u_color == "black") {
    board_arr.reverse();
    letters.reverse();
  }
  let row_index;
  let col_index;
  let pieces = "rnbqkpRNBQKP";
  for (let i = 0; i < board_arr.length; i++) {
    if (u_color == "white") {
      row_index = 8 - i;
    } else {
      row_index = i + 1;
    }
    if (board_arr[i] == "8") {
      continue;
    } else {
      row_arr = board_arr[i].split("");
      col_index = 0;
      row_arr.forEach((ele) => {
        if (pieces.indexOf(ele) != -1) {
          let cell = document.querySelector(
            `#${letters[col_index]}${row_index}`
          );
          switch (ele) {
            // Black Pieces
            case "r":
              cell.innerHTML = `<img id='bR${
                col_index + 1
              }' src="/static/imgs/chesspieces/${blackPieces[0]}.png" alt="${
                blackPieces[0]
              }" />`;
              break;
            case "n":
              cell.innerHTML = `<img id='bN${
                col_index + 1
              }' src="/static/imgs/chesspieces/${blackPieces[1]}.png" alt="${
                blackPieces[1]
              }" />`;
              break;
            case "b":
              cell.innerHTML = `<img id='bB${
                col_index + 1
              }' src="/static/imgs/chesspieces/${blackPieces[5]}.png" alt="${
                blackPieces[5]
              }" />`;
              break;
            case "q":
              cell.innerHTML = `<img id='bQ${
                col_index + 1
              }' src="/static/imgs/chesspieces/${blackPieces[4]}.png" alt="${
                blackPieces[4]
              }" />`;
              break;
            case "k":
              cell.innerHTML = `<img id='bK${
                col_index + 1
              }' src="/static/imgs/chesspieces/${blackPieces[3]}.png" alt="${
                blackPieces[3]
              }" />`;
              break;
            case "p":
              cell.innerHTML = `<img id='bP${
                col_index + 1
              }' src="/static/imgs/chesspieces/${blackPieces[2]}.png" alt="${
                blackPieces[2]
              }" />`;
              break;
            // White Pieces
            case "R":
              cell.innerHTML = `<img id='wR${
                col_index + 1
              }' src="/static/imgs/chesspieces/${whitePieces[0]}.png" alt="${
                whitePieces[0]
              }" />`;
              break;
            case "N":
              cell.innerHTML = `<img id='wN${
                col_index + 1
              }' src="/static/imgs/chesspieces/${whitePieces[1]}.png" alt="${
                whitePieces[1]
              }" />`;
              break;
            case "B":
              cell.innerHTML = `<img id='wB${
                col_index + 1
              }' src="/static/imgs/chesspieces/${whitePieces[5]}.png" alt="${
                whitePieces[5]
              }" />`;
              break;
            case "Q":
              cell.innerHTML = `<img id='wQ${
                col_index + 1
              }' src="/static/imgs/chesspieces/${whitePieces[4]}.png" alt="${
                whitePieces[4]
              }" />`;
              break;
            case "K":
              cell.innerHTML = `<img id='wK${
                col_index + 1
              }' src="/static/imgs/chesspieces/${whitePieces[3]}.png" alt="${
                whitePieces[3]
              }" />`;
              break;
            case "P":
              cell.innerHTML = `<img id='wP${
                col_index + 1
              }' src="/static/imgs/chesspieces/${whitePieces[2]}.png" alt="${
                whitePieces[2]
              }" />`;
              break;
          }
          col_index++;
        } else {
          col_index += +ele;
        }
      });
    }
  }
}

//ondragover for cells
function allowDrop(ev) {
  ev.preventDefault();
}

//make Computer Move
function computer_move(com_move) {
  let current_location = com_move.slice(0, 2);
  let target_location = com_move.slice(2, 5);
  let piece;
  document.querySelectorAll(".cell").forEach((element) => {
    if (element.id == current_location) {
      piece = element.innerHTML;
      element.innerHTML = "";
    }
  });
  document.querySelectorAll(".cell").forEach((element) => {
    if (element.id == target_location) {
      element.innerHTML = piece;
    }
  });
}

game_id = +window.location.href.split("/")[4];
let csrftoken = document.cookie.split("=")[1];

//fetch initial state
async function fetchData() {
  const response = await fetch(`/game_init/${game_id}`, { method: "GET" });
  const data = await response.json();
  return data;
}

// Render the page with the received data
async function renderPage() {
  const data = await fetchData();
  user_color = data["user_color"];
  data["legal_moves"].forEach((move) => LEGAL_MOVES.push(move));
  board_fen = data["board"];
  //Start creating Game
  create_board(user_color);
  set_start_pieces_state(board_fen, user_color);

  /************************** */
  //Drag and Drop Pieces User Move
  let cells = document.querySelectorAll(".cell");
  let user_m;
  cells.forEach((elementDrag) => {
    elementDrag.ondragstart = (eventDrag) => {
      if (eventDrag.target.nodeName !== "DIV") {
        let my_piece_id = eventDrag.target.id;
        eventDrag.dataTransfer.setData("Text", my_piece_id);
        let parentID = eventDrag.target.parentElement.id;

        cells.forEach((elementDrop) => {
          elementDrop.ondrop = (eventDrop) => {
            if (eventDrop.target.nodeName == "IMG") {
              user_m = `${parentID}${eventDrop.target.parentElement.id}`;
            } else {
              user_m = `${parentID}${eventDrop.target.id}`;
            }
            if (LEGAL_MOVES.includes(user_m)) {
              if (eventDrop.target.nodeName !== "IMG") {
                let data = eventDrop.dataTransfer.getData("Text");
                eventDrop.target.appendChild(
                  document.querySelector(`#${data}`)
                );
              } else {
                let enemyA = Array(eventDrop.target.parentElement.childNodes);
                let enemy = enemyA[0][0];
                if (my_piece_id[0] !== enemy.id[0]) {
                  let dead_piece = document.getElementById(enemy.id);
                  // DEAD_PIECES.push(dead_piece);
                  let data = eventDrop.dataTransfer.getData("Text");
                  const piece_mv = document.querySelector(`#${data}`);
                  eventDrop.target.parentElement.appendChild(piece_mv);
                  dead_piece.remove();
                }
              }
              //send and receive moves
              let sending = { user_move: user_m };
              fetch(`/game_init/${game_id}/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify(sending),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data["game_over"] == true) {
                    let result = data["result"];
                    const result_box = document.querySelector(".result-box");
                    const overlay = document.querySelector(".overlay");
                    const result_num = document.querySelector("#result-num");
                    const winner = document.querySelector("#winner");
                    result_num.innerHTML = result;

                    if (result == "1-0") {
                      winner.innerHTML = "WHITE";
                      winner.classList.add("winner-white");
                    } else if (result == "0-1") {
                      winner.innerHTML = "BLACK";
                      winner.classList.add("winner-black");
                    } else {
                      winner.innerHTML = "DRAW";
                    }
                    overlay.classList.remove("hide");
                    result_box.classList.remove("hide");
                  } else {
                    let COMPUTER_MOVE = data["computer_move"];
                    //Doing a Computer Move
                    if (COMPUTER_MOVE) {
                      computer_move(COMPUTER_MOVE);
                    }
                    LEGAL_MOVES.length = 0;
                    data["legal_moves"].forEach((move) =>
                      LEGAL_MOVES.push(move)
                    );
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              eventDrop.preventDefault();
            }
            eventDrop.preventDefault();
          };
        });
      }
    };
  });
}
// Call the renderPage function to start rendering the page
renderPage();
