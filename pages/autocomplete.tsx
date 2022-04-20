import * as React from 'react'
import Image from "next/image";
import { KeyboardEvent} from 'react'
import { TCityListItem, CityData } from '../components/TCityListItem'

const searchData = [
  {
    url: '/img/item-icon.svg',
    city: 'Tokyo',
    population: '37,468,000',
    selected: false
  },
  {
    url: '/img/item-icon.svg',
    city: 'Delhi',
    population: '28,514,000',
    selected: false
  },
  {
    url: '/img/item-icon.svg',
    city: 'Shanghai',
    population: '25,582,000',
    selected: false
  },
  {
    url: '/img/item-icon.svg',
    city: 'São Paulo',
    population: '21,650,000',
    selected: false
  },
  {
    url: '/img/item-icon.svg',
    city: 'Mexico City',
    population: '21,581,000',
    selected: false
  },
  {
    url: '/img/item-icon.svg',
    city: 'Mumbai',
    population: '19,980,000',
    selected: false
  },
  {
    url: '/img/item-icon.svg',
    city: 'Beijing',
    population: '19,618,000',
    selected: false
  }
]

export default function Autocomplete() {
  const [cityName, setCityName] = React.useState('')
  const [cities, setCities] = React.useState<CityData[]>([])

  function filterOptions() {
    if (cityName.length) {
      const filtered = searchData.filter(e =>
        e.city.toLocaleLowerCase().startsWith(cityName.toLocaleLowerCase())
      )
      setCities(filtered)
    } else {
      setCities([])
    }
  }

  function onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const key = e.key
    if (key === 'Enter') {
      const selected = cities.find(e => e.selected)
      if (selected) {
        setCityName(selected.city)
      }
      setCities([])
      return
    }

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const isUp = key === 'ArrowUp'
      const idx = cities.findIndex(e => e.selected)
      const next = isUp ? idx - 1 : idx + 1

      cities.map(e => (e.selected = false))
      if (next >= 0 && next <= cities.length - 1) {
        cities[next].selected = true
      } else {
        if (isUp) {
          cities[cities.length - 1].selected = true
        } else {
          cities[0].selected = true
        }
      }
    }

    filterOptions()
  }

  function onBlur() {
    setCities([])
  }

  function onItemClick(name: string) {
    setCityName(name)
    setCities([])
  }

  return (
    <div className="flex justify-center  h-screen">
      <div className="w-96">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City Name
          </label>

          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <Image src="/img/main-item.svg" className="w-8 h-8 rounded-full" alt="Item icon" width="24" height="24"/>
            </div>

            <input
              className="outline-4 outline-pink-400 border-2 border-rose-300 hover:border-rose-400 focus:border-rose-600 w-96 pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 block p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white"
              id="cityName"
              type="text"
              placeholder="City name (i.e. Mumbai)"
              autoComplete="off"
              value={cityName}
              onInput={e => setCityName(e.currentTarget.value)}
              onKeyUp={onKeyUp}
              onBlur={onBlur}
              onFocus={filterOptions}
            />

            {cities.length ? (
              <div className="w-96 absolute">
                <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flow-root">
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      {cities.map(e => (
                        <TCityListItem
                          key={`${e.city}-${e.population}`}
                          {...e}
                          onItemClick={onItemClick}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
