// JavaScript Document
//tab js
function selectTagk(showContent,selfObj){
	// 标签
	var tagk = document.getElementById("tagsk").getElementsByTagName("li");
	var tagklength = tagk.length;
	for(i=0; i<tagklength; i++){
	tagk[i].className = "";
	}
	selfObj.parentNode.className = "selectTagk";
	// 标签内容
	for(i=0; j=document.getElementById("tagContentk"+i); i++){
	j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
}
//新闻

function selectTagkb(showContent,selfObj){
	// 标签
	var tagkb = document.getElementById("tagskb").getElementsByTagName("li");
	var tagkblength = tagkb.length;
	for(i=0; i<tagkblength; i++){
	tagkb[i].className = "";
	}
	selfObj.parentNode.className = "selectTagkb";
	// 标签内容
    var j = null;
	for(i=0; j=document.getElementById("tagContentkb"+i); i++){
	    j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
}
//成功交易

function selectTagka(showContent,selfObj){
	// 标签
	var tagka = document.getElementById("tagska").getElementsByTagName("li");
	var tagkalength = tagka.length;
	for(i=0; i<tagkalength; i++){
	tagka[i].className = "";
	}
	selfObj.parentNode.className = "selectTagka";
	// 标签内容
    var j = null;
	for(i=0; j=document.getElementById("tagContentka"+i); i++){
	    j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
}       