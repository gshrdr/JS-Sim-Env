# JS-Sim-Env
A JavaScript Tilemap Simulation System.

## Live Demo
You can run this code live in your browser here: [JS-Sim-Env Live Demo](https://www.gavinshr.com/JS-Sim-Env/index.html)  

<div align="center">
  <img width="100%" src="/assets/GitHub-Demo-Img.png" alt="JavaScript Simulation Demo Screenshot" />
</div>

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Features

- You can use the mouse to scroll/zoom and pan around the screen
- You can use a touch screen to pinch to zoom and pan around the screen
- There is a 60fps game loop (as referenced by the small red dot, obviously there isn't much going on here, but the architecture of a game loop is in place for future additions to the simulation)
- FPS counter, you can active a small FPS debug window in the settings app that shows you a live updated view of the frames per second the game loop is running at 
- Terrain generation
- A map grid that is displayed when you zoom in to the map
- Automatic resizing, the canvas expands to fill the screen when you resize your browser. This also works on mobile screen sizes, where the tilemap expands to fill the entire view on smartphones
- A settings control menu, you can change the settings of this system using the drop down menu and they even take hold and stay set if you refresh or close your browser
- A drawing system, I have the ability to draw a simple colored line around this canvas as a proof of concept
- Granular debug controls, you can activate the developer console in your browser and modify the settings of the app in order to see a detailed console log of development events throughout the system

## Sources

These are the sources, tutorials, and code docs I used to build this project:

* [Mozilla Docs - HTML5 Canvas Rendering](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
* [Mozilla Docs - HTML5 Canvas Performance Tips](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)
* [Mozilla Docs - Mouse Events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
* [Mozilla Docs - Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events)
* [Mozilla Docs - Pointer Events - Pinch To Zoom](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures)
* [JavaScript TileMap Rendering Tutorial](https://stackoverflow.com/questions/21844451/render-a-tile-map-using-javascript)
* [JavaScript Perlin Noise Generation](https://joeiddon.github.io/projects/javascript/perlin.html)
* [JavaScript Automatically Resize/Scale HTML5 Canvas](https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window)
* [Evolv.io Simulator Inspiration - CaryKH](https://www.youtube.com/watch?v=OLnv8QaEDL0)
* [Evolution Simulator Inspiration - InderPabla](https://github.com/InderPabla/EvolutionSimulator-NeuralNetwork-GeneticAlgorithm)
* [CSS Element Fill Remaining Height Of Screen](https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space)
* [Resize HTML5 Canvas To Fill Container](https://thewebdev.info/2021/03/01/how-to-resize-html5-canvas-to-fit-the-window/)
* [Debouncing JavaScript Event Listeners](https://gomakethings.com/debouncing-your-javascript-events/)
* [HTML5 Canvas Scrolling Camera System](https://gamedev.stackexchange.com/questions/86820/how-do-i-make-a-scrolling-map-within-an-html5-canvas)
* [JavaScript requestAnimationFrame() Drawing Loop](https://www.codeblocq.com/2016/05/Two-Ways-of-Creating-an-Animation-Loop-in-JavaScript/)
* [JavaScript Game Loop + FPS Counter](https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe)
* [How To Properly Clear HTML5 Canvas](https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing)
* [JavaScript Determine If Touch Enabled Device](https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript)
* [JavaScript Detect Double Touch Event](https://stackoverflow.com/questions/8825144/detect-double-tap-on-ipad-or-iphone-screen-using-javascript)
* [JavaScript Random RGB Color](https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript)
* [Game Development For The Web](http://blog.mrroa.com/game-development-for-the-web-series/)
* [Custom CSS Checkbox Tutorial](https://moderncss.dev/pure-css-custom-checkbox-style/)
* [JavaScript Hamburger Menu Button Animation Source](https://codepen.io/pranjal9599/pen/yJRNoL)
