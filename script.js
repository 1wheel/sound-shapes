var effects = {}

effects.panner = new Tone.AutoPanner({
  "frequency" : .5,
  "amount" : 0
}).toMaster();


effects.feedbackDelay = new Tone.PingPongDelay({
  "delayTime" : "8n",
  "feedback" : 0.6,
  "wet" : 0.5
}).toMaster();


//play a snare sound through it
var snare = function(){ return new Tone.Player("snare.mp3") }

var players = ['snare', 'agogoHigh', 'agogoLow', 'B1', 'hh', 'hho', 'kick'].map(function(str){
  var rv = {str: str}
  rv.effects = {}
  d3.entries(effects).forEach(function(e){
    rv.effects[e.key] = (new Tone.Player('sounds/' + str + '.mp3')).connect(e.value)
  })
  return rv
})

var s = 540
var margin = 20

var iR = s/5
var oR = s/3

var svg = d3.select('body')
  .append('svg')
    .attr({height: s + margin*2, width: s + margin*2})
  .append('g')
    .translate([margin + s/2, margin + s/2])


var sounds = d3.range(0, 2*Math.PI, .3).map(function(d){
  var rv = {θ: d}
  rv.player = players[~~(Math.random()*players.length)]
  return rv
})


var color = d3.scale.category10()
var circles = svg.dataAppend(sounds, 'circle')
    .attr('r', 10)
    .attr('fill', ƒ('player', 'str', color))



d3.timer(function(t){

  sounds.forEach(function(d){
    d.pos = [Math.cos(d.θ + t/1000)*iR, Math.sin(d.θ + t/1000)*iR]
  })

  circles.translate(ƒ('pos'))


})



















