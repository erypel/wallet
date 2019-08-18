const rippleOffset = 946684800 //seconds

export default function rippleTimeToIso8601(rippleTime: number): Date {
    return new Date(rippleTime - rippleOffset)
}