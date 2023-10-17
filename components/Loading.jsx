import loading from '../styles/loading3.module.css'

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className={`${loading.pyramidloader}`}>
        <div className={`${loading.wrapper}`}>
          <span className={`${loading.side} ${loading.side1} `}></span>
          <span className={`${loading.side} ${loading.side2}`}></span>
          <span className={`${loading.side} ${loading.side3} `}></span>
          <span className={`${loading.side} ${loading.side4}`}></span>
          <span className={`${loading.shadow}`}></span>
        </div>  
      </div>
    </div>
  )
}
