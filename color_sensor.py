def color_sensor_init():
    color_sensor = ColorSensorVEML6040()
    return color_sensor

def color_sensor_get_red(color_sensor):
    return color_sensor.get_red()

def color_sensor_get_green(color_sensor):
    return color_sensor.get_green()

def color_sensor_get_blue(color_sensor):
    return color_sensor.get_blue()

def color_sensor_get_lux(color_sensor):
    return color_sensor.get_lux()

def color_sensor_get_cct(color_sensor, offset):
    return color_sensor.get_cct(offset)

def color_sensor_read_hsv(color_sensor):
    return color_sensor.readHSV()
