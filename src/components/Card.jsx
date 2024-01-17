import classNames from "classnames";

const Body = ({ children, ...props }) => {
  return (
    <div
      className={`flex-[1_1_auto] flex-col p-6 text-xs md:text-sm xl:text-base`}
      {...props}
    >
      {children}
    </div>
  );
};

const Card = ({ variant = "base", children }) => {
  return (
    <div className={classNames("mb-6 relative flex-1 w-full flex flex-col break-words bg-card-bg-light dark:bg-card-bg-dark rounded shadow-box-sm justify-center ",
    {
      "overflow-auto": variant === "overflow",
      " ": variant === "base",

    })}>
      {children}
    </div>
  );
};

Card.Body = Body;

export default Card;
