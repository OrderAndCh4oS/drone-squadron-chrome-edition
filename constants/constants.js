import ParticleManager from '../manager/particle-manager.js';
import DroneManager from '../manager/drone-manager.js';
import GameGrid from '../user-interface/game-grid.js';
import Debug from '../dev/debug.js';
import Background from '../service/background.js';
import AudioManager from '../manager/audio-manager.js';

export const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const colours = {
    black: '#2a2e34',
    white: '#b3dce2',
    orange: '#ffaa39',
    red: '#d20931',
    green: '#80bf32',
    blue: '#332be5',
};

export const playButton = document.getElementById('play');
export const game = {state: 'stopped'};
export const friction = 0.8;
export const context = canvas.getContext('2d');
export const debug = new Debug();
export const background = new Background();
export const grid = new GameGrid();
export const squadrons = [];
export const dm = new DroneManager();
export const pm = new ParticleManager();
export const audioHandler = new AudioManager();
