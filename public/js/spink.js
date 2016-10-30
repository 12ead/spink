var ckNum =1;

function myFunction0(){
        var change = document.getElementById("btText_01");
        var change1 = document.getElementById("btText_02");
        if (change.innerHTML == "?" || change.innerHTML == "3" )
        {
            change.innerHTML = "1";
            change1.innerHTML = "1";

        }
        else if (change.innerHTML == "1") {

            change.innerHTML = "2";
            change1.innerHTML = "2";
        }
        else if (change.innerHTML == "2") {

            change.innerHTML = "3";
            change1.innerHTML = "3";

           //  document.getElementById("answer").innerHTML = "정답! 당연히 서로 다른 숫자 두개가 만났으니,<br>나머지 숫자가 되어야 겠죠!<br>만약 1 @ 1 = ? 이면, 당연히 1이 되어야 합니다.<br>1 @ 1 = 1,&nbsp;&nbsp;&nbsp;&nbsp;1 @ 2 = 3,&nbsp;&nbsp;&nbsp;&nbsp;1 @ 3 = 2<br>2 @ 1 = 3,&nbsp;&nbsp;&nbsp;&nbsp;2 @ 2 = 2,&nbsp;&nbsp;&nbsp;&nbsp;2 @ 3 = 1<br>3 @ 1 = 2,&nbsp;&nbsp;&nbsp;&nbsp;3 @ 2 = 1,&nbsp;&nbsp;&nbsp;&nbsp;3 @ 3 = 3<br>";
        }
}
    function textFunc01(){
      var change1 = document.getElementById("btText_01");
      if(change1.innerHTML == "1"){
        document.getElementById("text_01").innerHTML = "땡";
        document.getElementById("text_02").innerHTML = "-_-;; 하하";
      } else if(change1.innerHTML == "2"){
        document.getElementById("text_01").innerHTML = "땡";
        document.getElementById("text_02").innerHTML = ".. 그냥 장난하는 거죠?";
      } else if(change1.innerHTML == "3"){
        document.getElementById("text_01").innerHTML = "정답";
        document.getElementById("text_02").innerHTML = "정답! 당연히 서로 다른 숫자 두개가 만났으니,<br>나머지 숫자가 되어야 겠죠!<br>만약 1 과 1이 만났다면?<br>당연히 1이 되어야 합니다. 즉,<br>1 과 1 은 1,&nbsp; &nbsp; 1 과 2 는 3,&nbsp; &nbsp; 1 과 3 은 2<br>2 와 1 은 3,&nbsp; &nbsp; 2 와 2 는 2,&nbsp; &nbsp; 2 와 3 은 1<br>3 과 1 은 2,&nbsp; &nbsp; 3 과 2 는 1,&nbsp; &nbsp; 3 과 3 은 3<br>";
      } else if(change1.innerHTML == "?" ){
        document.getElementById("text_02").innerHTML = "??";
      }
    }

    function myFunction1() {
        var change = document.getElementById("toggle1");
        if (change.innerHTML == "2")
        {
            change.innerHTML = "3";
        }
        else if (change.innerHTML == "3") {

            change.innerHTML = "1";
        }
        else if (change.innerHTML == "1") {

            change.innerHTML = "2";
        }
    }
    function myFunction2() {
        var change = document.getElementById("toggle2");
        if (change.innerHTML == "2")
        {
            change.innerHTML = "3";
        }
        else if (change.innerHTML == "3") {

            change.innerHTML = "1";
        }
        else if (change.innerHTML == "1") {

            change.innerHTML = "2";
        }
    }
    function myFunction3() {
        var change = document.getElementById("toggle3");
        if (change.innerHTML == "2")
        {
            change.innerHTML = "3";
        }
        else if (change.innerHTML == "3") {

            change.innerHTML = "1";
        }
        else if (change.innerHTML == "1") {

            change.innerHTML = "2";
        }
    }
    function myFunction4() {
        var change = document.getElementById("toggle4");
        if (change.innerHTML == "2")
        {
            change.innerHTML = "3";
        }
        else if (change.innerHTML == "3") {

            change.innerHTML = "1";
        }
        else if (change.innerHTML == "1") {

            change.innerHTML = "2";
        }
    }
    function myFunction5() {
        var change = document.getElementById("toggle5");
        if (change.innerHTML == "2")
        {
            change.innerHTML = "3";
        }
        else if (change.innerHTML == "3") {

            change.innerHTML = "1";
        }
        else if (change.innerHTML == "1") {

            change.innerHTML = "2";
        }
    }
    function myFunction6() {
        var change = document.getElementById("toggle6");
        if (change.innerHTML == "2")
        {
            change.innerHTML = "3";
        }
        else if (change.innerHTML == "3") {

            change.innerHTML = "1";
        }
        else if (change.innerHTML == "1") {

            change.innerHTML = "2";
        }
    }
    function button4TextEx() {
        var change = document.getElementById("button4");
        //var change1 = document.getElementById("button5");
        if (change.innerHTML == "더읽기")
        {
            change.innerHTML = "감추기";
            //change1.innerHTML = "감추기";
        }
        else if (change.innerHTML == "감추기") {

            change.innerHTML = "더읽기";
            //hange1.innerHTML = "더읽기";
        }
    }


var submit_progress_interval_id = null
function move() {
  var elem = document.getElementById("myBar");
  var width = 1;
  submit_progress_interval_id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(submit_progress_interval_id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}
function submit_progress_complete(){
  var elem = document.getElementById("myBar");
  elem.style.width = "100%";
  clearInterval(submit_progress_interval_id);
}

$(document).ready(function(){
    $("#hide").click(function(){
        $("p").hide();
    });
    $("#show").click(function(){
        $("p").show();
    });
});
//
// <p>If you click on the "Hide" button, I will disappear.</p>
//
// <button id="hide">Hide</button>
// <button id="show">Show</button>


$(document).ready(function(){
    $("#button1").click(function(){
        $("#div1").toggle("slow", btn1Hide()); //slow 뺴고 cllback 함수만 써도 됨
    });
});
$(document).ready(function(){
    $("#button2").click(function(){

        $("#div2").toggle("slow", btn2Hide()); //toggle 대신 fadeToggle 써도 될듯

    });
});
$(document).ready(function(){
    $("#button3").click(function(){

        $("#div3").toggle("slow", btn3Hide());
    });
});
$(document).ready(function(){
    $("#button4").click(function(){

        $("#div4").toggle();
    });
});

//button5는 설명관련 모든 div 요소 hide,

$(document).ready(function(){
    $("#button6").click(function(){

        $("#div6").toggle("slow", btn6Hide());
    });
});

$(document).ready(function(){
    $("#button7").click(function(){

      $("#div7").toggle("slow", btn7Hide());
    });
});

$(document).ready(function(){
    $("#button8").click(function(){

      $("#div8").show("slow");
    });
});

$(document).ready(function(){
  $("#button9").click(function(){

    $("#div9").show("slow", btn9Hide());
  });
});
$(document).ready(function(){
  $("#spinkNumSubmit").click(function(){
    $("#myProgress").show();
    $("#divBtn4").show();
  });
});

//Hide 관련 함수 정의

$(document).ready(function(){
    $("#button5").click(function(){
      $("#divBtn1").show();
      $("#divBtn1_1").show();
      $("#divBtn2").show();
      $("#divBtn3").show();
      $("#divBtn4").show();
      $("#divBtn6").show();
      $("#divBtn7").show();
      $("#divBtn9").show();
      $("#div1").hide();
      $("#div2").hide();
      $("#div3").hide();
      $("#div4").hide();
      $("#div6").hide();
      $("#div7").hide();
      $("#div8").hide();
      $("#div9").hide();
      var change1 = document.getElementById("btText_01");
      change1.innerHTML = "?";
      document.getElementById("text_01").innerHTML ="";
      document.getElementById("text_02").innerHTML ="";
    });
});

var j = 1;
function a(){
 if(j == 1){
   $("#div1").hide();
   $("#div2").hide();
   $("#div3").hide();
   $("#div4").hide();
   $("#div6").hide();
   $("#div7").hide();
   $("#div8").hide();
   $("#div9").hide();
   $("#myProgress").hide();
   $("#divBtn4").hide();
   j = 2;
 }
}

function btn1Hide(){
  $("#divBtn1").hide();
  $("#divBtn1_1").hide();
}

function btn2Hide(){
  $("#divBtn2").hide();
}

function btn3Hide(){
  $("#divBtn3").hide();
}

//button4와 button5는 시작과 끝에 있는 버튼임,
//button4는 버튼 클릭시 지워지지 않아야 UI상 혼동이 없고,
//Button5는 자신 클릭시 div1~div7까지 사라지게 되어 있어서 함께 사리짐 div4의 영역내에 모든 요소가 포함됨.
function btn6Hide(){
  $("#divBtn6").hide();
}

function btn7Hide(){
  $("#divBtn7").hide();
}

function btn9Hide(){
  $("#divBtn9").hide();
}



// window.onload = function(){
//   genRdSpink();
// };
//
// var rdSpinkNum = setInterval(function(){genRdSpink(); }, 1000); //이렇게 해도 함수는 호출된 것이고 실행됨.. 신기함.
// function stopGen() {
//     clearInterval(rdSpinkNum);
// }
//
// function genRdSpink(){
//   var result1 = document.getElementById("rdTest1");
//   var result2 = document.getElementById("rdTest2");
//   var result3 = document.getElementById("rdTest3");
//   result1.innerHTML = Math.floor(Math.random() * 3) + 1;
//   result2.innerHTML = Math.floor(Math.random() * 3) + 1;
//   result3.innerHTML = Math.floor(Math.random() * 3) + 1;
// }
//
// function spinkEx(){
//   if(ckNum == 1){
//    document.getElementById("spinkExplain").innerHTML = "스핀크(spink)는 고대 마야 문명이 있기 전부터 존재한 것으로 알려져 있습니다. 고대 마야의 모든 사람들은 하루에 한번씩 광장에서 스핀크에 기여할 의무가 있었습니다. 스핀크는 인류의 시작과 중간, 그리고 끝을 마야인들에게 알려주었고, 마야인들은 스핀크를 신으로써 추앙했습니다.<p>스핀크는 하루 하루 모든 마야인들의 참여에 의해 지속적으로 그 모양과 형태, 의미가 변화되었고 이를 기반으로 마야인들은 전쟁을 일으키거나 기근을 대비하고, 홍수을 예측했습니다. 고대 마야 문명은 스핀크로부터 시작했다고 해도 과언이 아닐 정도로 거의 모든 행위와 사건, 사고가 스핀크에 기반하여 발생하였고 기록되었습니다.</p><p>스핀크로 인해 인류 문명이 급격히 성장하던 시기인 고대 마야 문명의 말기에 특정 세력이 스핀크를 조작하여 세계를 제패하려 하였고 특정 세력의 의도에의해 와전된 스핀크의 의지는 결국 마야 문명 자체를 멸망에 이르게 하고 말았습니다.</p><p>스핀크는 구전으로 내려오는 전설처럼 여겨졌습니다. 고대 마야 문명을 연구하는 고고학자들 사이에서 스핀크의 실체가 무엇인지, 어떻게 모든 마야인들의 의지를 기록할 수 있었는지, 어떻게 마야 문명이 스핀크를 기반으로 발전이 가능했었는지에 대한 논의가 간간히 이루어지긴 했지만 어느 누구도 스핀크가 무엇인지 알지 못했습니다.</p><p>몇몇 언어학자들은 고고학자들이 발견한 고대 마야의 유물들을 통해 spink가 speak와 think의 어원일 것이라는 주장을 펼치기도 했고, 이들과 함께 연구를 하던 논리학자들과 수학자들은 이러한 사실들을 기반으로, 온라인상에서 이루어지는 가상의 스핀크를 만들기에 이르렀습니다.</p><p>이들의 연구에 의하면, 온라인 네트워크 상에서 만들어지는 스핀크의 논리는 생각보다 단순합니다. ..어쩌구 저쩌구...<br><br>연구자들이 개념적으로나마 이해하던 스핀크를<br><br>전해오는 구전에 의하면 고대 마야 문명이 멸망한 뒤 스핀크는 방치되었고, 마야인들의 특별한 유전자에 기인한 능력<br><br>기여, 예측, 당시 사람들의 의견과 일치하는 예측자는 그날 최고의 능력치를 부여, 그러나 과한 욕심을 부리면 그나마 받은 능력치도 깎이는...<br><br>고대 마야인들에게는 현 인류에게 없는 어떤 특별한 능력이 있어<br><br>마은 것인데, 마야문명의 말기에 스핀크를 조작하려는 불순한 세력이 있었고, 이로 인해 마야문명이 멸망<br><br>모든 마야 시민들은 하루에 한번씩 대광장에 와서 스핀크를 의무적으로 스핀크를 만참여해서 만드는  일종의 숫자체인입니다. 모든 마야인들이</p>"
//     ckNum =2;
//    } else if(ckNum == 2){
//    document.getElementById("spinkExplain").innerHTML = ""
//     ckNum =1;
//   }
// }


/////////
// Change nickname    NickNameChangeModal
$(document).ready(function(){
  $('#NickNameChangeModal').on("show.bs.modal", function(e){
    $('#nicknameInput').val(user_info.nickname)
    $('#urlInput').val(user_info.url)
  })
  $('#changeNickName').on("click", function(e){
    var $this = $(this);
    $this.button('loading');
    $.ajax('/users/changeNickName/' + user_info._id , {
        data : JSON.stringify({ nickname: $('#nicknameInput').val(), url: $('#urlInput').val() }),
        contentType : 'application/json',
        type : 'PUT',
        success: function(data){
          $this.button('reset');
          $('#NickNameChangeModal').modal('hide')
          user_info.nickname = $('#nicknameInput').val()
          user_info.url = $('#urlInput').val()
          $('#NickName').html( $('#nicknameInput').val() )
          console.log('user_info.nickname =', user_info.nickname );
        }
      })
    e.preventDefault()
  })
  $('#input_is3003').change(function(e){
    var $this = $(this);
    $.ajax('/users/changeIs3003/' + user_info._id , {
        data : JSON.stringify({ is_3003: $('#input_is3003').prop( "checked" ) }),
        contentType : 'application/json',
        type : 'PUT',
        success: function(data){
          console.log('user_info.is3003 =', $('#input_is3003').prop( "checked" ) );
        }
      })
  })
  // $(function() {
  // $('#input_is3003').change(function() {
  //   $('#console-event').html('Toggle: ' + $(this).prop('checked'))
  // })
  // })
  //changeNickName
})
