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

// Blockly.Python['color_sensor_read_color'] = function(block) {
//   var color = block.getFieldValue('COLOR');
//   var code = 'color_sensor.get_' + color + '()';
//   return [code, Blockly.Python.ORDER_ATOMIC];
// };
Blockly.Python['color_sensor_read_color'] = function(block) {
  Blockly.Python.definitions_['import_color_sensor'] = 'from color_sensor import ColorSensorVEML6040';
  
  var color = block.getFieldValue('COLOR');
  var code = '';

  if (color === 'LUX') {
    code = 'color_sensor.get_lux()';
  } else if (color === 'CCT') {
    code = 'color_sensor.get_cct()';
  } else {
    code = 'color_sensor.get_' + color.toLowerCase() + '()';
  }

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['color_sensor_detect_color'] = function(block) {
  Blockly.Python.definitions_['import_color_sensor'] = 'from color_sensor import ColorSensorVEML6040';
  
  var detectColor = block.getFieldValue('DETECT_COLOR');
  var code = '(color_sensor.classify_hue(hues={"red":0,"yellow":60,"green":120,"cyan":180,"blue":240,"magenta":300}) == "' + detectColor + '")';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['color_sensor_read_lux'] = function(block) {
  Blockly.Python.definitions_['import_color_sensor'] = 'from color_sensor import ColorSensorVEML6040';
  
  var code = 'color_sensor.get_lux()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['color_sensor_read_cct'] = function(block) {
  Blockly.Python.definitions_['import_color_sensor'] = 'from color_sensor import ColorSensorVEML6040';
  
  var code = 'color_sensor.get_cct()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


// Thêm import thư viện ColorSensorVEML6040
Blockly.Python.definitions_['import_color_sensor'] = 'from color_sensor import ColorSensorVEML6040';
