#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <WiFiUdp.h>
#include "DHT.h"
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#define _TASK_SLEEP_ON_IDLE_RUN
#define DHTTYPE DHT11
#define FIREBASE_HOST "-----------------------------------"
#define API_KEY "-----------------------------" 
#define USER_EMAIL "--------------"
#define USER_PASSWORD "----------"
#define LED_RDE D0
#define LED_Green D2
#define LED_Blue1 D5
#define LED_Blue2 D6
#define Relay D7
const char* ssid = "-------------";
const char* password = "----------";
const int DHTPin = D1;
const int analogPinLDR = A0; 
const long offsetTime = 25200;
const int Timeloop = 60;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");
DHT dht(DHTPin, DHTTYPE); 
WiFiClientSecure client;
int h,hum,dataTime,SensorOneS,SensorTwoS,fan = 0 ,tree = 0 ,light = 0,fancontor,lightcontor;
int valLDR = 0;
float t,tem;
FirebaseData fbdo;
FirebaseData fbdo1,fbdo2;
FirebaseAuth auth;
FirebaseConfig config;
String path_dhttemp ="/Temperature";
String path_dhthum  ="/Humidity";
String path_fan ="/Fan";
String path_tree  ="/Tree";
String path_light  ="/light";
String weekDays[7]={"อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"};
String months[12]={"มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"};
String currentDate,SensorOne,SensorTwo;
void setup() {
  Serial.begin(115200);
  dht.begin();
  delay(500);
  WiFi.begin(ssid, password);
  Serial.println("");
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.print("Successfully connected to : ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  client.setInsecure();
  config.host = FIREBASE_HOST;
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  fbdo.setBSSLBufferSize(1024, 1024);
  Firebase.RTDB.setReadTimeout(&fbdo, 1000 * 60);
  Firebase.RTDB.setwriteSizeLimit(&fbdo, "tiny");
  timeClient.begin();timeClient.setTimeOffset(offsetTime);
  pinMode(LED_RDE, OUTPUT);pinMode(LED_Green, OUTPUT);pinMode(LED_Blue1, OUTPUT);pinMode(LED_Blue2, OUTPUT);pinMode(Relay,OUTPUT);digitalWrite(Relay, LOW);
}
void loop() {
  delay(1000);
  timeClient.update();
  unsigned long epochTime = timeClient.getEpochTime();
  String formattedTime = timeClient.getFormattedTime();
  int currentHour = timeClient.getHours();
  int currentMinute = timeClient.getMinutes();
  int currentSecond = timeClient.getSeconds();
  String weekDay = weekDays[timeClient.getDay()];
  struct tm *ptm = gmtime ((time_t *)&epochTime); 
  int monthDay = ptm->tm_mday;
  int currentMonth = ptm->tm_mon+1;
  String currentMonthName = months[currentMonth-1];
  int currentYear = ptm->tm_year+1900;
  currentDate = String(monthDay) + "-" + String(currentMonthName) + "-" + String(currentYear) + "-" + int(currentHour)+ "-" + int(currentMinute)+ "-" + int(currentSecond);
  h = dht.readHumidity();
  t = dht.readTemperature();
  valLDR = analogRead(analogPinLDR);
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor !");
    delay(1000);
    return;
  }
  String Temp = "Temperature : " + String(t) + " °C";
  String Humi = "Humidity : " + String(h) + " %";
  tem = t;
  hum = h;
  
  Serial.println(Temp);
  Serial.println(Humi);
  Serial.print("ความแข็มแสง");
  Serial.println(valLDR);
  Serial.print("Current date: ");
  Serial.println(currentDate);
  Firebase.RTDB.setDouble(&fbdo, path_dhttemp.c_str(),t);
  Firebase.RTDB.setDouble(&fbdo, path_dhthum.c_str(),h);
  //////////////////////////////////////////////////////////
   if(Firebase.RTDB.getInt(&fbdo1, "/Fan"))
  {
    fancontor = fbdo1.intData();
    if(fancontor == 0){
    Serial.println("Fan : ระบบทำงานแบบ Manual");
    digitalWrite(LED_RDE, HIGH);
    fan = 0;
    }
    if(fancontor == 1){
    Serial.println("Fan : ระบบทำงานแบบ Auto");
    if(t>=25){
    digitalWrite(LED_RDE, HIGH);
    fan = 1;}
    //ถ้าไม่เป็นจริงจะต้องทำงานแบบ Auto
    else
    {digitalWrite(LED_RDE, LOW);
    fan = 1;}}
    if(fancontor == 3){
    digitalWrite(LED_RDE, LOW);Serial.println("ระบบปิดการทำงานแล้วของพัดลม");fan = 3;}
      }
    else{
      Serial.print("ไม่สามารถถึงค่าจาก Firebase ได้ ");
      Serial.println(fbdo1.errorReason());
    }
  /////////////////////////////////////////////////////////////
     if(Firebase.RTDB.getInt(&fbdo1, "/light"))
  {
    lightcontor = fbdo1.intData();
    if(lightcontor == 0){
    Serial.println("light : ระบบทำงานแบบ Manual");
    digitalWrite(LED_Green, HIGH);light = 0;}
    if(lightcontor == 1){
    Serial.println("light : ระบบทำงานแบบ Auto");
    if (valLDR < 100) {
    digitalWrite(LED_Green, HIGH);
    light = 1;}
    else {digitalWrite(LED_Green, LOW);Serial.println("ไฟหน้าบ้าน ปิด");light = 1;}
    }
    if(lightcontor == 3){
    digitalWrite(LED_Green, LOW);Serial.println("ระบบปิดการทำงานแล้วของไฟบ้าน");light = 3;
    }
  }
    else{
      Serial.print("ไม่สามารถถึงค่าจาก Firebase ได้ ");
      Serial.println(fbdo1.errorReason());}
  /////////////////////////////////////////////////////////////
  Firebase.RTDB.setDouble(&fbdo, path_fan.c_str(),fan);
  Firebase.RTDB.setDouble(&fbdo, path_light.c_str(),light);
  FirebaseSensorOne();
  FirebaseSensorTwo();
  /////////////////////////////////////////////////////////////
}
void FirebaseSensorOne(){
 if(Firebase.RTDB.getInt(&fbdo1, "/SensorOne"))
  {
    Serial.print("สถานะ Sensor : ");
    Serial.println(fbdo1.intData());
    SensorOneS = fbdo1.intData();
    if(SensorOneS == 1){
      Serial.println("SensorOne กำลัง 'เปิด'");
      digitalWrite(LED_Blue1, HIGH);
      }else{
      Serial.println("SensorOne กำลัง 'ปิดอยู่'");
      digitalWrite(LED_Blue1, LOW);}
    
  }else{
    Serial.print("ไม่สามารถถึงค่าจาก Firebase ได้ ");
    Serial.println(fbdo1.errorReason());
  }
}

void FirebaseSensorTwo(){
 if(Firebase.RTDB.getInt(&fbdo2, "/SensorTwo"))
  {
    Serial.print("สถานะ Sensor : ");
    Serial.println(fbdo2.intData());
    SensorOneS = fbdo2.intData();
    if(SensorOneS == 1){
      Serial.println("SensorTwo กำลัง 'เปิด'");digitalWrite(LED_Blue2, HIGH);
      }else{Serial.println("SensorTwo กำลัง 'ปิดอยู่'");digitalWrite(LED_Blue2, LOW);}
    
  }else{
    Serial.print("ไม่สามารถถึงค่าจาก Firebase ได้ ");
    Serial.println(fbdo2.errorReason());
  }
}
