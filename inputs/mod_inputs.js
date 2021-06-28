//
// mod_inputs.js
//   fab modules inputs
//
// Neil Gershenfeld 
// (c) Massachusetts Institute of Technology 2014
// 
// This work may be reproduced, modified, distributed, performed, and 
// displayed for any purpose, but must acknowledge the fab modules 
// project. Copyright is retained and must be preserved. The work is 
// provided as is; no warranty is provided, and users accept all 
// liability.
//

define(['mods/mod_ui'], function(ui) {


   //
   // define input types and handlers
   //
   var input_array = [
      ["image (.png)", "inputs/mod_png.js"]
   ]
   //
   // call mod_inputs
   //
   // mod_inputs()
   //
   // mod_inputs
   //    set up inputs menu
   //

      function mod_inputs() {
        //var label = document.getElementById("mod_inputs_label")
        //label.innerHTML = "input format"
        ui.ui_menu_file(input_array, "mod_inputs")
        var label = document.getElementById("mod_inputs")
        label.onclick = function(e) {
          ui.ui_clear()
          var label = document.getElementById("mod_outputs_label")
          label.style.display = "none"
          var label = document.getElementById("mod_processes_label")
          label.style.display = "none"
          var div = document.getElementById("mod_input_controls")
          div.innerHTML = ""
          var div = document.getElementById("mod_output_controls")
          div.innerHTML = ""
          var div = document.getElementById("mod_process_controls")
          div.innerHTML = ""
          //ui.ui_prompt("input file to read?")
          ui.ui_menu_file(input_array, "mod_inputs")
          ui.ui_view_reset()
        }
//         label.onmouseover = function(e) {
//            this.style.background = ui.defaults.highlight_background_color
//        }
//         label.onmouseout = function(e) {
//            this.style.background = ui.defaults.background_color
//         }
      }


   return {
      initInputs: mod_inputs
   }

});
