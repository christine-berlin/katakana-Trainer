const katakana = [
["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
["ワ","wa"],["ヲ","wo"],["ン","n"]
];

let remaining = [];
let current = null;
let progress = 0;

const kanaEl = document.getElementById("kana");
const romajiEl = document.getElementById("romaji");
const progressEl = document.getElementById("progress");
const nextButton = document.getElementById("nextButton");

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}

function newRound(){
    remaining=[...katakana];
    shuffle(remaining);
    progress=0;
}

function nextKana(){

    if(remaining.length===0){
        newRound();
    }

    current=remaining.pop();

    progress++;

    kanaEl.textContent=current[0];
    romajiEl.textContent="";

    progressEl.textContent=progress+" / "+katakana.length;
}

document.body.addEventListener("click",function(e){

    if(e.target===nextButton) return;

    if(current){
        romajiEl.textContent=current[1];
    }

});

nextButton.addEventListener("click",nextKana);

newRound();
nextKana();
