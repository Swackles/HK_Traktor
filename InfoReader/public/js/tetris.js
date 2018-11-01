let gameInterval = null;
let timer = 1000;

function drawMap() {
    game = JSON.parse(sessionStorage.getItem("game"));

    canvas = document.getElementById("canvasUI");

    var clear = canvas.getContext("2d");

    clear.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!game.map) throw new Error("Missing map");

    for (let i = 0; i < game.map.length; i++) {
        const row = String(game.map[i]).split("").reverse();            
        for (let x = 0; x < row.length; x++) {
            var rect = canvas.getContext("2d");
            if (row[x] == 1) {
                rect.fillStyle = "#000000";                
                rect.fillRect(30 * (9 - x), 30 * i, 30, 30);
            } 
        }            
    }

    for (let i = 0; i < game.player.length; i++) {
        const row = String(game.player[i]).split("").reverse();            
        for (let x = 0; x < row.length; x++) {
            var rect = canvas.getContext("2d");
            if (row[x] == 1) {
                rect.fillStyle = "#000000";                
                rect.fillRect(30 * (9 - x), 30 * i, 30, 30);
            } 
        }            
    }

    if (document.getElementById("drawGrid").checked) {
        for(let i = 1; i < 10; i++) {
            let line = canvas.getContext("2d");
            line.beginPath();
            line.moveTo(30 * i, 0);
            line.lineTo(30 * i, canvas.height);
            line.stroke();
        }

        for(let i = 1; i < 20; i++) {
            let line = canvas.getContext("2d");

            line.beginPath();
            line.moveTo(0, 30 * i);
            line.lineTo(canvas.width, 30* i);
            line.stroke();
        }
    }
}

let move = {
    down() {
        let game = JSON.parse(sessionStorage.getItem("game"));

        if (game.height == 0) {
                
        } else {
            game.height--;
            game.player = [];
    
            let spriteRow = 0;
    
            for (var i = 0; i < 20; i++) {
                if (i >= game.height && spriteRow < game.queue[0].length ) {
                    game.player.push(game.queue[0][spriteRow]);
                    spriteRow++;
                } else {
                    game.player.push(0);
                }
            }

            game.player.reverse();
            window.sessionStorage.setItem("game", JSON.stringify(game));
        }
    },






    right() {
        try {
            let game = JSON.parse(sessionStorage.getItem("game"));

            for(let i = 0; i < game.queue[0].length; i++) {
                
                if (String(game.queue[0][i]).split("")[String(game.queue[0][i]).length - 1] == 1) throw new Error();

                game.queue[0][i] = parseInt(String(game.queue[0][i]).substr(0, String(game.queue[0][i]).length - 1));
            }

            for(let i = 0; i < game.player.length; i++) {
                
                if (String(game.player[i]).split("")[String(game.player[i]).length - 1] == 1) throw new Error();

                game.player[i] = parseInt(String(game.player[i]).substr(0, String(game.player[i]).length - 1));
            }

            window.sessionStorage.setItem("game", JSON.stringify(game));
        } catch { }
    },


    left() {
        try {
            let game = JSON.parse(sessionStorage.getItem("game"));

            for(let i = 0; i < game.queue[0][i]; i++) {
        
                if (String(game.queue[0][i]).length == 10) throw new Error();

                game.queue[0][i] = parseInt(String(game.queue[0][i])+ "0");
            }

            for(let i = 0; i < game.player.length; i++) {
        
                if (String(game.player[i]).length == 10) throw new Error();

                game.player[i] = parseInt(String(game.player[i])+ "0");
            }

            window.sessionStorage.setItem("game", JSON.stringify(game));
        } catch { }
    }
}

//Start the game
function gameStart() {
    gameInterval = setInterval(() => {
        console.log("down");
        move.down();
    }, timer);
}

window.onload = () => {
    //create the canvas
    var canvas = document.getElementsByTagName("main")[0].appendChild(document.createElement("canvas"));

    canvas.style.border = "1px solid #000000";
    canvas.style.margin = "100px 300px";

    canvas.width = 300;
    canvas.height = 600;

    canvas.id = "canvasUI";

    //create the game
    var game = {
        map: [],
        player: [],
        chars: [[1111000], [1111000, 1000], [1111000, 1000000], [110000, 110000], [11000, 110000], [111000, 10000], [110000, 11000]],
        queue: [],
        height: 21

    };

    for(let i = 0; i < 20; i++) {

        game.map.push(0);            
    }

    for (let i = 0; i < 5; i++) {
        game.queue.push(game.chars[Math.floor(Math.random() * 7)]);
    }

    window.sessionStorage.setItem("game", JSON.stringify(game));

    gameStart();
    
    setInterval(() => {        
        drawMap();      
    }, 16);
}

document.onkeydown = (event) => {
    game = JSON.parse(sessionStorage.getItem("game"));
    
    switch(event.key) {
        case "a" || "ArrowLeft":
            console.log("left");
            move.left();
            break;
        
        case "d" || "ArrowRight":
            move.right();
            break;
        case "s" || "ArrowDown":
            move.down();
            break;
    }
}