var searchResult = new Vue({
    el: '#search',
    data: {
        keywords: '',
        items: []
    },
    methods: {
        search: function () {
            this.$http.get("search/" + this.keywords).then(function (response) {
                this.items = response.body;
            }, function (response) {
                console.log("error");
            });
        }
    }
});

var playingItem;
$(document).ready(function () {
    $("#player").prop({
        volume: 0
    });
    var audioplayer = document.getElementById("player");
    $("body").on("click", ".preview", function (e) {
        e.preventDefault();
        if (playingItem == undefined || playingItem.attr("link") != $(this).attr("link")) {
            playingItem = $(this);
            $("#player").animate({
                volume: 0
            }, 1000, function () {
                $("#player").attr({
                    'src': playingItem.attr("link")
                });
                audioplayer.play();
                itemPreviewIcon("play");
            });
        } else {
            if (audioplayer.paused == true) {
                audioplayer.play();
                itemPreviewIcon("play");
            } else {
                $("#player").animate({
                    volume: 0
                }, 1000, function () {
                    audioplayer.pause();
                    itemPreviewIcon("stop");
                });
            }
        }

    });
    $("#player").on("loadeddata", function () {
        itemPreviewIcon("played");
        $("#player").animate({
            volume: 1
        }, 1000);
    });
    $("#player").on("ended", function () {
        itemPreviewIcon("stop");
    });
});

function itemPreviewIcon(action) {
    switch (action) {
        case "play":
            $(".preview")
                .removeClass('playingPreviewIcon')
                .delay(300)
                .children("i")
                .removeClass('fa-spinner fa-pulse fa-stop')
                .addClass('fa-volume-up');
            playingItem
                .addClass('playingPreviewIcon')
                .children("i")
                .removeClass('fa-volume-up fa-stop')
                .addClass('playingPreviewIcon fa-spinner fa-pulse');

            break;
        case "played":
            playingItem.children("i")
                .removeClass('fa-spinner fa-pulse ')
                .addClass('fa-stop');

            break;
        case "stop":
            playingItem
                .removeClass('playingPreviewIcon')
                .delay(300)
                .children("i")
                .removeClass('fa-spinner fa-pulse fa-stop')
                .addClass('fa-volume-up');
            break;


    }
}