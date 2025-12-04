import { type MetricData } from '@/components/CaseStudyMetrics'
import { type ImpactMetricProps } from '@/components/case-studies/ImpactMetric'

/**
 * Parses a stat string and extracts the numeric value and suffix
 * Examples:
 * - "$2.3M" → { value: 2.3, suffix: "M" }
 * - "+13%" → { value: 13, suffix: "%" }
 * - "-14%" → { value: 14, suffix: "%" }
 * - "78%" → { value: 78, suffix: "%" }
 * - "1.7 min" → { value: 1.7, suffix: " min" }
 * - "8.9s" → { value: 8.9, suffix: "s" }
 * - "5" → { value: 5, suffix: undefined }
 */
function parseStat(stat: string): { value: number; suffix?: string } {
  // Remove leading/trailing whitespace
  const cleaned = stat.trim()
  
  // Handle currency with M/K suffix (e.g., "$2.3M", "$1.5K")
  const currencyMatch = cleaned.match(/^\$?([\d.]+)([MK])$/i)
  if (currencyMatch) {
    return {
      value: parseFloat(currencyMatch[1]),
      suffix: currencyMatch[2].toUpperCase(),
    }
  }
  
  // Handle percentages with +/- (e.g., "+13%", "-14%", "78%")
  const percentMatch = cleaned.match(/^[+-]?([\d.]+)%$/)
  if (percentMatch) {
    // Extract absolute value (remove sign)
    return {
      value: parseFloat(percentMatch[1]),
      suffix: '%',
    }
  }
  
  // Handle time values (e.g., "1.7 min", "8.9s", "3.8 min")
  const timeMatch = cleaned.match(/^([\d.]+)\s*(min|s|sec|seconds?)$/i)
  if (timeMatch) {
    return {
      value: parseFloat(timeMatch[1]),
      suffix: timeMatch[2].toLowerCase() === 'min' ? ' min' : timeMatch[2].toLowerCase(),
    }
  }
  
  // Handle plain numbers or numbers with other suffixes
  const numberMatch = cleaned.match(/^([\d.]+)(.*)$/)
  if (numberMatch) {
    const value = parseFloat(numberMatch[1])
    const remaining = numberMatch[2].trim()
    
    // If there's remaining text, use it as suffix
    if (remaining) {
      return {
        value,
        suffix: remaining,
      }
    }
    
    // Plain number
    return {
      value,
      suffix: undefined,
    }
  }
  
  // Fallback: try to parse as number
  const numericValue = parseFloat(cleaned)
  if (!isNaN(numericValue)) {
    return {
      value: numericValue,
      suffix: undefined,
    }
  }
  
  // If all else fails, return as-is with empty value
  return {
    value: 0,
    suffix: cleaned,
  }
}

/**
 * Converts MetricData to ImpactMetricProps format
 * Removes change, changeType, previousStat, and positive fields
 * Manually sets highlight based on provided flag or defaults to false
 */
export function convertMetricToImpact(
  metric: MetricData,
  highlight: boolean = false
): ImpactMetricProps {
  const { value, suffix } = parseStat(metric.stat)
  
  return {
    label: metric.name,
    value,
    suffix,
    description: metric.description,
    highlight,
  }
}

/**
 * Converts an array of MetricData to ImpactMetricProps
 * Optionally accepts a function to determine highlight status for each metric
 */
export function convertMetricsToImpact(
  metrics: MetricData[],
  getHighlight?: (metric: MetricData, index: number) => boolean
): ImpactMetricProps[] {
  return metrics.map((metric, index) => {
    const highlight = getHighlight ? getHighlight(metric, index) : false
    return convertMetricToImpact(metric, highlight)
  })
}

