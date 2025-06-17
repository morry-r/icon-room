"use client";

import { useState, useEffect } from "react";
import { IconWithSvg } from "@/lib/types";
import { IconGrid } from "@/components/icon-grid";


type IconTabProps = {
  iconsByWeight: {
    filled: IconWithSvg[]
    bold: IconWithSvg[]
    thin: IconWithSvg[]
  }
}

const variants = [
  { key: 'filled' as const, label: '塗り' },
  { key: 'bold' as const, label: '普通' },
  { key: 'thin' as const, label: '細め' },
]

export function IconList({ iconsByWeight }: IconTabProps) {

  const [selectedWeight, setSelectedWeight] = useState<'filled' | 'bold' | 'thin'>('filled')

  useEffect(() => {
    if (!localStorage.getItem('iconWeight')) {
      localStorage.setItem('iconWeight', 'filled')
      setSelectedWeight('filled')
    } else {
      const saved = localStorage.getItem('iconWeight') as 'filled' | 'bold' | 'thin' | null
      if (saved && ['filled', 'bold', 'thin'].includes(saved)) {
        setSelectedWeight(saved)
      }
    }
  }, [])

  const handleTabChange = (weight: 'filled' | 'bold' | 'thin') => {
    setSelectedWeight(weight)
    localStorage.setItem('iconWeight', weight)
  }

  const icons = iconsByWeight[selectedWeight]

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        {variants.map(({ key, label }) => (
          <button
            key={key}
            value={key}
            onClick={() => handleTabChange(key as 'filled' | 'bold' | 'thin')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedWeight === key ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <IconGrid icons={icons} />
    </div>
  )
}