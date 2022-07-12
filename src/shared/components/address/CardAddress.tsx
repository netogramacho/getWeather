import './address.css'

interface CardAddressProps {
    title: string,
    address: string
}

export default function CardAddress(props:CardAddressProps) {
    return(

    <div className='Card__Address'>
        <div className='Card__Address--title'>
            <h3>
                {props.title}
            </h3>
        </div>
        <div className='Card__Address--body'>
            {props.address}
        </div>
    </div>
    )
}