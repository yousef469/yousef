// Section 4: Communication Systems - 6 Lessons (2 units × 3 lessons)

export const section4Communication = {
  id: 'communication',
  title: 'Section 4: Communication Systems',
  description: 'Wireless, networking, and protocols',
  icon: '📶',
  color: 'from-cyan-500 to-blue-500',
  units: [
    {
      id: 'wireless',
      title: 'Wireless Communication',
      description: 'RF, WiFi, and Bluetooth',
      lessons: [
        {
          id: 'rf-basics',
          title: 'RF Communication Basics',
          duration: '25 min', xp: 150,
          description: 'Radio frequency fundamentals',
          introduction: 'Radio frequency communication enables wireless data transfer. Understanding RF basics is essential for IoT projects.',
          sections: [
            { title: 'RF Fundamentals', content: "**Frequency Bands:**\n- 433 MHz: Simple remotes\n- 915 MHz: LoRa (Americas)\n- 868 MHz: LoRa (Europe)\n- 2.4 GHz: WiFi, Bluetooth\n\n**Wavelength:**\nλ = c/f\n2.4 GHz → 12.5 cm\n\n**Antenna Length:**\nQuarter wave: λ/4" },
            { title: 'Modulation', content: "**ASK (Amplitude Shift Keying):**\nSimple, noise sensitive\n\n**FSK (Frequency Shift Keying):**\nBetter noise immunity\n\n**Spread Spectrum:**\n- FHSS: Frequency hopping\n- DSSS: Direct sequence\n- Better interference rejection" },
            { title: 'Simple RF Modules', content: "**433 MHz Modules:**\n- TX/RX pair\n- ASK modulation\n- ~100m range\n\n**nRF24L01:**\n- 2.4 GHz\n- SPI interface\n- 250kbps - 2Mbps\n- ~100m range\n\n**Libraries:**\nRadioHead, RF24" }
          ],
          keyTakeaways: ['Frequency determines range and penetration', 'Modulation affects noise immunity', 'nRF24L01 good for short range', 'Antenna design affects performance'],
          quiz: { questions: [
            { id: 'q1', question: 'WiFi frequency:', options: ['433 MHz', '915 MHz', '2.4 GHz', '5 MHz'], correctAnswer: 2, explanation: 'WiFi operates at 2.4 GHz (and 5 GHz).' },
            { id: 'q2', question: 'Quarter wave antenna for 2.4 GHz:', options: ['~3 cm', '~12 cm', '~30 cm', '~1 m'], correctAnswer: 0, explanation: 'λ/4 = 12.5cm/4 ≈ 3 cm' },
            { id: 'q3', question: 'nRF24L01 interface:', options: ['I2C', 'UART', 'SPI', 'USB'], correctAnswer: 2, explanation: 'nRF24L01 uses SPI interface.' }
          ]}
        },
        {
          id: 'wifi-iot',
          title: 'WiFi & IoT',
          duration: '30 min', xp: 175,
          description: 'ESP32/ESP8266 and cloud connectivity',
          introduction: 'WiFi enables internet connectivity for IoT devices. ESP32/ESP8266 make WiFi projects accessible.',
          sections: [
            { title: 'ESP32/ESP8266', content: "**ESP8266:**\n- Single core, 80 MHz\n- WiFi only\n- Limited GPIO\n\n**ESP32:**\n- Dual core, 240 MHz\n- WiFi + Bluetooth\n- More GPIO, ADC channels\n\n**Programming:**\n- Arduino IDE\n- ESP-IDF\n- MicroPython" },
            { title: 'WiFi Modes', content: "**Station Mode:**\nConnect to existing network\n```\nWiFi.begin(ssid, password);\nwhile (WiFi.status() != WL_CONNECTED) {\n  delay(500);\n}\n```\n\n**Access Point Mode:**\nCreate own network\n```\nWiFi.softAP(ssid, password);\n```" },
            { title: 'IoT Protocols', content: "**HTTP:**\n- Request/response\n- REST APIs\n- Higher overhead\n\n**MQTT:**\n- Publish/subscribe\n- Lightweight\n- Ideal for IoT\n\n**WebSocket:**\n- Bidirectional\n- Real-time updates\n- Lower latency than HTTP" }
          ],
          keyTakeaways: ['ESP32 adds Bluetooth to ESP8266', 'Station mode joins networks', 'MQTT ideal for IoT', 'Choose protocol based on needs'],
          quiz: { questions: [
            { id: 'q1', question: 'ESP32 vs ESP8266:', options: ['Same features', 'ESP32 adds Bluetooth', 'ESP8266 is faster', 'ESP32 is WiFi only'], correctAnswer: 1, explanation: 'ESP32 adds Bluetooth and dual-core processor.' },
            { id: 'q2', question: 'MQTT pattern:', options: ['Request/response', 'Publish/subscribe', 'Peer-to-peer', 'Broadcast'], correctAnswer: 1, explanation: 'MQTT uses publish/subscribe pattern.' },
            { id: 'q3', question: 'softAP creates:', options: ['Client connection', 'Access point', 'Mesh network', 'VPN'], correctAnswer: 1, explanation: 'softAP creates a WiFi access point.' }
          ]}
        },
        {
          id: 'bluetooth',
          title: 'Bluetooth & BLE',
          duration: '25 min', xp: 150,
          description: 'Classic Bluetooth and Low Energy',
          introduction: 'Bluetooth enables short-range wireless communication. BLE is optimized for battery-powered devices.',
          sections: [
            { title: 'Bluetooth Classic', content: "**Characteristics:**\n- 2.4 GHz\n- ~100m range\n- Higher power\n- Audio streaming (A2DP)\n\n**Profiles:**\n- SPP: Serial Port\n- HID: Keyboards, mice\n- A2DP: Audio" },
            { title: 'BLE (Bluetooth Low Energy)', content: "**Advantages:**\n- Very low power\n- Coin cell battery life\n- Fast connection\n\n**GATT:**\n- Services and Characteristics\n- Read, Write, Notify\n\n**Advertising:**\n- Beacon mode\n- No connection needed" },
            { title: 'ESP32 Bluetooth', content: "**Classic BT:**\n```\n#include \"BluetoothSerial.h\"\nBluetoothSerial SerialBT;\nSerialBT.begin(\"ESP32\");\n```\n\n**BLE:**\n```\n#include <BLEDevice.h>\nBLEDevice::init(\"ESP32\");\n// Create server, service, characteristic\n```" }
          ],
          keyTakeaways: ['BLE for low power applications', 'Classic BT for audio streaming', 'GATT defines BLE data structure', 'ESP32 supports both types'],
          quiz: { questions: [
            { id: 'q1', question: 'BLE advantage:', options: ['Longer range', 'Lower power', 'Higher speed', 'Better audio'], correctAnswer: 1, explanation: 'BLE is optimized for low power consumption.' },
            { id: 'q2', question: 'GATT is:', options: ['Audio protocol', 'Data structure for BLE', 'Encryption method', 'Antenna type'], correctAnswer: 1, explanation: 'GATT defines services and characteristics for BLE.' },
            { id: 'q3', question: 'A2DP is for:', options: ['Data transfer', 'Audio streaming', 'File sharing', 'Mesh networking'], correctAnswer: 1, explanation: 'A2DP is the Bluetooth audio streaming profile.' }
          ]}
        }
      ]
    },
    {
      id: 'protocols',
      title: 'Communication Protocols',
      description: 'Industrial and long-range protocols',
      lessons: [
        {
          id: 'lora',
          title: 'LoRa & Long Range',
          duration: '25 min', xp: 150,
          description: 'Kilometers of wireless range',
          introduction: 'LoRa enables long-range, low-power communication. Ideal for remote sensors and IoT.',
          sections: [
            { title: 'LoRa Technology', content: "**Characteristics:**\n- 10+ km range (rural)\n- Very low power\n- Low data rate (0.3-50 kbps)\n- Sub-GHz frequencies\n\n**Spread Spectrum:**\n- Chirp modulation\n- Below noise floor\n- Interference resistant" },
            { title: 'LoRaWAN', content: "**Network Architecture:**\n- End devices\n- Gateways\n- Network server\n- Application server\n\n**Classes:**\n- Class A: Lowest power\n- Class B: Scheduled receive\n- Class C: Always listening" },
            { title: 'LoRa Modules', content: "**SX1276/SX1278:**\n- Raw LoRa chip\n- Full control\n\n**RFM95/96:**\n- Module with SX127x\n- Easy to use\n\n**TTGO/Heltec:**\n- ESP32 + LoRa\n- Built-in display\n- Ready to use" }
          ],
          keyTakeaways: ['LoRa: long range, low power, low data rate', 'LoRaWAN adds network infrastructure', 'Class A is most power efficient', 'Great for remote sensors'],
          quiz: { questions: [
            { id: 'q1', question: 'LoRa typical range:', options: ['10m', '100m', '1km', '10+ km'], correctAnswer: 3, explanation: 'LoRa can achieve 10+ km in rural areas.' },
            { id: 'q2', question: 'LoRaWAN Class A:', options: ['Always listening', 'Scheduled receive', 'Lowest power', 'Highest speed'], correctAnswer: 2, explanation: 'Class A is the lowest power mode.' },
            { id: 'q3', question: 'LoRa data rate:', options: ['1 Mbps', '100 kbps', '0.3-50 kbps', '10 Mbps'], correctAnswer: 2, explanation: 'LoRa has low data rates: 0.3-50 kbps.' }
          ]}
        },
        {
          id: 'can-bus',
          title: 'CAN Bus',
          duration: '30 min', xp: 175,
          description: 'Automotive and industrial networking',
          introduction: 'CAN bus is the standard for automotive and industrial communication. Robust and reliable.',
          sections: [
            { title: 'CAN Basics', content: "**Characteristics:**\n- Differential signaling\n- Multi-master\n- Priority-based arbitration\n- Error detection\n\n**Speeds:**\n- Low speed: 125 kbps\n- High speed: 1 Mbps\n- CAN FD: 8 Mbps" },
            { title: 'CAN Frame', content: "**Standard Frame:**\n- 11-bit identifier\n- 0-8 data bytes\n- CRC check\n\n**Extended Frame:**\n- 29-bit identifier\n- Same data length\n\n**Arbitration:**\nLower ID = higher priority\nNon-destructive" },
            { title: 'CAN Hardware', content: "**MCP2515:**\n- SPI CAN controller\n- Works with any MCU\n\n**MCP2551:**\n- CAN transceiver\n- Converts logic to differential\n\n**Termination:**\n120Ω at each end of bus" }
          ],
          keyTakeaways: ['CAN is robust and reliable', 'Lower ID = higher priority', 'Differential signaling rejects noise', 'Requires termination resistors'],
          quiz: { questions: [
            { id: 'q1', question: 'CAN bus termination:', options: ['50Ω', '75Ω', '120Ω', '1kΩ'], correctAnswer: 2, explanation: 'CAN bus requires 120Ω termination at each end.' },
            { id: 'q2', question: 'CAN arbitration priority:', options: ['Higher ID wins', 'Lower ID wins', 'Random', 'First come first served'], correctAnswer: 1, explanation: 'Lower identifier = higher priority in CAN arbitration.' },
            { id: 'q3', question: 'Standard CAN ID bits:', options: ['8', '11', '16', '29'], correctAnswer: 1, explanation: 'Standard CAN uses 11-bit identifiers.' }
          ]}
        },
        {
          id: 'modbus',
          title: 'Modbus & Industrial',
          duration: '25 min', xp: 150,
          description: 'Industrial automation protocols',
          introduction: 'Modbus is the most common industrial protocol. Simple and widely supported.',
          sections: [
            { title: 'Modbus Basics', content: "**Master/Slave:**\n- Master initiates\n- Slaves respond\n- Up to 247 slaves\n\n**Data Types:**\n- Coils (bits, R/W)\n- Discrete inputs (bits, RO)\n- Holding registers (16-bit, R/W)\n- Input registers (16-bit, RO)" },
            { title: 'Modbus Variants', content: "**Modbus RTU:**\n- Serial (RS-485)\n- Binary format\n- CRC error check\n\n**Modbus ASCII:**\n- Serial\n- Human readable\n- LRC error check\n\n**Modbus TCP:**\n- Ethernet\n- Port 502\n- No error check (TCP handles)" },
            { title: 'RS-485', content: "**Characteristics:**\n- Differential signaling\n- Up to 1200m\n- Multi-drop (32 devices)\n\n**Wiring:**\n- A (D-), B (D+)\n- Twisted pair\n- Termination at ends\n\n**Converters:**\nMAX485, SP485" }
          ],
          keyTakeaways: ['Modbus is simple master/slave', 'RTU is most common variant', 'RS-485 for long distance', 'TCP for Ethernet networks'],
          quiz: { questions: [
            { id: 'q1', question: 'Modbus max slaves:', options: ['32', '127', '247', '255'], correctAnswer: 2, explanation: 'Modbus supports up to 247 slave devices.' },
            { id: 'q2', question: 'Modbus TCP port:', options: ['80', '443', '502', '8080'], correctAnswer: 2, explanation: 'Modbus TCP uses port 502.' },
            { id: 'q3', question: 'RS-485 max distance:', options: ['15m', '100m', '500m', '1200m'], correctAnswer: 3, explanation: 'RS-485 can reach up to 1200m.' }
          ]}
        }
      ]
    }
  ]
};

export default section4Communication;
