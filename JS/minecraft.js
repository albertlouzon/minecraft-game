// !!!!!!! HOW TO DISCOVER MYSTERY TILE : Faut empiler de la pierre sur une colonne bien précise, jusqu'a l'avant derniere case. Ca affichera la case mystere.
//// La colonne c'est le troisieme bloc de pierre en partant de la gauche (le petit au milieu)

//display modal on loading
$(window).on('load', function () {
    $('#myModal').modal('show');

    //charging the page
    $('#startButton').click(function () {
        $('#myModal').modal('hide')
        $('.loading').css('display', 'flex')

        setTimeout(function () {
            $('.sideBar').css('display', 'flex');
            $('.loading').css('display', 'none');
            minecraftGame.init();
        }, 2000);
    });

    $('#instrucButton').click(function () {
        $('#instrucModal').modal('show');
    })

});

var minecraftGame = {};

minecraftGame.init = function () {
    minecraftGame.tileSys();
    minecraftGame.layout();
};

minecraftGame.layout = function () {  //Creates a 2D array with a method that takes the coordinates of a cell of the array, and returns its value. Then dynamically generates a div for each cell.
    var map = {
        cols: 66,
        rows: 15,
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0],
            [0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 5, 0, 0, 0, 1, 2, 1, 0, 5, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0],
            [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        getTile: function (col, row) {
            return this.tiles[col][row]
        },
    }

    for (var c = 0; c < map.rows; c++) {
        for (var r = 0; r < map.cols; r++) {
            var tile = map.getTile(c, r);
            if (tile == 0) {  //tile returns the value of the cell that has c and r as coordinates.
                var divEmpty = $("<div/>");
                divEmpty.addClass('divEmpty'); //add a style to cells according to their value
                $('#bigBox').append(divEmpty);
            } else if (tile == 1) {
                var divGround = $("<div/>");
                divGround.addClass('divGround');
                $('#bigBox').append(divGround);
            } else if (tile == 2) {
                var divWood = $("<div/>");
                divWood.addClass('divWood');
                $('#bigBox').append(divWood);
            } else if (tile == 3) {
                var divLeaf = $("<div/>");
                divLeaf.addClass('divLeaf');
                $('#bigBox').append(divLeaf);
            } else if (tile == 4) {
                var divCloud = $("<div/>");
                divCloud.addClass('divCloud');
                $('#bigBox').append(divCloud);
            } else if (tile == 5) {
                var divStone = $("<div/>");
                divStone.addClass('divStone');
                $('#bigBox').append(divStone);
            } else if (tile == 6) {
                var divGrass = $("<div/>");
                divGrass.addClass('divGrass');
                $('#bigBox').append(divGrass);

            } else if (tile == 7) {
                var divNum10 = $("<div/>");
                divNum10.addClass('divNum10');
                $('#bigBox').append(divNum10);
            } else if (tile == 8) {
                var divMinion = $("<div/>");
                divMinion.addClass('divMinion');
                $('#bigBox').append(divMinion);
            }
        }
    }

    listMistery = document.querySelectorAll(".divEmpty");
    random = Math.floor(Math.random() * listMistery.length);
    listMistery[random].classList.remove("divEmpty");
    listMistery[random].classList.add("divNum10");

};
var list;
var counter = 0;
var tileType = 0;
var index;
var that;
var indexMistery;
var listMistery;
var random;

minecraftGame.tileSys = function () {

    var breakSound = new Audio('./sounds/break.mp3');
    var grassSound = new Audio('./sounds/grass.mp3');
    var stoneSound = new Audio('./sounds/stone.mp3');
    var woodSound = new Audio('./sounds/wood.mp3');
    var groundSound = new Audio('./sounds/ground.mp3');
    var cloudSound = new Audio('./sounds/breath.mp3');

    $("#toTheRight").on("click", function () {

        list = document.querySelectorAll('div');
        for (var k = 0; k < list.length; k++) {

            if (list[k].className == "divMinion") {
                that = k;

                if (list[that+1].className == "divEmpty") {
                    list[that].classList.add("divEmpty");
                    list[that].classList.remove("divMinion");

                    list[that+1].classList.add("divMinion");
                    list[that+1].classList.remove("divEmpty");

                }
                break;
            }

        }
    });

    $("#toTheLeft").on("click", function () {

        list = document.querySelectorAll('div');
        for (var k = 0; k < list.length; k++) {
            if (list[k].className == "divMinion") {
                that = k;

                if (list[that-1].className == "divEmpty") {
                    list[that].classList.add("divEmpty");
                    list[that].classList.remove("divMinion");

                    list[that-1].classList.add("divMinion");
                    list[that-1].classList.remove("divEmpty");
                }
            }
        }
    });

    $("#toolContainer0").on("click", function () {
        counter = 1;
        $("#toolContainer0").addClass("selectedTool");
        $("#toolContainer1").removeClass("selectedTool");
        $("#toolContainer2").removeClass("selectedTool");
        $("#toolContainer3").removeClass('selectedTool')
        $("#tileCreator").removeClass("selectedTileCreator")
        $('.divLeaf').on("click", function () {
            if (counter === 1) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divLeaf');
                $('.lastTile').removeClass('divStone divWood divCloud divGround divGrass')
                $('.lastTile').addClass('divLeaf')
                breakSound.play();
                tileType = 3;
            }
        })
        $('.divWood').on("click", function () {
            if (counter === 1) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divWood');
                $('.lastTile').removeClass('divStone divLeaf divCloud divGround divGrass')
                $('.lastTile').addClass('divWood')
                breakSound.play();
                tileType = 2;
            }
        })
    })

    $("#toolContainer1").on("click", function () {
        counter = 2;
        $("#toolContainer0").removeClass("selectedTool")
        $("#toolContainer1").addClass("selectedTool")
        $("#toolContainer2").removeClass("selectedTool")
        $("#toolContainer3").removeClass('selectedTool')
        $("#tileCreator").removeClass("selectedTileCreator")
        $('.divStone').on("click", function () {
            if (counter === 2) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divStone');
                $('.lastTile').removeClass('divLeaf divWood divCloud divGround divGrass');
                $('.lastTile').addClass('divStone');
                breakSound.play();
                tileType = 5;
            }
        })
    })

    $("#toolContainer2").on("click", function () {
        counter = 3;
        $("#toolContainer0").removeClass("selectedTool")
        $("#toolContainer1").removeClass("selectedTool")
        $("#toolContainer2").addClass("selectedTool")
        $("#toolContainer3").removeClass('selectedTool')
        $("#tileCreator").removeClass("selectedTileCreator")
        $('.divGrass').on("click", function () {
            if (counter === 3) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divGrass');
                $('.lastTile').removeClass('divLeaf divWood divCloud divGround divStone')
                $('.lastTile').addClass('divGrass')
                breakSound.play();
                tileType = 6;
            }
        })
        $('.divGround').on("click", function () {
            if (counter === 3) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divGround');
                $('.lastTile').removeClass('divStone divLeaf divCloud divWood divGrass')
                $('.lastTile').addClass('divGround')
                breakSound.play();
                tileType = 1;
            }
        })
    })

    $("#toolContainer3").on("click", function () {
        counter = 4;
        $("#toolContainer0").removeClass("selectedTool")
        $("#toolContainer1").removeClass("selectedTool")
        $("#toolContainer2").removeClass("selectedTool")
        $("#toolContainer3").addClass('selectedTool')
        $("#tileCreator").removeClass("selectedTileCreator")
        $('.divCloud').on("click", function () {
            if (counter === 4) {
                $(this).addClass('divEmpty');
                $(this).removeClass('divCloud');
                $('.lastTile').removeClass('divLeaf divWood divGround divGrass divStone');
                $('.lastTile').addClass('divCloud');
                cloudSound.play();
                tileType = 7;
            }
        })
    })

    $(".lastTile").on("click", function () {
        counter = 5;
        $("#toolContainer0").removeClass("selectedTool")
        $("#toolContainer1").removeClass("selectedTool")
        $("#toolContainer2").removeClass("selectedTool")
        $("#tileCreator").addClass("selectedTileCreator")

        if (tileType == 1 || tileType == 2 || tileType == 3 || tileType == 5 || tileType == 6 || tileType == 7) {
            $('.divEmpty').on("click", function () {

                that = this; //Here we want to find the index of the div we want to put the element in
                list = document.querySelectorAll('div');
                for (var k = 0; k < list.length; k++) {
                    if (that == list[k]) {
                        index = k;
                    }
                    if (list[k].className == "divNum10") {
                        indexMistery = k;
                    }
                }
                // We want to put a new element in the matrix, we want to do it only if it is logical with our actual matrix. For example we don't want to user to be able to put a stone in the sky or above a tree
                if (counter == 5) {
                    if (tileType == 1 && list[index + 66].className == 'divGround') {
                        $(this).addClass('divGround');
                        $(this).removeClass('divLeaf divWood divStone divCloud divGrass divEmpty');
                        groundSound.play();
                    } if (tileType == 2 && (list[index + 66].className == 'divGrass' || list[index + 66].className == 'divWood')) {
                        $(this).addClass('divWood');
                        $(this).removeClass('divLeaf divGround divStone divCloud divGrass divEmpty');
                        woodSound.play();
                    } if (tileType == 3 && (list[index + 66].className == 'divWood' || list[index + 1].className == 'divLeaf' || list[index - 66].className == 'divLeaf' || list[index - 1].className == 'divLeaf' || list[index + 66].className == 'divLeaf')) {
                        $(this).addClass('divLeaf');
                        $(this).removeClass('divWood divGround divStone divCloud divGrass divEmpty');
                        grassSound.play();
                    } if (tileType == 5 && (list[index + 66].className == 'divGrass' || list[index + 66].className == 'divStone')) {
                        $(this).addClass('divStone');
                        $(this).removeClass('divWood divGround divLeaf divCloud divGrass divEmpty');
                        stoneSound.play();
                        if (tileType == 5 && list[indexMistery + 66].className == 'divStone') { //Whenever a stone is created behind the mystery tile, then the mystery tile shows up.
                            $(".divNum10").addClass('victoryTile');
                            $(".divNum10").removeClass('.divNum10');
                            $(".victoryTile").on("click", function () {
                                var finalSong = new Audio('victorySong.mp3');
                                $('#fireModal').modal('show');
                                finalSong.play();
                                $(this).removeClass("divNum10");
                                $('#resetButton').click(function(){
                                  $('#bigBox').empty();
                                  minecraftGame.init();
                                  $('#fireModal').modal('hide');
                                })
                            });
                        }
                    } if (tileType == 6 && list[index + 66].className == 'divGround') {
                        $(this).addClass('divGrass');
                        $(this).removeClass('divWood divStone divLeaf divCloud divGround divEmpty');
                        grassSound.play();
                    } if (tileType == 7 && list[index].className == 'divEmpty') {
                        $(this).addClass('divCloud');
                        $(this).removeClass('divWood divStone divLeaf divGround divGrass divEmpty');
                    }
                }
            })
        }
    })
};
