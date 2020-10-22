let password = "Bez pracy nie ma kołaczy";
password = password.toUpperCase();   // haslo wypisane z dużych liter

let length = password.length;

let howManyMistakes = 0;

let yes = new Audio("yes.wav");
let no = new Audio("no.wav");


let passwordHide = "";

//pętla dla ukrycia hasła
for(let i = 0; i < length; i++){
    if(password.charAt(i) == " ") passwordHide = passwordHide + " ";   // password.charAt(i) zamiasta password[i] - niektóre przegladarki nie obsługują tak tablicy - tak to jest z js
    else passwordHide = passwordHide + "-";
}

//funkcja, która bedzie po każdym kliknięciu odświerzać diva z passwordem
function writePassword(){
    document.getElementById("board").innerHTML = passwordHide;
}
window.onload = start;  //kiedy w oknie zładuje się strona

let letter = new Array(35);

letter =  ["A","Ą","B", "C", "Ć","D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N","Ń", "O","Ó", "P","Q","R", "S","Ś", "T", "U", "V","W", "X", "Y", "Z", "Ź", "Ż"];


function start(){
    let contentsDiv = "";

    //pętla z rozmieszczenie liter
    for(let i = 0; i <= 34; i++){
        let element = "let" + i;
        contentsDiv = contentsDiv + '<div class = "letter" onclick="check('+ i +')" id="'+element+'">'+letter[i] + '</div>'   // wyswietlenie liter od A do Ż
        if((i + 1) % 7 == 0) contentsDiv = contentsDiv + '<div style="clear:both;"></div>'  // powoduje rozpoczęcie wypisywnia nowych literek po 7
    }

    document.getElementById("alphabet").innerHTML = contentsDiv;


    writePassword(); // wywyołąnie funkcji
}

//metoda = funkcja
String.prototype.setSign = function (place, sign){

    if(place > this.length - 1) return this.toString();
    else return this.substr(0, place) + sign + this.substr(place + 1);     // substr - wyjęcie zadanej części łąńcucha
    // np. dla słowa karta --> this.substr(0, place) + sign + this.substr(place + 1);
    //  napisz.ustawZnak(3,"m")     "kar"              "m"          "a"
}

// funkcja odkrywająca literkę  po kliknieciu odpowiednej litery
function check(nr){

    let hit = false// flaga do kolorowania przycisków z literami - czy wybraliśmy poprawnie czy też nie

    for(let i = 0; i < length; i++){
        if (password.charAt(i) == letter[nr]){
            passwordHide = passwordHide.setSign(i,letter[nr]);
            hit = true;
        }
    }
    if(hit == true){

        yes.play();  // odworzenie dzwieku
        let element = "let" + nr;
        document.getElementById(element).style.background = "#003300";    // poprawna lietar kolorowana na zielono
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";

        writePassword();
    }
    else{
        no.play();  // odworzenie dzwieku
        let element = "let" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";

        document.getElementById(element).setAttribute("onclick",";"); // żeby po zmianie koloru na czerwony div tej literki nie był klikalny,  -> setAttribut - ustaw atrybuty diva, wykonuje ale pustą instrukcję

        //skucha
        howManyMistakes++;
        let image = "img/s" + howManyMistakes + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="' + image + '" alt="" />';
    }

    //wygrana
    if(password == passwordHide){
        document.getElementById("alphabet").innerHTML = "Tak jest podałeś prawdziwe haslo: " + password + '<br /> <br /> <span class="reset" onclick="location.reload()">  JESZCZE RAZ?? </span>';
    }

    //przegrana
    if(howManyMistakes >= 9){
        document.getElementById("alphabet").innerHTML = "Przegrana! Prawdziwe hasło: " + password + '<br /> <br /> <span class="reset" onclick="location.reload()">  JESZCZE RAZ?? </span>';
    }

}
