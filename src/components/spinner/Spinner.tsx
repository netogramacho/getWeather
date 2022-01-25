import { SyncLoader } from "react-spinners";
import './spinner.css'

interface SpinnerProps {
    loading: boolean
}


export default function Spinner(props: SpinnerProps) {

    return(
        props.loading ?  
        <div className='Loading'>
          <SyncLoader color='#1E90FF' size={20} />
        </div>
      :
        <></>
    )
}