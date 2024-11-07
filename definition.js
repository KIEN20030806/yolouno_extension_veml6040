// Khối đọc giá trị màu sắc RGB
Blockly.Blocks['color_sensor_read_color'] = {
  init: function() {
    this.jsonInit({
      "type": "color_sensor_read_color",
      "message0": "cảm biến màu sắc đọc giá trị %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "COLOR",
          "options": [
            ["đỏ", "RED"],
            ["xanh lá", "GREEN"],
            ["xanh dương", "BLUE"],
            ["độ rọi màu", "LUX"],
            ["nhiệt độ màu", "CCT"]
          ]
        }
      ],
      "output": "Number",
      "colour": "#ae00ae",
      "tooltip": "Đọc giá trị màu sắc RGB từ cảm biến",
      "helpUrl": ""
    });
  }
};

Blockly.Python['color_sensor_read_color'] = function(block) {
  var color = block.getFieldValue('COLOR');
  var code = '';

  // Tạo mã lệnh phù hợp tùy vào lựa chọn của người dùng
  if (color === 'LUX') {
    code = 'color_sensor.get_lux()';
  } else if (color === 'CCT') {
    code = 'color_sensor.get_cct()';
  } else {
    code = 'color_sensor.get_' + color.toLowerCase() + '()';
  }

  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Khối phát hiện màu sắc
Blockly.Blocks['color_sensor_detect_color'] = {
  init: function() {
    this.jsonInit({
      "type": "color_sensor_detect_color",
      "message0": "cảm biến màu sắc phát hiện màu %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DETECT_COLOR",
          "options": [
            ["trắng", "white"],
            ["đen", "black"],
            ["đỏ", "red"],
            ["xanh lá", "green"],
            ["xanh dương", "blue"],
            ["vàng", "yellow"]
          ]
        }
      ],
      "output": "Boolean",
      "colour": "#ae00ae",
      "tooltip": "Phát hiện màu sắc cụ thể",
      "helpUrl": ""
    });
  }
};

Blockly.Python['color_sensor_detect_color'] = function(block) {
  var detectColor = block.getFieldValue('DETECT_COLOR');
  var code = '(color_sensor.classify_hue(hues={"red":0,"yellow":60,"green":120,"cyan":180,"blue":240,"magenta":300}) == "' + detectColor + '")';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Khối đọc giá trị độ rọi màu (Lux)
Blockly.Blocks['color_sensor_read_lux'] = {
  init: function() {
    this.jsonInit({
      "type": "color_sensor_read_lux",
      "message0": "cảm biến màu sắc đọc giá trị độ rọi màu",
      "output": "Number",
      "colour": "#ae00ae",
      "tooltip": "Đọc giá trị độ rọi màu",
      "helpUrl": ""
    });
  }
};

Blockly.Python['color_sensor_read_lux'] = function(block) {
  var code = 'color_sensor.get_lux()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Khối đọc giá trị nhiệt độ màu (CCT)
Blockly.Blocks['color_sensor_read_cct'] = {
  init: function() {
    this.jsonInit({
      "type": "color_sensor_read_cct",
      "message0": "cảm biến màu sắc đọc giá trị nhiệt độ màu",
      "output": "Number",
      "colour": "#ae00ae",
      "tooltip": "Đọc giá trị nhiệt độ màu (CCT)",
      "helpUrl": ""
    });
  }
};

Blockly.Python['color_sensor_read_cct'] = function(block) {
  var code = 'color_sensor.get_cct()'; // offset có thể được điều chỉnh
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Thêm import thư viện ColorSensorVEML6040
Blockly.Python.definitions_['import_color_sensor'] = 'from color_sensor import ColorSensorVEML6040';
