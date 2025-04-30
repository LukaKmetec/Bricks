function drawIt() {
    var x = 300;
    var y = 200;
    var dx = 2;
    var dy = 4;
    var WIDTH;
    var HEIGHT;
    var r = 10;
    var tocke;
    var bricks;
    var bricks1;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
    var ctx;
    let intervalId;
    var rightDown = false;
    var leftDown = false;
    var paddlex;
    var paddleh;
    var paddlew;
    var polja=0;
    var flag = false;
    
    function init() {
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        tocke=0;
        $("#tocke").html(tocke);
        return intervalId = setInterval(draw, 10);
    }

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function init_paddle() {
        paddlex = WIDTH / 2;
        paddleh = 15;
        paddlew = 150;
    }

    function onKeyDown(evt) {
        if (evt.keyCode == 39)
            rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
    }

    function onKeyUp(evt) {
        if (evt.keyCode == 39)
            rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
    }
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    document.addEventListener("mousemove", mouseMoveHandler, false);
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddlex = relativeX - paddlew / 2;
        }
    }

    function konec(){
        if(polja==35){
            clearInterval(intervalId); 
            Swal.fire({
                title: "Zmaga!",
                text: "Zadel si vse brick-e",
                icon: "success"
              });       
        }
    }
    
    function draw() {
        konec();
        clear();
        circle(x, y, 10);


        if (rightDown) {
            if ((paddlex + paddlew) < WIDTH) {
                paddlex += 7;
            } else {
                paddlex = WIDTH - paddlew;
            }
        }
        else if (leftDown) {
            if (paddlex > 0) {
                paddlex -= 7;
            } else {
                paddlex = 0;
            }
        }
        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

        for (i = 0; i < NROWS; i++) {
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    ctx.fillStyle=bricks1[i][j];
                    rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }
        ctx.fillStyle = "black";

        rowheight = BRICKHEIGHT + PADDING / 2; 
        colwidth = BRICKWIDTH + PADDING / 2;
        row = Math.floor(y / rowheight);
        col = Math.floor(x / colwidth);

        
        if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy; bricks[row][col] = 0; polja +=1;
            if(bricks2[row][col]==5){
                tocke +=5;
            }
            else if(bricks2[row][col]==4){
                tocke +=4;
            }
            else if(bricks2[row][col]==3){
                tocke +=3;
            }
            else if(bricks2[row][col]==2){
                tocke +=2;
            }
            else if(bricks2[row][col]==1){
                tocke +=1;
            }
            
            $("#tocke").html(tocke);
        }
        
        if (x + dx > WIDTH - r || x + dx < r)
            dx = -dx;
        if (y + dy < 0 + r)
            dy = -dy;
        else if (y + dy > HEIGHT - r) {
            if (x > paddlex && x < paddlex + paddlew) {
                dy = -dy;
                dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
            }
            else if (y + dy > HEIGHT - r){
                clearInterval(intervalId);
                Swal.fire({
                    title: "Izgubil si!",
                    text: "Žogica ti je ušla",
                    icon: "error"
                  }); 
            }
        }
        
        x += dx;
        y += dy;
        
    }

    function initbricks() { 
        var barv;
        var toc = 0;
        NROWS = 7;
        NCOLS = 5;
        BRICKWIDTH = (WIDTH / NCOLS) - 1;
        BRICKHEIGHT = 15;
        PADDING = 1;
        bricks = new Array(NROWS);
        bricks1 = new Array(NROWS);
        bricks2 = new Array(NROWS);
        for (var i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            bricks1[i] = new Array(NCOLS);
            bricks2[i] = new Array(NCOLS);
            for (var j = 0; j < NCOLS; j++) {
                let rand = Math.random() * 100;
                console.log(rand);
                if (rand >= 95) {
                    barv = "red";
                    toc = 5;
                }
                else if(rand<95 && rand>=86){
                    barv = "blue";
                    toc = 4;
                }
                else if(rand<85 && rand>=75){
                    barv="green";
                    toc = 3;
                }
                else if(barv<74 && barv>=32){
                    barv="yellow";
                    toc = 2;
                }
                 else {
                    barv = "purple";
                    toc = 1;
                }
                bricks[i][j] = 1;
                bricks1[i][j] = barv;
                bricks2[i][j] = toc;  
            }
        }
    }



    init();
    init_paddle();
    initbricks();
    
}