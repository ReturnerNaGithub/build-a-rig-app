import { useState, useEffect, useRef } from 'react';

interface GamePageProps {
    onGameComplete: (time: number) => void;
}

interface RigPart {
    id: string;
    name: string;
    image: string;
    correctSlot: number;
}

const rigParts: RigPart[] = [
    { id: 'frame', name: 'Mining Frame', image: '/pictures/frame.png', correctSlot: 0 },
    { id: 'mothe', name: 'Motherboard', image: '/pictures/mothe.png', correctSlot: 1 },
    { id: 'gpu', name: 'Graphics Card', image: '/pictures/gpu.png', correctSlot: 2 },
    { id: 'pcu', name: 'Power Supply', image: '/pictures/pcu.png', correctSlot: 3 },
    { id: 'ram', name: 'RAM Memory', image: '/pictures/ram.png', correctSlot: 4 },
    { id: 'ssd', name: 'SSD Storage', image: '/pictures/ssd.png', correctSlot: 5 },
    { id: 'fan', name: 'Cooling Fan', image: '/pictures/fan.png', correctSlot: 6 },
    { id: 'cable', name: 'Power Cable', image: '/pictures/cable.png', correctSlot: 7 },
];

// Slot labels for empty fields
const slotLabels = [
    'Mining Frame',
    'Motherboard',
    'Graphics Card',
    'Power Supply',
    'RAM Memory',
    'SSD Storage',
    'Cooling Fan',
    'Power Cable'
];

export const GamePage = ({ onGameComplete }: GamePageProps) => {
    const [startTime] = useState(() => Date.now());
    const [currentTime, setCurrentTime] = useState(0);
    const [placedParts, setPlacedParts] = useState<(RigPart | null)[]>(new Array(8).fill(null));
    const [draggedPart, setDraggedPart] = useState<RigPart | null>(null);
    const [availableParts, setAvailableParts] = useState<RigPart[]>([...rigParts]);
    const timerRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const currentStartTime = startTime;
        timerRef.current = window.setInterval(() => {
            setCurrentTime((Date.now() - currentStartTime) / 1000);
        }, 100);

        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
            }
        };
    }, [startTime]);

    useEffect(() => {
        // Check if all parts are placed correctly
        const allCorrect = placedParts.every((part, index) =>
            part && part.correctSlot === index
        );

        if (allCorrect && placedParts.every(part => part !== null)) {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
            }
            onGameComplete(currentTime);
        }
    }, [placedParts, currentTime, onGameComplete]);

    const handleDragStart = (part: RigPart) => {
        setDraggedPart(part);
    };

    const handleDrop = (slotIndex: number) => {
        if (!draggedPart) return;

        // Remove part from available parts
        setAvailableParts(prev => prev.filter(p => p.id !== draggedPart.id));

        // If there's already a part in this slot, move it back to available parts
        if (placedParts[slotIndex]) {
            setAvailableParts(prev => [...prev, placedParts[slotIndex]!]);
        }

        // Place the part in the slot
        const newPlacedParts = [...placedParts];
        newPlacedParts[slotIndex] = draggedPart;
        setPlacedParts(newPlacedParts);

        setDraggedPart(null);
    };

    const handleSlotClick = (slotIndex: number) => {
        // Remove part from slot and return to available parts
        if (placedParts[slotIndex]) {
            setAvailableParts(prev => [...prev, placedParts[slotIndex]!]);
            const newPlacedParts = [...placedParts];
            newPlacedParts[slotIndex] = null;
            setPlacedParts(newPlacedParts);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {/* Timer */}
            <div className="fixed top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                <div className="text-2xl font-bold text-white">
                    ⏱️ {currentTime.toFixed(1)}s
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Build Your Mining Rig!
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Available Parts */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                        <h3 className="text-2xl font-bold text-white mb-4">📦 Available Parts</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {availableParts.map((part) => (
                                <div
                                    key={part.id}
                                    draggable
                                    onDragStart={() => handleDragStart(part)}
                                    className="bg-gray-800/50 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:bg-gray-700/50 transition-colors border border-gray-600"
                                >
                                    <img
                                        src={part.image}
                                        alt={part.name}
                                        className="w-full h-12 object-contain mb-1"
                                    />
                                    <p className="text-white text-xs text-center font-medium">{part.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Build Slots */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                        <h3 className="text-2xl font-bold text-white mb-4">🔧 Build Area</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 8 }, (_, index) => {
                                const expectedPart = rigParts.find(part => part.correctSlot === index);
                                return (
                                    <div
                                        key={index}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => handleDrop(index)}
                                        onClick={() => handleSlotClick(index)}
                                        className={`
                                            h-28 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all p-2
                                            ${placedParts[index]
                                                ? (placedParts[index]!.correctSlot === index
                                                    ? 'border-green-400 bg-green-900/30'
                                                    : 'border-red-400 bg-red-900/30')
                                                : 'border-gray-400 bg-gray-800/30 hover:border-blue-400 hover:bg-blue-900/20'
                                            }
                                        `}
                                    >
                                        {placedParts[index] ? (
                                            <div className="text-center">
                                                <img
                                                    src={placedParts[index]!.image}
                                                    alt={placedParts[index]!.name}
                                                    className="w-full h-12 object-contain mb-1"
                                                />
                                                <p className="text-white text-xs font-medium">{placedParts[index]!.name}</p>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400 text-center">
                                                <div className="text-lg mb-1">
                                                    {expectedPart?.id === 'frame' && '🏗️'}
                                                    {expectedPart?.id === 'mothe' && '🔌'}
                                                    {expectedPart?.id === 'gpu' && '🎮'}
                                                    {expectedPart?.id === 'pcu' && '⚡'}
                                                    {expectedPart?.id === 'ram' && '💾'}
                                                    {expectedPart?.id === 'ssd' && '💿'}
                                                    {expectedPart?.id === 'fan' && '🌀'}
                                                    {expectedPart?.id === 'cable' && '🔗'}
                                                </div>
                                                <p className="text-xs font-medium text-center leading-tight">
                                                    {slotLabels[index]}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">Drop here</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Progress</span>
                        <div className="text-right">
                            <div className="text-blue-300">{placedParts.filter(p => p !== null).length}/8 parts placed</div>
                            <div className="text-green-300 text-sm">
                                {placedParts.filter((part, index) => part && part.correctSlot === index).length}/8 correct
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(placedParts.filter(p => p !== null).length / 8) * 100}%` }}
                        />
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(placedParts.filter((part, index) => part && part.correctSlot === index).length / 8) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};