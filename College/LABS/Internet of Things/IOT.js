        // Define an array of program objects with titles and code
        const programs = [
            { 
                title: "LED on", 
                code: `
1(i).  To interface LED/Buzzer with Arduino/Raspberry Pi and write a program to ‘turn ON’ LED for 1 sec after every 2 seconds.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB 
●	Pin connection:GPIO 2 to any RGB LED
●	Click on Verify, Upload & check the output in serial monitor and kit.


Program:
#define LED 2

void setup() {
  // put your setup code here, to run once:
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(LED, HIGH);  
  Serial.println("LED ON");
  delay(1000);                      
  digitalWrite(LED, LOW);    
  Serial.println("LED OFF");
  delay(1000);    
}
 
1(ii). To interface Push button/Digital sensor (IR/LDR) with Arduino/Raspberry Pi and write a program to ‘turn ON’ LED when push button is pressed or at sensor detection.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 2 to RGB LED, GPIO 16 to any Switch(SW)
●	Click on Verify, Upload & check the output in serial monitor and kit (press the switch and see the changes)
Program:
#define BUTTON_PIN 16  // ESP32 pin GIOP16, which connected to button
#define LED_PIN    2  // ESP32 pin GIOP18, which connected to led

// The below are variables, which can be changed
int button_state = 0;   // variable for reading the button status

void setup() {
  // initialize the LED pin as an output:
  pinMode(LED_PIN, OUTPUT);
  // initialize the button pin as an pull-up input:
  // the pull-up input pin will be HIGH when the button is open and LOW when the button is pressed.
  pinMode(BUTTON_PIN, INPUT);
  Serial.begin(9600);
}

void loop() {
  // read the state of the button value:
  button_state = digitalRead(BUTTON_PIN);
  Serial.print("BUTTON VALUE : ");
  Serial.println(button_state);
  delay(100);

  // control LED according to the state of button
  if (button_state == LOW)       // if button is pressed
    digitalWrite(LED_PIN, HIGH); // turn on LED
  else                           // otherwise, button is not pressing
    digitalWrite(LED_PIN, LOW);  // turn off LED
}
                `
            },
            { 
                title: "Print Temp and Hum", 
                code: `
2(i). To interface DHT11 sensor with Arduino/Raspberry Pi and write a program to print temperature and humidity readings.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 4 to DHT11 O/P
●	Install DHT sensor library by Adafruit
●	Install Adafruit ST7735 library
●	Click on Verify, Upload & check the output in serial monitor (displays Temperature & Humidity values)

Program:

#include "DHT.h"
#define DHTPIN 4     // Digital pin connected to the Dht sensor
#define DHTTYPE DHT11   // DHT 11
//#define DhtTYPE DHT22   // DHT 22
DHT Dht(DHTPIN, DHTTYPE);

float temp = 0;
float hum = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("DHT11 Test!");
  Dht.begin();
}

void loop() { // Wait a few seconds between measurements.
  delay(2000);
  temp = Dht.readTemperature();
  hum = Dht.readHumidity();
 
  if (isnan(temp) || isnan(hum)) {
  Serial.println("DHT11 sensor pin not connected properly!");
  delay(1000);
  return;
  }

  Serial.print("Temperature C: ");
  Serial.println(temp);
  Serial.print("Humidity  %RH: ");
  Serial.println(hum);
  Serial.println();

}

2(ii). To interface OLED with Arduino/Raspberry Pi and write a program to print temperature and humidity readings on it.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 4 to DHT11 O/P, GPIO 14 to CS of 1.8 TFT display, GPIO 12 to RES of 1.8 TFT display, GPIO 13 to A0 of 1.8 TFT display, GPIO 22 to SCK of 1.8 TFT display,GPIO 21 to SDA of 1.8 TFT display,LED of 1.8 TFT display to 3.3 V or 5 V.
●	Install DHT sensor library by Adafruit
●	Install Adafruit ST7735 library
●	Click on Verify, Upload & check the output in serial monitor and kit (displays Temperature & Humidity values).

Program:
//**********************************************************************************
//include library code
#include <Adafruit_ST7735.h>  //DISPLAY LIBRARY
#include "DHT.h"              //DHT LIBRARY
#include <SPI.h>

#define DHTPIN 4     // Digital pin connected to the Dht11 sensor
#define DHTTYPE DHT11   // DHT 11
DHT Dht(DHTPIN, DHTTYPE);
float temp = 0;
float hum = 0;
//***********************************************************************************
//define pins of Display screen
#define Display_CS     14
#define Display_RES    12
#define Display_A0     13
#define Display_SCK    22
#define Display_SDA    21

// DISPLAY LED -> 5V

Adafruit_ST7735 Display = Adafruit_ST7735(Display_CS, Display_A0, Display_SDA, Display_SCK, Display_RES);

//***********************************************************************************
void setup(void) {
  Serial.begin(9600);//initialise serial communication at 115200 bps
  Serial.println("DHT11 Test!");
  Dht.begin();
  Display.initR(INITR_BLACKTAB);//initialize a ST7735S chip, black tab  
  Display.setTextWrap(true);
  Display.setRotation(1);
}

void loop() {
  delay(2000);

  temp = Dht.readTemperature();
  hum = Dht.readHumidity();
 
  if (isnan(temp) || isnan(hum)) {
  Serial.println("DHT11 sensor pin not connected properly!");
  return;
  }

  Serial.print("Temperature C: ");
  Serial.println(temp);
  Serial.print("Humidity  %RH: ");
  Serial.println(hum);
  Serial.println();

  Display.fillScreen(ST7735_BLACK);
  Display.setTextSize(1);

  Display.setCursor(10, 10);
  Display.setTextColor(ST7735_RED);
  Display.print("Temperature : ");

  Display.setCursor(100, 10);
  Display.setTextColor(ST7735_YELLOW);
  Display.println(temp);
  delay(10);

  Display.setCursor(10, 30);
  Display.setTextColor(ST7735_RED);
  Display.print("Humidity    : ");

  Display.setCursor(100, 30);
  Display.setTextColor(ST7735_YELLOW);
  Display.println(hum);
  delay(2000);
}  
                `
            },
            { 
                title: "Motor", 
                code: `
3. To interface the motor using a relay with Arduino/Raspberry Pi and write a program to ‘turn ON’ the motor when push button is pressed.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 22 to any switch (SW), GPIO 27 to any relay (P26)
●	Click on Verify, Upload & check the output in the serial monitor (press the switch and see the changes).

Program:
#define BUTTON_PIN 22 // In ESP32 pin GPIO22 connected to button's pin
#define RELAY_PIN 27 //In ESP32 pin GPIO27 connected to relay's pin
void setup() {
Serial.begin(9600); // initialize serial
pinMode(BUTTON_PIN, INPUT); // set ESP32 pin to input pullup mode
pinMode(RELAY_PIN, OUTPUT); // set ESP32 pin to output mode
}
void loop() {
int buttonState = digitalRead(BUTTON_PIN); // read new state
if (buttonState == LOW) {
digitalWrite(RELAY_PIN, HIGH); // turn on
Serial.println("The button is being pressed");
}
else if (buttonState == HIGH) {
digitalWrite(RELAY_PIN, LOW); // turn off
Serial.println("The button is unpressed");
}
}
                `
            },
            { 
                title: "LDR Sensor", 
                code: `
4. Write an Arduino/Raspberry Pi program to interface the LDR/Photo Sensor.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 34 to LDR output pin
●	Click on Verify, Upload & check the output in the serial monitor.
●	The LDR produces a varying voltage depending on the light intensity, which the ESP32 reads as an integer value between 0 (no light) and 4095 (maximum light intensity).
Program:
// Define the pin where the LDR is connected (ADC Pin)
#define LDR_PIN 34  // You can change the pin to any ADC pin on the ESP32

void setup() {
  // Initialize Serial Monitor at 9600 baud rate
  Serial.begin(9600);
 
  // Set the LDR pin as an input (for reading the sensor value)
  pinMode(LDR_PIN, INPUT);
}

void loop() {
  // Read the analog value from the LDR sensor
  int ldrValue = analogRead(LDR_PIN);
 
  // Print the LDR value to the Serial Monitor
  Serial.print("LDR Value: ");
  Serial.println(ldrValue);
 
  // Add a small delay before the next reading (1 second)
  delay(1000);
}                `
            },
            { 
                title: "UltraSonic Sensor", 
                code: `
5. Write a program to interface an Ultrasonic Sensor with Arduino /Raspberry Pi.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Pin connection:GPIO 23 to TRIG of ultrasonic sensor & GPIO 22 to 
ECHO of ultrasonic sensor.
●	Click on Verify, Upload & check the output in the serial monitor.
●	The LDR produces a varying voltage depending on the light intensity, which the ESP32 reads as an integer value between 0 (no light) and 4095 (maximum light intensity).
Program:
// Define the pins for the Ultrasonic Sensor
#define TRIGGER_PIN 23  // GPIO pin for Trigger
#define ECHO_PIN 22     // GPIO pin for Echo

void setup() {
  // Start the Serial Communication at 115200 baud rate
  Serial.begin(9600);
 
  // Set Trigger pin as OUTPUT and Echo pin as INPUT
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  // Variable to store the duration of the pulse
  long duration;
  // Variable to store the calculated distance
  float distance;

  // Ensure the Trigger pin is LOW before sending the pulse
  digitalWrite(TRIGGER_PIN, LOW);
  delayMicroseconds(2);  // Wait for 2 microseconds

  // Send a 10 microsecond HIGH pulse to the Trigger pin
  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);  // Keep the pulse HIGH for 10 microseconds
  digitalWrite(TRIGGER_PIN, LOW);

  // Read the duration of the pulse on the Echo pin (in microseconds)
  duration = pulseIn(ECHO_PIN, HIGH); 
//measures how long the Echo pin stays HIGH. This time duration represents the time it takes for the ultrasonic sound wave to travel to the object and return.

  // Calculate the distance in centimeters using the formula:
  // Distance = (duration / 2) * (speed of sound in cm per microsecond)
  // Speed of sound = 0.0343 cm/us
  distance = (duration / 2.0) * 0.0343;

  // Print the distance to the Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Delay for a short time before the next reading
  delay(500);  // 500 ms delay between measurements
}
                `
            },
            { 
                title: "Upload to ThingSpeak", 
                code: `
6. Write a program on Arduino/Raspberry Pi to upload temperature and humidity data to
thingspeak clouds.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Install ThingSpeak by Mathworks
●	Pin connection: GPIO 4 to DHT11
●	Go to google→Open Thingspeak→create account→login
●	Create new channel, replace the channel number & API key in the program (myChannelNumber & myWriteAPIKey)
●	Replace network SSID & network password in the program
●	Click on Verify, Upload & check the output (temp & hum values stored in cloud) in the serial monitor.

Program:
#include <WiFi.h>
#include "ThingSpeak.h" // always include thingspeak header file after other header files and custom macros
#include "DHT.h"

char ssid[] = "IOT LAB";   // your network SSID (name)
char pass[] = "Reddy@143";   // your network password

unsigned long myChannelNumber = 2417272;
const char * myWriteAPIKey = "ZFOBMH8RPAD6OUDB";

// Initialize our values
#define DHTPIN 4 // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11

// Initializing the DHT11 sensor.
DHT Dht(DHTPIN, DHTTYPE);
WiFiClient  client;

float temp = 0;
float hum = 0;

void setup() {
  Serial.begin(9600);  //Initialize serial
  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client);  // Initialize ThingSpeak
  Dht.begin();  
  // Connect or reconnect to WiFi
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);  // Connect to WPA/WPA2 network. Change this line if using open or WEP network
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }

}

void loop() {

delay(2000);
temp = Dht.readTemperature();
hum = Dht.readHumidity();
 
if (isnan(temp) || isnan(hum)) {
Serial.println("DHT11 sensor pin not connected properly!");
delay(1000);
return;
}

Serial.print("Temperature C: ");
Serial.println(temp);
Serial.print("Humidity  %RH: ");
Serial.println(hum);
Serial.println();

ThingSpeak.setField(1, temp);
ThingSpeak.setField(2, hum);
 
// write to the ThingSpeak channel
int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
if(x == 200){
Serial.println("Channel update successful.");
}
else{
  Serial.println("Problem updating channel. HTTP error code " + String(x));
}
  delay(15000); // Wait 15 seconds to update the channel again
}
                `
            },
            { 
                title: "Retrieve From ThingSpeak", 
                code: `
7. Write a program on Arduino/Raspberry Pi to retrieve temperature and humidity data from
thingspeak clouds.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Install ThingSpeak by Mathworks
●	Pin connection: GPIO 4 to DHT11
●	Go to google→Open Thingspeak→create account→login
●	Create new channel, replace the channel number & API key in the program (myChannelNumber & readAPIKey)
●	Replace network SSID & network password in the program
●	Click on Verify, Upload & check the output (temp & hum values stored in cloud) in the serial monitor.

Program:
#include <WiFi.h>
#include "ThingSpeak.h"

char ssid[] = "IOT LAB";   // your network SSID (name)
char pass[] = "Reddy@143";   // your network password

unsigned long myChannelNumber = 2417272;
const char * readAPIKey = "4AZ1XP68KC1EB53E";

WiFiClient client;
int field[2] = {1,2};

float temp = 0;
float hum = 0;

void setup() {
Serial.begin(9600); // Initialize serial
WiFi.mode(WIFI_STA);
ThingSpeak.begin(client); // Initialize ThingSpeak

// Connect or reconnect to WiFi
 if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);  // Connect to WPA/WPA2 network. Change this line if using open or WEP network
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }
}

void loop() {

Serial.println("Waiting...");
int x = ThingSpeak.readMultipleFields(myChannelNumber,readAPIKey);
if(x == 200)
{
temp = ThingSpeak.getFieldAsFloat(field[0]); // Field 1
hum  = ThingSpeak.getFieldAsFloat(field[1]); // Field 2
Serial.println("TEMPERATURE : " + String(temp));
Serial.println("HUMIDITY : " + String(hum));
}
else{
Serial.println("Problem reading channel. HTTP error code " + String(x));
}
Serial.println();
delay(15000); // no need to fetch too often
}

                `
            },
            { 
                title: "Telegram", 
                code: `
8. Write a program to interface LED using Telegram App.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Install UniversalTelegramBot by Brian Lough
●	Install ArduinoJson by Benoit Blanchon
●	BOTtoken: 
o	Install telegram app in your mobile
o	Search for BotFather,Type /newbot (To create a new bot)
o	Give a name for your bot (Eg:CPROBO)
o	Give a username for your bot (Eg:CPROBO_bot)
o	You will get a BOTtoken (7821273262:AAEYfme2VObXSokSk58DQhVdAvViuJHgeTQ)
o	Come out of Botfather and search for userinfobot in telegram
o	Type /start
o	You will get a Chat_Id(7820393453)
o	Come out of userinfo and search for your bot (Type:CPROBO) and Click on start
o	Type /start
o	Follow the commands

Program:
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>
#include <ArduinoJson.h>

const char* ssid = "IOT LAB";
const char* password = "Reddy@143";

#define BOTtoken "7821273262:AAEYfme2VObXSokSk58DQhVdAvViuJHgeTQ" //paste it from telegram app (BotFather)
#define CHAT_ID "7820393453" //paste it from telegram app (userinfobot)


WiFiClientSecure client;
UniversalTelegramBot bot(BOTtoken, client);

int botRequestDelay = 1000;
unsigned long lastTimeBotRan;

const int ledPin = 2;
bool ledState = LOW;

void NewMessagesHandle(int NewMessages) {
  Serial.println("NewMessagesHandle");
  Serial.println(String(NewMessages));

  for (int i=0; i<NewMessages; i++) {
    String chat_id = String(bot.messages[i].chat_id);
    Serial.println("Chat ID: " + chat_id);

    if (chat_id != CHAT_ID){
      bot.sendMessage(chat_id, "Unauthorized user", "");
      continue;
    }
   
    String text = bot.messages[i].text;
    Serial.println(text);

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
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, ledState);

  WiFi.mode(WIFI_STA);                /*Set the WiFi in STA Mode*/
  WiFi.begin(ssid, password);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  delay(1000);                       /*Wait for 1000mS*/
  while(WiFi.waitForConnectResult() != WL_CONNECTED){Serial.print(".");}
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("Your Local IP address is: ");
  Serial.println(WiFi.localIP());     /*Print the Local IP*/
  client.setCACert(TELEGRAM_CERTIFICATE_ROOT);
}

void loop() {
  if (millis() > lastTimeBotRan + botRequestDelay)  {
    int NewMessages = bot.getUpdates(bot.last_message_received + 1);

    while(NewMessages) {
      Serial.println("Response Received!");
      NewMessagesHandle(NewMessages);
      NewMessages = bot.getUpdates(bot.last_message_received + 1);
    }
    lastTimeBotRan = millis();
  }
}
                `
            },
            { 
                title: "MQTT", 
                code: `
9. Write a program on Arduino/Raspberry Pi to publish temperature data to MQTT broker.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Install PubSubClient by Nick O’Leary 2.8 in Arduino IDE
●	Pin connection: GPIO 4 to DHT11
●	Replace network SSID & network password in the program
●	Install Mqtizer App from play store to your mobile phone
●	Add workspaceGive any name
●	Type client id “ESP32Client-“ in apps client name
●	Go to brokergive any name, Host: test.mosquitto.org, Port:1883Save
●	Click on Verify, Upload  
●	Go to topicsClick on “+”Give any topic name “Temp”Subscribe
●	Go to messagescheck the output from the app
●	Check the output in serial monitor 
Program:
#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

#define DHTPIN 4     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11
DHT Dht(DHTPIN, DHTTYPE);

char ssid[] = "IOT LAB";   // your network SSID (name)
char pass[] = "Reddy@143";        // your network password

char *mqttServer = "test.mosquitto.org";
int mqttPort = 1883;

float temp = 0;
float hum = 0;

void setupMQTT() {
  mqttClient.setServer(mqttServer, mqttPort);
  //mqttClient.setCallback(callback);
}

void reconnect() {
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
  Serial.begin(9600);
  Dht.begin();
  setupMQTT();

  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);  // Connect to WPA/WPA2 network. Change this line if using open or WEP network
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }
}

void loop() {
  if (!mqttClient.connected())
  reconnect();
  mqttClient.loop();
 
  delay(2000);
  temp = Dht.readTemperature();
  hum = Dht.readHumidity();
 
  if (isnan(temp) || isnan(hum)) {
  Serial.println("DHT11 sensor pin not connected properly!");
  delay(1000);
  return;
  }
   
  char tempString[8];
  dtostrf(temp, 1, 2, tempString);
  Serial.print("Temperature: ");
  Serial.println(tempString);
  mqttClient.publish("Temperature", tempString);

 
  char humString[8];
  dtostrf(hum, 1, 2, humString);
  Serial.print("Humidity: ");
  Serial.println(humString);
  mqttClient.publish("Humidity", humString);
  delay(5000); 
}
                `
            },
            { 
                title: "UDP", 
                code: `
10. Write a program to create a UDP server on Arduino/Raspberry Pi and respond with humidity data to the UDP client when requested.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Download SocketTest V 3
●	Pin connection: GPIO 4 to DHT11
●	Replace network SSID & network password in the program
●	Go to SocketTest→UDP→Type IP address of the system→Type port no. given in the program
●	Click on start listening
●	Upload the program
●	In serial monitor, ESP IP address will be displayed
●	Paste it in the SocketTest Client IP address space and give the same port number
●	Type the message as get_humidity in the message space
●	Click on Send
●	Output must be observed in the serial monitor
Program:
#include <WiFi.h>
#include <WiFiUdp.h>
#include <DHT.h>

// Replace with your network credentials
char ssid[] = "IOT LAB";   // your network SSID (name)
char pass[] = "Reddy@143";   // your network password

// Replace with your DHT sensor type and pin
// Initialize our values
#define DHTPIN 4 // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11

// Initializing the DHT11 sensor.
DHT Dht(DHTPIN, DHTTYPE);

// UDP server port
#define UDP_PORT 5000
// Create an instance of the DHT sensor
WiFiUDP udp;

float hum =0;

void setup() {
Serial.begin(9600);
// Connect to Wi-Fi
if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);  // Connect to WPA/WPA2 network. Change this line if using open or WEP network
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  };
// Print the ESP32 IP address
Serial.print("ESP32 IP address: ");
Serial.println(WiFi.localIP());

// Start the UDP server
udp.begin(UDP_PORT);
Serial.println("UDP server started");
// Initialize DHT sensor
Dht.begin();
}

void loop() {
// Wait for incoming UDP packets
int packetSize = udp.parsePacket();
if (packetSize) {
// Read the incoming packet
char packetData[packetSize];
udp.read(packetData, packetSize);
String request = String(packetData);
if (request == "get_humidity") {
// Read humidity from the DHT sensor
hum = Dht.readHumidity();
// Send humidity data to the UDP client
udp.beginPacket(udp.remoteIP(), udp.remotePort());
udp.printf("Humidity: %.2f%%", hum);
udp.endPacket();
Serial.printf("Sent humidity data: %.2f%%\n", hum);
}
}
}
                `
            },
            { 
                title: "TCP", 
                code: `
11. Write a program to create a TCP server on Arduino/Raspberry Pi and respond with humidity data to the TCP client when requested.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB
●	Download SocketTest V 3
●	Pin connection: GPIO 4 to DHT11
●	Replace network SSID & network password in the program
●	Go to SocketTest→Server →Type IP address of the system→Type port no. given in the program (8888)
●	Click on start listening
●	Upload the program
●	Go to SocketTest→Client →Type IP address of the ESP (generated & shown in serial monitor)→Type port no. given in the program(8888)
●	Click on Connect
●	Type the message as get_humidity in the message space of client
●	Click on Send
●	Output must be observed in the serial monitor

Program:
#include <WiFi.h>
#include <WiFiClient.h>
#include <DHT.h>

// Replace with your network credentials
char ssid[] = "IOT LAB";   // your network SSID (name)
char pass[] = "Reddy@143";   // your network password

#define DHTPIN 4 // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11

// Initializing the DHT11 sensor.
DHT Dht(DHTPIN, DHTTYPE);
WiFiServer server(8888); // TCP server port

float hum =0;

void setup() {
Serial.begin(9600);

if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    while(WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid, pass);  // Connect to WPA/WPA2 network. Change this line if using open or WEP network
      Serial.print(".");
      delay(5000);    
    }
    Serial.println("\nConnected.");
  }

Serial.println("WiFi connected");
Serial.print("IP address: ");
Serial.println(WiFi.localIP());
Dht.begin();
server.begin();
}

void loop() {
WiFiClient client = server.available();
if (client) {
Serial.println("New client connected");
// Wait for data from client
while (client.connected()) {
if (client.available()) {
String request = client.readStringUntil('\r');
client.flush();
if (request.indexOf("get_humidity") != -1) {
// Read humidity data from DHT sensor
hum = Dht.readHumidity();
Serial.print("Humidity: ");
Serial.print(hum);
Serial.println("%");
client.print("Humidity: ");
client.print(hum);
client.println("%");
}
// Close the connection
client.stop();
Serial.println("Client Disconnected");
}
}
}
}
                `
            }
        ];

        // Function to generate Table of Contents and Program Sections
        function generateContent() {
            const tocList = document.getElementById("toc-list");
            const programsContainer = document.getElementById("programs-container");

            // Loop through the programs array to generate both
            programs.forEach((program, index) => {
                const programId = `program${index + 1}`;
                
                // Create Table of Contents link
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `#${programId}`;
                a.textContent = program.title;
                li.appendChild(a);
                tocList.appendChild(li);
                
                // Create Program Section
                const section = document.createElement("section");
                section.id = programId;
                
                const h2 = document.createElement("h2");
                h2.textContent = program.title;
                section.appendChild(h2);
                
                // Create the Copy Button
                const copyBtn = document.createElement("button");
                copyBtn.textContent = "Copy Code";
                copyBtn.className = "copy-btn";
                
                // Create the <pre> tag for the code
                const pre = document.createElement("pre");
                pre.textContent = program.code;

                // Add event listener to the copy button
                copyBtn.addEventListener("click", () => {
                    // Create a temporary textarea to copy the code to clipboard
                    const tempTextArea = document.createElement("textarea");
                    tempTextArea.value = program.code;
                    document.body.appendChild(tempTextArea);
                    tempTextArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempTextArea);

                    // Change button text temporarily to indicate the code was copied
                    copyBtn.textContent = "Copied!";
                    setTimeout(() => {
                        copyBtn.textContent = "Copy Code";
                    }, 1500);
                });

                // Append the button and pre to the section
                section.appendChild(copyBtn);
                section.appendChild(pre);

                programsContainer.appendChild(section);
            });
        }

        // Call the function to generate content after the DOM is loaded
        document.addEventListener("DOMContentLoaded", generateContent);


document.addEventListener('keydown', function(event) {
    if(event.key === 'v' || event.key === 'V') {
        window.location.href = 'Viva/';
    }
});

