"use client"
// calendlyDynamic.tsx

import { PopupButton } from "react-calendly"
import { useEffect, useState } from "react"

type CalendlyButtonProps = {
    props: {
        label: string
        buttonLink: string
        className?: string
    }
}

export default function CalendlyButton({ props }: CalendlyButtonProps) {
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null)
    const { buttonLink, label, className } = props

    useEffect(() => {
        // Wait for the component to be mounted before setting the rootElement
        if (typeof window !== "undefined") {
            setRootElement(document.getElementById("__next"))
        }
    }, [])

    return (
        <div className="cal_div">
            <PopupButton
                className={`duration-300 ease-in-out ${className}`}
                url={buttonLink}
                rootElement={rootElement || document.body}
                text={label}
            />
        </div>
    )
}
