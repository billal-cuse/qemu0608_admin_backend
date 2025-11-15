import React, {forwardRef} from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string;
    className?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({label, className, ...rest}, ref) => {
    return (
        <div className={`rounded px-3 relative border border-[#002454] p-3 ${className}`}>
                        <span className={`absolute bg-[#f6f6f6] transform -translate-y-5 text-sm transition-all duration-300 font-[500] px-1 `}>
                            {label}
                        </span>
            <div className={"flex gap-3"}>
                <input
                    ref={ref}
                    {...rest}
                    className={"outline-none border-0 w-full bg-transparent"} />
            </div>
        </div>
    );
});

export default Input;