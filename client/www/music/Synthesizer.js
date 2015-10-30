AudioContext.prototype.createSynthesizer = function( ) {

  // This is a very conservative abstraction

  // of the architecture used in Bass, Clap,

  // ClosedHat, Kick, and OpenHat. Basically,

  // each of the above is a starteable, connectable

  // graph with a master bus. The details of the

  // graph are not included in this abstraction

  // in order to avoid imposing constraints on

  // what those graphs may consist of. 

  var context = this;

  var synthesizer = {};

  synthesizer.envelopes = [];

  synthesizer.master = {};

  synthesizer.master.gain = context.createGain( );

  synthesizer.master.input = synthesizer.master.gain;

  synthesizer.master.output = synthesizer.master.gain;

  synthesizer.setMasterGain = function( gain ) {

    synthesizer.master.gain.gain.value = gain;

  };

  synthesizer.setSustain = function( sustain ) {

    synthesizer.sustain = sustain;

  };

  synthesizer.connect = function( destination ) {

    if( destination.hasOwnProperty( 'input' ) ) {

      synthesizer.master.output.connect( destination.input );

    } else {

      synthesizer.master.output.connect( destination );

    }

  };

  synthesizer.disconnect = function( destination ) {

    if( destination ) {

      if( destination.hasOwnProperty( 'input' ) ) {

        synthesizer.master.output.disconnect( destination.input );

      } else {

        synthesizer.master.output.disconnect( destination );

      }

    } else {

      synthesizer.master.output.disconnect( );

    }

  };

  synthesizer.start = function( when ) {

    synthesizer.envelopes.forEach( function( envelope ) {

      envelope.on( when, synthesizer.sustain );

    });

  };

  return synthesizer;
  
};