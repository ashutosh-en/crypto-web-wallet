
interface MnemonicProps {
  element: string;
}

function Mnemonic({element}:MnemonicProps){
    return<div >
          <div className="grid grid-cols-3 gap-4 p-4">
            {element.split(" ").map((element, index) => (
                <div key={index}
                className="flex items-center justify-center h-13 w-32 bg-white border border-gray-300 rounded-md shadow-md text-lg">
            {index+1}. {element}
        </div>
      ))}
    </div>
    </div>
}

export default Mnemonic