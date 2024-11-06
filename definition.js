// const TCS34725ColorBlock = "#ae00ae";

// Blockly.Blocks["uno_tcs34725_read"] = {
//   init: function () {
//     this.jsonInit({
//       colour: TCS34725ColorBlock,
//       tooltip: "",
//       message0: "cảm biến màu sắc đọc giá trị %1",
//       args0: [
//         {
//           type: "field_dropdown",
//           name: "RGB",
//           options: [
//             ["RED", "r"],
//             ["GREEN", "g"],
//             ["BLUE", "b"],
//           ],
//         }
//       ],
//       output: "Number",
//       helpUrl: "",
//     });
//   },
// };

// Blockly.Blocks["uno_tcs34725_detect"] = {
//   init: function () {
//     this.jsonInit({
//       colour: TCS34725ColorBlock,
//       tooltip: "",
//       message0: "cảm biến màu sắc phát hiện màu %1",
//       args0: [
//         {
//           type: "field_dropdown",
//           name: "color",
//           options: [
//             ["trắng", "w"],
//             ["đen", "d"],
//             ["đỏ", "r"],
//             ["xanh lá (green)", "g"],
//             ["xanh dương (blue)", "b"],
//             ["vàng", "y"]
//           ],
//         }
//       ],
//       output: "Boolean",
//       helpUrl: "",
//     });
//   },
// };

// Blockly.Blocks["uno_tcs34725_read_lux"] = {
//   init: function () {
//     this.jsonInit({
//       colour: TCS34725ColorBlock,
//       tooltip: "",
//       message0: "cảm biến màu sắc đọc giá trị ánh sáng",
//       name: "LUX",
//       output: "Number",
//       helpUrl: "",
//     });
//   },
// };

// Blockly.Blocks["uno_tcs34725_read_cct"] = {
//   init: function () {
//     this.jsonInit({
//       colour: TCS34725ColorBlock,
//       tooltip: "",
//       message0: "cảm biến màu sắc đọc giá trị nhiệt độ",
//       name: "CCT",
//       output: "Number",
//       helpUrl: "",
//     });
//   },
// };

// Blockly.Python["uno_tcs34725_read"] = function (block) {
//   var RGB = block.getFieldValue("RGB");
//   // TODO: Assemble Python into code variable.
//   Blockly.Python.definitions_['import_tcs34725'] = 'from tcs34725 import *';
//   Blockly.Python.definitions_['init_tcs34725'] = 'tcs34725 = ColorSensorVEML6040()';
//   var code = "tcs34725.read_color('" + RGB + "')";
//   return [code, Blockly.Python.ORDER_NONE];
// };

// Blockly.Python["uno_tcs34725_detect"] = function (block) {
//   var color = block.getFieldValue("color");
//   // TODO: Assemble Python into code variable.
//   Blockly.Python.definitions_['import_tcs34725'] = 'from tcs34725 import *';
//   Blockly.Python.definitions_['init_tcs34725'] = 'tcs34725 = ColorSensorVEML6040()';
//   var code = "tcs34725.detect('" + color + "')";
//   return [code, Blockly.Python.ORDER_NONE];
// };

// Blockly.Python["uno_tcs34725_read_lux"] = function (block) {
//   var LUX = block.getFieldValue("LUX");
//   // TODO: Assemble Python into code variable.
//   Blockly.Python.definitions_['import_tcs34725'] = 'from tcs34725 import *';
//   Blockly.Python.definitions_['init_tcs34725'] = 'tcs34725 = ColorSensorVEML6040()';
//   var code = "tcs34725.get_lux('" + LUX + "')";
//   return [code, Blockly.Python.ORDER_NONE];
// };

// Blockly.Python["uno_tcs34725_read_cct"] = function (block) {
//   var CCT = block.getFieldValue("CCT");
//   // TODO: Assemble Python into code variable.
//   Blockly.Python.definitions_['import_tcs34725'] = 'from tcs34725 import *';
//   Blockly.Python.definitions_['init_tcs34725'] = 'tcs34725 = ColorSensorVEML6040()';
//   var code = "tcs34725.get_cct('" + CCT + "')";
//   return [code, Blockly.Python.ORDER_NONE];
// };


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
            ["Đỏ", "red"],
            ["Xanh lá", "green"],
            ["Xanh dương", "blue"]
          ]
        }
      ],
      "output": "Number",
      "colour": "#ff5733",
      "tooltip": "Đọc giá trị màu sắc RGB từ cảm biến",
      "helpUrl": ""
    });
  }
};

Blockly.Python['color_sensor_read_color'] = function(block) {
  var color = block.getFieldValue('COLOR');
  var code = 'color_sensor.get_' + color + '()';
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
            ["Trắng", "white"],
            ["Đen", "black"],
            ["Đỏ", "red"],
            ["Xanh lá", "green"],
            ["Xanh dương", "blue"],
            ["Vàng", "yellow"]
          ]
        }
      ],
      "output": "Boolean",
      "colour": "#33cc33",
      "tooltip": "Phát hiện màu sắc cụ thể",
      "helpUrl": ""
    });
  }
};

Blockly.Python['color_sensor_detect_color'] = function(block) {
  var detectColor = block.getFieldValue('DETECT_COLOR');
  var code = '(color_sensor.classify_hue() == "' + detectColor + '")';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Khối đọc giá trị độ sáng (Lux)
Blockly.Blocks['color_sensor_read_lux'] = {
  init: function() {
    this.jsonInit({
      "type": "color_sensor_read_lux",
      "message0": "cảm biến màu sắc đọc giá trị độ sáng",
      "output": "Number",
      "colour": "#ffff66",
      "tooltip": "Đọc giá trị độ sáng (Lux)",
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
      "colour": "#ffcc66",
      "tooltip": "Đọc giá trị nhiệt độ màu (CCT)",
      "helpUrl": ""
    });
  }
};

Blockly.Python['color_sensor_read_cct'] = function(block) {
  var code = 'color_sensor.get_cct(1)'; // offset có thể được điều chỉnh
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Thêm import thư viện ColorSensorVEML6040
Blockly.Python.definitions_['import_color_sensor'] = 'from color_sensor import ColorSensorVEML6040';
