import React from "react"
import { PageProps } from "gatsby"
import Layout from "../components/layout"

export default function IndexRoute(props: PageProps) {
  return (
    <Layout>
      <h1 className="text-blue-200">Path:</h1>
      <p>{props.path}</p>
    </Layout>
  )
}