import classNames from 'classnames'

const Col = ({ variant = 'lg', children }) => {
    return (
        <div
            className={classNames('flex min-[768px]:basis-auto min-[768px]:grow-0 shrink-0 px-3 overflow-hidden', {
                'min-[768px]:w-1/2 min-[1200px]:w-1/4 w-full': variant === 'md',
                'min-[1200px]:w-1/3 w-full': variant === 'lg',
                'w-1/2': variant === '1/2',
                'w-full': variant === 'full'
            })}
        >
            {children}
        </div>
    )
}

export default Col
