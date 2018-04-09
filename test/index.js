var unique = require('uniq');
var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];
var box=document.getElementById("box")
console.log(unique(data));
box.innerHTML = unique(data);
var bb=require('./style.js');
var box2 = document.getElementById("box2");
console.log(bb)
box2.innerHTML = bb
