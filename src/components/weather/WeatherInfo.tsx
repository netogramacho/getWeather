interface WeatherInfoProps{
    title: string,
    data: string,
    metric?: string
}

const defaultProps:WeatherInfoProps = {
    title: '',
    data: '',
    metric: ''
}

export default function WeatherInfo(props:WeatherInfoProps = defaultProps) {
    return (
        <p><b>{props.title}:</b> { props.data }{props.metric}</p>
    )
}