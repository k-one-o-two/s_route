export interface IRoute {
  creatorId: number
  stravaId: number
  gpxName: string
}

export interface IComment {
  commentId: number
  authorId: number
  parentId: number
  contents: string
}
// export interface IRouteList
