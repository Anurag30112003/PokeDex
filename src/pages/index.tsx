import type { NextPage } from 'next'
import React from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // slug as input and fetch data from /api/slug
  const [slug] = React.useState('')
  const [data , setData] = React.useState<any>()
  const [isLoading , setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsLoading(true)
    fetch(`/api/${slug}`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
        setIsLoading(false)
      }
    )
  } , [])
  if (isLoading) return <p>Loading...</p>


  return (
   <>
      <h1>{data}</h1>
    <form>
      <input type="text" name="slug"  />
      <button type="submit">Submit</button>
    </form>
   
   </>
  )
}


export default Home
