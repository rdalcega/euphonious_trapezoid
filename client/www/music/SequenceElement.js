window.AudioContext.prototype.createSequenceElement = function( midiNote, velocity ) {
  /*
    GRAPH:
    element.sub --> *
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
  // velocity is randomized very slightly
  velocity = velocity + Math.random( ) * 5 - 2.5;
  if( velocity < 0 ) {
    velocity = 0;
  }
};