// c = d3.conventions({parentSel: d3.select('#graph')})

// var env = new Tone.AmplitudeEnvelope({
//   "attack" : 0.01,
//   "decay" : 0.02,
//   "sustain" : 0.09,
//   "release" : 1.2
// }).toMaster();

// var osc = new Tone.Oscillator(440, "square")
//   .connect(env)
//   .start();

// //just so it's not soo loud.
// osc.volume.value = -6;


//create one of Tone's built-in synthesizers
var synth = new Tone.MonoSynth();

//connect the synth to the master output channel
synth.toMaster();

//create a callback which is invoked every quarter note
Tone.Transport.setInterval(function(time){
    //trigger middle C for the duration of an 8th note
    //synth.triggerAttackRelease("C4", "8n", time);
    //osc.start()
    //chorus.triggerAttackRelease("C4", "8n", time);
}, "1n");

//start the transport
Tone.Transport.start();


// var chorus = new Tone.Chorus(4, 2.5, 0.5)

// chorus.toMaster()

//the input signal
// var osc = new Tone.Oscillator({ 
//   "volume" : -6, 
//   "type" : "triangle"
// })//.connect(feedbackDelay);

//osc.start()

