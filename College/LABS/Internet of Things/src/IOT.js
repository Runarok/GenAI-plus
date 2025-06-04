const programs = [
  {
    title: "LED on",
    code: `<QUES>1(i).  To interface LED/Buzzer with Arduino/Raspberry Pi and write a program to 'turn ON' LED for 1 sec after every 2 seconds.
Steps:
●	Write the program
●	Select the board-->DOIT ESP32 DEVKIT V1-->COM 4 serial port USB 
●	Pin connection:GPIO 2 to any RGB LED
●	Click on Verify, Upload & check the output in serial monitor and kit.<QUES>

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
}`,
    pinConfig: [
      { pin: "GPIO 2", component: "RGB LED" }
    ]
  },
  {
    title: "Push Button LED Control",
    code: `1(ii). To interface Push button/Digital sensor (IR/LDR) with Arduino/Raspberry Pi and write a program to 'turn ON' LED when push button is pressed or at sensor detection.`,
    pinConfig: [
      { pin: "GPIO 2", component: "RGB LED" },
      { pin: "GPIO 16", component: "Push Button Switch" }
    ]
  },
  {
    title: "Temperature and Humidity",
    code: `2(i). To interface DHT11 sensor with Arduino/Raspberry Pi and write a program to print temperature and humidity readings.`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor Output" }
    ]
  },
  {
    title: "OLED Display",
    code: `2(ii). To interface OLED with Arduino/Raspberry Pi and write a program to print temperature and humidity readings on it.`,
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
    code: `3. To interface the motor using a relay with Arduino/Raspberry Pi and write a program to 'turn ON' the motor when push button is pressed.`,
    pinConfig: [
      { pin: "GPIO 22", component: "Push Button Switch" },
      { pin: "GPIO 27", component: "Relay Control" }
    ]
  },
  {
    title: "LDR Sensor",
    code: `4. Write an Arduino/Raspberry Pi program to interface the LDR/Photo Sensor.`,
    pinConfig: [
      { pin: "GPIO 34", component: "LDR Sensor Output" }
    ]
  },
  {
    title: "Ultrasonic Sensor",
    code: `5. Write a program to interface an Ultrasonic Sensor with Arduino/Raspberry Pi.`,
    pinConfig: [
      { pin: "GPIO 23", component: "Ultrasonic TRIG" },
      { pin: "GPIO 22", component: "Ultrasonic ECHO" }
    ]
  },
  {
    title: "ThingSpeak Upload",
    code: `6. Write a program on Arduino/Raspberry Pi to upload temperature and humidity data to thingspeak clouds.`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  },
  {
    title: "ThingSpeak Retrieve",
    code: `7. Write a program on Arduino/Raspberry Pi to retrieve temperature and humidity data from thingspeak clouds.`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  },
  {
    title: "Telegram Bot LED Control",
    code: `8. Write a program to interface LED using Telegram App.`,
    pinConfig: [
      { pin: "GPIO 2", component: "LED" }
    ]
  },
  {
    title: "MQTT Temperature Publishing",
    code: `9. Write a program on Arduino/Raspberry Pi to publish temperature data to MQTT broker.`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  },
  {
    title: "UDP Server",
    code: `10. Write a program to create a UDP server on Arduino/Raspberry Pi and respond with humidity data to the UDP client when requested.`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  },
  {
    title: "TCP Server",
    code: `11. Write a program to create a TCP server on Arduino/Raspberry Pi and respond with humidity data to the TCP client when requested.`,
    pinConfig: [
      { pin: "GPIO 4", component: "DHT11 Sensor" }
    ]
  }
];

