const rippleOffset = 946684800 //seconds

export default function rippleTimeToIso8601(rippleTime: number): Date {
    //need to convert time in seconds to time in milliseconds
    return new Date(rippleTime*1000 + rippleOffset*1000)
}