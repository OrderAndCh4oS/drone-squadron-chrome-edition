import nameGenerator from './name-generator.js';
import droneGenerator from './drone-generator.js';

const squadGenerator = (id, colour, droneCount, startIndex = 0) => ({
    id,
    name: 'Squadron ' + nameGenerator(),
    colour,
    drones: new Array(droneCount).fill().map((_, index) => droneGenerator(index + startIndex + 1))
})

export default squadGenerator;
