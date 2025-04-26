import { useMemo } from 'react'
import type { ActivityType } from '../types'
import CalorieDisplay from './CalorieDisplay'

type CaloriTrackerProps = {
  activities: ActivityType[]
}

const CalorieTracker = ({activities}: CaloriTrackerProps) => {
  const caloriesConsume = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? activity.calories + total : total, 0), [activities])
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? activity.calories + total : total, 0), [activities])
  const caloriesTotal = useMemo(() => caloriesConsume - caloriesBurned, [activities])
  return (
    <>
      <h2 className="text-4xl font-black text-center text-white">Resumen de Calorias</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsume} text="Consumidas"/>
        <CalorieDisplay calories={caloriesBurned} text="Ejercicio"/>
        <CalorieDisplay calories={caloriesTotal} text="Diferencia"/>
      </div>
      
    </>
  )
}

export default CalorieTracker
