import classNames from 'classnames'

const ProgressBar = ({ progress, variant }) => {
    return (
        <div
            className={classNames('h-1.5 mt-4 rounded w-full', {
                'bg-success/[0.2]': variant === 'success',
                'bg-danger/[0.20]': variant === 'danger',
                'bg-pink/[0.2]': variant === 'pink'
            })}
        >
            <div
                style={{ width: `${progress}%` }}
                className={classNames('block h-1.5 rounded', {
                    'bg-success': variant === 'success',
                    'bg-danger': variant === 'danger',
                    'bg-pink': variant === 'pink'
                })}
            />
        </div>
    )
}

export default ProgressBar
