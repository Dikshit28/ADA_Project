/*HOME BUTTON*/
//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*DEMONSTRATION*/
var onlink = false;
var onid = "";
var MaxvertextType = 100;
var gigantic = 99999;

var gx = "";
var gy = "";
var gobj;

/*******************************************
                    Algorithm part
      ********************************************/
/*
        Dijkstra algorithm
      */

//Adjacency matrix
function Mgraph() {
    this.vex = new Array();
    this.edge = new Array();
    this.vexnum = 0;
    this.arcnum = 0;
}
function getVex(G, x) {
    var i = 0;
    for (; i < G.vexnum; i++) {
        if (G.vex[i] == x) return i;
    }
    if (G.vex[i] != x) return -1;
}
//Single source shortest path algorithm
function Dijkstra(g, x) {
    cleancolor();
    console.log(g);
    var vexnum = g.vexnum;
    var vex = getVex(g, x);
    if (vex == -1) return;
    var dist = new Array();
    var path = new Array();
    path[vex] = vex;
    for (var i = 0; i < vexnum; ++i) {
        dist[i] = g.edge[vex][i];
        if (g.edge[vex][i] != gigantic) path[i] = vex;
    }
    console.log(dist);
    var S = new Array();
    S[vex] = true;
    var dd;
    var dvex = 0;
    var j = 0;
    var index = 1;
    var descripe = document.getElementById("slider");
    descripe.innerHTML = "";
    for (; j < vexnum - 1; ++j) {
        setTimeout(function () {
            dd = gigantic;
            for (var i = 0; i < vexnum; ++i) {
                if (dist[i] < dd && !S[i]) {
                    dd = dist[i];
                    dvex = i;
                }
            }
            if (dd == gigantic) {
                for (var i = 0; i < vexnum; ++i) {
                    if (dist[i] == dd && !S[i]) {
                        dvex = i;
                        break;
                    }
                }
                var str = `node ${g.vex[dvex]} unachievable<br><br>`;

                descripe.innerHTML =
                    descripe.innerHTML +
                    `<div class=slider_line><div class=slide_title>Step ${index} 
                    </div><div class=slide_content> ${str} </div> </div>`;
                document.getElementsByClassName("content")[0].appendChild(descripe);
                index++;
                S[dvex] = true;
            } else {
                var element = document.getElementById(g.vex[dvex]);
                var now = dvex;
                var colo = "#" + (Math.round(Math.random() * 800) + 100);
                element.style.background = colo;
                var str =
                    x + " arrive " + g.vex[dvex] + "The shortest path：" + g.vex[now];
                while (now != vex) {
                    var line1 = document.getElementById(g.vex[now] + g.vex[path[now]]);
                    if (line1 == null)
                        line1 = document.getElementById(g.vex[path[now]] + g.vex[now]);
                    //console.log(line1);
                    line1.style.stroke = colo;
                    now = path[now];
                    str = str + "<--" + g.vex[now];
                }
                str = str + "<br> Total distance: " + dist[dvex] + "<br><br>";
                descripe.innerHTML =
                    descripe.innerHTML +
                    "<div class=slider_line><div class=slide_title>Step" +
                    index +
                    " time </div><div class=slide_content>" +
                    str +
                    "</div> </div>";
                document.getElementsByClassName("content")[0].appendChild(descripe);
                index++;
                S[dvex] = true;
                for (var k = 0; k < vexnum; ++k) {
                    if (!S[k]) {
                        if (Number(dist[dvex]) + Number(g.edge[dvex][k]) < Number(dist[k])) {
                            dist[k] = Number(dist[dvex]) + Number(g.edge[dvex][k]);
                            path[k] = Number(dvex);
                        }
                    }
                }
            }
        }, 3000 * j);
    }
}
/*******************************************
            Graphical part
********************************************/
//Initialization of the graph
function init(g) {
    for (var i = 0; i < g.vexnum; i++) {
        var temp = [];
        for (var j = 0; j < g.vexnum; ++j) {
            if (i == j) temp[j] = 0;
            else temp[j] = gigantic;
        }
        g.edge[i] = temp;
    }
}

//Create a global map first
mgraph = new Mgraph();
var content = "";

//  Get X coordinate
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

//Get the y-axis coordinates
function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
//Node rendering
function input() {
    if (mgraph.vexnum == 0) {
        var oinput = document.getElementById("input_num");
        var num = oinput.value;
        mgraph.vexnum = num;
        init(mgraph);
        //initialization
        for (var i = 0; i < num; i++) {
            var vex = "v" + i;
            mgraph.vex[i] = vex;
            var divele = document.getElementById("divele");
            var offsetWidth = document.getElementsByClassName('nodes')[0].offsetWidth;
            var rad = offsetWidth / 4;
            var ang = (360 / num) * i;
            console.log((360 / num) * i)
            divele.innerHTML =
                divele.innerHTML +
                `<div class="test" id="${vex}" style="transform: rotate(${ang}deg) translate(${rad}px);">${vex}</div>`;
            document.getElementsByClassName("nodes")[0].appendChild(divele);
            console.log("appended");
        }
    } else alert("\n\nPlease clear the existing nodes on the page first！");
}
/*CREATE LINES*/
//Link line rendering
function creatline() {
    var id1 = document.getElementById("first").value;
    var id2 = document.getElementById("second").value;
    var dis = Number(document.getElementById("weight").value);
    var div = document.getElementById("Wrap");
    if (id1.length === 2) {
        if (mgraph.edge[id1[1]][id2[1]] !== dis) {
            mgraph.edge[id1[1]][id2[1]] = dis;
            mgraph.edge[id2[1]][id1[1]] = dis;
            var offsetWidth = document.getElementsByClassName('nodes')[0].offsetWidth;
            var rad = offsetWidth / 4;
            var ele1 = document.getElementById(id1);
            var x1 = ele1.getBoundingClientRect().left - 2 * rad + 10;
            var y1 = ele1.getBoundingClientRect().top + 15;
            var ele2 = document.getElementById(id2);
            var x2 = ele2.getBoundingClientRect().left - 2 * rad + 10;
            var y2 = ele2.getBoundingClientRect().top + 15;
            console.log(x1, x2, y1, y2);
            var size = " x1=" + x1 + " y1=" + y1 + " x2=" + x2 + " y2=" + y2;
            div.innerHTML =
                div.innerHTML +
                `<svg class="lineWrap" style="position:absolute;" id="line${id1}${id2}">
                <line style=position:absolute; id="${id1}${id2}" ${size}
                xmlns="http://www.w3.org/2000/svg" stroke="rgb(255,0,0)" stroke-width=5 marker-end=
                "url(#arrow)"></line></svg>
                <div class="int_num" style="left:${(x1 + (x2 - x1) / 2.5)}px;
                top:${(y1 + (y2 - y1) / 2.5)}px;
                position:absolute;" id="num${id1}${id2}">${dis}</div>`;
            document.getElementsByClassName("nodes")[0].appendChild(div); console.log("called");
        }
        else alert("\n\nSame weight node already exist")
    }
    else alert("\n\nNode number missing！");
}
/*DELTE LINK */
//Delete link
function deleteline() {
    var div = document.getElementById("Wrap");
    var id1 = document.getElementById("first").value;
    var id2 = document.getElementById("second").value;
    var lid = "line" + id1 + id2;
    var nid = "num" + id1 + id2;
    console.log(lid, nid);
    var line = document.getElementById(lid);
    var num = document.getElementById(nid);
    console.log(line, num);
    line.remove();
    num.remove();
    var x = getVex(mgraph, id1);
    var y = getVex(mgraph, id2);
    mgraph.edge[x][y] = gigantic;
    mgraph.edge[y][x] = gigantic;
}
/*START DIJKSTRA*/
//Start searching for paths
function createPath() {
    var begin = document.getElementById("begin");
    var bd = begin.value;
    Dijkstra(mgraph, bd);
}
/*CLEAR PAGE*/
//Empty the link
function cleanline() {
    var div = document.getElementById("Wrap");
    div.innerHTML = "";
    init(mgraph);
    var descripe = document.getElementById("slider");
    descripe.innerHTML = content;
    cleancolor();
}
//Empty the nodes
function cleanele() {
    var div = document.getElementById("divele");
    div.innerHTML = "";
    cleanline();
    mgraph.vexnum = 0;
    var descripe = document.getElementById("slider");
    descripe.innerHTML = content;
}
//Empty the color
function cleancolor() {
    var div = document.getElementById("divele");
    var ele = div.getElementsByTagName("div");
    for (var i = ele.length - 1; i >= 0; i--) {
        ele[i].style.background = "#49b1f5";
    }
    var line = document.getElementById("Wrap");
    var linele = line.getElementsByTagName("line");
    for (var i = linele.length - 1; i >= 0; i--) {
        linele[i].style.stroke = "#ddd";
    }
}