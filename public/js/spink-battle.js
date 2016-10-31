// User Information
$(document).ready(function() {
    getCharacterStatus()
    refreshStatus()
        //setInterval(refreshStatus, 60 * 1 * 1000)
    setInterval(refreshStatus, 5 * 1000)

    // add event
    $("#gotorankviewbtn").on("click", function() {
        location.href = "/spink/rank/view"
    })
})

function updateMyAbility() {

    move()

    var input_numbers = [
        parseInt($("#toggle1").html()),
        parseInt($("#toggle2").html()),
        parseInt($("#toggle3").html())
    ]

    var predict_numbers = [
        parseInt($("#toggle4").html()),
        parseInt($("#toggle5").html()),
        parseInt($("#toggle6").html())
    ]

    $.ajax('/spink/character/submit/' + user_info._id, {
        data: JSON.stringify({
            input_numbers: input_numbers,
            predict_numbers: predict_numbers
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function(data) {
            getCharacterStatus(function() {
                getCharacterStatus()
                submit_progress_complete()
            })
        }
    })
}

// It refreshed regulary
function refreshStatus() {
    getMyBattleResult()
    getBattleStatusBoard()
    getRankBoard()

}
getYesterdayRank()
function getMyBattleResult() {
    // Load Default Informations
    if (user_info._id == null) return

    $.get("/spink/battle/result/" + user_info._id, function(data) {
        // Update Element
        $("#winning_count").html(data.winning)
        $("#losing_count").html(data.losing)
    })
}

function getBattleStatusBoard() {
    $.get("/spink/battle", function(data) {
        //battle_status
        var battle_status = ""
        for (var i = 0; i < data.length; ++i) {
            var c = data[i]
            var winner = (c.winner_info[0] == null ? "" : c.winner_info[0].nickname)
            var loser = (c.loser_info[0] == null ? "" : c.loser_info[0].nickname)

            switch (c.type) {
                case 0:
                    battle_status +=
                        '<div class="alert alert-info fade in" style="margin-bottom:0px;">' +
                        '<strong>' + winner + ' VS ' + loser + ' </strong> ' + winner + ' 님과 ' + loser + ' 님 전투중.' +
                        '</div>'
                    break;
                case 1:
                    if (c.loser_info[0] == null) {
                        battle_status +=
                            '<div class="alert alert-success fade in" style="margin-bottom:0px;">' +
                            '<strong>' + winner + ' 승!</strong> ' + winner + ' 님이 부전승으로 이겼습니다.' +
                            '</div>'
                    } else {
                        battle_status +=
                            '<div class="alert alert-success fade in" style="margin-bottom:0px;">' +
                            '<strong>' + winner + ' 승!</strong> ' + winner + ' 님이 ' + loser + ' 님에게 이겼습니다.' +
                            '</div>'
                    }
                    break;
                case 2:
                    battle_status +=
                        '<div class="alert alert-danger fade in" style="margin-bottom:0px;">' +
                        '<strong>' + loser + ' 패!</strong> ' + loser + ' 님이 ' + winner + ' 님에게 졌습니다. ' +
                        '</div>'
                    break;
            }

        }

        $('#battle_status').html(battle_status)

        /*
        <div class="alert alert-success fade in" style="margin-bottom:0px;">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>apple 승!</strong> apple 님이 samsung 님에게 이겼습니다. 대전시간 12초.
        </div>

        <div class="alert alert-info fade in" style="margin-bottom:0px;">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>facebook VS naver </strong> facebook 님과 naver 님 전투중.
        </div>
        <div class="alert alert-warning fade in" style="margin-bottom:0px;">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>google VS MS </strong> google 님과 MS 님 전투중. google 님이 이길 확률 78%
        </div>
        <div class="alert alert-danger fade in" style="margin-bottom:0px;">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>samsung 패!</strong> samsung 님이 apple 님에게 졌습니다. 대전시간 12초.
        </div>
        */

    })
}

function getCharacterStatus(cb) {
    if (user_info._id == null) return

    $.get("/spink/character/" + user_info._id, function(data) {
        var table =
            '<table class="w3-table-all notranslate" style="text-align:center; font-size:12pt; width-min:340px ">' +
            '<tr>' +
            '<th style="width:25%; text-align:center;">&nbsp;</th>' +
            '<th style="width:25%; font-size:12pt; text-align:center; vertical-align: middle;">오늘</th>' +
            '<th style="width:25%; font-size:12pt; text-align:center; vertical-align: middle;">어제</th>' +
            '<th style="width:25%; font-size:12pt; text-align:center; vertical-align: middle;">누적' +
            '<p></p>평균</th>' +
            '</tr>' +
            '<tr>' +
            '<td style="text-align:center;"><strong>힘</strong></td>' +
            '<td style="text-align:center;">' + data.status[0] + '</td>' +
            '<td style="text-align:center;">' + data.last_status[0] + '</td>' +
            '<td style="text-align:center;">' + Math.round(data.accumulated_status[0]) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="text-align:center;"><strong>민첩</strong></td>' +
            '<td style="text-align:center;">' + data.status[1] + '</td>' +
            '<td style="text-align:center;">' + data.last_status[1] + '</td>' +
            '<td style="text-align:center;">' + Math.round(data.accumulated_status[1]) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="text-align:center;"><strong>방어</strong></td>' +
            '<td style="text-align:center;">' + data.status[2] + '</td>' +
            '<td style="text-align:center;">' + data.last_status[2] + '</td>' +
            '<td style="text-align:center;">' + Math.round(data.accumulated_status[2]) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="text-align:center;"><strong>적중</strong></td>' +
            '<td style="text-align:center;">' + data.status[3] + '</td>' +
            '<td style="text-align:center;">' + data.last_status[3] + '</td>' +
            '<td style="text-align:center;">' + Math.round(data.accumulated_status[3]) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="text-align:center;"><strong>운</strong></td>' +
            '<td style="text-align:center;">' + data.status[4] + '</td>' +
            '<td style="text-align:center;">' + data.last_status[4] + '</td>' +
            '<td style="text-align:center;">' + Math.round(data.accumulated_status[4]) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="text-align:center;"><strong>체력</strong></td>' +
            '<td style="text-align:center;">' + data.status[5] + '</td>' +
            '<td style="text-align:center;">' + data.last_status[5] + '</td>' +
            '<td style="text-align:center;">' + Math.round(data.accumulated_status[5]) + '</td>' +
            '</tr>' +
            '</table>'

        $('#my_ability').html(table)

        if (cb != null) cb()
    })
}

function getYesterdayRank() {
    $.get("/spink/battle/yesterdayRank", function(data) {
      for (var i = 0; i < data.length; ++i) {
          var c = data[i]
        }
        console.log("yesterday data[0] : ", data[0] )

      $('#yesterdayWinner').html(data[0].user[0].nickname)
    })
  }

function getRankBoard() {
    $.get("/spink/battle/rank", function(data) {
        //today_ranking
        var rankboard =
            '<table class="w3-table-all notranslate" style="text-align:center; font-size:12pt; width-min:340px ">' +
            '<tr>' +
            '<th style="width:25%; font-size:12pt; text-align:center; vertical-align: middle;">NO</th>' +
            '<th style="width:25%; font-size:12pt; text-align:center; vertical-align: middle;">ID</th>' +
            '<th style="width:25%; font-size:12pt; text-align:center; vertical-align: middle;">승수</th>' +
            '<th style="width:25%; font-size:12pt; text-align:center; vertical-align: middle;">누적' +
            '<P></p>승수</th>' +
            '</tr>'

        var current_rank = 0
        var last_count = -1

        for (var i = 0; i < data.length; ++i) {
            var c = data[i]
            //console.log("data[i] : ", data[i])
            if (last_count == -1 ||
                last_count > c.count) {
                last_count = c.count
                current_rank += 1
            }

            if (c.user[0].url) {
                rankboard +=
                    '<tr>' +
                    '<td style="text-align:center;"><strong>' + current_rank + '</strong></td>' +
                    '<td style="text-align:center;"><a href="' + c.user[0].url + '">' + c.user[0].nickname + '&nbsp;<i class="fa fa-home" aria-hidden="true"></i></a></td>' +
                    '<td style="text-align:center;">' + c.count + '</td>' +
                    '<td style="text-align:center;">0</td>' +
                    '</tr>'
            } else {
                rankboard +=
                    '<tr>' +
                    '<td style="text-align:center;"><strong>' + current_rank + '</strong></td>' +
                    '<td style="text-align:center;">' + c.user[0].nickname + '</td>' +
                    '<td style="text-align:center;">' + c.count + '</td>' +
                    '<td style="text-align:center;">0</td>' +
                    '</tr>'
            }
        }
        //console.log("data[0].user[0] : ", data[0].user[0] )
        //console.log("data[0] : ", data[0] )

        rankboard += '</table>'

        $('#today_ranking').html(rankboard)


    })
}
