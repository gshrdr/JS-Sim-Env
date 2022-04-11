# JS-Sim-Env
**Note: This is my current project and it is a work in progress, this project was started 04/10/2022; expect to see updates, more information, and a live code demo in the coming weeks.**

A JavaScript Browser Simulation Game Environment.

This project is a part of my website & portfolio: [gavinshr.com](https://gavinshr.com)  

## Live Demo
You can run this code live in your browser here: [JS-Sim-Env Live Demo](https://gavinshr.com/MazeAlgorithm/index.html)  
^^ Note: This link isn't active yet - This will work once my code is fully finished & published, for the time being this just pulls up my existing JavaScript maze algorithm demo on my website.

<div align="center">
  <img width="100%" src="/assets/GitHub-Demo-Img.png" alt="JavaScript Simulation Demo Screenshot" />
</div>

## Tasks

- [x] Setup a GitHub repository
- [ ] Build a JavaScript based tile map engine to render my worlds complete with automatic resizing, cross-browser & mobile (touch) compatibility, the ability to select individual tiles with a mouse/touch input, the ability to scroll throughout the tile map with a chunk-based rendering system, and the ability to zoom in/out
- [ ] Build a JavaScript update based game loop so I can update entities across the map programmatically 60x per second
- [ ] Explore a multi-player system with web sockets for a real time connection between multiple people playing/accessing the same game board
- [ ] Explore a Redis cache database for super fast real-time data storage
- [ ] Explore an XML/HTTP based REST API built with PHP for server communication
- [ ] Explore a PHP/MySQL based back-end system for long-term data storage for the individual game board/entity state + a user login/sign up (PHP/MySQL are supported on my Apache hosting, otherwise I would use Node.JS/MongoDB/Express.JS - perhaps this will be something I explore in the future once I upgrade to DigitalOcean Droplet based hosting)
- [ ] Get a live code demo working, host this code demo on [gavinshr.com](https://gavinshr.com), include a link to this project with information & an image on my [projects page](https://gavinshr.com/projects), and update the live code demo link at the top of this ReadMe file

## Sources

These are the sources, tutorials, and code docs I used to build this project:

* [Mozilla Docs - HTML5 Canvas Rendering](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
* [Mozilla Docs - HTML5 Canvas Performance Tips](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)
* [Mozilla Docs - Mouse Events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
* [Mozilla Docs - Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events)
* [Joe Iddon JavaScript TileMap Perlin Noise Tutorial](https://joeiddon.github.io/projects/javascript/perlin.html)
* [JavaScript TileMap Rendering Tutorial](https://stackoverflow.com/questions/21844451/render-a-tile-map-using-javascript)
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
