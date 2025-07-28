import { CategoryScale, ChartConfiguration, Chart as ChartJS, Filler, LinearScale, LineController, LineElement, PointElement, Tooltip } from "chart.js"
import { useEffect, useRef } from "react"

// Register Chart.js components including LineController
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Filler, Tooltip)

interface MiniChartProps {
  data: number[]
  color?: string
  isHighlight?: boolean
}

export const MiniChart = ({ data, color = "#ffffff", isHighlight = false }: MiniChartProps) => {
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

    const chartColor = isHighlight ? "#ffffff" : "#ffffff"
    const borderWidth = 4
    const padding = Math.ceil(borderWidth / 2) + 2 // Half the border width plus 2px buffer

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels: data.map((_, index) => `Day ${index + 1}`), // Simple labels
        datasets: [
          {
            data: data,
            // borderColor: chartColor,
            borderColor: `${chartColor}70`,
            // backgroundColor: `${chartColor}20`, // 20% opacity
            backgroundColor: "transparent", // No background fill
            borderWidth: borderWidth,
            fill: false, // No fill - just the line
            tension: 0, // No smoothing - rough edges
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: padding,
            bottom: padding,
            left: padding,
            right: padding,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
            grid: {
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
  }, [data, color, isHighlight])

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
    <div style={{ height: "50px", width: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
