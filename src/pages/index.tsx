import type { NextPage } from 'next'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useState } from 'react'

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
  const [testdataUrl, setTestdataUrl] = useState('')

  useEffect(() => {
    let a = 0
    const interval = (dumyfps: number) => {
      setTimeout(async () => {
        setTestdataUrl(
          `https://d1ommktmz1mavo.cloudfront.net/object${(a++ % 2) + 1}.jpg`
        )
        interval(dumyfps)
      }, dumyfps)
    }
    interval(250)
  }, [])

  return (
    <Container>
      <img
        src={dataUrl}
        alt="平均化画像"
      />
      <img
        src={testdataUrl}
        alt="表示されない"
      />
    </Container>
  )
}

export default HomePage
