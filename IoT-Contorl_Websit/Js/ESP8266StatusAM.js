var firebaseConfig = {
    apiKey: "-----------------------------------",
    authDomain: "-----------------------------------",
    databaseURL: "-----------------------------------",
    projectId: "-----------------------------------",
    storageBucket: "-----------------------------------",
    messagingSenderId: "-----------------------------------",
    appId: "-----------------------------------",
    measurementId: "-----------------------------------"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  $(document).ready(function(){
    var database = firebase.database();
    var buttoncontor1;
    var buttoncontor2;
    var buttoncontor3;
    var buttoncontor4;
    var HumStatus;
    var TempStatus;
/************************************************************************/
    database.ref().on("value", function(snap){
      buttoncontor1 = snap.val().light;
        if(buttoncontor1 == 1){
          $(".light").text("เปิดการทำงาน Auto");
        } else {
          $(".light").text("เปิดการทำงาน Manual");
        }
        if(buttoncontor1==3){
          $(".light").text("ปิดการทำงานของไฟบ้านแล้ว");
        }
    });
    $(".button-contor1").click(function(){
    var firebaseRef = firebase.database().ref().child("light");

    if(buttoncontor1 == 1){
    firebaseRef.set(0);
    buttoncontor1 = 0;
    } else {
    firebaseRef.set(1);
    buttoncontor1 = 1;
    }
  });
    $(".button-contor1end").click(function(){
    var firebaseRef = firebase.database().ref().child("light");

    if(buttoncontor1 >= 0){
    firebaseRef.set(3);
    buttoncontor1 = 3;
    } 
  });              
/************************************************************************/
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
    $(".button-contor2").click(function(){
    var firebaseRef = firebase.database().ref().child("Fan");

    if(buttoncontor2 == 1){
      firebaseRef.set(0);
      buttoncontor2 = 0;
    } else {
      firebaseRef.set(1);
      buttoncontor2 = 1;
    }
  });  
  $(".button-contor2end").click(function(){
    var firebaseRef = firebase.database().ref().child("Fan");

    if(buttoncontor2 >= 0){
    firebaseRef.set(3);
    buttoncontor2 = 3;
    } 
  });    
/************************************************************************/
    database.ref().on("value", function(snap){
      buttoncontor3 = snap.val().SensorOne;
        if(buttoncontor3 == 1){
          $(".buttoncontor3").text("เปิดการทำงาน");
        } else {
          $(".buttoncontor3").text("ปิดการทำงาน");
        }
      });
      $(".button-contor3").click(function(){
        var firebaseRef = firebase.database().ref().child("SensorOne");
    
        if(buttoncontor3 == 1){
          firebaseRef.set(0);
          buttoncontor3 = 0;
        } else {
          firebaseRef.set(1);
          buttoncontor3 = 1;
        }
      });
/************************************************************************/
      database.ref().on("value", function(snap){
        buttoncontor4 = snap.val().SensorTwo;
          if(buttoncontor4 == 1){
            $(".buttoncontor4").text("เปิดการทำงาน");
          } else {
            $(".buttoncontor4").text("ปิดการทำงาน");
          }
        });
        $(".button-contor4").click(function(){
          var firebaseRef = firebase.database().ref().child("SensorTwo");
      
          if(buttoncontor4 == 1){
            firebaseRef.set(0);
            buttoncontor4 = 0;
          } else {
            firebaseRef.set(1);
            buttoncontor4 = 1;
          }
        });
/************************************************************************/
database.ref().on("value", function(snap){
  TempStatus = snap.val().Temperature;
    if(TempStatus > 1){
      $(".TempStatus").text(TempStatus+" °C");
    } else {
      $(".TempStatus").text("ไม่สามารถติดต่อ FireBase ได้ (ห้อง)");
    }
  });
/************************************************************************/
database.ref().on("value", function(snap){
      HumStatus = snap.val().Humidity;
        if(HumStatus > 1){
          $(".HumStatus").text(HumStatus+" RH");
      } else {
          $(".HumStatus").text("ไม่สามารถติดต่อ FireBase ได้ (ห้อง)");
      }
  });
/************************************************************************/
  });




