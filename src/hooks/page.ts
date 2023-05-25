import { useEffect, useState } from "react"

export function usePage(value: number): number {
    const [page, setPage] = useState(1) 
    useEffect(()=> {
        if (value) {
            setPage(value)
        }
    }, [value])
    return page
}