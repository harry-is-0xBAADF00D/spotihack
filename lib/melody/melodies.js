var PITCHES = 'abcdefg';
var HELD = ' ';

function Note(pitch, duration) {
  this.pitch = pitch;
  this.duration = duration;
}

Note.prototype.getPitch = function () {
  return this.pitch;
}

Note.prototype.getDuration = function () {
  return this.duration;
}

exports.parseMelody = function (string) {
  var notes = [];
  var pitch = null;
  var duration = null;
  for (var i = 0; i < string.length; i++) {
    var chr = string[i];
    if (PITCHES.indexOf(chr) !== -1) {
      if (pitch !== null) {
	notes.push(new Note(pitch, duration));
      }
      pitch = chr;
      duration = 1;
    } else if (chr === HELD) {
      duration++;
    } else {
      throw Error('Invalid melody syntax: strange character: "' + chr + '"');
    }
  }
  if (pitch !== null) {
    notes.push(new Note(pitch, duration));
  }
  return notes;
}

exports.getExampleMelodies = function () {
  var melodies = [];
  var fileNames = require('glob').sync(__dirname + '/example-melodies/**.melody');
  for (var fileNameIndex = 0; fileNameIndex < fileNames.length; fileNameIndex++) {
    var fileName = fileNames[fileNameIndex];
    var unparsed = require('fs').readFileSync(fileName, 'utf8').trim();
    var melody = exports.parseMelody(unparsed);
    melodies.push(melody);
  }
  return melodies;
}

exports.Note = Note;
