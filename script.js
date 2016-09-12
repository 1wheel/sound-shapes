var effects = {}

// effects.panner = new Tone.AutoPanner({
//   "frequency" : .5,
//   "amount" : 0
// }).toMaster();


effects.chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster()

effects.feedbackDelay = new Tone.PingPongDelay({
  "delayTime" : "8n",
  "feedback" : 0.1,
  "wet" : 0.5
}).toMaster();

var effectsArray = d3.entries(effects)

//play a snare sound through it
var snare = function(){ return new Tone.Player("snare.mp3") }

var players = [
    'snare', 
    // 'agogoHigh', 
    // 'agogoLow', 
    'B1', 
    'D2', 
    'G2',
    // 'hh', 
    // 'hho', 
    'kick'
  ]
  .map(function(str){
    var rv = {str: str}
    rv.effects = {}
    effectsArray.forEach(function(e){
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
    .on('click', function(d){
      d.player = players[~~(Math.random()*players.length)]
      d3.select(this).style('fill', ƒ('player', 'str', color))
    })
    .style({cursor: 'pointer'})


effectsArray.forEach(function(d, i){
  d.θ = 2*Math.PI*i/effectsArray.length
})

var pairs = []
sounds.forEach(function(s){
  effectsArray.forEach(function(e){
    pairs.push({s: s, e: e, lastPlay: -10000, active: false})
  })
})

var lines = svg.dataAppend(pairs, 'path')
    .style({'stroke': 'black', 'pointer-events': 'none'})

var shapes = svg.dataAppend(effectsArray, 'path')
    .attr('d', ['M', [-5,-5], 'L', [3, -5], 'L', [5,5], 'L', [-5,5], 'L', [-10, 5]].join(''))

d3.timer(function(t){

  sounds.forEach(function(d){
    d.curθ = (d.θ + t/2000) 
    d.pos = [Math.cos(d.curθ)*iR, Math.sin(d.curθ)*iR]
  })

  effectsArray.forEach(function(d){
    d.pos = [Math.cos(d.θ + -t*0.0001)*oR, Math.sin(d.θ + -t*0.0001)*oR]
  })


  circles.translate(ƒ('pos'))
  shapes.translate(ƒ('pos'))

  pairs
    .filter(function(d){
      return !d.active && dist(d) })
    .forEach(function(d){
      d.active = true

      try{
        d.s.player.effects[d.e.key].stop()
        d.s.player.effects[d.e.key].start()
      } catch(e){
        console.log('e')

      }
    })

  pairs
    .filter(function(d){
      return d.active && !dist(d) })
    .forEach(function(d){
      d.active = false
    })


  lines
      // .style('stroke', function(d){ return d.active ? 'green' : 'blue' })
      .style('opacity', function(d){ return d.active ? 1 : .05 })
      .attr('d', function(d){
        return ['M', d.e.pos, 'L', d.s.pos].join('') })

})


function dist(d){
  // return Math.abs((d.s.curθ - d.e.θ) % Math.PI*2) < .3

  var dx = d.s.pos[0] - d.e.pos[0]
  var dy = d.s.pos[1] - d.e.pos[1]

  return dx*dx + dy*dy < 10000
}







