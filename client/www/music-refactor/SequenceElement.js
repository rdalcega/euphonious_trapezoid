window.AudioContext.prototype.createSequenceElement = function( ) {
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
           |                              * <-- element.carrierGainEnv
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
  var valence = 1;
  var ms = Math.pow( 10, -3 );
  var element = {};
  element.sustain = 5 * ms;
  element.master = context.createGain( );
  element.master.gain.value = 0.5;
  element.envelopes = [];
  element.connect = function( destination ) {
    if( destination.hasOwnProperty( 'input' ) ) {
      element.master.connect( destination.input );
    } else {
      element.master.connect( destination );
    }
  };
  element.disconnect = function( when ) {
    for( var key in element ) {
      var node = element[ key ];
      if( node instanceof AudioNode ) {
        node.disconnect( );
      }
      if( node instanceof AudioOscillator ) {
        node.stop( when );
      }
    }
  };
  // Create and configure element.carrier
  element.carrier = context.createOscillator();
  element.carrier.type = 'sine';
  element.carrier.start( context.currentTime );
  // Create and configure the element.carrier.gain
  element.carrierGain = context.createGain( );
  element.carrierGain.gain.value = 0;
  element.carrier.connect( element.carrierGain );
  // Create and configure element.sub
  element.sub = context.createOscillator();
  element.sub.type = 'sine';
  element.sub.start( context.currentTime );
  // Create and configure the element.sub.gain
  element.subGain = context.createGain( );
  element.subGain.gain.value = 1;
  element.sub.connect( element.subGain );
  element.subGain.connect( element.carrierGain );
  element.carrierGain.connect( element.master );
  // Create and configure element.carrier.gain.envelope
  element.carrierGainEnv = {};
  // Attack time is proportional to valence
  // Attack target is inversely proptional to valence
  element.carrierGainEnv.attack = {
    time: 5  * ms,
    target: 1 / Math.pow( valence, 0.35 ),
    initial: 0
  };
  // Decay time is inversely proportional to valence
  element.carrierGainEnv.decay = 20 * ms;
  // Sustain target is inversely proportional to valence
  element.carrierGainEnv.sustain = 0.5 / Math.pow( valence, 0.35 );
  // Release target is always 0
  // Release time is directly proportional to valence
  element.carrierGainEnv.release = {
    time: 10 * ms,
    target: 0
  };
  element.carrierGainEnv = context.createEnvelope(
    element.carrierGainEnv.attack,
    element.carrierGainEnv.decay,
    element.carrierGainEnv.sustain,
    element.carrierGainEnv.release
  );
  element.envelopes.push( element.carrierGainEnv );
  element.carrierGainEnv.connect( element.carrierGain.gain );
  // Create and configure element.carrier.modulator
  element.modulator = context.createOscillator();
  element.modulator.type = 'sine';
  element.modulator.frequency.detune = -50;
  element.modulator.start( context.currentTime );
  // Create and configure element.modulator.gain
  element.modulatorGain = context.createGain( );
  element.modulatorGain.gain.value = 500;
  element.modulatorGain.connect( element.carrier.frequency );
  /*
    element.carrier.modulator.gain <-- element.carrier.modulator
  */
  element.modulator.connect( element.modulatorGain );
  // Create and congifure element.carrier.modulator.gain.envelope
  element.modulatorGainEnv = {};
  // The attack target is directly proportional to the valence
  element.modulatorGainEnv.attack = {
    target: element.modulatorGain.gain.value  + 4500 * Math.pow( valence, 2 ) / 64 * Math.random( ),
    time: element.carrierGainEnv.attack.time + element.carrierGainEnv.decay.time,
    initial: element.modulatorGain.gain.value
  };
  element.modulatorGainEnv.decay = 0;
  element.modulatorGainEnv.sustain = element.modulatorGainEnv.attack.target;
  element.modulatorGainEnv.release = {
    time: element.carrierGainEnv.release.time,
    target: element.modulatorGain.gain.value
  };
  element.modulatorGainEnv = context.createEnvelope(
    element.modulatorGainEnv.attack,
    element.modulatorGainEnv.decay,
    element.modulatorGainEnv.sustain,
    element.modulatorGainEnv.release
  );
  element.envelopes.push( element.modulatorGainEnv );
  element.modulatorGainEnv.connect( element.modulatorGain.gain );
  element.start = function( when, midiNote, valence ) {
    setTimeout( function( ) {
      midiNote = midiNote + Math.random() * 0.1 - 0.05;
      var fundamental = 440 * Math.pow( 2, ( midiNote - 69 ) / 12 );
      element.carrier.frequency.value = 3 * fundamental;
      element.modulator.frequency.value = 1 * fundamental;
      element.sub.frequency.value = 0.5 * fundamental;
      var carrierGainEnv = element.envelopes[ 0 ];
      carrierGainEnv.setAttack({
        time: 5  * ms,
        target: 1 / Math.pow( valence, 0.35 ),
        initial: 0
      });
      carrierGainEnv.setSustain( 0.5 / Math.pow( valence, 0.35 ) );
      var modulatorGainEnv = element.envelopes[ 1 ];
      modulatorGainEnv.setAttack({
        target: element.modulatorGain.gain.value  + 4500 * Math.pow( valence, 2 ) / 64 * Math.random( ),
        time: element.carrierGainEnv.attack.time + element.carrierGainEnv.decay.time,
        initial: element.modulatorGain.gain.value
      });
      modulatorGainEnv.setSustain( element.modulatorGainEnv.attack.target );
      element.envelopes.forEach( function( envelope ) {
        envelope.on( when, element.sustain );
      });
    }, ( when - context.currentTime - 0.01 ) * 1000 );
  };
  return element;
};