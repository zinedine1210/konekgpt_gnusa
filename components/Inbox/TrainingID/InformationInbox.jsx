export default function InformationInbox({ data }) {
  const channel = data.channelInformation
  const knowledge = data.knowledgeInformation
  let typeTraining = {
    1: "Upload File",
    2: 'Website',
    3: 'Scratch'
  }
  
  return (
    <div className="p-2 xl:p-10">
        <h1 className="font-bold text-lg xl:text-xl">Information</h1>
        <p className="font-light text-xs xl:text-sm">Knowledge information that you are currently using</p>

        <div className="mt-5">
            <h1 className="font-semibold mb-5 text-sm xl:text-base">Knowledge Information</h1>

            <div className="xl:flex gap-5 w-full xl:w-3/4">
              <div className="bg-white dark:bg-darkPrimary rounded-md shadow-md w-full xl:w-1/3 p-5 font-mono text-xs xl:text-sm space-y-1">
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">Name</h1>
                  <p>{knowledge?.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">Code</h1>
                  <p>{knowledge?.code}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">Type Training</h1>
                  <p>{typeTraining[knowledge?.type_training]}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">ORG ID</h1>
                  <p>{knowledge?.org_id}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">Description</h1>
                  <p className="mt-2 border dark:border-zinc-500 rounded-md px-2 py-3">{knowledge?.description}</p>
                </div>
              </div>
              {
                knowledge?._files && (
                  <div className="mt-5 xl:mt-0 bg-white dark:bg-darkPrimary rounded-md shadow-md w-full xl:w-2/3 p-5 font-mono text-xs xl:text-sm space-y-1 h-full">
                    <h1 className="font-bold text-blue-500 dark:text-blue-300">Files</h1>
                    <div className="space-y-2">
                      {knowledge._files.map((item, index) => {
                        return (
                          <CardFile key={index} item={item}/>
                        )
                      })}
                    </div>
                  </div>
                )
              }
            </div>

        </div>
    </div>
  )
}


function CardFile({item}){
  // const [data, setData] = useState(null)

  // const getData = async () => {
  //   const getXA = JSON.parse(localStorage.getItem("XA"))
  //   const result = await UploadFileRepository.getFile({ XA:getXA, refKey:item, table:"knowledge", size:"m"})
  //   console.log(result)
  // }

  // useEffect(() => {
  //   if(!data){
  //     getData()
  //   }
  // }, [data])
  return (
    <div className="py-2 px-3 border dark:border-zinc-500 rounded-md flex items-center justify-between">
      {item}
      <button onClick={() => alert("Cant get file")} className="hover:text-blue-500 duration-300 ">
        View
      </button>
    </div>
  )
}