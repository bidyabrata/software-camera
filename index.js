function isCoverageSufficient(desiredDistanceRange, desiredLightRange, hardwareCameras) {
    const [minRequiredDistance, maxRequiredDistance] = desiredDistanceRange;
    const [minRequiredLight, maxRequiredLight] = desiredLightRange;

    let coveredDistances = new Set();
    let coveredLightLevels = new Set();

    if (hardwareCameras.length === 0) {
        return false;
    }
    // Iterating through all hardware cameras and tracking covered ranges
    for (let camera of hardwareCameras) {
        for (let d = camera.minDistance; d <= camera.maxDistance; d++) {
            coveredDistances.add(d);
        }
        for (let l = camera.minLight; l <= camera.maxLight; l++) {
            coveredLightLevels.add(l);
        }
    }

    // Checking if all required distances and light levels are covered
    for (let d = minRequiredDistance; d <= maxRequiredDistance; d++) {
        if (!coveredDistances.has(d)) return false; // Missing distance
    }
    for (let l = minRequiredLight; l <= maxRequiredLight; l++) {
        if (!coveredLightLevels.has(l)) return false; // Missing light level
    }

    return true; // Everything is covered
}


// Example:
const hardwareCameras = [
    { minDistance: 1, maxDistance: 5, minLight: 10, maxLight: 50 },
    { minDistance: 8, maxDistance: 10, minLight: 40, maxLight: 80 },
    { minDistance: 11, maxDistance: 15, minLight: 70, maxLight: 100 }
];

//Sucess case
const desiredDistanceRange = [8, 15];
const desiredLightRange = [10, 100];

console.log(isCoverageSufficient(desiredDistanceRange, desiredLightRange, hardwareCameras));
// Output: true

//Failure case
const desiredDistanceRange2 = [5, 15];
const desiredLightRange2 = [10, 100];

console.log(isCoverageSufficient(desiredDistanceRange2, desiredLightRange2, hardwareCameras));
// Output: false