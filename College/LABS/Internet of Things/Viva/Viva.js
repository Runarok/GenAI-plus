const vivaQuestions = [
  { 
    question: "What is the role of a resistor when interfacing an LED with an Arduino?",
    answer: "The resistor limits the current flowing through the LED to prevent it from burning out."
  },
  { 
    question: "Explain how to control an LED using a microcontroller.",
    answer: "By using a digital output pin on the microcontroller, you can set the pin HIGH to turn on the LED and LOW to turn it off."
  },
  { 
    question: "Why do we use a delay in the program?",
    answer: "The delay function allows the LED to remain on for 1 second and off for 1 second, creating a visible effect."
  },
  { 
    question: "How would you modify the code if you wanted the LED to stay on for 2 seconds instead of 1?",
    answer: "You would increase the delay time from 1000 milliseconds (1 second) to 2000 milliseconds."
  },
  { 
    question: "Can you control multiple LEDs simultaneously?",
    answer: "Yes, by assigning different pins to each LED and controlling them independently with the digitalWrite function."
  },
  { 
    question: "What is the purpose of the digitalWrite() function in the Arduino code?",
    answer: "The digitalWrite() function is used to send a HIGH or LOW signal to a pin, controlling the state of an attached component like an LED."
  },
  { 
    question: "What is the difference between Arduino and Raspberry Pi when controlling hardware like LEDs?",
    answer: "Arduino uses digital pins to control hardware directly with low-level programming, while Raspberry Pi uses GPIO pins and requires an operating system for control."
  },
  { 
    question: "How would you interface a buzzer with Arduino and modify the code to turn on the buzzer instead of the LED?",
    answer: "You would connect the buzzer to a pin and use digitalWrite() to turn it on and off."
  },
  { 
    question: "What would happen if you omitted the delay() function in the program?",
    answer: "The LED would blink very quickly, as there would be no pause between switching it on and off."
  },
  { 
    question: "What is the significance of the pinMode() function in the program?",
    answer: "The pinMode() function sets the pin to either input or output mode, depending on whether you're sending or receiving signals."
  },
  { 
    question: "What is the function of a push button in an electronic circuit?",
    answer: "A push button allows the user to complete or interrupt a circuit, sending a signal to the microcontroller when pressed."
  },
  { 
    question: "How does an LDR (Light Dependent Resistor) work?",
    answer: "An LDR changes its resistance based on the amount of light falling on it. The more light, the lower the resistance."
  },
  { 
    question: "What type of signal does a push button provide to the microcontroller?",
    answer: "A push button provides a digital signal, either HIGH or LOW, depending on whether it is pressed or not."
  },
  { 
    question: "How would you debounce a push button in a program?",
    answer: "You can debounce a button by adding a small delay (e.g., 50-100 ms) after detecting a button press to prevent multiple readings due to noise."
  },
  { 
    question: "What happens if the push button is wired incorrectly in the circuit?",
    answer: "If wired incorrectly, the push button might not register the press, or it might cause the pin to always read HIGH or LOW."
  },
  { 
    question: "Explain the concept of \"pull-up\" and \"pull-down\" resistors.",
    answer: "A pull-up resistor ensures a default HIGH state when the button is unpressed, and a pull-down resistor ensures a default LOW state when the button is unpressed."
  },
  { 
    question: "What would you do if the sensor values are fluctuating when using an LDR?",
    answer: "You can use averaging or smoothing techniques in your code to stabilize the sensor readings."
  },
  { 
    question: "Can you use multiple sensors to trigger the LED?",
    answer: "Yes, by checking the states of multiple sensors (e.g., LDRs or IR sensors), you can decide when to turn on the LED."
  },
  { 
    question: "What would happen if the LED stays on even when the button is not pressed?",
    answer: "This could indicate a problem with the circuit, such as a floating pin or incorrect logic in the program."
  },
  { 
    question: "How would you modify the program to turn the LED off when the button is released?",
    answer: "You would add a condition to check when the button is no longer pressed and use digitalWrite() to turn off the LED."
  },
  { 
    question: "What does the DHT11 sensor measure?",
    answer: "The DHT11 sensor measures temperature and humidity."
  },
  { 
    question: "What is the data format of the output from the DHT11 sensor?",
    answer: "The DHT11 sends data as a series of bits that represent the temperature and humidity values in a specific format."
  },
  { 
    question: "How do you read data from the DHT11 sensor?",
    answer: "You use a library like DHT in Arduino, which handles the communication with the sensor and reads the data."
  },
  { 
    question: "Why do you need a pull-up resistor when connecting the DHT11 sensor to an Arduino?",
    answer: "A pull-up resistor ensures the data pin reads a stable HIGH signal when not actively pulling it LOW."
  },
  { 
    question: "What is the typical range for the temperature and humidity values measured by the DHT11 sensor?",
    answer: "The DHT11 typically measures temperature from 0 to 50°C and humidity from 20% to 90%."
  },
  { 
    question: "How do you convert the raw data from the DHT11 into readable temperature and humidity values?",
    answer: "The library used to interface with the sensor automatically converts the raw data into temperature and humidity readings."
  },
  { 
    question: "What would happen if you had a faulty connection to the DHT11 sensor?",
    answer: "You would receive incorrect or no data readings from the sensor."
  },
  { 
    question: "How do you calibrate the DHT11 sensor?",
    answer: "The DHT11 does not require calibration, but you can adjust the readings in the code if necessary."
  },
  { 
    question: "Can you use the DHT11 sensor with a Raspberry Pi?",
    answer: "Yes, by using a library like Adafruit_DHT for Python, you can read temperature and humidity from the DHT11 sensor."
  },
  { 
    question: "What is the significance of the delay in your program after reading the DHT11 data?",
    answer: "The delay is necessary because the DHT11 sensor can only be read at a specific interval, usually once every 2 seconds."
  },
  { 
    question: "What is an OLED display?",
    answer: "An OLED display is a type of display that uses organic light-emitting diodes to display information, offering high contrast and energy efficiency."
  },
  { 
    question: "How do you interface an OLED display with an Arduino or Raspberry Pi?",
    answer: "You typically use an I2C or SPI interface to communicate between the microcontroller and the OLED display."
  },
  { 
    question: "What library would you use to control an OLED display on Arduino?",
    answer: "The Adafruit_SSD1306 library is commonly used to control OLED displays based on the SSD1306 driver."
  },
  { 
    question: "How do you display text on an OLED display?",
    answer: "You use the display.print() or display.println() functions to write text to the OLED screen."
  },
  { 
    question: "What is the function of the display.display() command in Arduino code?",
    answer: "The display.display() function updates the OLED screen with the content you have written to it."
  },
  { 
    question: "How do you clear the screen on the OLED display?",
    answer: "The display.clearDisplay() function clears the content from the OLED screen."
  },
  { 
    question: "How would you display temperature and humidity data on the OLED?",
    answer: "You would use the display.print() function to display the temperature and humidity values retrieved from the DHT11 sensor."
  },
  { 
    question: "What happens if you don't call display.display() after writing to the OLED?",
    answer: "The changes will not be reflected on the screen until display.display() is called to update the display buffer."
  },
  { 
    question: "Can you adjust the brightness of the OLED display?",
    answer: "Some OLED displays allow adjusting brightness through a command like display.ssd1306_command(SSD1306_SETCONTRAST)."
  },
  { 
    question: "Why is I2C preferred for connecting OLED displays to Arduino?",
    answer: "I2C is preferred because it only requires two pins for communication (SDA and SCL), simplifying the wiring."
  },
  { 
    question: "What is the role of a relay in this circuit?",
    answer: "The relay acts as a switch that allows the Arduino or Raspberry Pi to control a high-power motor with a low-power signal."
  },
  { 
    question: "How does a relay work?",
    answer: "A relay uses an electromagnetic coil to open or close a switch, allowing or interrupting the flow of current to a connected device."
  },
  { 
    question: "Why do we need a flyback diode when using a relay with an Arduino?",
    answer: "The flyback diode protects the Arduino from voltage spikes generated when the relay coil is turned off."
  },
  { 
    question: "What type of motor can be controlled using a relay?",
    answer: "Any motor that requires more voltage or current than the microcontroller can directly provide can be controlled using a relay."
  },
  { 
    question: "How would you modify the program to control the motor for a set amount of time after the button is pressed?",
    answer: "You can add a delay() function or use the millis() function to time the motor's operation."
  },
  { 
    question: "Can you use a transistor instead of a relay for controlling the motor?",
    answer: "Yes, a transistor can also be used as a switch to control the motor, but relays are more commonly used for inductive loads."
  },
  { 
    question: "What are the potential dangers of using a relay incorrectly?",
    answer: "Incorrect use can result in short circuits, overloading, or damage to the microcontroller due to high current."
  },
  { 
    question: "How would you wire the relay to safely control a high-voltage AC motor?",
    answer: "The relay should be connected in such a way that the high-voltage AC current flows through the Normally Open (NO) contacts, ensuring isolation from the microcontroller."
  },
  { 
    question: "Why is it important to choose a relay with an appropriate voltage and current rating?",
    answer: "Choosing the wrong relay can lead to failure, overheating, or even fire due to exceeding the relay's specifications."
  },
  { 
    question: "How do you prevent false triggering of the relay when the push button is pressed?",
    answer: "You can debounce the button in software or hardware to avoid multiple triggers from a single press."
  },
  { 
    question: "What is an LDR (Light Dependent Resistor)?",
    answer: "An LDR is a type of resistor whose resistance decreases with increasing light intensity."
  },
  { 
    question: "How do you interface an LDR with an Arduino?",
    answer: "You connect one leg of the LDR to a digital or analog input pin and the other leg to ground, often with a pull-down resistor to create a voltage divider."
  },
  { 
    question: "How does the LDR affect the voltage in a voltage divider circuit?",
    answer: "The resistance of the LDR changes depending on the light intensity, which alters the voltage in the divider and can be read by the microcontroller."
  },
  { 
    question: "Why is the analogRead() function used to read values from an LDR?",
    answer: "The analogRead() function is used to measure the varying voltage that results from the changing resistance of the LDR, providing a value between 0 and 1023."
  },
  { 
    question: "How can you use the LDR to create an automatic lighting system?",
    answer: "You can use the LDR to detect ambient light levels and use that information to turn a light on or off when the light level is below a certain threshold."
  },
  { 
    question: "What would happen if the LDR is exposed to constant light?",
    answer: "If the LDR is exposed to constant light, its resistance will remain low, and the sensor will output a lower voltage signal."
  },
  { 
    question: "How do you calibrate the LDR for specific light levels?",
    answer: "Calibration involves adjusting the code to compare the raw analog values from the LDR to specific light conditions and deciding thresholds for actions like turning on/off LEDs."
  },
  { 
    question: "Can the LDR be used for both detecting light and measuring its intensity?",
    answer: "Yes, the LDR can be used for detecting both the presence of light and the intensity, as its resistance varies with the amount of light hitting it."
  },
  { 
    question: "What factors could affect the performance of an LDR?",
    answer: "The performance of an LDR could be affected by factors like temperature, age of the sensor, and the quality of the light source."
  },
  { 
    question: "How would you modify the program to use the LDR to control multiple devices?",
    answer: "You can read the LDR value, then use if statements to control different outputs (e.g., LEDs or motors) based on the light level."
  },
  { 
    question: "What does an ultrasonic sensor measure?",
    answer: "An ultrasonic sensor measures the distance to an object by emitting ultrasonic waves and timing how long it takes for the waves to reflect back to the sensor."
  },
  { 
    question: "How is the ultrasonic sensor connected to an Arduino?",
    answer: "The ultrasonic sensor is connected to two digital pins on the Arduino: one for triggering the sensor and the other for receiving the echo signal."
  },
  { 
    question: "What is the role of the pulseIn() function in the Arduino code?",
    answer: "The pulseIn() function is used to measure the duration of the pulse received from the echo pin, which correlates to the distance."
  },
  { 
    question: "What is the formula for calculating distance using an ultrasonic sensor?",
    answer: "Distance = (Time × Speed of Sound) / 2. The speed of sound is approximately 343 meters per second in air."
  },
  { 
    question: "Why is the time divided by 2 in the distance formula?",
    answer: "The time is divided by 2 because the ultrasonic pulse travels to the object and back, so the time measured is for the round-trip distance."
  },
  { 
    question: "How do you ensure accurate distance measurements with the ultrasonic sensor?",
    answer: "Ensure there is a clear line of sight to the object, and make sure the sensor is positioned perpendicular to the object to reduce errors."
  },
  { 
    question: "What happens if there are obstacles or interference in the sensor’s path?",
    answer: "Obstacles or interference may cause incorrect readings or inaccurate distance measurements."
  },
  { 
    question: "How can you use an ultrasonic sensor to create an object-detection system?",
    answer: "By continuously measuring the distance, you can trigger events when an object gets too close, such as activating an alarm or stopping a motor."
  },
  { 
    question: "Can you use multiple ultrasonic sensors on the same microcontroller?",
    answer: "Yes, but care must be taken to ensure that the sensors do not interfere with each other, especially if they are used in close proximity."
  },
  { 
    question: "How would you modify the program to display the distance on an LCD?",
    answer: "You would read the distance from the ultrasonic sensor and then use the lcd.print() function to display it on an LCD screen."
  },
  { 
    question: "What is ThingSpeak?",
    answer: "ThingSpeak is an IoT (Internet of Things) platform that allows users to collect, analyze, and visualize data from various sensors in real-time."
  },
  { 
    question: "How do you upload data to ThingSpeak using Arduino?",
    answer: "You use the ThingSpeak library, configure your Wi-Fi or Ethernet connection, and send data using the ThingSpeak.writeField() function."
  },
  { 
    question: "What is the role of the ThingSpeak API key?",
    answer: "The API key is used to authenticate your device and allow it to write data to a specific channel on ThingSpeak."
  },
  { 
    question: "How do you get the temperature and humidity readings from the DHT11 sensor in the program?",
    answer: "You use the DHT library to read temperature and humidity values from the sensor."
  },
  { 
    question: "What would you need to connect the Arduino to the internet for ThingSpeak?",
    answer: "You would need a Wi-Fi or Ethernet shield/module for the Arduino to connect to the internet."
  },
  { 
    question: "How does the ThingSpeak platform handle data over time?",
    answer: "ThingSpeak stores data in fields, which can be visualized as graphs or exported for further analysis."
  },
  { 
    question: "What is the function of the ThingSpeak.writeField() command?",
    answer: "This function sends the data to a specific field on your ThingSpeak channel, making it available for visualization."
  },
  { 
    question: "Can ThingSpeak handle multiple devices sending data at the same time?",
    answer: "Yes, ThingSpeak can handle multiple devices sending data, but there may be rate limits depending on your account type."
  },
  { 
    question: "What would happen if the API key or channel ID is incorrect?",
    answer: "If the API key or channel ID is incorrect, the data will not be uploaded, and you may receive an error message."
  },
  { 
    question: "How would you display the data on ThingSpeak after uploading it?",
    answer: "You would log into your ThingSpeak account, navigate to the channel, and view the uploaded data in real-time or historical charts."
  },
  { 
    question: "How do you retrieve data from ThingSpeak in your program?",
    answer: "You use the ThingSpeak API with the ThingSpeak.readField() function to read the data from a specific field on your ThingSpeak channel."
  },
  { 
    question: "What is the significance of the ThingSpeak channel ID in retrieving data?",
    answer: "The channel ID identifies the channel from which data is being retrieved."
  },
  { 
    question: "What would happen if you used the wrong channel ID or API key when retrieving data?",
    answer: "You would not be able to retrieve any data and may encounter an error."
  },
  { 
    question: "How can you display the retrieved data on an LCD screen or serial monitor?",
    answer: "After retrieving the data, you can use the Serial.print() function to display it on the serial monitor or the lcd.print() function to show it on an LCD."
  },
  { 
    question: "What is the data format when retrieving information from ThingSpeak?",
    answer: "The data is typically retrieved in JSON format, which can be parsed in the program to extract the values."
  },
  { 
    question: "How often can data be retrieved from ThingSpeak?",
    answer: "Depending on your ThingSpeak plan, you can retrieve data at regular intervals, usually every 15 seconds for free plans."
  },
  { 
    question: "What are the benefits of storing sensor data on ThingSpeak?",
    answer: "Storing data on ThingSpeak allows for remote monitoring, real-time data analysis, and visualization through graphs and charts."
  },
  { 
    question: "What happens if you exceed the rate limit for retrieving data from ThingSpeak?",
    answer: "If you exceed the rate limit, you may be temporarily blocked from making further requests."
  },
  { 
    question: "Can you use ThingSpeak to retrieve and analyze sensor data for long-term trends?",
    answer: "Yes, ThingSpeak provides tools to visualize historical data and track long-term trends through graphs."
  },
  { 
    question: "How do you ensure that your data retrieval requests are efficient and not overloaded?",
    answer: "You should implement proper error handling and request data at reasonable intervals to avoid overloading the server and ensure smooth operation."
  },
  { 
    question: "What is the Telegram API, and how is it used in this project?",
    answer: "The Telegram API allows you to send and receive messages, including controlling devices (like LEDs), via a Telegram bot."
  },
  { 
    question: "How do you set up a Telegram bot for controlling hardware like an LED?",
    answer: "You create a bot through the BotFather on Telegram, get the bot token, and use it in your Arduino/Raspberry Pi code to send commands and control devices."
  },
  { 
    question: "What is the role of the bot.sendMessage() function in the program?",
    answer: "The bot.sendMessage() function sends a message to the Telegram user, and you can use it to send commands to control the LED."
  },
  { 
    question: "How do you handle receiving commands from Telegram on Arduino or Raspberry Pi?",
    answer: "You use a Telegram bot library (like UniversalTelegramBot for Arduino) to listen for messages, interpret them, and trigger corresponding actions (like turning on/off an LED)."
  },
  { 
    question: "How do you connect your Arduino or Raspberry Pi to the internet to communicate with Telegram?",
    answer: "You need a Wi-Fi or Ethernet shield/module (for Arduino) or a network connection (for Raspberry Pi) to enable communication with Telegram servers."
  },
  { 
    question: "How does the Telegram bot authenticate and identify the user for security?",
    answer: "The bot uses the user’s unique Telegram ID to verify who is sending commands, ensuring that only authorized users can control the LED."
  },
  { 
    question: "How can you set up multiple commands to control different devices (like multiple LEDs) via Telegram?",
    answer: "You can define different commands (e.g., \"/led1\", \"/led2\") in the Telegram bot and check the messages to decide which devices to control."
  },
  { 
    question: "What would happen if the bot receives an incorrect command?",
    answer: "If the bot receives an unrecognized command, it could respond with a \"Command not recognized\" message, or simply do nothing, depending on your program’s design."
  },
  { 
    question: "How can you enhance the security of the Telegram-controlled system?",
    answer: "You can implement a password or user verification system within the bot or check the user’s Telegram ID to ensure only authorized access."
  }
];


  const container = document.getElementById('qa-container');

  vivaQuestions.forEach((item, index) => {
    const qaDiv = document.createElement('div');
    qaDiv.classList.add('qa');

    const questionEl = document.createElement('div');
    questionEl.classList.add('question');
    questionEl.textContent = `${index + 1}. ${item.question}`;

    const answerEl = document.createElement('div');
    answerEl.classList.add('answer');
    answerEl.textContent = `Answer: ${item.answer}`;

    qaDiv.appendChild(questionEl);
    qaDiv.appendChild(answerEl);
    container.appendChild(qaDiv);
  });
