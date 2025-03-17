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
    const [isBrowser, setIsBrowser] = useState(false)
    const { buttonLink, label, className } = props

    useEffect(() => {
        setIsBrowser(true)
        // Wait for the component to be mounted before setting the rootElement
        if (typeof window !== "undefined") {
            setRootElement(document.getElementById("__next"))
        }
    }, [])

    // Don't render the button until we're in the browser
    if (!isBrowser) {
        return null
    }

    return (
        <div className="cal_div">
            <PopupButton
                className={`duration-300 ease-in-out ${className}`}
                url={buttonLink}
                rootElement={rootElement as HTMLElement}
                text={label}
            />
        </div>
    )
}