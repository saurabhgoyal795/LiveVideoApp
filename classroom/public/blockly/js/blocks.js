Blockly.Blocks['move'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("move")
		.appendField(new Blockly.FieldDropdown([["forward","forward"], ["backward","backward"]]), "move")
		.appendField("by")
		.appendField(new Blockly.FieldDropdown([["1","1"],["10","10"],["20","20"], ["50","50"], ["100","100"]]), "distance");
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['move'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_move = block.getFieldValue('move');
  var dropdown_distance = block.getFieldValue('distance');
  console.log("dropdown_move:"+dropdown_move);
  console.log("dropdown_distance:"+dropdown_distance);
  var code = '\n';
  if(dropdown_move == "forward"){
	code = 'moveForward('+dropdown_distance+');\n';
  }else{
	code = 'moveBackward('+dropdown_distance+');\n';
  }
  return code;
};

Blockly.Blocks['turn'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("turn")
		.appendField(new Blockly.FieldDropdown([["right","right"], ["left","left"]]), "turn")
		.appendField(new Blockly.FieldDropdown([["1°","1"],["2°","2"],["5°","5"],["7°","7"],["10°","10"], ["45°","45"], ["72°","72"], ["90°","90"], ["120°","120"], ["144°","144"]]), "degree");
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['turn'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_turn = block.getFieldValue('turn');
  var dropdown_degree = block.getFieldValue('degree');
  console.log("dropdown_turn:"+dropdown_turn);
  console.log("dropdown_degree:"+dropdown_degree);
  var code = '\n';
  if(dropdown_turn == "right"){
	code = 'turnRight('+dropdown_degree+');\n';
  }else{
	code = 'turnLeft('+dropdown_degree+');\n';
  }
  return code;
};

Blockly.Blocks['pen'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("pen")
		.appendField(new Blockly.FieldDropdown([["up","up"], ["down","down"]]), "pen")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['pen'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_pen = block.getFieldValue('pen');
  var code = '\n';
  if(dropdown_pen == "up"){
	code = 'penUp();\n';
  }else{
	code = 'penDown();\n';
  }
  return code;
};

Blockly.Blocks['pen_size'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("pen size")
		.appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["10","10"], ["15","15"], ["20","20"]]), "size")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['pen_size'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_pensize = block.getFieldValue('size');
  var code = 'updatePenSize('+dropdown_pensize+');\n';
  return code;
};

Blockly.Blocks['move_right'] = {
  init: function() {
	this.appendDummyInput()
	.appendField("Move right");
	this.setInputsInline(false);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
	this.setTooltip("Move right");
	this.setHelpUrl("");
  }
};
Blockly.JavaScript['move_right'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveRight();\n';
  return code;
};

Blockly.Blocks['move_left'] = {
  init: function() {
	this.appendValueInput("a")
		.setCheck(null)
		.appendField("Move left");
	this.setInputsInline(false);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("Move left");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['move_left'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveLeft();\n';
  return code;
};

Blockly.Blocks['move_top'] = {
  init: function() {
	this.appendValueInput("a")
		.setCheck(null)
		.appendField("Move top");
	this.setInputsInline(false);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("Move top");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['move_top'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveTop();\n';

  return code;
};

Blockly.Blocks['move_bottom'] = {
  init: function() {
	this.appendValueInput("a")
		.setCheck(null)
		.appendField("Move bottom");
	this.setInputsInline(false);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
	 this.setTooltip("Move bottom");
	 this.setHelpUrl("");
  }
};
Blockly.JavaScript['move_bottom'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'moveBottom();\n';

  return code;
};

Blockly.Blocks['pen_color'] = {

  init: function() {
    var field = new Blockly.FieldColour("#9260ba");
    field.setColours(
        ['#9260ba', '#5cd3e9', '#1cc282',
        '#fbc701', '#f47a25', '#f24949',
		'#ef5f78', '#f29071', '#455376', '#d6235d'],
		['violet', 'blue', 'green',
        'yellow', 'orange', 'red',
		'pink', 'brown/peach', 'dark blue', 'magenta']);
    field.setColumns(3);
	this.setColour(230);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
    this.appendDummyInput()
		.appendField('colour:')
        .appendField(field, 'pen_color');
  }
};

Blockly.JavaScript['pen_color'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_color = block.getFieldValue('pen_color');
  console.log("dropdown_color:"+dropdown_color);
  var code = 'updatePenColor("'+dropdown_color+'");\n';
  return code;
};



Blockly.Blocks['collect'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("collect")
  this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['collect'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'collect();\n';
  return code;
};

Blockly.Blocks['set_background'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("set background")
		.appendField(new Blockly.FieldDropdown([["Spotlights","sprite_bg_1"], ["Spiral Hill","sprite_bg_2"], ["Neon Dance","sprite_bg_3"], ["Disco Ball","sprite_bg_4"], ["Purple Trance","sprite_bg_5"], ["Neon Streaks","sprite_bg_6"]]), "background")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_background'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_background = block.getFieldValue('background');
  var code = 'updateBackground("'+dropdown_background+'");\n';
  return code;
};

Blockly.Blocks['set_sound'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("set sound")
		.appendField(new Blockly.FieldDropdown([["Birthday Party","Birthday_Party"], ["Celebration Dance","Celebration_Dance"], ["Childrens Party","Childrens_Party_full"], ["Club Dance","Club_Dance"], ["Dance Boy","Dance_Boy"], ["Hapyy Fun Dance","Happy_Fun_Dance"],["Positive Pop","Positive_Pop"], ["Summer Pop", "Summer_Pop"], ["Tropical Dance", "Tropical_Dance"]]), "sound")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_sound'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_sound = block.getFieldValue('sound');
  var code = 'updateSound("'+dropdown_sound+'");\n';
  return code;
};


Blockly.Blocks['set_character'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("set character")
		.appendField(new Blockly.FieldDropdown([["Cat","hef_1"], ["Bunny", "hef_2"], ["Grey Cat", "hef_3"], ["Bear", "hef_4"], ["Pink Bear", "hef_5"], ["Frog", "hef_6"], ["Hippo", "hef_7"]]), "character")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_character'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_character = block.getFieldValue('character');
  var code = 'updateCharacter("'+dropdown_character+'");\n';
  return code;
};

Blockly.Blocks['set_step'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("set step")
		.appendField(new Blockly.FieldDropdown([["Double Jam","doublejam"], ["Drop", "drop"], ["Kick", "kick"], ["High Kick", "xhighkick"], ["Slide","xslide"]]), "step")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_step'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_step = block.getFieldValue('step');
  var code = 'updateStep("'+dropdown_step+'");\n';
  return code;
};

Blockly.Blocks['new_character'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("add character 2")
		.appendField(new Blockly.FieldDropdown([["Cat","hef_1"], ["Bunny", "hef_2"], ["Grey Cat", "hef_3"], ["Bear", "hef_4"], ["Pink Bear", "hef_5"], ["Frog", "hef_6"], ["Hippo", "hef_7"]]), "newCharacter")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['new_character'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_new_character = block.getFieldValue('newCharacter');
  var code = 'updateNewCharacter("'+dropdown_new_character+'");\n';
  return code;
};

Blockly.Blocks['new_step'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("set step character 2")
		.appendField(new Blockly.FieldDropdown([["Double Jam","doublejam"], ["Drop", "drop"], ["Kick", "kick"], ["High Kick", "xhighkick"], ["Slide","xslide"]]), "newStep")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['new_step'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_step_new = block.getFieldValue('newStep');
  var code = 'updateStepNew("'+dropdown_step_new+'");\n';
  return code;
};

Blockly.Blocks['set_position'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("set position")
		.appendField(new Blockly.FieldDropdown([["Top","top"], ["Bottom", "bottom"], ["Left", "left"], ["Right","right"], ["Centre", "centre"], ["Top Left", "top_left"], ["Top Right", "top_right"], ["Bottom Left","bottom_left"], ["Bottom Right","bottom_right"]]), "position")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_position'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_position = block.getFieldValue('position');
  var code = 'updatePosition("'+dropdown_position+'");\n';
  return code;
};

Blockly.Blocks['set_position_new'] = {
  init: function() {
	this.appendDummyInput()
		.appendField("set position character 2")
		.appendField(new Blockly.FieldDropdown([["Top","top"], ["Bottom", "bottom"], ["Left", "left"], ["Right","right"], ["Centre", "centre"], ["Top Left", "top_left"], ["Top Right", "top_right"], ["Bottom Left","bottom_left"], ["Bottom Right","bottom_right"]]), "newPosition")
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_position_new'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var dropdown_position_new = block.getFieldValue('newPosition');
  var code = 'updatePositionNew("'+dropdown_position_new+'");\n';
  return code;
};
