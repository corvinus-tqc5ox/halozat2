
var kérdések;
var sorszám = 0;

function letöltés() {
    fetch("\questions.json")
        .then(r => r.json())
        .then(d => letöltésbefejeződött(d));


    function letöltésbefejeződött(d) {
        console.log("Sikeres letöltés")
        console.log(d)
        kérdések = d;
        kérdésmegjelenítés(0);

    }
}

function kérdésmegjelenítés(k) {

    let ide_kérdés = document.getElementById("kérdés_szöveg")
    ide_kérdés.innerHTML = kérdések[k].questionText;
    console.log(`${kérdések.lenght} kérdés érkezett`)

    for (var i = 1; i < 4; i++) {
        let elem_kérdés = document.getElementById("válasz" + i)
        elem_kérdés.innerHTML = kérdések[k]["answer" + i]

    }
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[k].image
}

function előre() {
    if ((kérdések.length - 1) == sorszám) {
        sorszám = 0;
    } else {
        sorszám += 1;
    }
    kérdésmegjelenítés(sorszám);
    document.getElementById("válasz1").style.backgroundColor = "white";
    document.getElementById("válasz2").style.backgroundColor = "white";
    document.getElementById("válasz3").style.backgroundColor = "white";
}

function vissza() {
    if (sorszám == 0) {
        sorszám = kérdések.length - 1;
    } else {
        sorszám -= 1;
    }

    kérdésmegjelenítés(sorszám);
    document.getElementById("válasz1").style.backgroundColor = "white";
    document.getElementById("válasz2").style.backgroundColor = "white";
    document.getElementById("válasz3").style.backgroundColor = "white";
}


function helyes1() {

    if (kérdések[sorszám].correctAnswer == 1) {
        document.getElementById("válasz1").style.backgroundColor = "green";
    }
    else {
        document.getElementById("válasz1").style.backgroundColor = "red";
    }

}

function helyes2() {

    if (kérdések[sorszám].correctAnswer == 2) {
        document.getElementById("válasz2").style.backgroundColor = "green";
    }
    else {
        document.getElementById("válasz2").style.backgroundColor = "red";
    }

}

function helyes3() {

    if (kérdések[sorszám].correctAnswer == 3) {
        document.getElementById("válasz3").style.backgroundColor = "green";
    }
    else {
        document.getElementById("válasz3").style.backgroundColor = "red";
    }

}



window.onload = function () {
    letöltés();
    document.getElementById("vissza").onclick = vissza;
    document.getElementById("előre").onclick = előre;
    document.getElementById("válasz1").onclick = helyes1;
    document.getElementById("válasz2").onclick = helyes2;
    document.getElementById("válasz3").onclick = helyes3;
    
}
