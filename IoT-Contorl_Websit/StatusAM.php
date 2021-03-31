<?php
include 'inc/header.php';
Session::CheckSession();
 ?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-database.js"></script> 

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js" integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js" integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG" crossorigin="anonymous"></script>
    <script src="Js/ESP8266StatusAM.js"></script>
    <link rel="stylesheet" href="css/StatusAM.css">
    <link rel="stylesheet" href="css/Buttons.css">
    <style>
    .MainStuat {
        margin: auto;
        width: 50%;
        border: 3px solid #000000;
        padding: 10px;
        text-align: center;
      }
    </style>
    <title>แผนควบคุม</title>
</head>
<body>
<br><br>
<div class="NameTag"><h5 class="font-weight-bolder">ระบบควบคุม Auto & Manual เปิดและปิด</h5></div>
<br><br>

<div class="MainStuat2">
    <div class="container">
      <div class="row row-cols-4">
      <h6>อุปกรณ์ตัวที่ 1</h6>    <h6>อุปกรณ์ตัวที่ 2</h6>    <h6>พัดลม</h6>  <h6>ไฟหน้าบ้าน</h6>
      <h6 class="buttoncontor3">Wait Firebase...(อุปกรณ์ตัวที่ 1)</h6>
      <h6 class="buttoncontor4">Wait Firebase...(อุปกรณ์ตัวที่ 2)</h6>
      <h6 class="Fan">Wait Firebase...(พัดลม)</h6>
      <h6 class="light">Wait Firebase...(ไฟหน้าบ้าน)</h6>
    </div>
    </div>
</div>
<br><br>
<div class="col-xs-1" align="center">
  <div class="row">
    <div class="w-100"></div><br><br>
    <div class="col"style="color:black"><br>ระบบ Auto & Manual (เปิดไฟ)</div>
    <div class="col"><button class="button-contor1" onclick="btncon1()">คลิก !!!</button></div>
    <div class="w-100"></div><br><br>
    <div class="col"style="color:black"><br>ระบบ Auto & Manual (เปิดพัดลม)</div>
    <div class="col"><button class="button-contor2">คลิก !!!</button></div>

    <div class="w-100"></div><br><br>
    <div class="col"style="color:black"><br>ปิดระบบการทำงานของไฟบ้าน</div>
    <div class="col"><button class="button-contor1end">คลิก !!!</button></div>

    <div class="w-100"></div><br><br>
    <div class="col"style="color:black"><br>ปิดระบบการทำงานของพัดลม</div>
    <div class="col"><button class="button-contor2end">คลิก !!!</button></div>

    <div class="w-100"></div><br><br>
    <div class="col"style="color:black"><br>ระบบ เปิด/ปิด (อุปกรณ์ตัวที่ 1)</div>
    <div class="col"><button class="button-contor3">คลิก !!!</button></div>

    <div class="w-100"></div><br><br>
    <div class="col"style="color:black"><br>ระบบ เปิด/ปิด (อุปกรณ์ตัวที่ 2)</div>
    <div class="col"><button class="button-contor4">คลิก !!!</button></div>
    
    <div class="w-100"></div><br><br>
    <div class="col"><button class="button-contor5">Log !!!</button></div>
  </div>
</div>
<br><br>


<div class="MainStuat">
      <h3>แสดงสถานะการทำงานของระบบ</h3>
    <div class="container">
      <div class="row row-cols-2">
      <h6>ค่าอุณหภูมิ(ห้อง)</h6>    <h6>ค่าความชื้น(ห้อง)</h6> 
      <h6 class="TempStatus">Wait Firebase...(ค่าอุณหภูมิ ห้อง)</h6>
      <h6 class="HumStatus">Wait Firebase...(ค่าความชื้น ห้อง)</h6>
    </div>
    </div>
</div>

<?php
$username = Session::get('username');
if (isset($username)) {
  echo $username;
}

 ?>



</body>
</html>

<?php
  include 'inc/footer.php';

  ?>