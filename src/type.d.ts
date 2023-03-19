type Visibility = 'great' | 'good' | 'bad' | 'poor'
export interface user {
  email: string
  password: string
}
export interface diaryEntry {
  id: number
  date: string
  visibility: Visibility
  comment: string
}
export type NonSensitiveInfoDiary = Omit<diaryEntry, 'comment'>
export type newDiary = Omit<diaryEntry, 'id'>
