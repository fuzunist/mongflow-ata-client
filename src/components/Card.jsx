const Body = ({ children, ...props }) => {
    return (
        <div
            className='flex-[1_1_auto] p-6 overflow-hidden'
            {...props}
        >
            {children}
        </div>
    )
}

const Card = ({ children }) => {
    return (
        <div className='mb-6 relative flex-1 w-full flex flex-col break-words bg-card-bg-light dark:bg-card-bg-dark rounded overflow-hidden shadow-box-sm'>
            {children}
        </div>
    )
}

Card.Body = Body

export default Card
