export interface IRoute {
  creatorId: number
  stravaId: number
  gpxName: string
}

export interface IComment {
  id: string
  parentCommentId: string
  authorId: number
  parentId: number
  contents: string
  routeId: string
}
// export interface IRouteList
