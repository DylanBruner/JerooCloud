//Benchmarks

//Base benchmark============================================================== (Maze)
//Normal editor speed 6 = 5.93
//Jeroo+ editor speed 6 = 4.69
//Jeroo+ editor speed 7 = 4.52


//Mods========================================================================

//4.55 on Main tab with speedup_runtime (Speed 6)
//4.50 on Main tab with speedup_runtime (Speed 7)
//5.58 without speedup_runtime (Speed 6)
//6.25 without speedup_runtime (Speed 7)

// (Pick all flowers default map size)
//23.76 on main tab without speedup_runtime (Speed 6)
//16.46 on main tab with speedup_runtime (Speed 6)
//17.07 on methods tab without speedup_runtime (Speed 6)

//Results
//Running speed 6 with speedup_runtime gives a 33% speedup over running speed 6 without speedup_runtime
//this is around the same speedup Jeroo gets from not viewing the tab code is running in except it works while viewing

function speedup_runtime(){
    for (var i = 0; i < editors.length; i++) {
        var editor = editors[i];
        editor.unhighlightLine    = function() {};
        editor.highlightLine      = function() {};
        //editor.highlightErrorLine = function() {};
    }
    console.log("speedup.js - removed function calls");
}; speedup_runtime();
console.log("speedup.js");
