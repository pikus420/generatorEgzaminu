fetch("data.json").then(res=>res.json()).then(x => {
    main(x);
});
const qs = document.querySelector("#qs");
const litery = ['A', 'B', 'C', 'D'];
const ile_obrazow = 10;

let qsx = 0;
let flag = false;
//min zamknięte, max otwarte   
function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function generateSentence(data)
{
    sentence = "";
    let los;
    los = getRandomInt(1, data.slowa.pocz.length)
    sentence += (data.slowa.pocz[los] + " ")
    los = getRandomInt(1, data.slowa.rzecz.length)
    sentence += (data.slowa.rzecz[los] + " ")
    los = getRandomInt(1, data.slowa.czas.length)
    sentence += (data.slowa.czas[los] + " ")
    los = getRandomInt(1, data.slowa.kon.length)
    sentence += (data.slowa.kon[los] + "?")
    return sentence;
}

function generateQuery(data)
{
    query = "";
    let los;
    los = getRandomInt(1, data.zapytania.nazwa.length);
    query += (data.zapytania.nazwa[los] + " ");
    los = getRandomInt(1, data.zapytania.kolumny.length);
    query += (data.zapytania.kolumny[los] + " FROM ");
    los = getRandomInt(1, data.zapytania.tabela.length);
    query += (data.zapytania.tabela[los] + " WHERE ");
    los = getRandomInt(1, data.zapytania.gdzie.length);
    query += (data.zapytania.gdzie[los] + " " + getRandomInt(0, 10000) + " ");
    los = getRandomInt(1, data.zapytania.dodatek.length);
    query += (data.zapytania.dodatek[los] + ";");
    return query;
}

function addImage(){
    if(Math.random() < 0.85)
        return 0
    let imgx = getRandomInt(1, ile_obrazow + 1);
    qs.innerHTML += `<img class="qsimg" src="img/${imgx}.png" alt="zdjecie do pytania">`;
}

function gregonize(text) {
    let result = "";

    if(Math.random() > 0.30)
        return text;

    for (let i = 0; i < text.length; i++) {
        if (i != 0 && text[i] != text[i - 1]) {
            let prefix = "";
            if (
            text[i - 1] == "e" ||
            text[i - 1] == "a" ||
            text[i - 1] == "o" ||
            text[i - 1] == "w"
            )
            if (Math.floor(Math.random() * 10) == 5) prefix = " ";
    
            let letter = text[i].toLowerCase();
            if (letter == ",")
                if (Math.floor(Math.random() * 10) == 5) letter = ".";
    
            if (letter == ",")
                if (Math.floor(Math.random() * 10) % 2 == 0) letter = " ";
    
            if (letter == ".")
                if (Math.floor(Math.random() * 10) == 5) letter = "!!!";
                    else letter = ' hehe'
    
            if (letter == " ")
                if (Math.floor(Math.random() * 10) == 5) letter = "";
    
            if (letter == "ą")
                if (Math.floor(Math.random() * 10) == 5) letter = "a";
    
            if (letter == "ć")
                if (Math.floor(Math.random() * 10) == 5) letter = "c";
    
            result += prefix + letter;
        }
        else result += text[i];
        }
    
        let swapres = "";
        let words = result.split(" ");
        for (let i = 0; i < words.length; i++) {
        let word = words[i];
    
        if (Math.floor(Math.random() * 10) % 2 == 0) {
            let r1 = Math.floor(Math.random() * (word.length))
            let r2 = Math.floor(Math.random() * (word.length))
            
    
            let temp = word[r1];
            word[r1] = word[r2];
            word[r2] = temp;
        }
    
        swapres += word + " ";
        }
        return swapres;    
}

function generateQuestion(data){
    const qtype = getRandomInt(1, 6)
    let qid;
    switch(qtype){
        case 1:
            qid = getRandomInt(0, data.strony.length);
            qs.innerHTML += `<p>${qsx+1}.&nbsp;${gregonize(data.strony[qid])}</p>`;
        break;

        case 2:
            qid = getRandomInt(0, data.pehap.length);
            qs.innerHTML += `<p>${qsx+1}.&nbsp;${gregonize(data.pehap[qid])}</p>`;
        break;

        case 3:
            qid = getRandomInt(0, data.bazy.length);
            qs.innerHTML += `<p>${qsx+1}.&nbsp;${gregonize(data.bazy[qid])}</p>`;
        break;

        case 4:
            qid = getRandomInt(0, data.style.length);
            qs.innerHTML += `<p>${qsx+1}.&nbsp;${gregonize(data.style[qid])}</p>`;
        break;

        default:
            let gen = gregonize(generateSentence(data));
            qs.innerHTML += `<p>${qsx+1}.&nbsp;${gen}</p>`;
    }
    addImage();
    for(let i = 0; i < 4; i++){
        if(Math.random() > 0.1)
        {
            let aid = getRandomInt(0, data.odpowiedzi.length);
            qs.innerHTML += `<label for="quid${qsx}_${i}" class="odp"><input type="radio" id="quid${qsx}_${i}" name="quid${qsx}"><img src="check.svg"><span><b>${litery[i]}.</b> ${data.odpowiedzi[aid]}</span></label>`;
        }
        else
        {
            let qry = generateQuery(data);
            qs.innerHTML += `<label for="quid${qsx}_${i}" class="odp"><input type="radio" id="quid${qsx}_${i}" name="quid${qsx}"><img src="check.svg"><span><b>${litery[i]}.</b> ${qry}</span></label>`;
        }
        
    }
    qs.innerHTML += '<br>';
    qs.innerHTML += '<div class="sep">';
    for(let i = 0; i < 3; i++)
        document.querySelectorAll(".sep")[qsx].innerHTML += '<img src="star.svg" alt="gwiazda">';
    qs.innerHTML += '</div>';
    qs.innerHTML += '<br>';
    qsx++;
}

function main(data){

    for(let i = 0; i < 40; i++)
        generateQuestion(data)
    
    document.body.innerHTML += `<div class="czas">Czas jaki pozostał do zakończenia egzaminu → Nan min undefined sek</div>`;
    document.body.innerHTML += '<br>';
    document.body.innerHTML += `<a class="koniec" href='#pocz'>SPRAWDŹ ODPOWIEDZI!</a>`;
    document.querySelector(".koniec").addEventListener("click", ()=>{

        if(flag){
            location.reload();
        }
        else{
            flag = true;
            const czasy = document.querySelectorAll(".czas");
            let pkt = parseFloat(getRandomInt(0, 41) + Math.random()).toFixed(2);
            let proc = parseFloat(getRandomInt(0, 101) + Math.random()).toFixed(2);
            for(let i = 0; i < czasy.length; i++)
            {
                czasy[i].innerHTML = `<span class="title2">Po wielkiej bitwie opadł Musz!&nbsp;</span><span class="title1">Uzyskany wynik: ${proc}% (${pkt}/40)</span>`;
            }
            document.querySelector(".koniec").innerText = "LOSUJ 40 PYTAŃ";
        }
    })
}
