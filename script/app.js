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
        var str = "node " + g.vex[dvex] + "unachievable<br><br>";

        descripe.innerHTML =
          descripe.innerHTML +
          "<div class=slider_line><div class=slide_title>clause " +
          index +
          "time </div><div class=slide_content>" +
          str +
          "</div> </div>";
        document.body.appendChild(descripe);
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
          "<div class=slider_line><div class=slide_title>clause" +
          index +
          " time </div><div class=slide_content>" +
          str +
          "</div> </div>";
        document.body.appendChild(descripe);
        index++;
        S[dvex] = true;
        for (var k = 0; k < vexnum; ++k) {
          if (!S[k]) {
            if (dist[dvex] + g.edge[dvex][k] < dist[k]) {
              dist[k] = dist[dvex] + g.edge[dvex][k];
              path[k] = dvex;
            }
          }
        }
      }
    }, 3000 * j);
  }
  /*
            setTimeout(function(){
                for (var m = 0; m < vexnum; ++m) {
                var nowvex=m;
                var str="\npath:"+g.vex[nowvex];
                while(path[nowvex]!=vex){
                    nowvex=path[nowvex];
                    str=str+"<-"+g.vex[nowvex];
                }
                str=str+"<-"+g.vex[vex]+"\tdistance:"+dist[m];
                console.log(str);
            }
            },j*3000+2000)
        */
}

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

/*******************************************
                    Graphical part
         ********************************************/

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
      var div = document.getElementById("divele");
      var ang = (360 / num) * i;
      var x = 40 + Math.cos(ang * (Math.PI / 180)) * 30;
      var y = 50 + Math.sin(ang * (Math.PI / 180)) * 30;
      //console.log((pai/num)*i)

      div.innerHTML =
        div.innerHTML +
        "<div id=" +
        vex +
        " style=" +
        "left:" +
        x +
        "%;" +
        "top:" +
        y +
        "%;" +
        " class=" +
        "test" +
        " onclick=link(this)>" +
        vex +
        "</div>";
      document.body.appendChild(div);
    }
  } else alert("\n\nPlease clear the existing nodes on the page first！");
}

//Link line rendering
function creatline(id1, id2, dis) {
  var div = document.getElementById("Wrap");
  var ele1 = document.getElementById(id1);
  var x1 = getElementLeft(ele1) + 25;
  var y1 = getElementTop(ele1) + 25;
  var ele2 = document.getElementById(id2);
  var x2 = getElementLeft(ele2) + 25;
  var y2 = getElementTop(ele2) + 25;
  //console.log(y2)
  var size = " x1=" + x1 + " y1=" + y1 + " x2=" + x2 + " y2=" + y2;
  div.innerHTML =
    div.innerHTML +
    "<svg class=lineWrap id=line" +
    id1 +
    id2 +
    "><line id=" +
    id1 +
    id2 +
    " " +
    size +
    " xmlns=" +
    "http://www.w3.org/2000/svg" +
    " stroke=" +
    "#ddd" +
    " stroke-width=" +
    5 +
    " marker-end=" +
    "url(#arrow)" +
    "></line></svg>" +
    "<div class=int_num style=" +
    "left:" +
    (x1 + (x2 - x1) / 2.5) +
    "px;top:" +
    (y1 + (y2 - y1) / 2.5) +
    "px;position:fixed;" +
    " onclick=changnum(" +
    id1 +
    "," +
    id2 +
    ",this)>" +
    dis +
    "</div>";
  document.body.appendChild(div);
}

function link(obj) {
  var oid = obj.id;

  if (oid != onid && onlink) {
    var onclolor = document.getElementById(onid);
    onclolor.style.background = "#49b1f5";
    onclolor.style.height = "50px";
    onclolor.style.width = "50px";
    // onclolor.style.font-size="30px";
    //The length of the random path is generated
    var dis = Math.round(Math.random() * 15) + 1;
    var x1 = getVex(mgraph, oid);
    var y1 = getVex(mgraph, onid);
    if (mgraph.edge[x1][y1] == gigantic) {
      console.log(dis);
      creatline(oid, onid, dis);
      //No connection to the graph
      mgraph.edge[x1][y1] = dis;
      mgraph.edge[y1][x1] = dis;
    }
    onlink = false;
    onid = "";
  } else if (!onlink) {
    onid = obj.id;
    onlink = true;
    obj.style.background = "green";
    obj.style.height = "70px";
    obj.style.width = "70px";
    // obj.style.font-size="40px";
  }
}

//Start searching for paths
function createPath() {
  var begin = document.getElementById("begin");
  var bd = begin.value;
  Dijkstra(mgraph, bd);
}

//Modify the link right value bullet box
function changnum(x, y, obj) {
  var ch = document.getElementById("changdiv");
  ch.style.display = "block";
  //console.log(x);
  gx = x.id;
  gy = y.id;
  gobj = obj;
}

//After modifying the weight, click OK event
function ok() {
  var changenum = document.getElementById("cnum");
  var cnum = Number(changenum.value);

  if (cnum != null) {
    var x = getVex(mgraph, gx);
    var y = getVex(mgraph, gy);
    mgraph.edge[x][y] = cnum;
    mgraph.edge[y][x] = cnum;
    console.log(cnum);
  }
  gobj.innerText = Number(cnum);
  var ch = document.getElementById("changdiv");
  ch.style.display = "none";
  changenum.value = "";
}

//Delete link
function deleteline() {
  var div = document.getElementById("Wrap");
  var line = document.getElementById("line" + gx + gy);
  div.removeChild(line);
  div.removeChild(gobj);
  // line.style.display="none";
  // gobj.style.display="none";
  var x = getVex(mgraph, gx);
  var y = getVex(mgraph, gy);
  mgraph.edge[x][y] = gigantic;
  mgraph.edge[y][x] = gigantic;
  var ch = document.getElementById("changdiv");
  ch.style.display = "none";
}



//Empty the link
function cleanline() {
  var div = document.getElementById("Wrap");
  div.innerHTML = "";
  init(mgraph);
  var descripe = document.getElementById("slider");
  descripe.innerHTML = content;
  cleancolor();
}

//Empty the node
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
/*DROPPED//Cancel modification weight
function quxiao() {
  var ch = document.getElementById("changdiv");
  ch.style.display = "none";
  gx = "";
  gy = "";
}
//Randomly generate a graph
function randomCreate(num) {
  cleanele();
  var inputnum = document.getElementById("input_num");
  var value = input_num.value;
  if (num == 2) {
    var value = Math.round(Math.random() * 4) + 4;
    input_num.value = value;
  }
  input();
  for (var i = value - 1; i >= 0; i--) {
    var lines = Math.round(Math.random() * 2) + 1;
    var S = new Array();
    for (var m = value - 1; m >= 0; m--) S[i] = false;
    var k = 0;
    for (var j = lines - 1; j >= 0; j--) {
      for (var n = value - 1; n >= 0; n--) {
        if (30 > Math.round(Math.random() * 100) && !S[n] && k <= lines) {
          var x = "v" + i;
          var y = "v" + n;
          var having = document.getElementById(y + x);
          if (having == null) {
            var fuck = Math.round(Math.random() * 15) + 1;
            creatline(x, y, fuck);
            mgraph.edge[i][n] = fuck;
            mgraph.edge[n][i] = fuck;
          }
          S[n] = true;
          k++;
        }
      }
    }
  }
}

window.onload = function () {
  var descripe = document.getElementById("slider");
  content = descripe.innerHTML;
  randomCreate(2);
  descripe.innerHTML = content;
};
*/