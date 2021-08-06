//
// mod_Roland_mill.js
//   fab modules Roland mill output
//
// Neil Gershenfeld 
// (c) Massachusetts Institute of Technology 2015
// 
// This work may be reproduced, modified, distributed, performed, and 
// displayed for any purpose, but must acknowledge the fab modules 
// project. Copyright is retained and must be preserved. The work is 
// provided as is; no warranty is provided, and users accept all 
// liability.
//

define(['require',
   'handlebars',
   'text!templates/mod_roland_mill_controls.html',
   'mods/mod_ui',
   'mods/mod_globals',
   'mods/mod_file'],
   function(require) {
   var ui = require('mods/mod_ui');
   var globals = require('mods/mod_globals');
   var Handlebars = require('handlebars')
   var fileUtils = require('mods/mod_file');
   var mod_roland_mill_controls_tpl = Handlebars.compile(require('text!templates/mod_roland_mill_controls.html'))
   var findEl = globals.findEl
   var rml_unit = 40.0
   mod_add_process([
      ["name", "Traces (1/64)"],
      ["module", "Roland_mill"],
      ["controls", "mod_path_image_21D_controls"],
      ["routine", "mod_Roland_Mill_path"],
      ["speed", "4"],
      ["depth", "0.1"],
      ["diameter", "0.4"],
      ["offsets", "4"],
      ["overlap", "50"],
      ["error", "1.1"],
      ["merge", "1.5"],
      ])
   mod_add_process([
      ["name", "Outline (1/32)"],
      ["module", "Roland_mill"],
      ["controls", "mod_path_image_22D_controls"],
      ["routine", "mod_Roland_Mill_path"],
      ["speed", "4"],
      ["depth", "0.6"],
      ["thickness", "1.7"],
      ["diameter", "0.79"],
      ["offsets", "1"],
      ["error", "1.1"],
      ["merge", "1.5"],
      ])
  mod_add_process([
    ["name", "PCB traces (0.010)"],
    ["module", "Roland_mill"],
    ["controls", "mod_path_image_21D_controls"],
    ["routine", "mod_Roland_Mill_path"],
    ["speed", "2"],
    ["depth", "0.1"],
    ["diameter", "0.254"],
    ["offsets", "1"],
    ["overlap", "50"],
    ["error", "1.1"],
    ["merge", "1.5"],
    ])
   //
   // mod_load_handler
   //   file load handler
   //
   function mod_load_handler() {
      globals.output = "Roland_mill"
      //ui.ui_prompt("process?")
      var controls = findEl("mod_output_controls")
      var ctx = {
         show_move: true
         }
      controls.innerHTML = mod_roland_mill_controls_tpl(ctx);
      if (globals.x0 != "")
         findEl("mod_x0").setAttribute("value",globals.x0)
      if (globals.y0 != "")
         findEl("mod_y0").setAttribute("value",globals.y0)
      if (globals.z0 != "")
         findEl("mod_z0").setAttribute("value",globals.z0)
      if (globals.zjog != "")
         findEl("mod_jog").setAttribute("value",globals.zjog)
      globals.send = "mod_serial.py /dev/ttyUSB0 9600 dsrdtr"

      findEl("mod_x0",false).addEventListener("input", function() {
         globals.x0 = findEl("mod_x0").value
         });
      findEl("mod_y0",false).addEventListener("input", function() {
         globals.y0 = findEl("mod_y0").value;
         });
      findEl("mod_z0",false).addEventListener("input", function() {
         globals.z0 = findEl("mod_z0").value
         findEl("mod_jog").value = parseFloat(globals.z0)+2
         globals.zjog = findEl("mod_jog").value
         });
      findEl("mod_jog",false).addEventListener("input", function() {
         globals.zjog = findEl("mod_jog").value
         });
      if (findEl('mod_move_xy',false)) {
         findEl('mod_move_xy').addEventListener("click", function() {
            var name = "move_xy.rml";
            var x0 = rml_unit*parseFloat(findEl("mod_x0").value);
            var y0 = rml_unit*parseFloat(findEl("mod_y0").value);
            var z0 = rml_unit*parseFloat(findEl("mod_z0").value);
            var zjog = rml_unit*parseFloat(findEl("mod_jog").value);
            var file = "PA;PA;VS10;!VZ10;!PZ0,"+zjog+";PU"+x0+","+y0+";!MC0;"
            var command = findEl("mod_command").value;
            var server = findEl("mod_server").value;
            fileUtils.send(name, file, command, server);
            })
         }
      if (findEl('mod_move_xyz',false)) {
         findEl('mod_move_xyz').addEventListener("click", function() {
            var name = "move_xyz.rml";
            var x0 = rml_unit*parseFloat(findEl("mod_x0").value);
            var y0 = rml_unit*parseFloat(findEl("mod_y0").value);
            var z0 = rml_unit*parseFloat(findEl("mod_z0").value);
            var zjog = rml_unit * parseFloat(findEl("mod_jog").value);
            file = "PA;PA;VS10;!VZ10;!PZ0,"+zjog+";Z"+x0+","+y0+","+z0+";!MC0;"
            var command = findEl("mod_command").value;
            var server = findEl("mod_server").value;
            fileUtils.send(name, file, command, server);
            })
         }
      findEl('mod_home',false).addEventListener("click", function() {
         var name = "home.rml";
         var xhome = rml_unit*parseFloat(findEl("mod_xhome").value);
         var yhome = rml_unit*parseFloat(findEl("mod_yhome").value);
         var zhome = rml_unit*parseFloat(findEl("mod_zhome").value);
         var file = "PA;PA;!PZ0,"+zhome+";PU"+xhome+","+yhome+";!MC0;";
         var command = findEl("mod_command").value;
         var server = findEl("mod_server").value;
         fileUtils.send(name, file, command, server);
         });
      var label = findEl("mod_processes_label")
      ui.ui_clear()
      ui.ui_show_input()
      ui.ui_menu_process() 
      }
   //
   // mod_Roland_Mill_path
   //    convert 3D path to RML
   //
   function mod_Roland_Mill_path(path) {
      globals.type = ".rml"
      var dx = 25.4 * globals.width / globals.dpi
      var nx = globals.width
      var speed = parseFloat(findEl("mod_speed").value)
      var jog = parseFloat(findEl("mod_jog").value)
      var ijog = Math.floor(rml_unit * jog)
      var scale = rml_unit * dx / (nx - 1)
      var x0 = parseFloat(findEl("mod_x0").value)
      var y0 = parseFloat(findEl("mod_y0").value)
      var z0 = parseFloat(findEl("mod_z0").value)
      var xoffset = rml_unit*x0
      var yoffset = rml_unit*y0
      var zoffset = rml_unit*z0
      var str = "PA;PA;" // plot absolute
      str += "VS" + speed + ";!VZ" + speed + ";"
      str += "!PZ" + 0 + "," + ijog + ";" // set jog 
      str += "!MC1;\n" // turn motor on
      //
      // follow segments
      //
      for (var seg = 0; seg < path.length; ++seg) {
         //
         // move up to starting point
         //
         x = xoffset + scale * path[seg][0][0]
         y = yoffset + scale * path[seg][0][1]
         str += "PU" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"
         //
         // move down
         //
         z = zoffset + scale * path[seg][0][2]
         str += "Z" + x.toFixed(0) + "," + y.toFixed(0) + "," + z.toFixed(0) + ";\n"
         for (var pt = 1; pt < path[seg].length; ++pt) {
            //
            // move to next point
            //
            x = xoffset + scale * path[seg][pt][0]
            y = yoffset + scale * path[seg][pt][1]
            z = zoffset + scale * path[seg][pt][2]
            str += "Z" + x.toFixed(0) + "," + y.toFixed(0) + "," + z.toFixed(0) + ";\n"
            }
         //
         // move up
         //
         str += "PU" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"
         }
      //
      // turn off motor and move back
      //
      var xhome = rml_unit * parseFloat(findEl("mod_xhome").value);
      var yhome = rml_unit * parseFloat(findEl("mod_yhome").value);
      var zhome = rml_unit * parseFloat(findEl("mod_zhome").value);
      str += "PA;PA;!PZ0,"+zhome+";PU"+xhome+","+yhome+";!MC0;";
      //
      // return string
      //
      return str
      }
   return {
      mod_load_handler: mod_load_handler,
      mod_Roland_Mill_path: mod_Roland_Mill_path
      }
   });
