import classNames from 'classnames'

const Badge = ({ variant, children }) => {
    return (
        <div
            className={classNames(
                'py-1 px-2.5 leading-none flex flex-col justify-center items-center font-bold gap-1 max-w-fit rounded-full text-white text-[10px]',
                {
                    'bg-success': variant === 'success',
                    'bg-danger': variant === 'danger',
                    'bg-pink': variant === 'pink'
                }
            )}
        >
            {children}
        </div>
    )
}

export default Badge
