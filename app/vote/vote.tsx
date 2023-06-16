'use client'

import { useState } from 'react';

const voteLimit = 100 // budget limit for this vote

const PollItem = (props:any) => {  
    return (
      <div className="bg-blue-300 my-4 p-2">

        <span className="m-2">
        {props.label} ({props.vote} vote, cost {props.vote**2})
        </span>

        <input type="range" 
          value={props.vote} 
          min="0" 
          max="10" 
          onInput={e => props.updateCount(e.currentTarget.value)} 
        />

      </div>
    )
}

export default function Vote() {
  const [options, setOptions] = useState([
    { label: 'sukarno', vote: 0 },
    { label: 'suharto', vote: 0 },
    { label: 'habibie', vote: 0 },
    { label: 'SBY',     vote: 0 },
  ])

  function countTotalVote() {
    return options.reduce((sum:number, i:any) => sum + i.vote**2 , 0)
  }

  function setCount(idx:number, val:number) {
    let newOptions = options.slice()
    newOptions[idx].vote = val

    setOptions(newOptions)
  }

  const remainingBudget = voteLimit - countTotalVote()

  return (
    <div className="bg-gray-200 p-6">
      <h1 className="text-3xl font-bold">Example poll</h1>

      <div className={ remainingBudget < 0 ? 'bg-red-300' : 'bg-green-300' }>
        Remaining vote budget: {remainingBudget}
      </div>

      { options.map(
          (item:any, idx:number) => <PollItem 
              label={item.label} 
              vote={item.vote} 
              key={item.label}
              updateCount={(val:number) => setCount(idx,val)}
              />
      )}
    </div>
  )
}