interface ThrottleType {
    throttle: Function
}

export default function Throttle(): ThrottleType {
    let timeOut: any = null

    return {
        throttle: (timeO: number, fn: Function) => {
            if (timeOut) {
                return
            } else {
                timeOut = setTimeout(() => {
                    fn()
                    timeOut = null
                }, timeO)
            }
        }
    }

}