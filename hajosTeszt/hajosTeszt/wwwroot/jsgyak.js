window.onload = function () {
    var faktoriális = function (n) {
        let er = 1;
        for (var i = 2; i <= n; i++) {
            er = er * i;
        }
        return er;
    }
    for (var i = 0; i < 10; i++) {
        var sor = document.createElement("div");
        document.getElementById("pascal").appendChild(sor);
        sor.className = "sor";

        for (var j = 0; j <= i; j++) {
            var elem = document.createElement("div");
            sor.appendChild(elem);
            elem.innerText = faktoriális(i) / (faktoriális(j) * faktoriális(i - j))
            let x = faktoriális(i) / (faktoriális(j) * faktoriális(i - j));
            elem.className = "elem";
            elem.style.backgroundColor = `rgba(117, 255, 200, ${x / 10})`;
        }
    }
}
