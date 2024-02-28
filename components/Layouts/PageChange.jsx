import React from 'react'
import loading from "@/styles/loading4.module.css"


export default function PageChange() {
  return (
    <div className='w-full h-full bg-white dark:bg-dark flex items-center justify-center inset-0 z-20'>
        <div className={loading['terminal-loader']}>
            <div className={loading['terminal-header']}>
                <div className={loading['terminal-title']}>Status</div>
                <div className={loading['terminal-controls']}>
                <div className={`${loading['control']} ${loading['close']}`}></div>
                <div className={`${loading['control']} ${loading['minimize']}`}></div>
                <div className={`${loading['control']} ${loading['maximize']}`}></div>
                </div>
            </div>
            <div className={loading['text']}>Loading Page...</div>
        </div>
    </div>
  )
}
