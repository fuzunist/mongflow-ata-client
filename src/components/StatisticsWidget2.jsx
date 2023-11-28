import ProgressBar from './ProgressBar'
import Badge from './Badge'
import Col from './Col'
import Card from './Card'
import Dropdown from './Dropdown'

const StatisticsWidget2 = ({ variant, title, trendValue, trendIcon: TrendIcon, stats, subTitle, progress }) => {
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
                        <div className='text-right'>
                            <Badge variant={variant}>
                                {trendValue}{' '}
                                <TrendIcon
                                    size={10}
                                    strokeWidth={3}
                                />
                            </Badge>
                            <h2 className='text-text-dark-light dark:text-text-dark-dark pt-3 mb-1 text-2xl'>{stats}</h2>
                            <p>{subTitle}</p>
                        </div>
                        <ProgressBar
                            progress={progress}
                            variant={variant}
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default StatisticsWidget2
