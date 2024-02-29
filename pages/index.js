import React, { useState } from 'react'
import axios from 'axios'

function QuoteDisplay () {
  const [quote, setQuote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor())
  const category = 'good'
  const apiKey = '9EkXsgQQ85cxwse5BIGd7g==aX9sqm1ACx7AXRaK'
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(apiUrl, {
        headers: { 'X-Api-Key': apiKey }
      })
      const data = response.data
      const randomQuote = data[0].quote // レスポンスが1つの引用オブジェクトの配列であると仮定
      setQuote(randomQuote)
      setBackgroundColor(getRandomColor()) // 新しいランダムな背景色を生成
    } catch (error) {
      console.error('リクエストが失敗しました:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // ランダムなHSL色を生成する関数
  function getRandomColor () {
    const hue = Math.floor(Math.random() * 360)
    const saturation = '70%' // 必要に応じて彩度と明度の値を調整できます
    const lightness = '70%'
    return `hsl(${hue}, ${saturation}, ${lightness})`
  }

  return (
    <div
      style={{
        backgroundColor,
        transition: 'background-color 0.5s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <div style={{ textAlign: 'center', padding: '20px', maxWidth: '600px' }}>
        <div
          style={{
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <button
            onClick={handleClick}
            disabled={isLoading}
            style={{
              fontSize: '18px',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007bff',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {isLoading ? '読み込み中...' : '名言を表示(すべて英語)'}
          </button>
        </div>
        {quote && (
          <div
            style={{
              fontSize: '36px',
              marginTop: '20px',
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            "{quote}"
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteDisplay
