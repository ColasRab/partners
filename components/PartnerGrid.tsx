"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"

interface Partner {
    id: number
    name: string
    logo: string
}

export default function PartnerGrid() {
    const [partners, setPartners] = useState<Partner[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
    const [gapSize] = useState(4)
    const [columnsCount] = useState(4)

    useEffect(() => {
        async function fetchPartners() {
            try {
                const res = await fetch("/api/partners")
                if (!res.ok) {
                    throw new Error("Network response was not ok")
                }
                const data: Partner[] = await res.json()
                setPartners(data)
            } catch (err) {
                console.error("Error fetching partner data:", err)
                setError("Failed to load partner data.")
            } finally {
                setLoading(false)
            }
        }
        fetchPartners()
    }, [])

    // Calculate the number of rows needed
    const rowsCount = useMemo(() => Math.ceil(partners.length / columnsCount), [partners.length, columnsCount])

    // Fixed grid sizing: all rows and columns are 1fr so the grid doesn't reflow on hover.
    const getRowSizes = () => Array(rowsCount).fill("1fr").join(" ")
    const getColSizes = () => Array(columnsCount).fill("1fr").join(" ")

    if (loading) return <div className="text-white">Loading partners...</div>
    if (error) return <div className="text-red-500">{error}</div>
    if (partners.length === 0) return <div className="text-white">No partners available.</div>

    return (
        <div className="space-y-4 w-full">
            {/* Header with controls */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                    </div>
                </div>
            </div>

            {/* Controls for gap size */}
            <div className="flex justify-end items-center space-x-4 mb-4">
                <div>
                </div>
            </div>

            {/* Grid container */}
            <div
                className="relative w-full"
                style={{
                    display: "grid",
                    gridTemplateRows: getRowSizes(),
                    gridTemplateColumns: getColSizes(),
                    gap: `${gapSize}px`,
                    transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
                    aspectRatio: partners.length <= columnsCount ? `${partners.length}/1` : undefined,
                    minHeight: "400px",
                }}
            >
                {partners.map((partner, index) => {
                    const row = Math.floor(index / columnsCount)
                    const col = index % columnsCount
                    const isCurrentHovered = hovered?.row === row && hovered?.col === col

                    return (
                        <motion.div
                            key={partner.id}
                            className="relative"
                            style={{
                                transition: "transform 0.4s ease",
                                aspectRatio: "1/1",
                                zIndex: isCurrentHovered ? 10 : 1,
                            }}
                            onMouseEnter={() => setHovered({ row, col })}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className="absolute inset-0">
                                <div className="relative w-full h-full overflow-hidden">
                                    <div
                                        className="absolute inset-0 flex items-center justify-center"
                                        style={{
                                            zIndex: 1,
                                            transition: "all 0.3s ease-in-out",
                                            padding: "0",
                                            width: "100%",
                                            height: "50%",
                                            left: "0",
                                            top: "0",
                                            backgroundImage: "url('/bg.png')",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    >
                                        <div
                                            className="w-full h-full overflow-hidden flex flex-col items-center justify-center"
                                            style={{
                                                transform: `scale(${isCurrentHovered ? 1.2 : 1})`,
                                                transformOrigin: "center",
                                                transition: "transform 0.3s ease-in-out",
                                            }}
                                        >
                                            <img
                                                src={partner.logo || "/placeholder.svg"}
                                                alt={partner.name}
                                                className="object-contain max-w-[70%] max-h-[70%]"
                                            />
                                            <p className="mt-2 text-white text-center font-medium">{partner.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
