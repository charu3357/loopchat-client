import React from 'react'
import {floor} from 'lodash'

/**
 * pixel scale defaults (DEPRECATED)
 */
export const DEFAULT_NOTE_PIXELS_PER_WIDTH_PIXELS = 1 / 30 // pixels/pixels
export const DEFAULT_NOTE_PIXELS_PER_HEIGHT_PIXELS = 1 / 20 // pixels/pixels


/**
 * timeline dimension constants
 */
export const DEFAULT_TIMELINE_LENGTH = 1024 * 18 // svg units
export const DEFAULT_UNIT_LENGTH_PER_SECOND = 50 // svg units / second
export const DEFAULT_N_SECONDS = floor(DEFAULT_TIMELINE_LENGTH / DEFAULT_UNIT_LENGTH_PER_SECOND) // ~ 6 minutes

export const DEFAULT_UNIT_HEIGHT_PER_KBD_NOTE = 10 // svg units / note

export const MIDI_OCATAVES = 10
export const MIDI_NOTE_MIN = 0
export const MIDI_NOTE_MAX = 127
