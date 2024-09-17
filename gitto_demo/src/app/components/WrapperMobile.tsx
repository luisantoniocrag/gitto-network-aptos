import { PropsWithChildren } from "react"

const WrapperMobile  : React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 pt-0 max-w-[420px] mx-auto">{children}</div>
    )
}

export default WrapperMobile;