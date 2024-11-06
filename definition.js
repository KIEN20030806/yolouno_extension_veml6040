Blockly.Blocks['color_sensor_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize VEML6040 Color Sensor");
    this.setColour(230);
    this.setTooltip("Initialize the VEML6040 color sensor.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['color_sensor_get_red'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Get Red Value");
    this.setColour(230);
    this.setOutput(true, "Number");
    this.setTooltip("Get the red value from the color sensor.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['color_sensor_get_green'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Get Green Value");
    this.setColour(230);
    this.setOutput(true, "Number");
    this.setTooltip("Get the green value from the color sensor.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['color_sensor_get_blue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Get Blue Value");
    this.setColour(230);
    this.setOutput(true, "Number");
    this.setTooltip("Get the blue value from the color sensor.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['color_sensor_get_lux'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Get Lux Value");
    this.setColour(230);
    this.setOutput(true, "Number");
    this.setTooltip("Get the lux value from the color sensor.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['color_sensor_get_cct'] = {
  init: function() {
    this.appendValueInput("OFFSET")
        .setCheck("Number")
        .appendField("Get CCT with offset");
    this.setColour(230);
    this.setOutput(true, "Number");
    this.setTooltip("Get the color temperature (CCT) with a specified offset.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['color_sensor_read_hsv'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read HSV");
    this.setColour(230);
    this.setOutput(true, "Object");
    this.setTooltip("Read RGB and convert to HSV.");
    this.setHelpUrl("");
  }
};
