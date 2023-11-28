import Chart from 'react-apexcharts'
import Col from './Col'
import Card from './Card'
import Dropdown from './Dropdown'

const StatisticsWidget1 = ({ title, data, color, stats, subTitle }) => {
    const options = {
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '75%'
                },
                track: {
                    background: color,
                    opacity: 0.3,
                    margin: 0
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: true,
                        color: color,
                        fontWeight: 700,
                        fontSize: '14px',
                        offsetY: 5,
                        formatter: (val) => {
                            return String(val)
                        }
                    }
                }
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        colors: [color]
    }

    const series = [data]

    return (
        <Col variant='md'>
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
                        <div className='float-left'>
                            <Chart
                                options={options}
                                series={series}
                                type='radialBar'
                                height={77}
                                width={77}
                                className='min-h-[10px] mt-0'
                            />
                        </div>
                        <div className='text-right'>
                            <h2 className='text-text-dark-light dark:text-text-dark-dark pt-3 mb-1 text-2xl'>{stats}</h2>
                            <p>{subTitle}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default StatisticsWidget1
