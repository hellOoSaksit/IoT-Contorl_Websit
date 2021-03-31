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
    var ButoonStatus;
    var ButoonStatus2;
    var TempStatus;
    var HumStatus;
    var HumDStatus;

    database.ref().on("value", function(snap){
    ButoonStatus = snap.val().SensorOne;
      if(ButoonStatus == 1){
        $(".buttonStatus").text("สถานะ : เปิด");
        $(".ButtonContoler").text("ปิด");
      } else {
        $(".buttonStatus").text("สถานะ : ปิด");
        $(".ButtonContoler").text("เปิด");
      }
    });

    $(".ButtonContoler").click(function(){
      var firebaseRef = firebase.database().ref().child("SensorOne");
  
      if(ButoonStatus == 1){
        firebaseRef.set(0);
        ButoonStatus = 0;
      } else {
        firebaseRef.set(1);
        ButoonStatus = 1;
      }
    });

    database.ref().on("value", function(snap){
        ButoonStatus2 = snap.val().SensorTwo;
          if(ButoonStatus2 == 1){
            $(".buttonStatus2").text("สถานะ : เปิด");
            $(".ButtonContoler2").text("ปิด");
          } else {
            $(".buttonStatus2").text("สถานะ : ปิด");
            $(".ButtonContoler2").text("เปิด");
          }
        });

    $(".ButtonContoler2").click(function(){
        var firebaseRef = firebase.database().ref().child("SensorTwo");
    
        if(ButoonStatus2 == 1){
          firebaseRef.set(0);
          ButoonStatus2 = 0;
        } else {
          firebaseRef.set(1);
          ButoonStatus2 = 1;
        }
      });

    database.ref().on("value", function(snap){
        TempStatus = snap.val().Temperature;
          if(TempStatus > 1){
            $(".TempStatus").text(TempStatus+" °C");
          } else {
            $(".TempStatus").text("ไม่สามารถติดต่อ FireBase ได้");
          }
        });
    
    database.ref().on("value", function(snap){
            HumStatus = snap.val().Humidity;
              if(HumStatus > 1){
                $(".HumStatus").text(HumStatus+" RH");
            } else {
                $(".HumStatus").text("ไม่สามารถติดต่อ FireBase ได้");
            }
        });

        database.ref().on("value", function(snap){
          HumDStatus = snap.val().Soildata;
            if(HumDStatus > 1){
              $(".HumDStatus").text(HumDStatus+" RH");
          } else {
              $(".HumDStatus").text("ไม่สามารถติดต่อ FireBase ได้");
          }
      });

  });