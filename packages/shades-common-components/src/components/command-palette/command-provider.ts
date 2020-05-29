import { Injector } from '@furystack/inject'

export type SuggestionResult = {
  element: JSX.Element
  score: number
  onSelected: (options: { injector: Injector }) => void
}

export type CommandProvider = (options: { term: string; injector: Injector }) => Promise<SuggestionResult[]>