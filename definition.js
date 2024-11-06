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
//   var RGB = block.getFieldValue("RGB");
//   // TODO: Assemble Python into code variable.
//   Blockly.Python.definitions_['import_tcs34725'] = 'from tcs34725 import *';
//   Blockly.Python.definitions_['init_tcs34725'] = 'tcs34725 = ColorSensorVEML6040()';
//   var code = "tcs34725.read_color('" + RGB + "')";
//   return [code, Blockly.Python.ORDER_NONE];
// };

// Blockly.Python["uno_tcs34725_read_cct"] = function (block) {
//   var RGB = block.getFieldValue("RGB");
//   // TODO: Assemble Python into code variable.
//   Blockly.Python.definitions_['import_tcs34725'] = 'from tcs34725 import *';
//   Blockly.Python.definitions_['init_tcs34725'] = 'tcs34725 = ColorSensorVEML6040()';
//   var code = "tcs34725.read_color('" + RGB + "')";
//   return [code, Blockly.Python.ORDER_NONE];
// };


// Tạo một khối Blockly để đọc dữ liệu từ cảm biến VEML6040
Blockly.Blocks['uno_veml6040_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Đọc cảm biến VEML6040");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(230);  // Màu khối
    this.setTooltip("Đọc giá trị từ cảm biến VEML6040");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['uno_veml6040_read'] = function(block) {
  var code = 'readVeml6040Data()';  // Hàm JavaScript để đọc dữ liệu cảm biến
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// Hàm JavaScript để đọc dữ liệu từ cảm biến VEML6040
function readVeml6040Data() {
  // Đây là nơi bạn sẽ viết mã JavaScript để tương tác với cảm biến, ví dụ:
  let red = getRedValue(); // Hàm giả định để lấy giá trị màu đỏ
  let green = getGreenValue(); // Hàm giả định để lấy giá trị màu xanh lá
  let blue = getBlueValue(); // Hàm giả định để lấy giá trị màu xanh dương
  return { red: red, green: green, blue: blue };
}

// Các hàm lấy giá trị của màu sắc từ cảm biến
function getRedValue() {
  // Gọi mã Python hoặc API tương ứng để lấy giá trị màu đỏ từ cảm biến
  return 100;  // Trả về giá trị giả định
}

function getGreenValue() {
  return 150;  // Trả về giá trị giả định
}

function getBlueValue() {
  return 200;  // Trả về giá trị giả định
}

// Cấu hình Blockly và sử dụng toolbox của bạn
var workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox')
});

// Hàm để bắt đầu chạy Blockly và xử lý mã JavaScript
function runBlocklyCode() {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  try {
    eval(code); // Thực thi mã JavaScript
  } catch (e) {
    console.error(e);
  }
}
