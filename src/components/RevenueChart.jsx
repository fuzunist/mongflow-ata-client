import Chart from 'react-apexcharts'
import Col from './Col'
import Card from './Card'
import Dropdown from './Dropdown'

const RevenueChart = ({ title }) => {
    const options = {
        chart: {
            height: 350,
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
        colors: ['#3cc469', '#188ae2'],
        xaxis: {
            categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
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
            tickAmount: 4,
            min: 0,
            max: 100,
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
                bottom: 0
            }
        },
        tooltip: {
            theme: 'dark'
        }
    }

    const series = [
        {
            name: 'Series A',
            type: 'area',
            data: [50, 75, 30, 50, 75, 50, 75, 100]
        },
        {
            name: 'Series B',
            type: 'line',
            data: [0, 40, 80, 40, 10, 40, 50, 70]
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
                            series={series}
                            type='line'
                            height={268}
                            className='min-h-[10px] mt-0'
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default RevenueChart
