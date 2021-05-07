import {
    audioHandler,
    background,
    canvas,
    debug,
    dm,
    game,
    grid,
    playButton,
    pm,
    squadrons,
} from './constants/constants.js';
import { deltaTime } from './service/delta-time.js';
import SquadronFactory from './factory/squadron-factory.js';
import UI from './user-interface/ui.js';
import GameOver from './user-interface/display-game-over.js';
import squadGenerator from './misc/squad-generator.js';

let fpsInterval, startTime, now, then, elapsed;

debug.initialiseListeners();

window.onresize = async () => {
    await initialise();
};

window.onload = async() => {
    await audioHandler.setAudioFile('explosion', 'assets/audio/sound/explosion_1.wav');
    await audioHandler.setAudioFile('uzi', 'assets/audio/sound/uzi_1.wav');
    await audioHandler.setAudioFile('shotgun', 'assets/audio/sound/shotgun_1.wav');
    await audioHandler.setAudioFile('rifle', 'assets/audio/sound/rifle_1.wav');
    await audioHandler.setAudioFile('music', 'assets/audio/music/Urban-Future.mp3', 'audio/mpeg');
    startAnimating( 60);
};

playButton.onclick = async() => {
    await initialise();
    playButton.innerText = 'Restart'
};

async function initialise() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    audioHandler.play('music', 0.4, true);
    dm.init();
    pm.init();
    grid.init();
    game.state = 'playing';
    setupDrones();
}

function setupDrones() {
    const droneCount = ~~(canvas.width * 0.3)
    squadrons.splice(0, squadrons.length);
    [
        squadGenerator(1, "blue", ~~(canvas.width * 0.015)),
        squadGenerator(2, "red", ~~(canvas.width * 0.015), droneCount)
    ].map(s => squadrons.push(SquadronFactory.make(s)));
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function setFrameTimeData() {
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}

function animate() {
    background.draw();
    deltaTime.update();
    if(game.state === 'playing' || game.state === 'game-over') {
        dm.update();
        pm.update();
        grid.draw();
        grid.log();
        UI.displaySquadData();
        squadrons.map(s => {
            if(s.health <= 0) {
                game.state = 'game-over';
            }
        });
    }
    if(game.state === 'game-over') {
        new GameOver().draw();
    }
    requestAnimationFrame(animate);
    setFrameTimeData();
}
