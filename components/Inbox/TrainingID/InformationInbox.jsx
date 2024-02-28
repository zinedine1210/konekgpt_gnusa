export default function InformationInbox({data}) {

  let typeTraining = {
    1: "Upload File",
    2: 'Website',
    3: 'Scratch'
  }
  return (
    <div>
        <h1 className="font-bold text-xl">Information</h1>
        <p className="font-light text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, tempora!</p>

        <div className="mt-5">
            <h1 className="font-semibold mb-5">Knowledge Information</h1>

            <div className="flex gap-5 w-3/4">
              <div className="bg-white dark:bg-darkPrimary rounded-md shadow-md w-1/3 p-5 font-mono text-sm space-y-1">
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">Name</h1>
                  <p>{data.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">Code</h1>
                  <p>{data.code}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">Type Training</h1>
                  <p>{typeTraining[data.type_training]}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">ORG ID</h1>
                  <p>{data.org_id}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-blue-500 dark:text-blue-300">Description</h1>
                  <p className="mt-2 border px-2 py-3">{data.description}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-darkPrimary rounded-md shadow-md w-2/3 p-5 font-mono text-sm space-y-1 h-full">
                <h1>Files</h1>
                <div>
                  {data._files.map((item, index) => {
                    return (
                      <div key={index} className="mt-2">
                        {item}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

        </div>
    </div>
  )
}
