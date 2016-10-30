$(function(){
  $(".checkValidation").on("submit", function(e){
    var cvForm = $(this);
    var isValid = true;
    cvForm.find(".cvRequired").each(function(){
      var cvRequired = $(this);
      var cvRqErrMsg = cvRequired.attr("cvRqErrMsg");
      var cvRqErrTo = $(cvRequired.attr("cvRqErrTo"));
      if(cvRequired.val() === ""){
        isValid = false;
        cvRqErrTo.text(cvRqErrMsg);
      } else {
        cvRqErrTo.text("");
      }
    });

    cvForm.find("input.cvMatch").each(function(){
      var cvMatch =$(this);
      if(cvMatch.val() !== ""){
        var cvMatW = $(cvMatch.attr("cvMatW"));
        var cvMatErrMsg = cvMatch.attr("cvMatErrMsg");
        var cvMatErrTo = $(cvMatch.attr("cvMatErrTo"));
        if(cvMatch.val() !== cvMatW.val()){
          isValid = false;
          cvMatErrTo.text(cvMatErrMsg); //CHECK THE ERROR : cvMatErrto 로 써서, 가입시 패스워드와 확인 패스워드가 다른 부분에 대한 에러 못잡음
        } else {
          cvMatErrTo.text("");
        }
      }
    });

    cvForm.find("input.cvMinLength").each(function(){
      var cvMinLength = $(this);  //CHECK THE ERROR cvMInLength 라고 써서 글자를 3글자 미만으로 써도 에러 안뜸.
      var minLength = cvMinLength.attr("cvMinLength");
      var cvMinLenErrMsg = cvMinLength.attr("cvMinLenErrMsg");
      var cvMinLenErrTo = $(cvMinLength.attr("cvMinLenErrTo"));
      if(cvMinLength.val().length < minLength){
        isValid = false;
        cvMinLenErrTo.text(cvMinLenErrMsg);
      }else{
        cvMinLenErrTo.text("");
      }
    });

    if(!isValid){
      if(e.preventDefault) e.preventDefault();
      else return false;
    }
  });
});
