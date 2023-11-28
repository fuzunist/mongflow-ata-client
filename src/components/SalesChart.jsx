import Chart from 'react-apexcharts'
import Col from './Col'
import Card from './Card'
import Dropdown from './Dropdown'

const SalesChart = ({ title }) => {
    const options = {
        chart: {
            type: 'donut'
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            formatter: (val) => {
                                return val
                            },
                            offsetY: 4,
                            color: '#98a6ad'
                        },
                        value: {
                            show: true,
                            formatter: (val) => {
                                return val
                            },
                            color: '#98a6ad'
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#6658dd', '#ff8acc', '#35b8e0'],
        legend: {
            show: true,
            position: 'bottom',
            height: 40,
            labels: {
                useSeriesColors: true
            }
        },
        labels: ['In-Store Sales', 'Download Sales', 'Mail-Order Sales'],
        tooltip: {
            enabled: false
        }
    }

    const apexData = [30, 12, 20]

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
                            type='donut'
                            height={302}
                            className='min-h-[10px] mt-0'
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default SalesChart
