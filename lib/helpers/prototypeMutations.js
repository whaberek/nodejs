/* eslint-disable no-extend-native,prefer-template */

if ('roundUp' in Number.prototype) {
  console.error('roundUp is already defined!');
} else {
  Number.prototype.roundUp = function (precision = 2) {
    return Number(Math.round(this.toFixed(precision + 1) + `e${precision}`) + `e-${precision}`).toFixed(precision);
  };
}
