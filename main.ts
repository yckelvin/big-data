input.onButtonPressed(Button.A, function () {
    index += 1
    if (index > 3) {
        index = 0
    }
    OLED.clear()
    OLED.writeStringNewLine(locations[index])
})
input.onButtonPressed(Button.B, function () {
    value = randint(22, 33)
    topic = "myhome/" + my_flat + "/" + locations[index] + "-temp"
    ESP8266_IoT.publishMqttMessage(convertToText(value), topic, ESP8266_IoT.QosList.Qos1)
    OLED.clear()
    OLED.writeString("Publish value: ")
    OLED.writeNumNewLine(value)
    OLED.writeStringNewLine("Topic:")
    OLED.writeString(topic)
})
let topic = ""
let value = 0
let locations: string[] = []
let index = 0
let my_flat = ""
basic.showNumber(0)
my_flat = "17C"
index += 0
locations = [
"hall",
"room-a",
"room-b",
"bedroom"
]
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("ssid", "password")
basic.showNumber(1)
let client_id = randint(0, 99999999)
ESP8266_IoT.setMQTT(
ESP8266_IoT.SchemeList.TCP,
convertToText(client_id),
"test",
"test",
""
)
ESP8266_IoT.connectMQTT("192.168.0.32", 1884, true)
basic.showNumber(2)
OLED.init(128, 64)
basic.showNumber(3)
basic.pause(2000)
if (ESP8266_IoT.isMqttBrokerConnected()) {
    basic.showIcon(IconNames.Yes)
}
OLED.writeStringNewLine("Button A:")
OLED.writeStringNewLine("Change location")
OLED.newLine()
OLED.writeStringNewLine("Button B:")
OLED.writeStringNewLine("Publish")
