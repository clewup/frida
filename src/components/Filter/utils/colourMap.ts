import { Colour } from '@prisma/client'

export const colourMap = {
  [Colour.White]: 'bg-filter-white border-[2px] border-gray-400',
  [Colour.Black]: 'bg-filter-black',
  [Colour.Gray]: 'bg-filter-gray',
  [Colour.Red]: 'bg-filter-red',
  [Colour.Blue]: 'bg-filter-blue',
  [Colour.Green]: 'bg-filter-green',
  [Colour.Yellow]: 'bg-filter-yellow',
  [Colour.Orange]: 'bg-filter-orange',
  [Colour.Purple]: 'bg-filter-purple',
  [Colour.Pink]: 'bg-filter-pink',
  [Colour.Brown]: 'bg-filter-brown',
  [Colour.NA]: 'bg-filter-na'
}
