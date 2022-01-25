<h1 align="center">
  Get Weather
</h1>

<p align="center">
Aplicação web contruída para capturar localização e clima atual.
</p>

<div>
  <img src="https://getweather.gramachodev.com.br/demo-web.png" alt="demo-web" height="425">
</div>

<hr />

#### Para ver a aplicação funcionando, acesse: `https://getweather.gramachodev.com.br/`

## Iniciando

1. Clone este repositório utilizando `git clone https://github.com/netogramacho/getWeather.git`
2. mova o terminal para o diretório correto: `cd getweather`<br />
3. Execute `yarn` para instalar as dependências<br />
4. Adicione no arquivo `keys.tsx` as chaves das apis do Google e do Open Weather.
5. Execute `yarn start` para iniciar a aplicação.


### CardAddress

Card que contém as informções de endereço atualizadas.

Propriedades {
    title: string,
    address: string
}

### CardWeather

Card que contém as informações do clima atualizadas.

Propriedades {
    title: string,
    children: ReactNode
}

#### WeatherInfo

Fiho do CardWeather, é a linha de valor do CardWeather.

Propriedades {
    title: string,
    data: string,
    metric (opcional): string
}

### Spinner 

Componente para sinalizar que a página está fazendo alguma requisição.

Propriedades {
  loading: boolean,
}
