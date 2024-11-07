import machine, time
from micropython import const
from math import exp, isnan
from utility import say
#from setting import *

_VEML6040_I2C_ADDRESS    = const(0x10)

# REGISTER CONF (00H) SETTINGS

_VEML6040_IT_40MS        = const(0x00)
_VEML6040_IT_80MS        = const(0x10)
_VEML6040_IT_160MS       = const(0x20)
_VEML6040_IT_320MS       = const(0x30)
_VEML6040_IT_640MS       = const(0x40)

_VEML6040_IT_1280MS      = const(0x50)

_VEML6040_TRIG_DISABLE   = const(0x00)
_VEML6040_TRIG_ENABLE    = const(0x04)

_VEML6040_AF_AUTO        = const(0x00)
_VEML6040_AF_FORCE       = const(0x02)

_VEML6040_SD_ENABLE      = const(0x00)
_VEML6040_SD_DISABLE     = const(0x01)

#COMMAND CODES

_COMMAND_CODE_CONF       = const(0x00)
_COMMAND_CODE_RED        = const(0x08)
_COMMAND_CODE_GREEN      = const(0x09)
_COMMAND_CODE_BLUE       = const(0x0A)
_COMMAND_CODE_WHITE      = const(0x0B)

#G SENSITIVITY

_VEML6040_GSENS_40MS     = 0.25168
_VEML6040_GSENS_80MS     = 0.12584
_VEML6040_GSENS_160MS    = 0.06292
_VEML6040_GSENS_320MS    = 0.03146
_VEML6040_GSENS_640MS    = 0.01573
_VEML6040_GSENS_1280MS   = 0.007865

#chuyển đổi màu RGB thành màu HSV(ánh sáng, độ băo hoa, độ sáng)
def rgb2hsv(r, g, b):
    r = float(r/65535)
    g = float(g/65535)
    b = float(b/65535)
    high = max(r, g, b)
    low = min(r, g, b)
    h,s,v = high,high,high
    d = high - low
    s = 0 if high == 0 else d/high
    if high == low:
        h = 0.0
    else:
        h = {
            r: (g - b) / d+(6 if g < b else 0),
            g: (b - r) / d+2,
            b: (r - g) / d+4,
        }[high]
        h /= 6
    return {'hue':h*360,'sat':s, 'val':v}

class ColorSensorVEML6040:
    #hàm khởi tạo cho lớp cảm biến
    def __init__(self, address=_VEML6040_I2C_ADDRESS):
        self._i2c = machine.SoftI2C(scl=12, sda=11, freq=100000)
        self._addr = address
        self._config = 0

        if self._i2c.scan().count(address) == 0:
            raise Exception('Color sensor VEML6040 not found')

        self.config(_VEML6040_IT_160MS + _VEML6040_AF_AUTO + _VEML6040_SD_ENABLE)
    #cấu hinh cam bien
    def config(self, config):
        self._i2c.writeto(self._addr, bytes([_COMMAND_CODE_CONF, config, 0]))
        self._config = config
    #đọc dữ liệu từ cảm biến
    def read(self, commandCode):
        self._i2c.writeto(self._addr, bytes([commandCode]))
        data = self._i2c.readfrom(self._addr, 2)
        data = data[0] + (data[1]<<8)
        return data
    #trả về 3 màu đỏ xanh xanh trắng
    def get_red(self):
        return self.read(_COMMAND_CODE_RED)

    def get_green(self):
        return self.read(_COMMAND_CODE_GREEN)
    
    def get_blue(self):
        return self.read(_COMMAND_CODE_BLUE)
    
    def get_white(self):
        return self.read(_COMMAND_CODE_WHITE)
    #hàm tính toán độ sáng
    def get_lux(self):
        sensorValue = self.read(_COMMAND_CODE_GREEN)
    
        if self._config & 0x70 == _VEML6040_IT_40MS:
            ambientLightInLux = sensorValue * _VEML6040_GSENS_40MS
        elif self._config & 0x70 == _VEML6040_IT_80MS:
            ambientLightInLux = sensorValue * _VEML6040_GSENS_80MS
        elif self._config & 0x70 == _VEML6040_IT_160MS:
                ambientLightInLux = sensorValue * _VEML6040_GSENS_160MS
        elif self._config & 0x70 == _VEML6040_IT_320MS:
                ambientLightInLux = sensorValue * _VEML6040_GSENS_320MS
        elif self._config & 0x70 == _VEML6040_IT_640MS:
                ambientLightInLux = sensorValue * _VEML6040_GSENS_640MS
        elif self._config & 0x70 == _VEML6040_IT_1280MS:
                ambientLightInLux = sensorValue * _VEML6040_GSENS_1280MS
        else:
            ambientLightInLux = -1
        return int(ambientLightInLux)
    #hàm tính toán nhiệt độ
    def get_cct(self, offset):
        red = self.get_red()
        green = self.get_green()
        blue = self.get_blue()

        ccti = (float(red) - float(blue)) / float(green)
        ccti = ccti + offset
        cct = 4278.6 * pow(ccti, -1.2455)

        return cct
    #phân loại màu dựa trên giá trị hue	
    def classify_hue(self, hues={"red":0,"yellow":60,"green":120,"cyan":180,"blue":240,"magenta":300}, min_brightness=0):
        d = self.readHSV()
        if d['val'] > min_brightness:
            key, val = min(hues.items(), key=lambda x: min(360-abs(d['hue'] - x[1]),abs(d['hue'] - x[1]))) # nearest neighbour, but it wraps!
            return key
        else:
            return None
    
    # Read colours from VEML6040
    # Returns raw red, green and blue readings, ambient light [Lux] and colour temperature [K]
    
    #đọc và trả về giá trị RGB cùng với ánh sáng và nhiệt độ màu	
    def readRGB(self):
        red = self.get_red()
        green = self.get_green()
        blue = self.get_blue()
        white = self.get_white()
            
        # Generate the XYZ matrix based on https://www.vishay.com/docs/84331/designingveml6040.pdf
        colour_X = (-0.023249*red)+(0.291014*green)+(-0.364880*blue)
        colour_Y = (-0.042799*red)+(0.272148*green)+(-0.279591*blue)
        colour_Z = (-0.155901*red)+(0.251534*green)+(-0.076240*blue)
        colour_total = colour_X+colour_Y+colour_Z
        if colour_total == 0:
            return {"red":None,"green":None,"blue":None,"white":None,"als":None,"cct":None}
        else:
            colour_x = colour_X / colour_total
            colour_y = colour_Y / colour_total
        
        # Use McCamy formula
        colour_n = (colour_x - 0.3320)/(0.1858 - colour_y)
        colour_CCT = 449.0*colour_n ** 3+3525.0*colour_n ** 2+6823.3*colour_n+5520.33
        
        # Calculate ambient light in Lux
        colour_ALS = green*(self._config&0x70)
        return {"red":red,"green":green,"blue":blue,"white":white,"als":colour_ALS,"cct":colour_CCT}
    #hàm đọc giá trị RGB và chuyển chúng sang màu HSV
    def readHSV(self):
        d = self.readRGB()
        return rgb2hsv(d['red'],d['green'],d['blue'])


color_sensor = ColorSensorVEML6040()

 
