import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { actitivityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {


  const [state, dispatch] = useReducer(actitivityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state])

  const canRestartApp = () => useMemo(() => state.activities.length,[state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="font-bold text-white uppercase">Contador de Calorias</h1>
          <button onClick={() => dispatch({type: 'restart-app'})} className="text-white bg-gray-800 hover:bg-gray-900 px-3 py-1 uppercase rounded cursor-pointer disabled:opacity-10 disabled:pointer-events-none" disabled={!canRestartApp()}>Reiniciar App</button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form state={state} dispatch={dispatch}/>
        </div>
      </section>
      <section className="bg-gray-800 p-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities}/>
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList state={state.activities} dispatch={dispatch}/>
      </section>
    </>
  )
}

export default App
