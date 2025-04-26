export type CategoryType = {
  id: number,
  name: string
}

export type ActivityType = {
  id: string,
  category: number,
  name: string,
  calories: number
}