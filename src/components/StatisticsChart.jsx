import Chart from 'react-apexcharts'
import Col from './Col'
import Card from './Card'
import Dropdown from './Dropdown'

const StatisticsChart = ({ title }) => {
    const options = {
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
            categories: ['2010', '2011', '2012', '2013', '2014', '2015'],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: '#adb5bd'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#adb5bd'
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
        colors: ['#188ae2'],
        tooltip: {
            theme: 'dark'
        }
    }

    const apexData = [
        {
            name: 'Statistics',
            data: [75, 42, 75, 38, 19, 93]
        }
    ]

    return (
        <Col>
            <Card>
                <Card.Body>
                    <Dropdown>
                        <span>Action</span>
                        <span>Anothther Action</span>
                        <span>Something Else</span>
                        <span>Separated link</span>
                    </Dropdown>
                    <h4 className='text-text-dark-light dark:text-text-dark-dark text-base mb-9'>{title}</h4>
                    <div>
                        <Chart
                            options={options}
                            series={apexData}
                            type='bar'
                            height={268}
                            className='min-h-[10px] mt-0'
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default StatisticsChart
