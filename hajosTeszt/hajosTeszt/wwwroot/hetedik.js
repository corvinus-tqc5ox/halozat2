
var kérdések;
var sorszám = 1;

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}    
function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    kérdések = kérdés;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    
}

function előre() {
    if ((4) == sorszám) {
        sorszám = 1;
    } else {
        sorszám += 1;
    }
    kérdésBetöltés(sorszám);
    document.getElementById("válasz1").style.backgroundColor = "white";
    document.getElementById("válasz2").style.backgroundColor = "white";
    document.getElementById("válasz3").style.backgroundColor = "white";
}

function vissza() {
    if (sorszám == 1) {
        sorszám = kérdések.length - 1;
    } else {
        sorszám -= 1;
    }

    kérdésBetöltés(sorszám);
    document.getElementById("válasz1").style.backgroundColor = "white";
    document.getElementById("válasz2").style.backgroundColor = "white";
    document.getElementById("válasz3").style.backgroundColor = "white";
}


function helyes1() {

    if (kérdések.correctAnswer == 1) {
        document.getElementById("válasz1").style.backgroundColor = "green";
    }
    else {
        document.getElementById("válasz1").style.backgroundColor = "red";
    }

}

function helyes2() {

    if (kérdések.correctAnswer == 2) {
        document.getElementById("válasz2").style.backgroundColor = "green";
    }
    else {
        document.getElementById("válasz2").style.backgroundColor = "red";
    }

}

function helyes3() {

    if (kérdések.correctAnswer == 3) {
        document.getElementById("válasz3").style.backgroundColor = "green";
    }
    else {
        document.getElementById("válasz3").style.backgroundColor = "red";
    }

}



window.onload = function () {
    kérdésBetöltés(sorszám);
    document.getElementById("vissza").onclick = vissza;
    document.getElementById("előre").onclick = előre;
    document.getElementById("válasz1").onclick = helyes1;
    document.getElementById("válasz2").onclick = helyes2;
    document.getElementById("válasz3").onclick = helyes3;
    
}
