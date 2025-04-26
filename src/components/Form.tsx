import { useState, ChangeEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { categories } from "../db/categories"
import { ActivityType as Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState: Activity = {
  id: '',
  category: 0,
  name: '',
  calories: 0
}

const Form = ({dispatch, state}: FormProps) => {

  const [activity, setActitivy] = useState<Activity>(initialState)


  useEffect(() => {
    if (state.activeId) {
      const selectActivity = state.activities.filter(activity => activity.id === state.activeId)
      setActitivy(selectActivity[0])
    }
  }, [state.activeId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActitivy({...activity, [e.target.id]: isNumberField ? parseInt(e.target.value) : e.target.value})
  }

  const isValidActivity = () => {
    const  {name, calories} = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: 'save-activity', payload: {newActivity: {...activity, id: uuidv4()}}})
    setActitivy(initialState)
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor='category' className="font-bold">Categoría:</label>
        <select value={""} onChange={handleChange} id="category" className="border border-slate-300 p-2 w-full bg-white rounded-lg">
          <option value="" disabled={true}>Selecciona una opcion</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input value={activity.name} onChange={handleChange} id="name" type="text" className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"/>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input value={activity.calories} onChange={handleChange} id="calories" type="number" className="border border-slate-300 p-2 rounded-lg" placeholder="Calorias. ej. 300 o 500"/>
      </div>
      <input type="submit" value={activity.category == 1 ? 'Guardar  Comida' : 'Guardar  Ejercicio'} disabled={!isValidActivity()} className="bg-gray-800 transition-all hover:bg-gray-900 text-white uppercase cursor-pointer font-bold w-full p-2 rounded disabled:opacity-10 disabled:pointer-events-none"/>
    </form>
  )
}

export default Form
