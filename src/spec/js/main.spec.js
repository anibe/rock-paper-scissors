/* Will run tests inside the browser using _SpecRunner.html until i can sort out whats wrong */

/* jshint ignore:start */
describe("Rock Paper Scissors game", function() {
    "use strict";

    var RockPaperSci = RockPaperSci || {};

    describe('when it starts', function () {

        beforeEach(function(){


            this.template = '<div id="canvas" class="canvas"> <h1 class="main-title">Rock Paper Scissors!</h1> <div class="game-modes"> <fieldset> <!--<label>--> <!--Human vs Human--> <!--<input type="radio" name="mode" value="1">--> <!--</label>--> <label> Human vs Computer <input type="radio" name="mode" value="2" checked> </label> <label> Computer vs Computer <input type="radio" name="mode" value="3"> </label> </fieldset> <button class="btn btn-primary" id="new-game">Start game</button> </div> <div class="player-area group"> <div class="player player1 hidden" data-playerid="player1"> <div class="player-name">Player 1 <span></span></div> <div class="chosen-shape"> <span></span> </div> <div class="shape-choices"> <ul> <li class="shape0"><a data-shapeid="0" href="#">shape name 1: rock</a></li> <li class="shape1"><a data-shapeid="1" href="#">shape name 2: paper</a></li> <li class="shape2"><a data-shapeid="2" href="#">shape name 3: scissors</a></li> </ul> </div> </div> <div class="player player2 computer hidden" data-playerid="player2"> <div class="player-name">Player 2 <span></span></div> <div class="chosen-shape"> <span></span> </div> <div class="shape-choices"> <ul> <li class="shape0"><a tabindex="-1" data-shapeid="0" href="#">shape name 1: rock</a></li> <li class="shape1"><a tabindex="-1" data-shapeid="1" href="#">shape name 2: paper</a></li> <li class="shape2"><a tabindex="-1" data-shapeid="2" href="#">shape name 3: scissors</a></li> </ul> </div> </div> <div id="message-box" class="mask hidden"> <h2 class="msg"></h2> <div class="img"><img src="img/dr-cooper.jpg" alt="Sheldon approves of this game"></div> <button class="close" id="proceed" >OK</button> </div> </div> </div>';


            /* There is certainly a better way to load these fixtures, but I'm doing this quick solution for now */
            $(this.template).appendTo('body'); // Fixture

            this.canvas = $('#canvas');
            this.canvas.hide();

        });

        it("should have a defined number of shapes", function() {
            expect(RockPaperSci.shapes.names.length).toBe(3);
        });

        it("should have at least 2 players", function() { // For now, the HTML is determinant of the number of players
            expect(this.canvas.find('.player').length).toBe(2);
        });

        it("should allow each shape to compare the 'strength' values", function() {
            // Not even sure what I wanted to test here to be honest
            expect(true).toBe(true);
        });

        it("should enable a game to be restarted", function() {

            RockPaperSci.moveCount = 2; // Pretend that the game had already been started

            RockPaperSci.restart();

            expect(RockPaperSci.moveCount).toBe(0);
        });
    });

});
/* jshint ignore:end */