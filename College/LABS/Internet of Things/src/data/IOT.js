// Define programs as a global variable
const programs = [
  {
    title: "LED on",
    code: `<QUES>1(i).  To interface LED/Buzzer with Arduino/Raspberry Pi and write a program to 'turn ON' LED for 1 sec after every 2 seconds.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB 
●	Pin connection:GPIO 2 to any RGB LED
●	Click on Verify, Upload & check the output in serial monitor and kit.
</STEPS>

Program:
<COMMENTS>// Define LED pin number</COMMENTS>
#define LED 2

void setup() {
  <COMMENTS>// Configure LED pin as output</COMMENTS>
  pinMode(LED, OUTPUT);
  <COMMENTS>// Initialize serial communication at 9600 baud rate</COMMENTS>
  Serial.begin(9600);
}

void loop() {
  <COMMENTS>// Turn LED on</COMMENTS>
  digitalWrite(LED, HIGH);  
  <COMMENTS>// Print LED status to serial monitor</COMMENTS>
  Serial.println("LED ON");
  <COMMENTS>// Wait for 1 second</COMMENTS>
  delay(1000);                      
  <COMMENTS>// Turn LED off</COMMENTS>
  digitalWrite(LED, LOW);    
  <COMMENTS>// Print LED status to serial monitor</COMMENTS>
  Serial.println("LED OFF");
  <COMMENTS>// Wait for 1 second</COMMENTS>
  delay(1000);    
}`,
    pinConfig: [
      { pin: "GPIO 2", component: "RGB LED" }
    ]
  },
  {
    title: "Push Button LED Control",
    code: `<QUES>1(ii). To interface Push button/Digital sensor (IR/LDR) with Arduino/Raspberry Pi and write a program to 'turn ON' LED when push button is pressed or at sensor detection.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 2 to RGB LED, GPIO 16 to any Switch(SW)
●	Click on Verify, Upload & check the output in serial monitor and kit (press the switch and see the changes)
</STEPS>

Program:
<COMMENTS>// Define pin numbers for button and LED</COMMENTS>
#define BUTTON_PIN 16  // ESP32 pin GIOP16, which connected to button
#define LED_PIN    2  // ESP32 pin GIOP18, which connected to led

<COMMENTS>// Variable to store button state</COMMENTS>
int button_state = 0;   // variable for reading the button status

void setup() {
  <COMMENTS>// Configure LED pin as output</COMMENTS>
  pinMode(LED_PIN, OUTPUT);
  <COMMENTS>// Configure button pin as input</COMMENTS>
  pinMode(BUTTON_PIN, INPUT);
  <COMMENTS>// Initialize serial communication</COMMENTS>
  Serial.begin(9600);
}

void loop() {
  <COMMENTS>// Read the current state of the button</COMMENTS>
  button_state = digitalRead(BUTTON_PIN);
  <COMMENTS>// Print button state to serial monitor</COMMENTS>
  Serial.print("BUTTON VALUE : ");
  Serial.println(button_state);
  <COMMENTS>// Small delay for stability</COMMENTS>
  delay(100);

  <COMMENTS>// Control LED based on button state</COMMENTS>
  if (button_state == LOW)       // if button is pressed
    digitalWrite(LED_PIN, HIGH); // turn on LED
  else                           // otherwise, button is not pressing
    digitalWrite(LED_PIN, LOW);  // turn off LED
}`,
    pinConfig: [
      { pin: "GPIO 2", component: "RGB LED" },
      { pin: "GPIO 16", component: "Push Button Switch" }
    ]
  },
  {
    title: "Temperature and Humidity",
    code: `<QUES>2(i). To interface DHT11 sensor with Arduino/Raspberry Pi and write a program to print temperature and humidity readings.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 4 to DHT11 O/P
●	Install DHT sensor library by Adafruit
●	Install Adafruit ST7735 library
●	Click on Verify, Upload & check the output in serial monitor (displays Temperature & Humidity values)
</STEPS>

Program:
<COMMENTS>// Include DHT sensor library</COMMENTS>
#include "DHT.h"
<COMMENTS>// Define DHT sensor pin and type</COMMENTS>
#define DHTPIN 4     // Digital pin connected to the Dht sensor
#define DHTTYPE DHT11   // DHT 11

<COMMENTS>// Initialize DHT sensor object</COMMENTS>
DHT Dht(DHTPIN, DHTTYPE);

<COMMENTS>// Variables to store sensor readings</COMMENTS>
float temp = 0;
float hum = 0;

void setup() {
  <COMMENTS>// Initialize serial communication</COMMENTS>
  Serial.begin(9600);
  Serial.println("DHT11 Test!");
  <COMMENTS>// Start DHT sensor</COMMENTS>
  Dht.begin();
}

void loop() {
  <COMMENTS>// Wait between measurements</COMMENTS>
  delay(2000);
  <COMMENTS>// Read temperature and humidity</COMMENTS>
  temp = Dht.readTemperature();
  hum = Dht.readHumidity();
 
  <COMMENTS>// Check if readings are valid</COMMENTS>
  if (isnan(temp) || isnan(hum)) {
    Serial.println("DHT11 sensor pin not connected properly!");
    delay(1000);
    return;
  }

  <COMMENTS>// Print readings to serial monitor</COMMENTS>
  Serial.print("Temperature C: ");
  Serial.println(temp);
  Serial.print("Humidity  %RH: ");
  Serial.println(hum);
  Serial.println();
}`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor Output" }
    ]
  },
  {
    title: "OLED Display",
    code: `<QUES>2(ii). To interface OLED with Arduino/Raspberry Pi and write a program to print temperature and humidity readings on it.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 4 to DHT11 O/P, GPIO 14 to CS of 1.8 TFT display, GPIO 12 to RES of 1.8 TFT display, GPIO 13 to A0 of 1.8 TFT display, GPIO 22 to SCK of 1.8 TFT display,GPIO 21 to SDA of 1.8 TFT display,LED of 1.8 TFT display to 3.3 V or 5 V
●	Install DHT sensor library by Adafruit
●	Install Adafruit ST7735 library
●	Click on Verify, Upload & check the output in serial monitor and kit (displays Temperature & Humidity values)
</STEPS>

Program:
<COMMENTS>// Include required libraries</COMMENTS>
#include <Adafruit_ST7735.h>  //DISPLAY LIBRARY
#include "DHT.h"              //DHT LIBRARY
#include <SPI.h>

<COMMENTS>// Define DHT sensor settings</COMMENTS>
#define DHTPIN 4     // Digital pin connected to the Dht11 sensor
#define DHTTYPE DHT11   // DHT 11
DHT Dht(DHTPIN, DHTTYPE);
float temp = 0;
float hum = 0;

<COMMENTS>// Define display pins</COMMENTS>
#define Display_CS     14
#define Display_RES    12
#define Display_A0     13
#define Display_SCK    22
#define Display_SDA    21

<COMMENTS>// Initialize display object</COMMENTS>
Adafruit_ST7735 Display = Adafruit_ST7735(Display_CS, Display_A0, Display_SDA, Display_SCK, Display_RES);

void setup(void) {
  <COMMENTS>// Initialize serial communication</COMMENTS>
  Serial.begin(9600);
  Serial.println("DHT11 Test!");
  <COMMENTS>// Start DHT sensor</COMMENTS>
  Dht.begin();
  <COMMENTS>// Initialize display</COMMENTS>
  Display.initR(INITR_BLACKTAB);
  Display.setTextWrap(true);
  Display.setRotation(1);
}

void loop() {
  <COMMENTS>// Wait between readings</COMMENTS>
  delay(2000);

  <COMMENTS>// Read sensor data</COMMENTS>
  temp = Dht.readTemperature();
  hum = Dht.readHumidity();
 
  <COMMENTS>// Check if readings are valid</COMMENTS>
  if (isnan(temp) || isnan(hum)) {
    Serial.println("DHT11 sensor pin not connected properly!");
    return;
  }

  <COMMENTS>// Print to serial monitor</COMMENTS>
  Serial.print("Temperature C: ");
  Serial.println(temp);
  Serial.print("Humidity  %RH: ");
  Serial.println(hum);
  Serial.println();

  <COMMENTS>// Update display</COMMENTS>
  Display.fillScreen(ST7735_BLACK);
  Display.setTextSize(1);

  <COMMENTS>// Display temperature</COMMENTS>
  Display.setCursor(10, 10);
  Display.setTextColor(ST7735_RED);
  Display.print("Temperature : ");
  Display.setCursor(100, 10);
  Display.setTextColor(ST7735_YELLOW);
  Display.println(temp);
  delay(10);

  <COMMENTS>// Display humidity</COMMENTS>
  Display.setCursor(10, 30);
  Display.setTextColor(ST7735_RED);
  Display.print("Humidity    : ");
  Display.setCursor(100, 30);
  Display.setTextColor(ST7735_YELLOW);
  Display.println(hum);
  delay(2000);
}`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor Output" },
      { pin: "GPIO 14", component: "Display CS" },
      { pin: "GPIO 12", component: "Display RES" },
      { pin: "GPIO 13", component: "Display A0" },
      { pin: "GPIO 22", component: "Display SCK" },
      { pin: "GPIO 21", component: "Display SDA" },
      { pin: "3.3V/5V", component: "Display LED" }
    ]
  },
  {
    title: "Motor Control",
    code: `<QUES>3. To interface the motor using a relay with Arduino/Raspberry Pi and write a program to 'turn ON' the motor when push button is pressed.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 22 to any switch (SW), GPIO 27 to any relay (P26)
●	Click on Verify, Upload & check the output in the serial monitor (press the switch and see the changes)
</STEPS>

Program:
<COMMENTS>// Define pin numbers for button and relay</COMMENTS>
#define BUTTON_PIN 22 // In ESP32 pin GPIO22 connected to button's pin
#define RELAY_PIN 27 //In ESP32 pin GPIO27 connected to relay's pin

void setup() {
  <COMMENTS>// Initialize serial communication</COMMENTS>
  Serial.begin(9600);
  <COMMENTS>// Configure pins</COMMENTS>
  pinMode(BUTTON_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
}

void loop() {
  <COMMENTS>// Read button state</COMMENTS>
  int buttonState = digitalRead(BUTTON_PIN);
  
  <COMMENTS>// Control relay based on button state</COMMENTS>
  if (buttonState == LOW) {
    digitalWrite(RELAY_PIN, HIGH);
    Serial.println("The button is being pressed");
  }
  else if (buttonState == HIGH) {
    digitalWrite(RELAY_PIN, LOW);
    Serial.println("The button is unpressed");
  }
}`,
    pinConfig: [
      { pin: "GPIO 22", component: "Push Button Switch" },
      { pin: "GPIO 27", component: "Relay Control" }
    ]
  },
  {
    title: "LDR Sensor",
    code: `<QUES>4. Write an Arduino/Raspberry Pi program to interface the LDR/Photo Sensor.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 34 to LDR output pin
●	Click on Verify, Upload & check the output in the serial monitor
●	The LDR produces a varying voltage depending on the light intensity, which the ESP32 reads as an integer value between 0 (no light) and 4095 (maximum light intensity)
</STEPS>

Program:
<COMMENTS>// Define the LDR sensor pin</COMMENTS>
#define LDR_PIN 34

void setup() {
  <COMMENTS>// Initialize serial communication</COMMENTS>
  Serial.begin(9600);
  <COMMENTS>// Configure LDR pin as input</COMMENTS>
  pinMode(LDR_PIN, INPUT);
}

void loop() {
  <COMMENTS>// Read analog value from LDR</COMMENTS>
  int ldrValue = analogRead(LDR_PIN);
 
  <COMMENTS>// Print the reading to serial monitor</COMMENTS>
  Serial.print("LDR Value: ");
  Serial.println(ldrValue);
 
  <COMMENTS>// Wait before next reading</COMMENTS>
  delay(1000);
}`,
    pinConfig: [
      { pin: "GPIO 34", component: "LDR Sensor Output" }
    ]
  },
  {
    title: "UltraSonic Sensor",
    code: `<QUES>5. Write a program to interface an Ultrasonic Sensor with Arduino /Raspberry Pi.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 23 to TRIG of ultrasonic sensor & GPIO 22 to ECHO of ultrasonic sensor
●	Click on Verify, Upload & check the output in the serial monitor
</STEPS>

Program:
<COMMENTS>// Define ultrasonic sensor pins</COMMENTS>
#define TRIGGER_PIN 23
#define ECHO_PIN 22

void setup() {
  <COMMENTS>// Initialize serial communication</COMMENTS>
  Serial.begin(9600);
  <COMMENTS>// Configure sensor pins</COMMENTS>
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  <COMMENTS>// Variables for calculations</COMMENTS>
  long duration;
  float distance;

  <COMMENTS>// Ensure trigger pin is LOW</COMMENTS>
  digitalWrite(TRIGGER_PIN, LOW);
  delayMicroseconds(2);

  <COMMENTS>// Send trigger pulse</COMMENTS>
  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN, LOW);

  <COMMENTS>// Measure echo duration</COMMENTS>
  duration = pulseIn(ECHO_PIN, HIGH);

  <COMMENTS>// Calculate distance</COMMENTS>
  distance = (duration / 2.0) * 0.0343;

  <COMMENTS>// Print results</COMMENTS>
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  <COMMENTS>// Wait before next measurement</COMMENTS>
  delay(500);
}`,
    pinConfig: [
      { pin: "GPIO 23", component: "Ultrasonic TRIG" },
      { pin: "GPIO 22", component: "Ultrasonic ECHO" }
    ]
  },
  {
    title: "Upload to ThingSpeak",
    code: `<QUES>6. Write a program on Arduino/Raspberry Pi to upload temperature and humidity data to thingspeak clouds.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Install ThingSpeak by Mathworks
●	Pin connection: GPIO 4 to DHT11
●	Go to google→Open Thingspeak→create account→login
●	Create new channel, replace the channel number & API key in the program
●	Replace network SSID & network password in the program
●	Click on Verify, Upload & check the output in serial monitor
</STEPS>

Program:
<COMMENTS>// Include required libraries</COMMENTS>
#include <WiFi.h>
#include "ThingSpeak.h"
#include "DHT.h"

<COMMENTS>// WiFi credentials</COMMENTS>
char ssid[] = "IOT LAB";
char pass[] = "Reddy@143";

<COMMENTS>// ThingSpeak credentials</COMMENTS>
unsigned long myChannelNumber = 2417272;
const char * myWriteAPIKey = "ZFOBMH8RPAD6OUDB";

<COMMENTS>// DHT sensor settings</COMMENTS>
#define DHTPIN 4
#define DHTTYPE DHT11

<COMMENTS>// Initialize objects</COMMENTS>
DHT Dht(DHTPIN, DHTTYPE);
WiFiClient client;

float temp = 0;
float hum = 0;

void setup() {
  <COMMENTS>// Initialize serial and WiFi</COMMENTS>
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client);
  Dht.begin();
  
  <COMMENTS>// Connect to WiFi</COMMENTS>
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }
}

void loop() {
  <COMMENTS>// Read sensor data</COMMENTS>
  delay(2000);
  temp = Dht.readTemperature();
  hum = Dht.readHumidity();
 
  <COMMENTS>// Check if readings are valid</COMMENTS>
  if (isnan(temp) || isnan(hum)) {
    Serial.println("DHT11 sensor pin not connected properly!");
    delay(1000);
    return;
  }

  <COMMENTS>// Print readings locally</COMMENTS>
  Serial.print("Temperature C: ");
  Serial.println(temp);
  Serial.print("Humidity  %RH: ");
  Serial.println(hum);
  Serial.println();

  <COMMENTS>// Set ThingSpeak fields</COMMENTS>
  ThingSpeak.setField(1, temp);
  ThingSpeak.setField(2, hum);
 
  <COMMENTS>// Upload to ThingSpeak</COMMENTS>
  int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
  if(x == 200){
    Serial.println("Channel update successful.");
  }
  else{
    Serial.println("Problem updating channel. HTTP error code " + String(x));
  }
  
  <COMMENTS>// Wait before next update</COMMENTS>
  delay(15000);
}`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  },
  {
    title: "Retrieve From ThingSpeak",
    code: `<QUES>7. Write a program on Arduino/Raspberry Pi to retrieve temperature and humidity data from thingspeak clouds.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Install ThingSpeak by Mathworks
●	Pin connection: GPIO 4 to DHT11
●	Go to google→Open Thingspeak→create account→login
●	Create new channel, replace the channel number & API key in the program
●	Replace network SSID & network password in the program
●	Click on Verify, Upload & check the output in serial monitor
</STEPS>

Program:
<COMMENTS>// Include required libraries</COMMENTS>
#include <WiFi.h>
#include "ThingSpeak.h"

<COMMENTS>// WiFi credentials</COMMENTS>
char ssid[] = "IOT LAB";
char pass[] = "Reddy@143";

<COMMENTS>// ThingSpeak credentials</COMMENTS>
unsigned long myChannelNumber = 2417272;
const char * readAPIKey = "4AZ1XP68KC1EB53E";

<COMMENTS>// Initialize client and field array</COMMENTS>
WiFiClient client;
int field[2] = {1,2};

float temp = 0;
float hum = 0;

void setup() {
  <COMMENTS>// Initialize serial and WiFi</COMMENTS>
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client);

  <COMMENTS>// Connect to WiFi</COMMENTS>
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }
}

void loop() {
  <COMMENTS>// Indicate waiting for data</COMMENTS>
  Serial.println("Waiting...");
  
  <COMMENTS>// Read multiple fields from ThingSpeak</COMMENTS>
  int x = ThingSpeak.readMultipleFields(myChannelNumber,readAPIKey);
  if(x == 200) {
    <COMMENTS>// Get temperature and humidity values</COMMENTS>
    temp = ThingSpeak.getFieldAsFloat(field[0]);
    hum = ThingSpeak.getFieldAsFloat(field[1]);
    <COMMENTS>// Print the values</COMMENTS>
    Serial.println("TEMPERATURE : " + String(temp));
    Serial.println("HUMIDITY : " + String(hum));
  }
  else {
    Serial.println("Problem reading channel. HTTP error code " + String(x));
  }
  Serial.println();
  
  <COMMENTS>// Wait before next read</COMMENTS>
  delay(15000);
}`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  },
  {
    title: "Telegram",
    code: `<QUES>8. Write a program to interface LED using Telegram App.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Install UniversalTelegramBot by Brian Lough
●	Install ArduinoJson by Benoit Blanchon
●	BOTtoken setup:
  ○	Install telegram app in your mobile
  ○	Search for BotFather, Type /newbot
  ○	Give a name for your bot
  ○	Give a username for your bot
  ○	Get the BOTtoken
  ○	Search for userinfobot
  ○	Type /start to get Chat_Id
  ○	Search for your bot and start using commands
</STEPS>

Program:
<COMMENTS>// Include required libraries</COMMENTS>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>
#include <ArduinoJson.h>

<COMMENTS>// Network credentials</COMMENTS>
const char* ssid = "IOT LAB";
const char* password = "Reddy@143";

<COMMENTS>// Telegram BOT credentials</COMMENTS>
#define BOTtoken "7821273262:AAEYfme2VObXSokSk58DQhVdAvViuJHgeTQ"
#define CHAT_ID "7820393453"

<COMMENTS>// Initialize Telegram bot</COMMENTS>
WiFiClientSecure client;
UniversalTelegramBot bot(BOTtoken, client);

<COMMENTS>// Bot timing variables</COMMENTS>
int botRequestDelay = 1000;
unsigned long lastTimeBotRan;

<COMMENTS>// LED control variables</COMMENTS>
const int ledPin = 2;
bool ledState = LOW;

void NewMessagesHandle(int NewMessages) {
  Serial.println("NewMessagesHandle");
  Serial.println(String(NewMessages));

  for (int i=0; i<NewMessages; i++) {
    <COMMENTS>// Check if message is from authorized user</COMMENTS>
    String chat_id = String(bot.messages[i].chat_id);
    if (chat_id != CHAT_ID){
      bot.sendMessage(chat_id, "Unauthorized user", "");
      continue;
    }
   
    <COMMENTS>// Process commands</COMMENTS>
    String text = bot.messages[i].text;
    String from_name = bot.messages[i].from_name;

    if (text == "/start") {
      String welcome = "Welcome, " + from_name + ".\n";
      welcome += "Use the following commands to control the LED.\n\n";
      welcome += "/led_on to turn ON LED\n";
      welcome += "/led_off to turn OFF LED\n";
      welcome += "/state to request current LED state \n";
      bot.sendMessage(chat_id, welcome, "");
    }

    if (text == "/led_on") {
      bot.sendMessage(chat_id, "The LED is turned ON", "");
      ledState = HIGH;
      digitalWrite(ledPin, ledState);
    }
   
    if (text == "/led_off") {
      bot.sendMessage(chat_id, "The LED is turned OFF", "");
      ledState = LOW;
      digitalWrite(ledPin, ledState);
    }
   
    if (text == "/state") {
      if (digitalRead(ledPin)){
        bot.sendMessage(chat_id, "LED is ON", "");
      }
      else{
        bot.sendMessage(chat_id, "LED is OFF", "");
      }
    }
  }
}

void setup() {
  <COMMENTS>// Initialize serial and LED</COMMENTS>
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, ledState);

  <COMMENTS>// Connect to WiFi</COMMENTS>
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  delay(1000);
  while(WiFi.waitForConnectResult() != WL_CONNECTED){
    Serial.print(".");
  }
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("Your Local IP address is: ");
  Serial.println(WiFi.localIP());
  
  <COMMENTS>// Set SSL certificate</COMMENTS>
  client.setCACert(TELEGRAM_CERTIFICATE_ROOT);
}

void loop() {
  <COMMENTS>// Check for new messages</COMMENTS>
  if (millis() > lastTimeBotRan + botRequestDelay) {
    int NewMessages = bot.getUpdates(bot.last_message_received + 1);

    while(NewMessages) {
      Serial.println("Response Received!");
      NewMessagesHandle(NewMessages);
      NewMessages = bot.getUpdates(bot.last_message_received + 1);
    }
    lastTimeBotRan = millis();
  }
}`,
    pinConfig: [
      { pin: "GPIO 2", component: "LED" }
    ]
  },
  {
    title: "MQTT",
    code: `<QUES>9. Write a program on Arduino/Raspberry Pi to publish temperature data to MQTT broker.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Install PubSubClient by Nick O'Leary
●	Pin connection: GPIO 4 to DHT11
●	Replace network credentials
●	Install Mqtizer App on mobile
●	Configure Mqtizer:
  ○	Add workspace
  ○	Set client name as "ESP32Client-"
  ○	Configure broker: test.mosquitto.org:1883
  ○	Subscribe to topics and check messages
</STEPS>

Program:
<COMMENTS>// Include required libraries</COMMENTS>
#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

<COMMENTS>// Initialize clients</COMMENTS>
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

<COMMENTS>// DHT sensor configuration</COMMENTS>
#define DHTPIN 4
#define DHTTYPE DHT11
DHT Dht(DHTPIN, DHTTYPE);

<COMMENTS>// Network credentials</COMMENTS>
char ssid[] = "IOT LAB";
char pass[] = "Reddy@143";

<COMMENTS>// MQTT broker settings</COMMENTS>
char *mqttServer = "test.mosquitto.org";
int mqttPort = 1883;

float temp = 0;
float hum = 0;

void setupMQTT() {
  mqttClient.setServer(mqttServer, mqttPort);
}

void reconnect() {
  <COMMENTS>// Loop until connected</COMMENTS>
  Serial.println("Connecting to MQTT Broker...");
  while (!mqttClient.connected()) {
    Serial.println("Reconnecting to MQTT Broker..");
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
     
    if (mqttClient.connect(clientId.c_str())) {
      Serial.println("Connected.");
    }      
  }
}

void setup() {
  <COMMENTS>// Initialize serial and sensors</COMMENTS>
  Serial.begin(9600);
  Dht.begin();
  setupMQTT();

  <COMMENTS>// Connect to WiFi</COMMENTS>
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }
}

void loop() {
  <COMMENTS>// Ensure MQTT connection</COMMENTS>
  if (!mqttClient.connected())
    reconnect();
  mqttClient.loop();
 
  <COMMENTS>// Read sensor data</COMMENTS>
  delay(2000);
  temp =

 Dht.readTemperature();
  hum = Dht.readHumidity();
 
  <COMMENTS>// Check if readings are valid</COMMENTS>
  if (isnan(temp) || isnan(hum)) {
    Serial.println("DHT11 sensor pin not connected properly!");
    delay(1000);
    return;
  }
   
  <COMMENTS>// Publish temperature</COMMENTS>
  char tempString[8];
  dtostrf(temp, 1, 2, tempString);
  Serial.print("Temperature: ");
  Serial.println(tempString);
  mqttClient.publish("Temperature", tempString);

  <COMMENTS>// Publish humidity</COMMENTS>
  char humString[8];
  dtostrf(hum, 1, 2, humString);
  Serial.print("Humidity: ");
  Serial.println(humString);
  mqttClient.publish("Humidity", humString);
  
  <COMMENTS>// Wait before next publish</COMMENTS>
  delay(5000);
}`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  },
  {
    title: "UDP",
    code: `<QUES>10. Write a program to create a UDP server on Arduino/Raspberry Pi and respond with humidity data to the UDP client when requested.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Download SocketTest V3
●	Pin connection: GPIO 4 to DHT11
●	Configure SocketTest UDP client:
  ○	Enter ESP32 IP address
  ○	Set port number
  ○	Send "get_humidity" message
●	Check output in serial monitor
</STEPS>

Program:
<COMMENTS>// Include required libraries</COMMENTS>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <DHT.h>

<COMMENTS>// Network credentials</COMMENTS>
char ssid[] = "IOT LAB";
char pass[] = "Reddy@143";

<COMMENTS>// DHT sensor configuration</COMMENTS>
#define DHTPIN 4
#define DHTTYPE DHT11
DHT Dht(DHTPIN, DHTTYPE);

<COMMENTS>// UDP settings</COMMENTS>
#define UDP_PORT 5000
WiFiUDP udp;

float hum = 0;

void setup() {
  <COMMENTS>// Initialize serial</COMMENTS>
  Serial.begin(9600);
  
  <COMMENTS>// Connect to WiFi</COMMENTS>
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }
  
  <COMMENTS>// Display IP address</COMMENTS>
  Serial.print("ESP32 IP address: ");
  Serial.println(WiFi.localIP());

  <COMMENTS>// Start UDP server</COMMENTS>
  udp.begin(UDP_PORT);
  Serial.println("UDP server started");
  
  <COMMENTS>// Initialize DHT sensor</COMMENTS>
  Dht.begin();
}

void loop() {
  <COMMENTS>// Check for incoming packets</COMMENTS>
  int packetSize = udp.parsePacket();
  if (packetSize) {
    <COMMENTS>// Read the packet</COMMENTS>
    char packetData[packetSize];
    udp.read(packetData, packetSize);
    String request = String(packetData);
    
    <COMMENTS>// Process humidity request</COMMENTS>
    if (request == "get_humidity") {
      hum = Dht.readHumidity();
      <COMMENTS>// Send response</COMMENTS>
      udp.beginPacket(udp.remoteIP(), udp.remotePort());
      udp.printf("Humidity: %.2f%%", hum);
      udp.endPacket();
      Serial.printf("Sent humidity data: %.2f%%\n", hum);
    }
  }
}`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  },
  {
    title: "TCP",
    code: `<QUES>11. Write a program to create a TCP server on Arduino/Raspberry Pi and respond with humidity data to the TCP client when requested.</QUES>

<STEPS>
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Download SocketTest V3
●	Pin connection: GPIO 4 to DHT11
●	Configure SocketTest:
  ○	Server: System IP address, port 8888
  ○	Client: ESP32 IP address, port 8888
  ○	Send "get_humidity" message
●	Check output in serial monitor
</STEPS>

Program:
<COMMENTS>// Include required libraries</COMMENTS>
#include <WiFi.h>
#include <WiFiClient.h>
#include <DHT.h>

<COMMENTS>// Network credentials</COMMENTS>
char ssid[] = "IOT LAB";
char pass[] = "Reddy@143";

<COMMENTS>// DHT sensor configuration</COMMENTS>
#define DHTPIN 4
#define DHTTYPE DHT11
DHT Dht(DHTPIN, DHTTYPE);

<COMMENTS>// TCP server configuration</COMMENTS>
WiFiServer server(8888);

float hum = 0;

void setup() {
  <COMMENTS>// Initialize serial</COMMENTS>
  Serial.begin(9600);

  <COMMENTS>// Connect to WiFi</COMMENTS>
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }

  <COMMENTS>// Display connection info</COMMENTS>
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  
  <COMMENTS>// Initialize sensor and server</COMMENTS>
  Dht.begin();
  server.begin();
}

void loop() {
  <COMMENTS>// Check for client connections</COMMENTS>
  WiFiClient client = server.available();
  if (client) {
    Serial.println("New client connected");
    
    <COMMENTS>// Handle client connection</COMMENTS>
    while (client.connected()) {
      if (client.available()) {
        <COMMENTS>// Read client request</COMMENTS>
        String request = client.readStringUntil('\r');
        client.flush();
        
        <COMMENTS>// Process humidity request</COMMENTS>
        if (request.indexOf("get_humidity") != -1) {
          hum = Dht.readHumidity();
          Serial.print("Humidity: ");
          Serial.print(hum);
          Serial.println("%");
          client.print("Humidity: ");
          client.print(hum);
          client.println("%");
        }
        
        <COMMENTS>// Close connection</COMMENTS>
        client.stop();
        Serial.println("Client Disconnected");
      }
    }
  }
}`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  }
];