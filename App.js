const katakana = [
["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
["ヤ","ya"],
["",""],
["ユ","yu"],
["",""],
["ヨ","yo"],
["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
["ワ","wa"],
["",""],
["",""],
["",""],
["ヲ","wo"],
["ン","n"],
["",""],
["",""],
["",""],
["",""]
];

let remaining = [];
let current = null;
let progress = 0;

const kanaEl = document.getElementById("kana");
const romajiEl = document.getElementById("romaji");
const progressEl = document.getElementById("progress");
const nextButton = document.getElementById("nextButton");
const showAllButton = document.getElementById("showAllButton");
const allKanaEl = document.getElementById("allKana");

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}

function newRound(){
    remaining=[...katakana];
    // Filter out empty spaces for training
    remaining = remaining.filter(k => k[0] !== "");
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

    progressEl.textContent=progress+" / "+46;
}

function renderAllKana(){
    // Clear previous
    allKanaEl.innerHTML = '<button id="backButton">Go Back</button>';

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateRows = 'repeat(5, 80px)';
    grid.style.gridAutoFlow = 'column';
    grid.style.gridAutoColumns = '80px';
    grid.style.direction = 'rtl';
    grid.style.gap = '10px';
    grid.style.width = 'max-content';

    katakana.forEach(k => {
        const card = document.createElement('div');
        card.className = 'kana-card';
        card.style.border = '1px solid #444';
        card.style.padding = '8px';
        card.style.textAlign = 'center';
        card.style.borderRadius = '4px';
        card.style.background = '#222';

        const kEl = document.createElement('div');
        kEl.className = 'kana-char';
        kEl.textContent = k[0];
        kEl.style.fontSize = '24px';
        kEl.style.fontWeight = 'bold';

        const rEl = document.createElement('div');
        rEl.className = 'kana-romaji';
        rEl.textContent = k[1];
        rEl.style.fontSize = '12px';
        rEl.style.color = '#999';
        rEl.style.marginTop = '4px';

        card.appendChild(kEl);
        card.appendChild(rEl);
        grid.appendChild(card);
    });

    allKanaEl.appendChild(grid);
    
    // Re-attach back button event listener
    document.getElementById("backButton").addEventListener("click", goBack);
}

function goBack(){
    allKanaEl.style.display = 'none';
    document.getElementById('card').style.display='';
    nextButton.style.display='';
    progressEl.style.display='';
    showAllButton.style.display='';
}

let showingAll = false;
showAllButton.addEventListener('click', () => {
    showingAll = !showingAll;
    if(showingAll){
        renderAllKana();
        allKanaEl.style.display = 'flex';
        allKanaEl.style.flexDirection = 'column';
        allKanaEl.style.alignItems = 'flex-start';
        allKanaEl.style.gap = '20px';
        document.getElementById('card').style.display='none';
        nextButton.style.display='none';
        progressEl.style.display='none';
        showAllButton.style.display='none';
    } else {
        goBack();
    }
});

document.body.addEventListener("click",function(e){

    if(e.target===nextButton) return;
    if(e.target.id==='backButton') return;

    if(current){
        romajiEl.textContent=current[1];
    }

});

nextButton.addEventListener("click",nextKana);

newRound();
nextKana();
