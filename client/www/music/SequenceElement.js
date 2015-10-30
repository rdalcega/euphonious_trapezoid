window.AudioContext.prototype.createSequenceElement = function( midiNote, valence ) {
  /*
    GRAPH:
    element.sub --> *
                    |
                    V
             element.sub.gain
                    |
                    v
    element.carrier * --> element.carrier.gain --> element.master --> destination
           ^                             ^
           |                             |
           .frequency                    .gain
           ^                              ^
           |                              |
           |                              * <-- element.carrier.gain.envelope
           |
           |
           * <-- element.carrier.modulator.gain <-- element.carrier.modulator
                                          ^
                                          |
                                          .gain
                                          ^
                                          |
                                          * <-- element.carrier.modulator.gain.envelope
  */
  var context = this;
  // midiNote is randomized very slightly
  midiNote = midiNote + Math.random() * 0.1 - 0.05;
  var element = context.createSynthesizer();
  var ms = Math.pow( 10, -3 );
  // The elements sustain time depends on the
  // element's valence
  var sustain =  ( 1 + valence * 150 / 8 + Math.random() * 25 ) * ms; // ms
  element.setSustain( sustain );
  element.setMasterGain( 1 );
  // Create and configure element.carrier
  element.carrier = context.createOscillator();
  element.carrier.type = 'sine';
  element.carrier.frequency.value = 3 * 440 * Math.pow( 2, ( midiNote - 69 ) / 12 );
  element.carrier.start( context.currentTime );
  // Create and configure the element.carrier.gain
  element.carrier.gain = context.createGain( );
  element.carrier.gain.gain.value = 0;
  /*
    element.carrier --> element.carrier.gain
  */
  element.carrier.connect( element.carrier.gain );
  // Create and configure element.sub
  element.sub = context.createOscillator();
  element.sub.type = 'sine';
  element.sub.frequency.value = 0.5 * 440 * Math.pow( 2, ( midiNote - 69 ) / 12 );
  element.sub.start( context.currentTime );
  // Create and configure the element.sub.gain
  element.sub.gain = context.createGain( );
  element.sub.gain.gain.value = 0.5;
  /*
    element.sub --> element.sub.gain
  */
  console.dir( element.sub );
  console.dir( element.sub.gain );
  element.sub.connect( element.sub.gain );
  /*
    element.sub.gain --> element.carrier.gain
  */
  element.sub.gain.connect( element.carrier.gain );
  /*
    element.carrier.gain --> element.master
  */
  element.carrier.gain.connect( element.master.input );
  // Create and configure element.carrier.gain.envelope
  element.carrier.gain.envelope = {};
  // Attack time is proportional to valence
  // Attack target is inversely proptional to valence
  element.carrier.gain.envelope.attack = {
    time: ( 5 + valence * 20 / 8 ) * ms,
    target: 1 / Math.pow( valence, 0.35 ),
    initial: 0
  };
  // Decay time is inversely proportional to valence
  element.carrier.gain.envelope.decay = ( 100 - 95 * valence / 8 ) * ms;
  // Sustain target is inversely proportional to valence
  element.carrier.gain.envelope.sustain = 0.5 / Math.pow( valence, 0.35 );
  // Release target is always 0
  // Release time is directly proportional to valence
  element.carrier.gain.envelope.release = {
    time: ( 5 + 295 * Math.sqrt( valence ) / Math.sqrt( 8 ) ) * ms,//( valence * 25 + Math.random( ) * 25 ) * ms ,
    target: 0
  };
  element.carrier.gain.envelope = context.createEnvelope(
    element.carrier.gain.envelope.attack,
    element.carrier.gain.envelope.decay,
    element.carrier.gain.envelope.sustain,
    element.carrier.gain.envelope.release
  );
  element.envelopes.push( element.carrier.gain.envelope );
  /*
    element.carrier.gain
                   ^
                   |
                   .gain
                   ^
                   |
                   * <-- element.carrier.gain.envelope
  */
  element.carrier.gain.envelope.connect( element.carrier.gain.gain );
  // Create and configure element.carrier.modulator
  element.carrier.modulator = context.createOscillator();
  element.carrier.modulator.type = 'sine';
  element.carrier.modulator.frequency.value = 1 * 440 * Math.pow( 2, ( midiNote - 69 ) / 12 );
  element.carrier.modulator.frequency.detune = -50;
  element.carrier.modulator.start( context.currentTime );
  // Create and configure element.carrier.modulator.gain
  element.carrier.modulator.gain = context.createGain( );
  element.carrier.modulator.gain.gain.value = 500;
  /*
    element.carrier
           ^
           |
           .frequency
           ^
           |
           * <-- element.carrier.modulator.gain
  */
  element.carrier.modulator.gain.connect( element.carrier.frequency );
  /*
    element.carrier.modulator.gain <-- element.carrier.modulator
  */
  element.carrier.modulator.connect( element.carrier.modulator.gain );
  // Create and congifure element.carrier.modulator.gain.envelope
  element.carrier.modulator.gain.envelope = {};
  // The attack target is directly proportional to the valence
  element.carrier.modulator.gain.envelope.attack = {
    target: element.carrier.modulator.gain.gain.value  + 4500 * Math.pow( valence, 2 ) / 64 * Math.random( ),
    time: element.carrier.gain.envelope.attack.time + element.carrier.gain.envelope.decay.time,
    initial: element.carrier.modulator.gain.gain.value
  };
  element.carrier.modulator.gain.envelope.decay = 0;

  element.carrier.modulator.gain.envelope.sustain = element.carrier.modulator.gain.envelope.attack.target;
  element.carrier.modulator.gain.envelope.release = {
    time: element.carrier.gain.envelope.release.time,
    target: element.carrier.modulator.gain.gain.value
  };
  element.carrier.modulator.gain.envelope = context.createEnvelope(
    element.carrier.modulator.gain.envelope.attack,
    element.carrier.modulator.gain.envelope.decay,
    element.carrier.modulator.gain.envelope.sustain,
    element.carrier.modulator.gain.envelope.release
  );
  element.envelopes.push( element.carrier.modulator.gain.envelope );
  /*
    element.carrier.modulator.gain
                             ^
                             |
                             .gain
                             ^
                             |
                             * <-- element.carrier.modulator.gain.envelope
  */
  element.carrier.modulator.gain.envelope.connect( element.carrier.modulator.gain.gain );
  return element;
};