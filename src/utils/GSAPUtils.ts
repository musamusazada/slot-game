import { gsap } from "gsap";


export class GSAPUtils {
    private constructor() {}

    static delay(s: number): Promise<void> {
        return new Promise((resolve)=> {
            return gsap.delayedCall(s, resolve)
        })
    }
}