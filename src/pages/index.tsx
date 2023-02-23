import type { NextPage } from 'next'
import styled from 'styled-components'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import React from 'react'
import { useState } from 'react'
import dotenv from 'dotenv'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
`

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`

const HomePage: NextPage = () => {
  dotenv.config()

  const [dataUrl, setDataUrl] = useState('')

  const s3 = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: process.env.ACCESSKEYID ? process.env.ACCESSKEYID : '',
      secretAccessKey: process.env.SECRETACCESSKEY
        ? process.env.SECRETACCESSKEY
        : '',
    },
  })

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET ? process.env.BUCKET : '',
    Key: 'object-key.txt',
  })

  // S3 オブジェクトの内容を取得する
  const s3GetObject = async () => {
    try {
      const res = await s3.send(command)
      if (res.Body) {
        const tmp = await res.Body.transformToString()
        // console.log(tmp)
        return tmp
      } else {
        console.log('失敗')
        return null
      }
    } catch (e) {
      console.log(e)
    }
  }

  const interval = (dumyfps: number) => {
    setTimeout(async () => {
      await s3GetObject()
        .then((url) => {
          if (url) {
            setDataUrl(url)
          }
        })
        .catch((e) => {
          console.log(e)
        })
      // const fps = 1000 / dumyfps
      interval(dumyfps)
    }, dumyfps)
  }
  interval(20)

  return (
    <Container>
      <Main />
      <img
        src={dataUrl}
        alt="平均化画像"
      />
    </Container>
  )
}

export default HomePage
