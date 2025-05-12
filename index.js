
function isCoverageSufficient(desiredDistanceRange, desiredLightRange, hardwareCameras) {
    const distanceRanges = hardwareCameras.map(cam => cam.distanceRange);
    const lightRanges = hardwareCameras.map(cam => cam.lightRange);

    const mergedDistanceRanges = mergeIntervals(distanceRanges);
    const mergedLightRanges = mergeIntervals(lightRanges);

    // Function to merge overlapping intervals
    function mergeIntervals(intervals) {
        if (intervals.length === 0) return [];

        intervals.sort((a, b) => a[0] - b[0]); //sorting based on start of the interval

        const merged = [intervals[0]];

        for (let i = 1; i < intervals.length; i++) {
            const last = merged[merged.length - 1];
            const current = intervals[i];

            if (last[1] < current[0]) {  //if there is no overlap
                merged.push(current); 
            } else {
                last[1] = Math.max(last[1], current[1]); //if overlap, merge the intervals
            }
        }
        return merged;
    }

    // Function to check if a required range is covered by merged ranges
    function isRangeCovered(mergedRanges, requiredRange) {
        const [requiredStart, requiredEnd] = requiredRange;
        for (const [start, end] of mergedRanges) {
            if (start <= requiredStart && end >= requiredEnd) {
                return true; //if the required range is fully covered by the merged range
            }
        }
        return false;
    }

    return (
        isRangeCovered(mergedDistanceRanges, desiredDistanceRange) &&
        isRangeCovered(mergedLightRanges, desiredLightRange)
    );
}


// Test casees I have considered as per my understanfing of the problem

// #1: Full coverage
const desiredDistanceRange1 = [1, 10];
const desiredLightRange1 = [100, 1000];

const hardwareSet1 = [
    { distanceRange: [1, 5], lightRange: [100, 300] },
    { distanceRange: [5, 10], lightRange: [250, 1000] },
];

console.log("Test case 1: ", isCoverageSufficient(desiredDistanceRange1, desiredLightRange1, hardwareSet1));
//Output: true

// #2: Gap in distance
const desiredDistanceRange2 = [1, 10];
const desiredLightRange2 = [100, 1000];

const hardwareSet2 = [
    { distanceRange: [1, 4], lightRange: [100, 1000] },
    { distanceRange: [6, 10], lightRange: [100, 1000] },
];

console.log("Test case 2: ", isCoverageSufficient(desiredDistanceRange2, desiredLightRange2, hardwareSet2));
// Output: false

// #3: Gap in light range
const desiredDistanceRange3 = [1, 10];
const desiredLightRange3 = [100, 1000];

const hardwareSet3 = [
    { distanceRange: [1, 10], lightRange: [100, 400] },
    { distanceRange: [1, 10], lightRange: [600, 1000] },
];

console.log("Test case 3: ", isCoverageSufficient(desiredDistanceRange3, desiredLightRange3, hardwareSet3));
// Output: false

// #4: Multiple overlapping cameras
const desiredDistanceRange4 = [1, 10];
const desiredLightRange4 = [100, 1000];

const hardwareSet4 = [
    { distanceRange: [1, 4], lightRange: [100, 300] },
    { distanceRange: [3, 7], lightRange: [250, 600] },
    { distanceRange: [6, 10], lightRange: [500, 1000] },
];

console.log("Test case 4: ",isCoverageSufficient(desiredDistanceRange4, desiredLightRange4, hardwareSet4));
// Output: true
