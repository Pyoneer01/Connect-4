
let player = "red";
let columnStatus = [0, 0, 0, 0, 0, 0, 0];
const boxes = $("#board>div");
boxes.css("cursor", "pointer");
let running = false;
let turns = 42;
let started = false;
const wins = [[0, 1, 2, 3], [7, 8, 9, 10], [14, 15, 16, 17], [21, 22, 23, 24], [28, 29, 30, 31], [35, 36, 37, 38], [1, 2, 3, 4], 
[8, 9, 10, 11], [15, 16, 17, 18], [22, 23, 24, 25], [29, 30, 31, 32], [36, 37, 38, 39], [2, 3, 4, 5], [9, 10, 11, 12], [16, 17, 18, 19], 
[23, 24, 25, 26], [30, 31, 32, 33], [37, 38, 39, 40], [3, 4, 5, 6], [10, 11, 12, 13], [17, 18, 19, 20], [24, 25, 26, 27], [31, 32, 33, 34], 
[38, 39, 40, 41], [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23], [3, 10, 17, 24], [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27], 
[7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34], [14, 21, 28, 35], 
[15, 22, 29, 36], [16, 23, 30, 37], [17, 24, 31, 38], [18, 25, 32, 39], [19, 26, 33, 40], [20, 27, 34, 41], [0, 8, 16, 24], [1, 9, 17, 25], 
[2, 10, 18, 26], [3, 11, 19, 27], [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34], [14, 22, 30, 38], [15, 23, 31, 39], 
[16, 24, 32, 40], [17, 25, 33, 41], [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24], [10, 16, 22, 28], [11, 17, 23, 29], 
[12, 18, 24, 30], [13, 19, 25, 31], [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38]];

function capitalize(word){
    return word[0].toUpperCase() + word.substring(1, word.length)
}

function changePlayer(){
    player = player == "yellow" ? "red" : "yellow";
}

function isWin(){
    let i, j, col, box, boxValue, winStateArray;
    for(i = 0; i<wins.length; i++){
        winStateArray = [];
        for(j = 0; j<4; j++){
            boxValue = wins[i][j];
            col = $(".col" + (boxValue%7 + 1)); //selecting column
            box = col[Math.floor(boxValue/7)];
            winStateArray.push(box);
            if( ! box.classList.contains(player) ) //selecting particular element in that column
                break;
        }
        //indicates for loop ran without break, so a win state has been attained
        if(j == 4){
            for(j = 0; j<4; j++)
                winStateArray[j].classList.add("win");
            return true; 
        }
    }
    return false;
}

function restart(){
    started = false;
    running = false;
    turns = 42;
    player = "red";
    columnStatus = [0, 0, 0, 0, 0, 0, 0];
}

$(document).click(function() {
    if (!started) {
        boxes.removeClass("win");
        boxes.removeClass("yellow");
        boxes.removeClass("red");
        $("#player-turn").text("Red starts!");
        $("#player-turn").fadeIn();
        started = true;
    }
});

boxes.click(function(){
    if(!running && started){ 
        running = true;
        const colNum = this.classList[0].substr(-1); //getting col no.
        const occupiedBoxes = columnStatus[colNum-1];
        if( occupiedBoxes < 6){
            const selectedCol = $(".col" + colNum);
            let pos = 0;
            let loop = setInterval(coinDrop, 250); 
            function coinDrop(){
                try{
                    selectedCol[pos-1].classList.remove(player); //removing coin from upper box, if pos is 0, error will be encountered
                }
                catch{
                }
                selectedCol[pos].classList.add(player);
                pos++;
                if(pos == 6 - occupiedBoxes){ //final state of a coin drop
                    clearInterval(loop);
                    columnStatus[colNum-1]++;
                    if(isWin()){
                        $("#player-turn").text(capitalize(player) + " wins!");
                        restart();
                        return;
                    }
                    changePlayer();
                    running = false;
                    $("h2").text(capitalize(player) + "'s Turn");
                    turns--;
                    if(turns == 0){
                        $("#player-turn").text("It's a Draw!");
                        restart();
                        return;
                    }  
                }
            }
        }
    }
});
