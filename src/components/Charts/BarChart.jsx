import { useMemo } from 'react'
import Chart from 'react-apexcharts'

const BarChart = ({ name, categories, datas, colors, theme, height = 268, ...props }) => {
    const options = useMemo(() => {
        return {
            chart: {
                type: 'bar',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '20%'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: false
            },
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
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            fill: {
                opacity: 1
            },
            colors,
            tooltip: {
                theme
            }
        }
    }, [theme, categories, colors])

    const apexSeries = useMemo(() => {
        return [
            {
                name,
                data: datas
            }
        ]
    }, [name, datas])

    return (
        <Chart
            options={options}
            series={apexSeries}
            type='bar'
            height={height}
            {...props}
        />
    )
}

export default BarChart
