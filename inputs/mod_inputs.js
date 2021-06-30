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

   function mod_inputs() {
   var label = document.getElementById("mod_inputs_label")
   label.innerHTML = "Upload PNG"
   label.addEventListener("click", function(e) {
      ui.ui_clear()
      var label = document.getElementById("mod_processes_label")
      label.style.display = "none"
      var div = document.getElementById("mod_input_controls")
      div.innerHTML = ""
      var div = document.getElementById("mod_output_controls")
      div.innerHTML = ""
      var div = document.getElementById("mod_process_controls")
      div.innerHTML = ""
      //ui.ui_prompt("input file to read?")
      ui.ui_menu_file("inputs/mod_png.js")
      ui.ui_view_reset()
      })
   }
   return {
      initInputs: mod_inputs
   }
});
