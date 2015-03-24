//
// mod_settings
//   fab module settings
//   copy items from http://mod.cba.mit.edu/mods.html
//

//
// edit existing process menu items
//

mod_edit_process([
   ["name","7/16 plywood (1/8 mill)"],
   ["module","Shopbot"],
   ["cut_speed","55"],
   ["plunge_speed","30"],
   ])

mod_edit_process([
   ["name","PCB traces (1/64)"],
   ["module","Roland_mill"],
   ["command","mod_serial.py /dev/ttyUSB1 9600 dsrdtr"],
   ])

//
// add new process menu items
//

mod_add_process([
   ["name","1/4 plywood (1/8 mill)"],
   ["module","Shopbot"],
   ["controls","mod_path_image_25D_controls"],
   ["routine","mod_Shopbot_image_25D_path"],
   ["command","gedit"],
   ["depth","3.175"],
   ["thickness","6.35"],
   ["diameter","3.175"],
   ["cut_speed","50"],
   ["plunge_speed","25"],
   ["offsets","1"],
   ["overlap","0"],
   ["error","1.1"],
   ["sort_threshold","1.5"],
   ])

mod_add_process([
   ["name","1/2 plywood (1/8 mill)"],
   ["module","Shopbot"],
   ["controls","mod_path_image_25D_controls"],
   ["routine","mod_Shopbot_image_25D_path"],
   ["command","gedit"],
   ["depth","3.175"],
   ["thickness","12.7"],
   ["diameter","3.175"],
   ["cut_speed","50"],
   ["plunge_speed","25"],
   ["offsets","1"],
   ["overlap","0"],
   ["error","1.1"],
   ["sort_threshold","1.5"],
   ])

      mod_add_process([
         ["name", "12mm plywood"],
         ["module", "Smoothie_G"],
         ["controls", "mod_path_image_22D_controls"],
         ["routine", "mod_G_path"],
         ["command", "gedit"],
         ["diameter", "3.175"],
         ["cut_speed", "50"],
         ["plunge_speed", "25"],
         ["offsets", "1"],
         ["overlap", "0"],
         ["error", "1.5"],
         ["merge", "1.5"],
         ["depth", "3.175"],
         ["thickness", "11.11"],
      ])
