// Define an array of program objects with titles and code
export const programs = [
  {
    title: "LED on",
    code: `1(i).  To interface LED/Buzzer with Arduino/Raspberry Pi and write a program to 'turn ON' LED for 1 sec after every 2 seconds.
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
}`,
    pinConfig: [
      { pin: "GPIO 2", component: "RGB LED" }
    ]
  },
  // Add other programs here...
];