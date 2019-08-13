// Reset the game when the player catches a monster
var reset = function () {
    text = document.getElementById("mytext").value;
    areas = new Array();
    radicals = new Array();
    canvass = new Array();
    ctxs = new Array();
    grays = new Array();
    for (i = 0; i < canvas.width; i++) {
        grays[i] = new Array();
        for (j = 0; j < canvas.height; j++) {
            grays[i][j] = new groy();
        }
    }
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    itsTime = 1;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
    control(modifier);
    if (itsTime < 2) {
        scanImg(winky);
        newRadical(areas);
        for (i = 0; i < areas.length; i++) {
            radical2image(i, areas[i].width, areas[i].height);
        }
        for (i = 0; i < winky.length; i++) {
            clssb[i] = true;
        }
        // ctxf.fillStyle = "#000000";
        // ctxf.fillRect(0,0,canvasf.width,canvasf.height);
        modifier = 1 / 60;
    }
    // monster.x += (hero.x-monster.x)*modifier*2;
    // monster.y += (hero.y-monster.y)*modifier*2;
    if (
        hero.x <= (monster.x + 32) &&
        monster.x <= (hero.x + 32) &&
        hero.y <= (monster.y + 32) &&
        monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
    for (i in areas) {
        areas[i].x += (areas[i].gx - areas[i].x) * 5 * modifier;
        areas[i].y += (areas[i].gy - areas[i].y) * 5 * modifier;
        areas[i].r += (areas[i].gr - areas[i].r) * 5 * modifier;
        // areas[i].r +=100*modifier;
    }
    winkyAgo.alpha += (0 - winkyAgo.alpha) * 7 * modifier;
    winkyNow.alpha += (1 - winkyNow.alpha) * 2 * modifier;
    if (winkyAgo.alpha < 0) winkyAgo.alpha = 0;
    if (winkyNow.alpha > 1) winkyNow.alpha = 1;
};

function loadimg(imgg, srcc) {
    srcNum++;
    imgg.onload = function () {
        progess++;
        ctx.fillStyle = "#f8e9e6";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#585858";
        // ctx.font = "200px FangSong";
        ctx.font = "70px Helvetica";
        ctx.fillText("To  LPN", 330, 600);
        ctx.font = "100px Helvetica";
        ctx.fillText("Loading . . .", 230, 1500);
        ctx.fillRect(0, canvas.height / 2 - 20, canvas.width * (progess / srcNum), 40);
        if (progess == srcNum) {
            //document.getElementById("wwhh").style.display='inline';
            start();
        }
    }
    imgg.src = srcc;
}

function start() {
    reset();
    main();
    itsTime++;
}

function control(modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }
}
var render = function () {
    ctx.beginPath();
    // ctx.fillStyle = "rgba(255,255,255,1)";
    // ctx.font = "120px KaiTi";
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "#f8e9e6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgg, 0, 0);
    ctx.globalAlpha = winkyNow.alpha;
    ctx.drawImage(flw[winkyAgo.number], 20, (canvas.height - canvasf.height) / 4 * 3);
    ctx.globalAlpha = winkyAgo.alpha;
    ctx.drawImage(flw[winkyAgo.number], 20, (canvas.height - canvasf.height) / 4 * 3);
    ctx.globalAlpha = 1;
    // ctx.fillStyle = "rgba(150,25,205,1)";
    // ctx.font = "40px KaiTi";
    // ctx.fillText(whh,hero.x, hero.y);
    // ctx.fillText(areas.length ,monster.x, monster.y);
    // ctx.strokeStyle = "rgba(30,225,25,0.8)";
    // // ctx.rect(fontArea.left,fontArea.top,fontArea.right-fontArea.left,fontArea.bottom-fontArea.top );
    // // ctx.stroke();
    // for(i in areas){
    //     ctx.rect(areas[i].left,areas[i].top,areas[i].width,areas[i].height)
    // }
    ctx.stroke();
    // ctx.font = "38px KaiTi";
    // ctx.fillStyle = "#0ffff0";
    // ctx.fillText(0,200,(canvas.height-canvasf.height)/2+0);
    // ctx.fillText(50,200,(canvas.height-canvasf.height)/2+50);
    // ctx.fillText(150,200,(canvas.height-canvasf.height)/2+150);
    // ctx.fillText(250,200,(canvas.height-canvasf.height)/2+250);
    // ctx.fillText(350,200,(canvas.height-canvasf.height)/2+350);
    // ctx.fillText(450,200,(canvas.height-canvasf.height)/2+450);
    // ctx.fillText(550,200,(canvas.height-canvasf.height)/2+550);
    // ctx.fillText(650,200,(canvas.height-canvasf.height)/2+650);
    // ctx.fillText(750,200,(canvas.height-canvasf.height)/2+750);
    // ctx.fillText(850,200,(canvas.height-canvasf.height)/2+850);
    // ctx.fillText(950,200,(canvas.height-canvasf.height)/2+950);
    for (i = 0; i < areas.length; i++) {
        ctx.save();
        ctx.translate(areas[i].x, areas[i].y);
        ctx.rotate(Math.PI * areas[i].r / 180);
        ctx.translate(-areas[i].x, -areas[i].y);
        ctx.drawImage(canvass[i], areas[i].x - areas[i].width / 2, areas[i].y - areas[i].height / 2);
        ctx.restore();
    }
}

var scanImg = function (winky) {
    // ctxf.fillStyle = "#000000";
    // ctxf.fillRect(0,0,canvas.width,canvas.height);
    ctxf.fillStyle = "rgba(255,255,255,1)";
    ctxf.font = "65px FangSong";
    ctxf.textAlign = "center";
    ctxf.textBaseline = "middle";
    for (i = 0; i < winky.length; i++) {
        ctxf.fillText(winky[i], canvasf.width / 2, 100 * i + 100);
    }
    var pixils = ctxf.getImageData(0, 0, canvasf.width, canvasf.height);
    for (i = 0; i < canvasf.width; i++) {
        for (j = 0; j < canvasf.height; j++) {
            k = (j * canvasf.width + i) * 4;
            grays[i][j].white = (pixils.data[k] + pixils.data[k + 1] + pixils.data[k + 2]) / 3.5;
        }
    }
    for (i = 0; i < canvasf.width; i++) {
        for (j = 0; j < canvasf.height; j++) {
            if (grays[i][j].undetected) {
                grays[i][j].undetected = false;
                if (grays[i][j].white > 180) {
                    var area0 = new area();
                    areas.push(area0);
                    mnm = areas.length - 1;
                    areas[mnm].left = areas[mnm].top = 2000;
                    areas[mnm].right = areas[mnm].bottom = -1;
                    grays[i][j].undetected = true;
                    grays[i][j].are = mnm;
                    flood(i, j, mnm);
                    areas[mnm].width = areas[mnm].right - areas[mnm].left + 1;
                    areas[mnm].height = areas[mnm].bottom - areas[mnm].top + 1;
                    areas[mnm].gx = areas[mnm].left + areas[mnm].width / 2;
                    areas[mnm].gy = areas[mnm].top + areas[mnm].height / 2 + (canvas.height - canvasf.height) / 2;
                    areas[mnm].gr = 0;
                    if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 160) {
                        areas[mnm].cls = 0;
                    } else if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 260) {
                        areas[mnm].cls = 1;
                    } else if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 360) {
                        areas[mnm].cls = 2;
                    } else if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 460) {
                        areas[mnm].cls = 3;
                    } else if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 560) {
                        areas[mnm].cls = 4;
                    } else if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 660) {
                        areas[mnm].cls = 5;
                    } else if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 760) {
                        areas[mnm].cls = 6;
                    } else if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 860) {
                        areas[mnm].cls = 7;
                    } else if (areas[mnm].gy < (canvas.height - canvasf.height) / 2 + 960) {
                        areas[mnm].cls = 8;
                    }
                    areas[mnm].gx = -Math.random() * (canvas.width * 2);
                    areas[mnm].gy = -Math.random() * (canvas.height * 3);
                    areas[mnm].gr = Math.random() * 1800 - 1200;
                }
            }
        }
    }
}

function flood(xx, yy, mnm) {
    if (xx >= 0 && xx < canvasf.width &&
        yy >= 0 && yy < canvasf.height &&
        grays[xx][yy].undetected) {
        grays[xx][yy].undetected = false;
        if (grays[xx][yy].white > 180) {
            whh++;
            grays[xx][yy].are = mnm;
            if (xx < areas[mnm].left) {
                areas[mnm].left = xx;
            }
            if (xx > areas[mnm].right) {
                areas[mnm].right = xx;
            }
            if (yy > areas[mnm].bottom) {
                areas[mnm].bottom = yy;
            }
            if (yy < areas[mnm].top) {
                areas[mnm].top = yy;
            }
            flood(xx - 1, yy - 1, mnm);
            flood(xx - 1, yy, mnm);
            flood(xx - 1, yy + 1, mnm);
            flood(xx, yy - 1, mnm);
            flood(xx, yy + 1, mnm);
            flood(xx + 1, yy - 1, mnm);
            flood(xx + 1, yy, mnm);
            flood(xx + 1, yy + 1, mnm);
        }
    }
}

function newRadical(areas) {
    for (i in areas) {
        var radical0 = ctxf.createImageData(areas[i].width, areas[i].height);

        for (j = 0; j < radical0.data.length; j++) {
            yy = areas[i].top + Math.floor(j / areas[i].width) - 1;
            xx = areas[i].left + (j % areas[i].width);
            radical0.data[j * 4] = 5;
            radical0.data[j * 4 + 1] = 5;
            radical0.data[j * 4 + 2] = 5;
            //radical0.data[j+3]=100;
            if (grays[xx][yy].are == i) {
                radical0.data[j * 4 + 3] = grays[xx][yy].white;
            } else {
                radical0.data[j * 4 + 3] = 0;
            }
        }
        radicals.push(radical0);
    }
}

function radical2image(ii, ww, hh) {
    var canvas0 = document.createElement("canvas");
    canvas0.width = ww;
    canvas0.height = hh;
    var ctx0 = canvas0.getContext("2d");
    ctx0.putImageData(radicals[ii], 0, 0)
    canvass.push(canvas0);
}

function boom(wwd) {
    derr.play();
    for (i in areas) {
        if (areas[i].cls == wwd) {
            //document.getElementById("mytext").style.display='none';
            areas[i].gx = Math.random() * canvas.width - areas[i].width;
            areas[i].gy = Math.random() * canvas.height - areas[i].height;
            areas[i].gr = Math.random() * 1800 - 1200;
        }
        clssb[wwd] = true;
    }
    winkyAgo.number = winkyNow.number;
    winkyAgo.alpha = 1;
    winkyNow.number--;
    winkyNow.alpha = 0;
    if (winkyNow.number < 0) winkyNow.number = 0;
}

function booom(smg) {
    derr.play();
    for (i in areas) {
        if (Math.random() * 100 < smg) {
            areas[i].gx = Math.random() * canvas.width - areas[i].width;
            areas[i].gy = Math.random() * canvas.height - areas[i].height;
            areas[i].gr = Math.random() * 1800 - 1200;
        }
    }
    for (i = 0; i < winky.length; i++) {
        clssb[i] = true;
    }
    winkyAgo.number = winkyNow.number;
    winkyAgo.alpha = 1;
    winkyNow.number = 0;
    winkyNow.alpha = 0;
}

function miix() {
    denn.play();
    for (var i = 0; i < winky.length; i++) {
        if (clssb[i]) {
            mix(i);
            break;
        }
    }
    winkyAgo.number = winkyNow.number;
    winkyAgo.alpha = 1;
    winkyNow.number++;
    winkyNow.alpha = 0;
    if (winkyNow.number > 8) winkyNow.number = 8;
}

function mix(wwd) {
    for (i in areas) {
        denn.play();
        //document.getElementById("mytext").style.display='inline';
        if (areas[i].cls == wwd) {
            areas[i].gx = areas[i].left + areas[i].width / 2;
            areas[i].gy = areas[i].top + areas[i].height / 2 + (canvas.height - canvasf.height) / 2;
            areas[i].gr = 0;
        }
        clssb[wwd] = false;
    }
}
