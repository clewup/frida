import cx from 'classnames'
import React, { type FC } from 'react'

interface HeadingProps {
  children: string
  className?: string
}

const Heading: FC<HeadingProps> = ({ children, className }) => {
  const words = children.split(' ')
  const nonEmphasisedWords = words.splice(0, words.length - 1).join(' ')
  const emphasisedWord = words[words.length - 1]

  return (
        <div className={cx('flex gap-2 justify-center text-4xl md:text-5xl', className)}>
            <p>{nonEmphasisedWords}</p>
            <div className="relative">
                <p className=" font-bold">{emphasisedWord}</p>
                <div className="absolute right-0 bg-blue-200 -translate-y-[5px] h-2 w-full"/>
            </div>
        </div>
  )
}

export default Heading
