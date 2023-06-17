"use strict";

function reset() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 3; j++) {
      document.getElementById('a' + i + j).value = '';
      document.getElementById('m' + i + j).value = '';
      document.getElementById('n' + i + j).value = '';
    }

    document.getElementById('p' + i).value = '';
  }

  document.getElementById('av11').value = '';
  document.getElementById('av12').value = '';
  document.getElementById('av13').value = '';
  document.getElementById('resourceA').value = '';
  document.getElementById('resourceB').value = '';
  document.getElementById('resourceC').value = '';
  document.body.style.backgroundColor = "#000000";
}

function example() {
  sam = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]];
  max = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]];

  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 3; j++) {
      document.getElementById('a' + i + j).value = sam[i - 1][j - 1];
      document.getElementById('m' + i + j).value = max[i - 1][j - 1];
    }
  }

  document.getElementById('resourceA').value = 10;
  document.getElementById('resourceB').value = 5;
  document.getElementById('resourceC').value = 7;
}

function find_avai() {
  var a = document.getElementById('resourceA').value;
  var b = document.getElementById('resourceB').value;
  var c = document.getElementById('resourceC').value;
  var x = 0;
  var y = 0;
  var z = 0;

  for (var i = 1; i <= 5; i++) {
    var x = x + parseInt(document.getElementById('a' + i + '1').value);
    var y = y + parseInt(document.getElementById('a' + i + '2').value);
    var z = z + parseInt(document.getElementById('a' + i + '3').value);
  }

  document.getElementById('av11').value = a - x;
  document.getElementById('av12').value = b - y;
  document.getElementById('av13').value = c - z;
}

function find_need() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 3; j++) {
      document.getElementById('n' + i + j).value = parseInt(document.getElementById('m' + i + j).value) - parseInt(document.getElementById('a' + i + j).value);
    }
  }
}

function run_algo() {
  find_avai();
  find_need();
  var k = 1;
  var q = 1;

  for (var j = 1; j <= 5; j++) {
    x1 = parseInt(document.getElementById('av11').value);
    x2 = parseInt(document.getElementById('av12').value);
    x3 = parseInt(document.getElementById('av13').value);

    for (var i = k; i <= 5; i++) {
      var ex1 = parseInt(document.getElementById('a' + i + '1').value);
      var ex2 = parseInt(document.getElementById('a' + i + '2').value);
      var ex3 = parseInt(document.getElementById('a' + i + '3').value);

      if (ex1 != 0 || ex2 != 0 || ex3 != 0) {
        if (x1 >= parseInt(document.getElementById('n' + i + '1').value) && x2 >= parseInt(document.getElementById('n' + i + '2').value) && x3 >= parseInt(document.getElementById('n' + i + '3').value)) {
          document.getElementById('p' + q).value = 'P' + i;
          document.getElementById('av11').value = parseInt(document.getElementById('av11').value) + parseInt(document.getElementById('a' + i + '1').value);
          document.getElementById('av12').value = parseInt(document.getElementById('av12').value) + parseInt(document.getElementById('a' + i + '2').value);
          document.getElementById('av13').value = parseInt(document.getElementById('av13').value) + parseInt(document.getElementById('a' + i + '3').value);
          document.getElementById('a' + i + '1').value = '0';
          document.getElementById('a' + i + '2').value = '0';
          document.getElementById('a' + i + '3').value = '0';
          k = i + 1;

          if (k == 6) {
            k = 1;
          }

          q = q + 1;
          break;
        }
      }
    }
  }

  if (q != 6) {
    var resultDiv = document.getElementById('result');
    resultDiv.outerHTML = '<div class="floor1"><h1 class="text-center"> Your System is not Safe </h1> <img src="https://i.imgur.com/pXALzSc.gif" class="woot-dance" width="328" height="272" alt="8-bit dancing Karateka guy"></div>\
    <link rel="stylesheet" href="woot.css">';
  } else {
    var resultDiv = document.getElementById('result');
    resultDiv.outerHTML = '<div class="floor"><h1 class="text-center"> Your System is Safe </h1> <img src="https://i.imgur.com/pXALzSc.gif" class="woot-dance" width="328" height="272" alt="8-bit dancing Karateka guy"></div>\
    <link rel="stylesheet" href="woot.css">';
  }
}

var contextClass = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
var dance = document.getElementById("everybodydance");

if (contextClass) {
  var context = new contextClass();
} else {
  onError;
}

var request = new XMLHttpRequest();
request.open('GET', "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/gonna-make-you-sweat.mp3", true);
request.responseType = 'arraybuffer';

request.onload = function () {
  context.decodeAudioData(request.response, function (theBuffer) {
    buffer = theBuffer;
  }, onError);
};

request.send();

function onError() {
  console.log("Bad browser! No Web Audio API for you");
}

function unpress() {
  dance.classList.remove("pressed");
}

function playSound() {
  dance.classList.add("pressed");
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
  var delay = 2000;
  setTimeout(unpress, delay);
}

dance.addEventListener('click', function (event) {
  playSound();
});
//# sourceMappingURL=advanceClaim.dev.js.map
