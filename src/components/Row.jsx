import classNames from 'classnames'

const Row = ({ align, children }) => {
    return (
        <div
            className={classNames('flex flex-wrap -mx-3', {
                'justify-center': align === 'center',
                'justify-start': align === 'left',
                'justify-end': align === 'right'
            })}
        >
            {children}
        </div>
    )
}

export default Row
