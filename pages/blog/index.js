import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import axios from 'axios'

function QuoteDisplay () {
  const [quote, setQuote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor())
  const [selectedCategory, setSelectedCategory] = useState('good') // 初期値を 'good' に設定

  const apiKey = '9EkXsgQQ85cxwse5BIGd7g==aX9sqm1ACx7AXRaK'
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${selectedCategory}`

  const fadeInAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 }
  })

  function getRandomColor () {
    const hue = Math.floor(Math.random() * 360)
    const saturation = '70%'
    const lightness = '70%'
    return `hsl(${hue}, ${saturation}, ${lightness})`
  }

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

  const handleShare = () => {
    const tweetText = encodeURIComponent(`"${quote}" - Your Twitter handle`)
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`
    window.open(tweetUrl, '_blank')
  }

  const handleTranslate = () => {
    const textArea = document.createElement('textarea')
    textArea.value = quote
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    window.open('https://translate.google.com/', '_blank')
  }

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
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
        <animated.div style={fadeInAnimation}>
          <div
            style={{
              height: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
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
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              {isLoading ? '読み込み中...' : '引用を取得'}
            </button>
            <button
              onClick={handleShare}
              disabled={!quote}
              style={{
                fontSize: '18px',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#28a745',
                color: '#fff',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              シェアする
            </button>
            <button
              onClick={handleTranslate}
              style={{
                fontSize: '18px',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#ffc107',
                color: '#333',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              翻訳する
            </button>
            {/* 追加: カテゴリーの選択肢 */}
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{
                fontSize: '18px',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginBottom: '10px',
                width: '100%'
              }}
            >
              <option value='good'>good(良い)</option>
              <option value='inspirational'>inspirational(心を動かす)</option>
              <option value='amazing'>amazing(素晴らしい)</option>
              <option value='beauty'>beauty(美しい)</option>
              <option value='food'>food(食べ物)</option>
              <option value='morning'>morning(朝)</option>
              {/* 他のカテゴリーを追加 */}
            </select>
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
        </animated.div>
      </div>
    </div>
  )
}

export default QuoteDisplay
