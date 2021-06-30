//
// mod_outputs.js
//   outputs list
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
define(['require', 'mods/mod_ui'], function(require) {
   var ui = require('mods/mod_ui')
      function mod_outputs() {
         ui.ui_menu_action("outputs/mod_Roland_mill.js")
      }

   return {
      init: mod_outputs
   }

});
