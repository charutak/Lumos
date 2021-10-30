#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <string.h>

const char* wifiName = "Azkaban";
const char* wifiPass = "voldemort";

const char* mqtt_server = "139.59.11.198";

const int  R_PIN  = 4;
const int  G_PIN  = 0;
const int  B_PIN  = 5;


WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(wifiName);

  WiFi.begin(wifiName, wifiPass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();


  if(strcmp(topic,"red") == 0) 
  {
    payload[length] = '\0'; // Make payload a string by NULL terminating it.
    int payloadValue = atoi((char *)payload);  // Turn the LED off by making the voltage HIGH
    Serial.print("Red With");
    Serial.println(payloadValue);
    digitalWrite(R_PIN, payloadValue);
  }

  if (strcmp(topic, "green") == 0) {
    payload[length] = '\0'; // Make payload a string by NULL terminating it.
    int payloadValue = atoi((char *)payload);  // Turn the LED off by making the voltage HIGH
    Serial.print("Green With");
    Serial.println(payloadValue);
    digitalWrite(G_PIN, payloadValue); }

  if(strcmp(topic, "blue") == 0) {
    payload[length] = '\0'; // Make payload a string by NULL terminating it.
    int payloadValue = atoi((char *)payload);  // Turn the LED off by making the voltage HIGH
    Serial.print("Blue With");
    Serial.println(payloadValue);
    digitalWrite(B_PIN, payloadValue);
  }

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }



}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe("red");
      client.subscribe("green");
      client.subscribe("blue");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);  
  
  pinMode(R_PIN, OUTPUT);
  pinMode(G_PIN, OUTPUT);
  pinMode(B_PIN, OUTPUT);
  
  Serial.begin(9600);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

