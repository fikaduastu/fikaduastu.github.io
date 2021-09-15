"use strict";
(function() {
    const NUM_OF_ROWS_COLS = 4;
    const PIECE_SIZE = 100;
    let emptySquareRow = 3;
    let emptySquareCol = 3;

    $(function() {
        let pieces = $("#puzzlearea div");
        pieces.each(function(index, element) {
            let piece = $(element);
            let x = ((index % NUM_OF_ROWS_COLS) * PIECE_SIZE);
            let y = (Math.floor(index / NUM_OF_ROWS_COLS) * PIECE_SIZE);

            piece.addClass("puzzlepiece").css("left", x + "px").css("top", y + "px")
                .css("background-image", "url('background.jpg')").css("background-position", -x + "px " + (-y) + "px");

            piece.row = y / PIECE_SIZE;
            piece.col = x / PIECE_SIZE;
            piece.attr("id", "square_" + piece.row + "_" + piece.col).attr("row", piece.row).attr("col", piece.col);
        });

        pieces.click(function() {
            if (isMoveavablePiece($(this))) swapWithEmpty($(this));
        });

        pieces.mouseover(function() {
            const piece = $(this);
            if (isMoveavablePiece(piece)) piece.addClass("movablepiece");
        }).mouseout(function() {
            $(this).removeClass("movablepiece");
        });

        $("#shufflebutton").click(function() {
            const numOfTimes = Math.pow(NUM_OF_ROWS_COLS, 3);
            for (let a = 0; a < numOfTimes; a++) {
                const moveablePieces = $("#puzzlearea div").filter(function(index) {
                    return isMoveavablePiece($(this));
                });

                const randomIndex = Math.floor(Math.random() * moveablePieces.length);
                const piece = moveablePieces[randomIndex];
                swapWithEmpty($(piece));
            }
        });
    });

    function isMoveavablePiece(piece) {
        const rowDiff = Math.abs(parseInt(piece.attr("row")) - emptySquareRow);
        const colDiff = Math.abs(parseInt(piece.attr("col")) - emptySquareCol);
        return ((rowDiff + colDiff) === 1);
    }

    function swapWithEmpty(piece) {
        const currentPieceRow = parseInt(piece.attr("row"));
        const currentPieceCol = parseInt(piece.attr("col"));

        piece.attr("row", emptySquareRow).attr("col", emptySquareCol).css("left", (emptySquareCol * PIECE_SIZE) + "px")
            .css("top", (emptySquareRow * PIECE_SIZE) + "px").attr("id", "square_" + emptySquareRow + "_" + emptySquareCol);

        emptySquareRow = currentPieceRow;
        emptySquareCol = currentPieceCol;
        checkGameStatus();
    }
    function checkGameStatus() {
        let expectedOutCome = [];
        let currentResult = [];

        $("#puzzlearea div").each(function(index, piece) {
            let i = index % NUM_OF_ROWS_COLS;
            let j = Math.floor(index / NUM_OF_ROWS_COLS);
            expectedOutCome.push({ row: j, col: i });
            currentResult.push({ row: parseInt($(piece).attr("row")), col: parseInt($(piece).attr("col")) });
        });

        const hasWon = expectedOutCome.every((element, index) =>
            ((element.row === currentResult[index].row) && (element.col === currentResult[index].col)));
        if (hasWon) $("body").addClass("won");
        else $("body").removeClass("won");
    }
})();