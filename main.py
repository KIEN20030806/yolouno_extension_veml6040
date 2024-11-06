from machine import Pin
import time
from veml6040 import *
from color_sensor import *


# Khởi tạo đèn LED trên chân D13
led = Pin(13, Pin.OUT)

# Bật đèn LED
led.on()  # Hoặc led.value(1)

# Giữ đèn LED sáng trong 5 giây
time.sleep(5)


