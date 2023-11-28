import { useMemo } from 'react'
import Chart from 'react-apexcharts'

const LineChart = ({ name, categories, datas, colors, theme, height = 268, ...props }) => {
    const options = useMemo(() => {
        return {
            chart: {
                height,
                type: 'line',
                toolbar: {
                    show: false
                },
                stacked: false,
                zoom: {
                    enabled: false
                }
            },
            stroke: {
                curve: 'smooth',
                width: [3, 3]
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            fill: {
                type: 'solid',
                opacity: [0, 1]
            },
            colors,
            xaxis: {
                categories,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: theme === 'dark' ? '#adb5bd' : '#6c757d'
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                min: 0,
                max: Math.max.apply(null, datas),
                labels: {
                    style: {
                        colors: theme === 'dark' ? '#adb5bd' : '#6c757d'
                    }
                }
            },
            grid: {
                show: false,
                padding: {
                    top: 0,
                    bottom: 0
                }
            },
            tooltip: {
                theme
            }
        }
    }, [theme, categories, colors])

    const apexSeries = useMemo(() => {
        return [
            {
                name,
                type: 'area',
                data: datas
            }
        ]
    }, [name, datas])

    return (
        <Chart
            options={options}
            series={apexSeries}
            type='line'
            height={height}
            {...props}
        />
    )
}

export default LineChart
