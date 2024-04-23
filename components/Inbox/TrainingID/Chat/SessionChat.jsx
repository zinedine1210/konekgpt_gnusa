import { MyContext } from '@/context/MyProvider';
import React, { useContext, useEffect, useRef } from 'react'
import CardChatFromMe from './CardChatFromMe';
import CardChatUser from './CardChatUser';
import EditorPersonal from './EditorPersonal';

export default function SessionChat(){
    const context = useContext(MyContext)
    const containerRef = useRef(null);
    

    useEffect(() => {
        const polling = setInterval(() => {
            // checkDetailList();
        }, 7000);
    
        return () => {
          clearInterval(polling);
        };
    }, [context.chatDetail]);

    
    const ScrollOnTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        ScrollOnTop()
    }, [])
    

    return (
        <>
            <div className="h-full overflow-y-auto pt-14 pb-1 relative" ref={containerRef}>
                <div className={`${context.detailContact ? "xl:w-4/5":"xl:w-2/3"} space-y-1 w-full px-2 xl:px-0 mx-auto`}>
                    {
                        context.chatDetail.messages.map((item, key) => {

                            if(item.channel_identity === item.user_id)
                            return <CardChatFromMe key={key} index={key} dataChat={item}/>
                            return <CardChatUser key={key} index={key} dataChat={item}/>
                        })
                    }
                </div>
            </div>
            {/* <button onClick={() => ScrollOnTop()} className='absolute bottom-20 right-20 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center font-bold'>
                <BsChevronBarDown />
            </button> */}

            
            <div className={`${context.detailContact ? "xl:w-4/5":"xl:w-2/3"} absolute right-1/2 translate-x-1/2 w-full px-2 xl:px-0 xl:bottom-2 bottom-2 rounded-xl`}>
                <EditorPersonal ScrollOnTop={() => ScrollOnTop()}/>
            </div>
        </>
    )
}
