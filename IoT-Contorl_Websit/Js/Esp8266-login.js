var firebaseConfig = {
    apiKey: "AIzaSyAykGDYb4neZ5b_jhccpiGgMvbSQK8FgGU",
    authDomain: "final-project-32eea.firebaseapp.com",
    databaseURL: "https://final-project-32eea-default-rtdb.firebaseio.com",
    projectId: "final-project-32eea",
    storageBucket: "final-project-32eea.appspot.com",
    messagingSenderId: "604141711190",
    appId: "1:604141711190:web:9017fb1216a355d2c7b0f7",
    measurementId: "G-THETVLHTER"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  $(document).ready(function(){
    var database = firebase.database();
    var TempStatus;
    var HumStatus;
    var Contorl1;
    var Contorl2;    

    database.ref().on("value", function(snap){
        TempStatus = snap.val().Temperature;
          if(TempStatus > 1){
            $(".TempStatus").text(TempStatus+" °C");
          } else {
            $(".TempStatus").text("ไม่สามารถติดต่อ FireBase ได้ (ห้อง)");
          }
        });
    
    database.ref().on("value", function(snap){
            HumStatus = snap.val().Humidity;
              if(HumStatus > 1){
                $(".HumStatus").text(HumStatus+" RH");
            } else {
                $(".HumStatus").text("ไม่สามารถติดต่อ FireBase ได้ (ห้อง)");
            }
        });
//-----------------------------------------------------------------------------------
database.ref().on("value", function(snap){
  Contorl1 = snap.val().SensorOne;
    if(Contorl1 == 1){
      $(".Contorl1").text("เปิด");
    } else {
      $(".Contorl1").text("ปิด");
    }
  });

//--------------------------------------------------------------------------------------
database.ref().on("value", function(snap){
  Contorl2 = snap.val().SensorTwo;
    if(Contorl2 == 1){
      $(".Contorl2").text("เปิด");
    } else {
      $(".Contorl2").text("ปิด");
    }
  });


//--------------------------------------------------------------------------------------
database.ref().on("value", function(snap){
  buttoncontor2 = snap.val().Fan;
    if(buttoncontor2 == 1){
      $(".Fan").text("เปิดการทำงาน Auto"); 
    } else {
      $(".Fan").text("เปิดการทำงาน Manual");
    }
    if(buttoncontor2==3){
      $(".Fan").text("ปิดการทำงานของพัดลมแล้ว");
    }
});
//------------------------------------------------------------------------------------------
  });