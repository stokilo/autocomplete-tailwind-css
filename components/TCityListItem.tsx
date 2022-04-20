import * as React from 'react'
import classNames from 'classnames'
import Image from 'next/image'

export type CityData = {
  city: string
  population: string
  url: string
  selected: boolean
}

export type CityDataAsProps = CityData & {
  onItemClick: (name: string) => void
}

export function TCityListItem({
  city,
  population,
  url,
  selected,
  onItemClick
}: CityDataAsProps) {
  return (
    <li className="py-3 sm:py-2" onMouseDown={() => onItemClick(city)}>
      <div
        className={classNames('flex items-center space-x-4 rounded-md', {
          'bg-sky-100': selected
        })}
      >
        <div className="flex-shrink-0">
          <Image src={url} className="w-8 h-8 rounded-full" alt="Item icon" width="24" height="24"/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {city}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {population}
          </p>
        </div>
      </div>
    </li>
  )
}
