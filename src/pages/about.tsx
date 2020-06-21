import React from "react"
import { PageProps } from "gatsby"
import Layout from "../components/layout"

export default function IndexRoute(props: PageProps) {
  return (
    <Layout>
      <div style={{ color: `teal` }}>
        <p>Such wow. Very React.</p>
      </div>
    </Layout>
  )
}