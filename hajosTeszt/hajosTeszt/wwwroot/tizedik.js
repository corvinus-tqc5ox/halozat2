var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }
    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            });

}

function kérdésMegjelenítés(kérdés) {
    if (!kérdés) return; //Ha undefined a kérdés objektum, nincs mit tenni
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép1").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép1").classList.add("rejtett")
    }
    //Jó és rossz kérdések jelölésének levétele
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");
}


function választás(n) {
    let correctAnswer = hotList[displayedQuestion].question.correctAnswer;
    console.log(correctAnswer)
    if (n!=correctAnswer) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${correctAnswer}`).classList.add("jó");
        hotList[displayedQuestion].goodAnswers = 0;
    }
    else {
        document.getElementById(`válasz${correctAnswer}`).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
        if (hotlist[displayedQuestion].goodAnswers ==3) {
            kérdésBetöltés(nextQuestion, displayedQuestion)
            nextQuestion++;
        }
    }
}

function előre() {
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}


function vissza() {
    displayedQuestion--;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
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
