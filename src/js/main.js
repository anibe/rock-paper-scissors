var RockPaperSci = {

    canvas : $('#canvas'),

    shapes : {
        names: ['Rock', 'Paper', 'Scissors'] // Shapes array. Could be extended with new shapes eg. Spock
    },

    map: {},

    gameInProgress: false,

    moveCount: 0,

    playerChoices: {},

    shapeSelector: '.shape-choices a',

    getGameMode: function () {
        return parseInt($('input[name=mode]:checked').val(), 10);
    },

    getPlayerWindows : function () {
        return this.canvas.find('.player');
    },

    /* This randomly chooses for the computer */
    getComputerChoice: function () {

        return Math.floor(Math.random() * this.shapes.names.length);

    },

    /* This sends an action to continue play, particularly for computers */
    advanceGame: function () {

        //this.canvas.find(this.shapeSelector).trigger('click');
        var that = this;

        $.each(this.canvas.find('.computer'), function () {
            that.trackMoves(that.moveCount, $(this).find(that.shapeSelector)[0]);
        });

    },

    /* Tracks moves */
    trackMoves: function (move, el) {

        var players = this.getPlayerWindows(),
            activePlayer = $(el).closest('.player').data('playerid'),
            shapeId,
            mode = this.getGameMode();

        switch (true) {
            case mode === 2:
                if (this.moveCount === 1) {
                    shapeId = $(players).find(el).data('shapeid');
                } else {
                    shapeId = this.getComputerChoice();
                }
                break;
            case mode === 3:
                shapeId = this.getComputerChoice();
                break;
            default:
                shapeId = $(players).find(el).data('shapeid');
        }

        this.playerChoices[activePlayer] = shapeId;

        this.moveCount++;

        this.doCompare(this.playerChoices);

    },

    /* This highlights what user or computer selects  */
    highlightChoices: function (choices) {

        var that = this,
            playerWindow,
            selector;

        for(var player in choices) {

            playerWindow = '.'+ player +' ';
            selector = that.shapeSelector +'[data-shapeid='+ choices[player] +']';

            console.log(player +' : '+ that.shapes.names[choices[player]]);

            that.canvas.find(playerWindow + selector).addClass('selected');
        }

    },

    /* Determines who wins and sends the messages to users */
    doCompare: function (choices) {

        var res = [],
            winningShapeId,
            message;

        for(var player in choices) {

            console.log(player +' : '+ choices[player]);
            res.push(choices[player]);

        }
        console.log(choices);

        console.log(this.decide(res[0], res[1]));

        winningShapeId = this.decide(res[0], res[1]);

        if (winningShapeId === -1) {
            console.log('Game is a draw!');
            message = 'Game ended as a draw!';
        } else {
            console.log('winner is '+ this.getPlayerByShapeId(winningShapeId, choices));
            message = this.getPlayerByShapeId(winningShapeId, choices) +' wins';
        }

        if (this.moveCount === 2 ) {
            console.log('game over');
            this.highlightChoices(this.playerChoices);
            this.displayWinner(message);
            this.gameOver();
            return;
        }

    },

    /* We need this to identify a plyer based on shape choice */
    getPlayerByShapeId: function (shapeid, choices) {
        for( var prop in choices ) {
            if( choices[ prop ] === shapeid ) {
                return prop;
            }
        }
    },

    /* Engine that checks who has won */
    decide: function (play1, play2) {
        if (play1 === play2){
            return -1;
        }

        return ( (this.map[play1][play2] === 1)? play1: play2 );

    },

    /* Show who has won in a modal */
    displayWinner: function (message) {

        var $msgBox = this.canvas.find('#message-box');

        $msgBox.find('.msg').html(message);
        $msgBox.removeClass('hidden');

    },

    /* This sets a winning rule which can be customised */
    setWinRule: function (winner, loser) {

        if (!this.map[winner]) {
            this.map[winner] = {};
        }

        this.map[winner][loser] = 1;
    },

    /* This happens when a game starts */
    restart: function () {
        this.moveCount = 0;
        this.playerChoices = {};
        this.gameInProgress = true;
        this.canvas.find('.player').removeClass('hidden');
        this.canvas.find(this.shapeSelector).removeClass('selected');
        this.advanceGame();

    },

    /* This happens when a game ends */
    gameOver: function() {

        this.gameInProgress = false;

        // Should probably stop listening to some events here
    },

    init: function() {

        var $canvas = this.canvas,
            $shapeButtons = $canvas.find(this.shapeSelector),
            $msgBox = this.canvas.find('#message-box'),
            that = this;

//        if (this.canvas.length > 0) {

            this.setWinRule(0,2);
            this.setWinRule(1,0);
            this.setWinRule(2,1);

            /* Event listener to monitor clicks on the shapes */
            $shapeButtons.on('click', function (e) {
                e.preventDefault();
                that.trackMoves(that.moveCount, this);
            });

            $canvas.find('#new-game').on('click', function (e) {
                e.preventDefault();
                this.innerText = 'Play Again';
                that.restart();
            });

            /* Event listener to monitor changes to game mode */
            $canvas.find('input[name=mode]').on('change', function () {
                if (that.getGameMode() === 2) {
                    $(that.getPlayerWindows()[0]).removeClass('computer');
                    $(that.getPlayerWindows()[1]).addClass('computer');
                } else {
                    $(that.getPlayerWindows()).addClass('computer');
                }
            });

            /* Event listener for close buttons */
            $('.close').on('click', function () {
               $(this).parent().addClass('hidden');
               $msgBox.addClass('hidden');
               that.canvas.find('.player').addClass('hidden');
            });
//
//        } else {
//            throw 'Error starting new game';
//        }
    }
};

(function () {
    'use strict';

    RockPaperSci.init();

})();