#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "config.h"
#include <stdlib.h>
#include <stdio.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"

//Provide the RTDB payload printing info and other helper functions.
#include "addons/TokenHelper.h"

//Insert network credentials
#define WIFI_SSID myWifiSSID
#define WIFI_PASSWORD myWifiPWD

//Insert Firebase project key
#define API_KEY api_key_fb

//Insert RTDB URLefine the RTDB URL
#define DATABASE_URL databaseURL

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;

// Ultrasonic distance sensor
const int trigPin = 5;
const int echoPin = 18;

// Sound of speen in cm/uS
#define SOUND_SPEED 0.034
long duration;
float distanceCM;

void setup() {
  // put your setup code here, to run once: 
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  // Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;

  // Sign up
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.print("ok");
    signupOK = true;
  }
  else {
    Serial.printf("%\n", config.signer.signupError.message.c_str());
  }

  // Assign the callback function for the long running token generation task
  config.token_status_callback = tokenStatusCallback; // see addons/Tokenhelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

}

void loop() {
  // put your main code here, to run repeatedly:

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  //Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  //Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  //Calculate the distance
  distanceCM = duration * SOUND_SPEED / 2;
  
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    // Write the distance on the database path test/distance
    if (Firebase.RTDB.setInt(&fbdo, "test/distance", distanceCM)) {
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setInt(&fbdo, "test/int", count)) {
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    count++;

    // write an float number on the database path test/float
    if (Firebase.RTDB.setFloat(&fbdo, "test/float", 0.01 + random(0, 100))) {
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
}
