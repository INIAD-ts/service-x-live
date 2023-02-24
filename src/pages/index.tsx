import type { NextPage } from 'next'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useState } from 'react'
import App from './threeFiber'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
`

const HomePage: NextPage = () => {
  const [dataUrl, setDataUrl] = useState('')

  useEffect(() => {
    // let a = 0
    const interval = (dumyfps: number) => {
      setTimeout(async () => {
        fetch('https://d1ommktmz1mavo.cloudfront.net/object-key.txt')
          // fetch('message.txt')
          .then(async (response) => {
            setDataUrl(await response.text())
          })
          .catch((e) => {
            console.log(e)
          })
        interval(dumyfps)
      }, dumyfps)
    }
    interval(250)
  }, [])

  return (
    <Container>
      {/* <img
        src={dataUrl}
        alt="test"
      /> */}
      <App url={dataUrl} />
    </Container>
  )
}

export default HomePage
