/**
 * @fileoverview
 * Draw lines, polygons, circles, etc on the screen.
 * Render text in a certain font to the screen.
 */
var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var font = require('gamejs/font');

function main() {
   // set resolution & title
   var mainSurface = gamejs.display.setMode([800, 600]);
   gamejs.display.setCaption("Example Draw");

   // last parameter in all draw.* methods is the border width. 0 = fill
   draw.line(mainSurface, '#ff0000', [0,0], [100,100], 1);
   draw.lines(mainSurface, '#00ff00', true, [[50,50], [100,50], [100,100], [50,100]], 4);

   draw.polygon(mainSurface, '#0000ff', [[150,50], [200,50], [200,100]], 0);

   draw.circle(mainSurface, '#0000ff', [150, 150], 50, 10);
   draw.circle(mainSurface, '#00ccff', [250, 250], 50, 0);

   draw.rect(mainSurface, '#cccccc', new gamejs.Rect(10, 150, 20, 20), 2);
   draw.rect(mainSurface, '#cccccc', new gamejs.Rect(50, 150, 20, 20), 0);

   // create font object
   var defaultFont = new font.Font("20px Verdana"); // css font definition
   // render text, this returns a surface
   var textSurface = defaultFont.render("Example Draw Test 101", "#bbbbbb");
   mainSurface.blit(textSurface, [300, 50]);
};

// gamejs.ready will call your main function
// once all components and resources are ready.
gamejs.ready(main);
