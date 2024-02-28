import loading from '../styles/loading3.module.css'

export default function Loading(props) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className='text-center mx-auto'>
        <div className={`${loading.pyramidloader} mx-auto`}>
          <div className={`${loading.wrapper}`}>
            <span className={`${loading.side} ${loading.side1} `}></span>
            <span className={`${loading.side} ${loading.side2}`}></span>
            <span className={`${loading.side} ${loading.side3} `}></span>
            <span className={`${loading.side} ${loading.side4}`}></span>
            <span className={`${loading.shadow}`}></span>
          </div>  
        </div>

        <p className='text-xl text-zinc-600'>{props.status}</p>
      </div>
    </div>
  )
}
