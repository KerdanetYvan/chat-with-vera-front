export interface VeraQueryRequest {
  queryId: string,
  userId: string,
  files?: string[],
  query: string
}

export interface VeraSource {
  title: string,
  url: string
}

export interface VeraQueryResponse {
  queryId: string,
  answer: string,
  sources: VeraSource[]
}
