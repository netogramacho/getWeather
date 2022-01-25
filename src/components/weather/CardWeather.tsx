import { ReactNode } from "react";
import './weather.css'

interface CardWeatherProps {
    title: string,
    children: ReactNode
}

export default function CardWeather(props:CardWeatherProps) {
    return(
        <div className='Card__Weather'>
          <div className='Card__Weather--title'>
            <h3>{props.title}</h3>
          </div>
          <div className='Card__Weather--body'>
              {props.children}
          </div>
        </div>
    )
}