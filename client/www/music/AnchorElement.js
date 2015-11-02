AudioContext.prototype.createAnchorElement = function( midiNote ) {
  /*
    GRAPH:

    anchor.sub --> anchor.sub.firstGain --> anchor.sub.secondGain --> anchor.master --> destination
        ^                ^                      ^
        |                |                      |
        .frequency       .gain                  .gain
        ^                ^                      ^
        |                |                      |
        |                |                      * <-- anchor.sub.secondGain.envelope
        |                |
        |                * <-- anchor.sub.firstGain.whiteNoise.gain *
        |                                                         ^
        |                                                         |
        |                                                         * <-- anchor.sub.firstGain.whiteNoise
        |
        * <-- anchor.sub.frequency.envelope
  */

  // midiNote defaults to C2

  var context = this;

  midiNote = midiNote || 36;

  var anchor = context.createSynthesizer( );

  var ms = Math.pow( 10, -3 );

  anchor.setSustain( 200 * ms );

  anchor.setMasterGain( 0.75 );

  // Create and configure anchor.sub

  anchor.sub = context.createOscillator( );

  anchor.sub.type = 'sine';

  anchor.sub.frequency.value = 440 * Math.pow( 2, ( midiNote - 12 - 69 ) / 12 );

  anchor.sub.start( context.currentTime );

  // Create anchor.sub.frequency.envelope

  anchor.sub.frequency.envelope = {};

  anchor.sub.frequency.envelope.attack = {

    time: 1 * ms,

    target: 440 * Math.pow( 2, ( midiNote + 24 - 69 ) / 12 ),

    initial: 440 * Math.pow( 2, ( midiNote + 22 - 69 ) / 12 )

  };

  anchor.sub.frequency.envelope.decay =  74 * ms;

  anchor.sub.frequency.envelope.sustain = 440 * Math.pow( 2, ( midiNote - 69 ) / 12 );

  anchor.sub.frequency.envelope.release = {

    time: 25 * ms,

    target: 440 * Math.pow( 2, ( midiNote - 12 - 69 ) / 12 )

  };

  anchor.sub.frequency.envelope = context.createEnvelope(

    anchor.sub.frequency.envelope.attack,

    anchor.sub.frequency.envelope.decay,

    anchor.sub.frequency.envelope.sustain,

    anchor.sub.frequency.envelope.release

  );

  anchor.envelopes.push( anchor.sub.frequency.envelope );

  /*

  anchor.sub
      ^
      |
      .frequency
      ^
      |
      * <-- anchor.sub.frequency.envelope

  */

  anchor.sub.frequency.envelope.connect( anchor.sub.frequency );

  // Create and configure anchor.sub.firstGain

  anchor.sub.firstGain = context.createGain( );

  anchor.sub.firstGain.gain.value = 1;

  /*

  anchor.sub --> anchor.sub.firstGain

  */

  anchor.sub.connect( anchor.sub.firstGain );

  // Create and configure anchor.sub.firstGain.whiteNoise

  anchor.sub.firstGain.whiteNoise = context.createWhiteNoise( );

  // Create and configure anchor.sub.firstGain.whiteNoise.gain

  anchor.sub.firstGain.whiteNoise.gain = context.createGain( );

  anchor.sub.firstGain.whiteNoise.gain.gain.value = 0.0005;

  /*

  anchor.sub.firstGain.whiteNoise.gain *
                                     ^
                                     |
                                     * <-- anchor.sub.firstGain.whiteNoise

  */

  anchor.sub.firstGain.whiteNoise.connect( anchor.sub.firstGain.whiteNoise.gain );

  anchor.sub.firstGain.whiteNoise.start( context.currentTime );

  /*

  anchor.sub.firstGain
          ^
          |
          .gain
          ^
          |
          * <-- anchor.sub.firstGain.whiteNoise.gain

  */

  anchor.sub.firstGain.whiteNoise.gain.connect( anchor.sub.firstGain );

  // Create and configure anchor.sub.secondGain

  anchor.sub.secondGain = context.createGain( );

  anchor.sub.secondGain.gain.value = 0;

  /*

  anchor.sub.firstGain --> anchor.sub.secondGain

  */

  anchor.sub.firstGain.connect( anchor.sub.secondGain );

  /*

  anchor.sub.secondGain --> anchor.sub.master.gain

  */

  anchor.sub.secondGain.connect( anchor.master.input );

  // Create and configure anchor.sub.secondGain.envelope

  anchor.sub.secondGain.envelope = {};

  anchor.sub.secondGain.envelope.attack = 1 * ms;

  anchor.sub.secondGain.envelope.decay = 74 * ms;

  anchor.sub.secondGain.envelope.sustain = 0.25;

  anchor.sub.secondGain.envelope.release = 25 * ms;

  anchor.sub.secondGain.envelope = context.createEnvelope(

    anchor.sub.secondGain.envelope.attack,

    anchor.sub.secondGain.envelope.decay,

    anchor.sub.secondGain.envelope.sustain,

    anchor.sub.secondGain.envelope.release

  );

  anchor.envelopes.push( anchor.sub.secondGain.envelope );

  /*

  anchor.sub.secondGain
          ^
          |
          .gain
          ^
          |
          * <-- anchor.sub.secondGain.envelope

  */

  anchor.sub.secondGain.envelope.connect( anchor.sub.secondGain.gain );

  return anchor;
  
};