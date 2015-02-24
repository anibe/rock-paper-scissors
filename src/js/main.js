var RockPaperSci = {

    canvas : $('#canvas'),

    shapes : {
        names: ['Rock', 'Paper', 'Scissors'], // Shapes array. Could be extended with new shapes eg. Spock
        beatsIndex: [2, 0, 1] // This corresponds to the shapes above which they beat
    },

    moveCount: 1,

    shapeSelector: '.shape-choices a',

    getPlayerWindows : function () {
        return this.canvas.find('.player');
    },

    config: function () {

        var $canvas = this.canvas,
            isComputer = $canvas.data('vscomputer'),
            shapeSelector = this.getPlayerWindows().find('.shape-choices a');

        // Listen for player actions
        // this.getPlayerChoices(shapeSelector);

        //this.setPlayers($canvas, isComputer);

    },

    computerMove: function (context) {

        console.log('computer would play here');

    },

    getPlayerChoices : function (player) {

        return player.data('shapeid');

    },

    trackMoves: function (move, isComputer) {

        var player1 = $(this.getPlayerWindows()[0]).find(this.shapeSelector),
            player2 = $(this.getPlayerWindows()[1]).find(this.shapeSelector);

//        if (isComputer) {
//            this.computerMove(player2);
//        }

        console.log('moves'+ move);

        if (move === 2) {
            this.doCompare(this.getPlayerChoices(player1), this.getPlayerChoices(player2));
            this.move = 1;
        } else {
            this.moveCount++;
        }

    },

    doCompare: function (shape1, shape2) {

        console.log(shape1, shape2);

    },

    init: function() {

        if (this.canvas.length > 0) {

            var $canvas = this.canvas,
                $shapeButtons = $canvas.find(this.shapeSelector),
                isComputer = $canvas.data('vscomputer'),
                that = this;

            $shapeButtons.on('click', function (e) {
                e.preventDefault();
                that.trackMoves(that.moveCount, isComputer);
            });

        } else {
            throw 'Error starting new game';
        }
    }
}