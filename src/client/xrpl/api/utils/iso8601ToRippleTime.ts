import api from './apiConnector'

/**
 * 
 * This method parses a string representation of a date, and 
 * returns the number of seconds since the "Ripple Epoch" of 
 * January 1, 2000 (00:00 UTC).
 * 
 * The Ripple Epoch is 946684800 seconds after the Unix Epoch.
 * 
 * This method is useful for creating timestamps to use with 
 * the rippled APIs. The rippled APIs represent time as an 
 * unsigned integer of the number of seconds since the Ripple 
 * Epoch
 * 
 * @param iso8601 A string representing a date and time. This 
 * string is parsed using JavaScript's Date.parse() method
 */
export default function iso8601ToRippleTime(iso8601: string): string {
    return api.iso8601ToRippleTime(iso8601)
}