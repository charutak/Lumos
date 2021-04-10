#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

char auth[] = "_TvVqbGysyND1Wox68aT_scTR50YCl3W";
char ssid[] = "hyrule";
char pass[] = "adventuretime";

// initialize constants
int red = 0;
int green = 0;
int blue = 0;

const int REDPIN = 4;
const int GREENPIN = 5;
const int BLUEPIN = 0;

#define ON 255
#define OFF 0

int onoff = ON; // variable for lamp's power button
int rbow = OFF; // variable for mood buttons


/////////////////////////w///////////////////

// V0 - Power ON/OFF
// V1 - Slider R
// V2 - Slider G
// V3 - Slider B
// V4 - Mood Color 1
// V5 - Mood Color 2
// V6 - Mood Color 3

/////////////////////////////////////////////

void SetRGB(int r, int g, int b) {
  red = r;
  green = g;
  blue = b;
}

void SetSliders() {
    Blynk.virtualWrite(V1, 1023 - red); 
    Blynk.virtualWrite(V2, 1023 - green);
    Blynk.virtualWrite(V3, 1023 - blue);
}

void SetMood1() {
  SetRGB(0,1023, 1023);
  SetSliders();
}

void SetMood2() {
  SetRGB(1023, 0, 1023);
  SetSliders();
}

void SetMood3() {
  SetRGB(1023, 1023, 0);
  SetSliders();
}

void SetColorBlack() {
  SetRGB(1023, 1023, 1023);  
}

void SetColorWhite() {
  SetRGB(0, 0, 0);
}


BLYNK_WRITE(V0) { // V0 = power button control 
  onoff = param.asInt(); 
  if(onoff == LOW) { // want to turn lamp off 
    Blynk.virtualWrite(V4,LOW); // turn off all other buttons if applicable
    Blynk.virtualWrite(V5,LOW);
    Blynk.virtualWrite(V6,LOW);

    SetColorBlack();
    SetSliders();
  }
  else { // turn lamps on
    Blynk.virtualWrite(V4,LOW); // turn off all buttons if applicable
    Blynk.virtualWrite(V5,LOW);
    Blynk.virtualWrite(V6,LOW);

    SetColorWhite();
    SetSliders();
  }
}

BLYNK_WRITE(V1) { // red slider was changed
  if (onoff == HIGH) { // only change if lamp is on
    red = 1023 - param.asInt(); 
  }
  else { // if lamp is not on, change slider back to 0
    red = 0;
    Blynk.virtualWrite(V1,red);
  }
}

BLYNK_WRITE(V2) { // green slider was changed 
  if (onoff == HIGH) { 
    green = 1023 - param.asInt();
  }
  else { 
    green = 0;
    Blynk.virtualWrite(V2,green);
  }
}

BLYNK_WRITE(V3) { // blue slider was changed 
  if (onoff == HIGH) { 
    blue = 1023 - param.asInt();
  }
  else { 
    blue = 0;
    Blynk.virtualWrite(V3,blue);
  }
}

BLYNK_WRITE(V4) { // mood 1
  rbow = param.asInt(); 
  if (onoff == HIGH) { 
    if (rbow == HIGH) { 
      Serial.print(rbow);
      Blynk.virtualWrite(V5,OFF); 
      Blynk.virtualWrite(V6,OFF);
      SetMood1();
    }
  }
  else if (onoff == LOW) { 
    Blynk.virtualWrite(V4,OFF);
  }
}

BLYNK_WRITE(V5) 
{
  rbow = param.asInt(); 
  if (onoff == HIGH) {
    if (rbow == HIGH) {
      Serial.print(rbow);
      Blynk.virtualWrite(V4,OFF);
      Blynk.virtualWrite(V6,OFF);
      SetMood2();
    }
  }
  else if (onoff == LOW) {
    Blynk.virtualWrite(V5,OFF);
  }
}

BLYNK_WRITE(V6) 
{
  rbow = param.asInt(); 
  if (onoff == HIGH) {
    if (rbow == HIGH) {
      Serial.print(rbow);
      Blynk.virtualWrite(V4,OFF);
      Blynk.virtualWrite(V5,OFF);
      SetMood3();
    }
  }
  else if (onoff == LOW) {
      Blynk.virtualWrite(V6,OFF);
  }
}

void setup() {
  Serial.begin(9600); 
  SetColorWhite();

  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);

  Blynk.begin(auth, ssid, pass);
  
}

void loop() {
  Blynk.run(); 
  analogWrite(REDPIN, red);
  analogWrite(GREENPIN, green);
  analogWrite(BLUEPIN, blue);  
}

