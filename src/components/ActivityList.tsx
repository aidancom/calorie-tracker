import { ActivityType } from '../types'
import { categories } from '../db/categories'
import { Dispatch, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
  state: ActivityType[],
  dispatch: Dispatch<ActivityActions>
}


const ActivityList = ({state, dispatch}: ActivityListProps) => {

  const categoryName = useMemo(() => (category: ActivityType['category']) => categories.map(cat => cat.id === category && cat.name), [state])

  return (
    <>
      <h2 className='text-4xl font-bold text-slate-600 text-center'>Comidas y actividades</h2>
      {state.length === 0 ? (
        <p className='text-center pt-5'>No hay datos</p>
      ) : (
        state.map(activity => (
           <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
            <div className="space-y-2 relative">
              <p className={`absolute top-[-50px] left-[-30px] px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(activity.category)}</p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className='font-black text-4xl text-lime-500'>{activity.calories}<span> Calorias</span></p>
            </div>
            <div className='flex gap-5 flex-center'>
              <button className="cursor-pointer" onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}>
                <FontAwesomeIcon className='text-2xl' icon={faPenToSquare}/>
              </button>
              <button className="cursor-pointer" onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}>
                <FontAwesomeIcon className='text-2xl text-red-500' icon={faXmark}/>
              </button>
            </div>
          </div>
        ))
      )}
    </>
  )
}

export default ActivityList
