import { CategoryScale, ChartConfiguration, Chart as ChartJS, Filler, LinearScale, LineController, LineElement, PointElement, Tooltip } from "chart.js"
import { useEffect, useRef } from "react"

// Register Chart.js components including LineController
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Filler, Tooltip)

interface MiniChartProps {
  data: number[]
  labels?: string[]
  color?: string
  isHighlight?: boolean
}

const currentColor = "#9ae600" // lime-400

export const MiniChart = ({ data, labels, color = currentColor, isHighlight = false }: MiniChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS | null>(null)

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return

    // Destroy existing chart first
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const chartColor = isHighlight ? color : "#ffffff"
    const borderWidth = 2.5 // Slightly thicker line for better visibility
    // const padding = Math.ceil(borderWidth / 2) + 2 // Half the border width plus 2px buffer

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        datasets: [
          {
            data: data.map((value, index) => ({ x: index, y: value })), // Use x,y coordinates
            borderColor: chartColor,
            backgroundColor: "transparent", // No background fill
            borderWidth: borderWidth,
            fill: false, // No fill - just the line
            tension: 0, // No smoothing - rough edges
            pointRadius: 0,
            pointHoverRadius: 0,
            spanGaps: false, // Don't span gaps
            stepped: false, // Ensure continuous line
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(17, 24, 39, 0.95)", // coolgray-900 with transparency
            titleColor: "#ffffff",
            bodyColor: "#d1d5db", // coolgray-300
            borderColor: "rgba(156, 163, 175, 0.2)",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              title: function (tooltipItems) {
                const dataIndex = Math.round(tooltipItems[0]?.parsed?.x || 0)
                if (labels && labels[dataIndex]) {
                  return labels[dataIndex] // Show full date in tooltip
                }
                return ""
              },
              label: function (context) {
                const value = context.parsed.y
                if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)}B`
                if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
                if (value >= 1000) return `${(value / 1000).toFixed(2)}K`
                return value.toFixed(2)
              },
            },
          },
        },
        scales: {
          x: {
            type: "linear",
            display: true,
            min: 0, // Start from first data point
            max: data.length - 1, // End at last data point
            grid: {
              display: true,
              color: "rgba(156, 163, 175, 0.2)",
              lineWidth: 0.5,
              drawOnChartArea: true,
            },
            ticks: {
              display: true,
              maxTicksLimit: labels && labels.length > 14 ? 4 : 3, // More ticks for longer periods
              color: "rgba(156, 163, 175, 0.6)",
              font: {
                size: 10,
              },
              padding: 6,
              stepSize: Math.ceil((data.length - 1) / 3), // Distribute ticks evenly
              callback: function (value, index, values) {
                const dataIndex = Math.round(Number(value))
                if (labels && labels[dataIndex]) {
                  const label = labels[dataIndex]
                  // Show only month-day for mini chart (e.g., "07-25")
                  return label ? label.slice(-5) : ""
                }
                return ""
              },
            },
            border: {
              display: false,
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "right",
            beginAtZero: false,
            grace: "6%", // Reduced grace to use more vertical chart space
            grid: {
              display: true,
              color: "rgba(156, 163, 175, 0.2)",
              lineWidth: 0.5,
              drawOnChartArea: true,
            },
            ticks: {
              display: true,
              maxTicksLimit: 4, // Allow up to 4 y-axis reference points
              color: "rgba(156, 163, 175, 0.6)",
              font: {
                size: 10,
              },
              padding: 4, // Further reduced padding for more chart area
              callback: function (value) {
                // Format numbers compactly for mini chart
                const numValue = Number(value)
                if (numValue >= 1000000000) return (numValue / 1000000000).toFixed(1) + "B"
                if (numValue >= 1000000) return (numValue / 1000000).toFixed(1) + "M"
                if (numValue >= 1000) return (numValue / 1000).toFixed(1) + "K"
                return numValue.toFixed(0)
              },
            },
            border: {
              display: false,
            },
          },
        },
        elements: {
          line: {
            borderJoinStyle: "round",
          },
          point: {
            radius: 0,
          },
        },
        animation: {
          duration: 800,
          easing: "easeInOutQuart",
        },
      },
    }

    try {
      chartRef.current = new ChartJS(ctx, config)
    } catch (error) {
      console.error("Error creating chart:", error)
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [data, labels, color, isHighlight])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [])

  if (data.length === 0) return null

  return (
    <div className="relative h-48 w-full overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />
    </div>
  )
}
