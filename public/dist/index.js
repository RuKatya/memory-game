var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var chooseLevelOfGame = document.querySelector('.chooseLevelOfGame');
var cards = document.querySelector('.cards');
var gameInfo__time = document.querySelector('.gameInfo__time');
var gameInfo__score = document.querySelector('.gameInfo__score');
var gameInfo__reset = document.querySelector('.gameInfo__reset');
var winner = document.querySelector('.winner');
var dataGame;
var openCard = [];
var numOfRigthCards = 0;
var totalOpenedInGame = [];
var seconds = 0;
var minutes = 0;
function hendleNumbersOfCards(numOfCards) {
    return __awaiter(this, void 0, void 0, function () {
        var data, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(numOfCards);
                    return [4 /*yield*/, axios.post('/get-data', { numOfCards: numOfCards })];
                case 1:
                    data = (_a.sent()).data;
                    dataGame = data;
                    console.log(dataGame);
                    if (numOfCards == 4) { //change width of cards by number of cards
                        cards.classList.add('four');
                    }
                    else if (numOfCards == 8) {
                        cards.classList.add('eight');
                    }
                    else if (numOfCards == 12) {
                        cards.classList.add('twelve');
                    }
                    html = '';
                    html += dataGame.map(function (d) {
                        return "\n        <div class=\"memory-card\" id=\"" + d.similarNum + "\">\n            <div class=\"back\" id=\"" + d.similarNum + "\"></div>\n            <div class=\"front\" >\n                <img src=\"" + d.img + "\" alt=\"" + d.similarNum + "\" id=\"" + d.similarNum + "\" />\n            </div>\n        </div>\n        ";
                    }).join('');
                    cards.innerHTML = html;
                    timer(); //timer
                    setInterval(function () {
                        gameInfo__score.innerHTML = "Total: " + numOfRigthCards;
                    }, 1000);
                    setInterval(function () {
                        gameInfo__reset.innerHTML = " <button onclick=\"location.reload()\" class=\"playAgainBtn reset\">Start new game</button>    ";
                    }, 1000);
                    chooseLevelOfGame.style.display = "none";
                    return [2 /*return*/];
            }
        });
    });
}
cards.addEventListener('click', function (e) {
    var target = e.target;
    var targetParent = target.offsetParent; //get parent of child
    if (target.nodeName === "DIV") { //check if we have the rigth nodename
        targetParent.classList.toggle('flip');
        console.log("the id is " + targetParent.id); //what id we get
        if (openCard.length === 0 || openCard.length === 1) { //if we have length 0 or 1 add to arr
            openCard.push(targetParent); //add the id of card
            swiftCard();
        }
    }
});
function swiftCard() {
    console.log(openCard);
    if (openCard.length == 2) {
        function checkOpenedCards(openedCard) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.get("/check?openFirst=" + openedCard[0].id + "&openSecond=" + openedCard[1].id)];
                        case 1:
                            data = (_a.sent()).data;
                            console.log(data); //get back if same or not
                            if (data === true) {
                                console.log("they are the same");
                                setTimeout(function () {
                                    openedCard[0].style.opacity = "0";
                                    openedCard[1].style.opacity = "0";
                                }, 500);
                                ++numOfRigthCards; //how many card is right
                                totalOpenedInGame.push(openedCard[0], openedCard[1]); //push to opened arr
                                console.log("total played " + totalOpenedInGame.length);
                                console.log("the score is: " + numOfRigthCards);
                                if (totalOpenedInGame.length == dataGame.length) { //check if win
                                    console.log("you win");
                                    cards.style.display = "none";
                                    winner.innerHTML = "\n                    <div class=\"winner__info\">\n                        <h1>You won!!!</h1>\n                        <h2>Time: " + minutes + ":" + seconds + "</h2>\n                    </div>\n                    \n                    <img src=\"./img/ballon.png\" />\n                    \n                    ";
                                    gameInfo__time.style.display = 'none';
                                }
                            }
                            else { //if false -> rotate the card back
                                setTimeout(function () {
                                    openedCard[0].classList.toggle('flip');
                                    openedCard[1].classList.toggle('flip');
                                }, 500);
                                console.log("they are diffrent");
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        checkOpenedCards(openCard);
        openCard = [];
    }
}
function flipCard() {
    this.classList.toggle('flip');
}
function timer() {
    seconds = 0;
    minutes = 0;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    setInterval(function () {
        seconds++;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (seconds === 60) {
            minutes++;
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            seconds = 0;
        }
        gameInfo__time.innerHTML = "\n            <p>Timer: " + minutes + ":" + seconds + "</p>\n        ";
    }, 1000);
}
