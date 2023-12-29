const Body = ({ children, ...props }) => {
  return (
    <div
      className={`flex-[1_1_auto] flex-col p-6 overflow-x-scroll text-xs md:text-sm xl:text-base`}
      {...props}
    >
      {children}
    </div>
  );
};

const Card = ({ children }) => {
  return (
    <div className="mb-6 relative flex-1 w-full flex flex-col break-words bg-card-bg-light dark:bg-card-bg-dark rounded overflow-x-auto shadow-box-sm justify-center ">
      {children}
    </div>
  );
};

Card.Body = Body;

export default Card;
