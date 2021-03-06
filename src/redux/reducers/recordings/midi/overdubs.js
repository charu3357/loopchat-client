import {get, keys, merge, omit, reduce} from 'lodash'
import {
  MIDI_OVERDUB_RECORDING_STARTED,
  MIDI_OVERDUB_RECORDING_STARTED_BY_PEER,
  MIDI_OVERDUB_RECORDING_STOPPED,
  MIDI_OVERDUB_RECORDING_STOPPED_BY_PEER,
  MIDI_EVENT_RECORDED,
  MIDI_EVENT_RECORDED_BY_PEER,
} from '../../../actions/recordings/midi/midi'
import {newOverdub} from '../../../../types/recording'


export const overdubs = (state = {}, action) => {
  switch (action.type) {
  case MIDI_OVERDUB_RECORDING_STARTED_BY_PEER:
  case MIDI_OVERDUB_RECORDING_STARTED:
    return createOverdubs(state, action.payload.recordingContexts)
  case MIDI_OVERDUB_RECORDING_STOPPED_BY_PEER:
  case MIDI_OVERDUB_RECORDING_STOPPED:
    return annihilateOverdubs(state, action.payload.recordingContexts)
  case MIDI_EVENT_RECORDED_BY_PEER:
  case MIDI_EVENT_RECORDED:
    return recordEvent(state, action.payload.overdubId, action.payload.event)
  default:
    return state
  }
}

/**
 * createOverdubs bulk creates new overdubs. 
 *
 * @param state :: {}
 * @param recordingContexts :: [{recordingId, inputDevice, overdub}]
 */
export const createOverdubs = (state, recordingContexts) =>
  reduce(
    recordingContexts,
    (oldState, recordingContext) => ({
      ...oldState,
      [recordingContext.overdub.id]: recordingContext.overdub,
    }),
    state,
  )

export const annihilateOverdubs = (state, recordingContexts) =>
  reduce(
    recordingContexts,
    (oldState, recordingContext) => omit(oldState, recordingContext.overdub.id),
    state,
  )

/**
 * recordEvent takes an overdubId and a midiEvent and appends the new event to the array
 * of previously recorded events within the overdub state. 
 *
 * @param {} state
 * @param {} overdubId
 * @param {} midiEvent
 * @returns {} 
 */
export const recordEvent = (state, overdubId, midiEvent) => {
  const events = get(state, `${overdubId}.events`)
  
  return {
    ...state,
    [overdubId]: {
      ...get(state, overdubId),
      events: [...events, midiEvent]
    }
  }
}
