import React from "react"
import { PageProps } from "gatsby"

export default function IndexRoute(props: PageProps) {
  return (
    <>
      <h1 className="text-blue-200">Path:</h1>
      <p>{props.path}</p>
    </>
  )
}