import type { NextPage } from 'next'
import styled from 'styled-components'
import React, { useEffect, useMemo } from 'react'
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

  // let a = 0
  useMemo(() => {
    const interval = (dumyfps: number) => {
      setTimeout(() => {
        fetch('https://d1ommktmz1mavo.cloudfront.net/object-key.txt')
          // fetch('message.txt')
          .then(async (response) => {
            const b = await response.text()
            setDataUrl(b)
            console.log('liveの成功')
          })
          .catch((e) => {
            console.log(e)
          })
        interval(dumyfps)
      }, dumyfps)
    }
    interval(500)
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
