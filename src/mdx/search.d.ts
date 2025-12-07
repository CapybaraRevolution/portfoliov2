// Type definitions for search module

export interface Result {
  url: string
  title: string
  pageTitle: string
  score: number
  matches: string[]
  context: string
  type: string
  [key: string]: any // Index signature to satisfy BaseItem constraint
}

export declare function search(query: string, options?: { limit?: number }): Result[]

declare const Search: (nextConfig?: any) => any
export default Search