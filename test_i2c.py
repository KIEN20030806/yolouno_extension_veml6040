i2c = machine.SoftI2C(scl=12, sda=11, freq=100000)
devices = i2c.scan()
print("Thiết bị I2C tìm thấy:", devices)
