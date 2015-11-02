window.AudioContext.prototype.createDroneElement = function( midiNote ) {
  var element = {};
  var context = this;
  var fundamental = 440 * Math.pow( 2, ( midiNote - 69 ) / 12 );
  element.master = context.createGain( );
  element.master.connect( context.destination );
  element.master.gain.value = 0;
  // Initialize the three oscillators
  var waves = [ 'triangle', 'square', 'sawtooth', 'sine' ];
  var filters = [ 'lowpass', 'highpass', 'bandpass' ];
  for( var i = 1; i <= 3; i++ ) {
    element[ 'filter' + i ] = context.createBiquadFilter( );
    element[ 'filter' + i ].frequency.value = fundamental * 1.5;
    element[ 'filter' + i ].type = 'lowpass';
    element[ 'filter' + i ].connect( element.master );
    element[ 'gain' + i ] = context.createGain( );
    element[ 'gain' + i ].gain.value = 1;
    element[ 'gain' + i ].connect( element[ 'filter' + i ] );
    element[ 'glfogain' + i ] = context.createGain( );
    element[ 'glfogain' + i ].gain.value = 0.1 + Math.random( ) * 0.2;
    element[ 'glfogain' + i ].connect( element[ 'gain' + i ].gain );
    element[ 'glfo' + i ] = context.createOscillator( );
    element[ 'glfo' + i ].frequency.value = 0.1 + Math.random( ) * 2.9;
    element[ 'glfo' + i ].type = 'sine';
    element[ 'glfo' + i ].start( context.currentTime );
    element[ 'glfo' + i ].connect( element[ 'glfogain' + i ] );
    element[ 'osc' + i ] = context.createOscillator( );
    element[ 'osc' + i ].frequency.value = fundamental;
    element[ 'osc' + i ].detune.value = Math.random( ) * 50 - 25;
    element[ 'osc' + i ].type = 'triangle';
    element[ 'osc' + i ].start( context.currentTime );
    element[ 'osc' + i ].connect( element[ 'gain' + i ] );
  }
  element.rotate = function( midiNote, when ) {
    fundamental = 440 * Math.pow( 2, ( midiNote - 69 ) / 12 );
    for( var i = 1; i <= 3; i++ ) {
      element[ 'osc' + i ].frequency.setTargetAtTime( fundamental, when, 0.75 );
      element[ 'filter' + i ].frequency.value = fundamental * 1.5;
    }
  };
  element.start = function( when ) {
    // Just come in slowly
    element.master.gain.setTargetAtTime( 1, when, 25 );
    // And then schedule changes on every parameter
    // but the oscillator frequencies every second
    element.playing = true;
    var schedule = function( ) {
      if( element.playing ) {
        setTimeout( schedule, 1000 );
      }
      for( var i = 1; i <= 3; i++ ) {
        var glfofreq = element[ 'glfo' + i ].frequency.value;
        glfofreq *= 1 + Math.random( ) * 3 - 0.15;
        if( glfofreq < 0.1 ) {
          glfofreq = 0.1;
        } else if( glfofreq > 4 ) {
          glfofreq = 4;
        }
        element[ 'glfo' + i ].frequency.setTargetAtTime( glfofreq, context.currentTime, 1 );
        var glfogain = element[ 'glfogain' + i ].gain.value;
        glfogain *= 1 + Math.random( ) * 0.3 - 0.15;
        if( glfogain <= 0 ) {
          glfogain = 0.1;
        } else if( glfogain > 0.3 ) {
          glfogain = 0.3;
        }
        element[ 'glfogain' + i ].gain.setTargetAtTime( glfogain, context.currentTime, 1 );
      }
    };
    schedule( );
  };
  return element;
};