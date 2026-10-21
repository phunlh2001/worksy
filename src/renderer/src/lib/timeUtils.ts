export interface TimeBreakdown {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export function formatSecondsToTime(totalSeconds: number): TimeBreakdown {
  const d = Math.floor(totalSeconds / 86400)
  const h = Math.floor((totalSeconds % 86400) / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  return {
    days: String(d).padStart(2, '0'),
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0')
  }
}

export function formatSecondsToCompactString(totalSeconds: number): string {
  const { days, hours, minutes, seconds } = formatSecondsToTime(totalSeconds)
  return `${days}d:${hours}h:${minutes}m:${seconds}s`
}
