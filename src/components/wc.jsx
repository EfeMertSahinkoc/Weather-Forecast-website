import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const WeatherCondition = (props) => {
    const { weather } = props;


    const sunrise = weather?.city.sunrise
    const sunset = weather?.city.sunset


    /*
    Chart Part
    */

    let tempArr = [];
    let timeArr = [];
    let temp;
    for (let i = 0; i <= 7; i++) {
        timeArr.push(weather?.list[i].dt_txt);


        tempArr.push(weather?.list[i].main.temp);

    }
    for (let i = 0; i <= 7; i++) {

        temp = timeArr[i].split(" ");
        timeArr[i] = temp[1];


    }



    const options = {
        title: [{ text: undefined }],
        series: [
            {
                name: 'Temp',
                data: [tempArr[0], tempArr[1], tempArr[2], tempArr[3], tempArr[4], tempArr[5], tempArr[6], tempArr[7]]

            }],
        xAxis: [{
            type: 'category',
            categories: [timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5], timeArr[6], timeArr[7]]

        }]




    }



    return (
        <div className="container .bg-warning weatherApp" >


            <div className="container-md  data">
                <div class="cityData">         <h2 class="mb-3 CityName">Weather in {weather?.city.name},TR</h2>
                    <h3 class="mb-3 ">&#9788; {weather?.list[0].main.temp}&#8451;</h3>
                    <h4 class="mb-3 text-muted">{Date().toLocaleString()}</h4></div>

                <div class="tbl">
                    <table class="table ">
                        <tbody class="">
                            <tr>
                                <td>Wind</td>
                                <td>{weather?.list[0].wind.speed} m/s</td>
                            </tr>
                            <tr>
                                <td>Cloudiness</td>
                                <td>{weather?.list[0].weather[0].description}</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{weather?.list[0].main.pressure} hpa</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{weather?.list[0].main.humidity} %</td>
                            </tr>
                            <tr>
                                <td>Sunrise</td>
                                <td> {new Date(sunset * 1000).toLocaleTimeString('en-IN')} </td>
                            </tr>
                            <tr>
                                <td>Sunset</td>
                                <td> {new Date(sunrise * 1000).toLocaleTimeString('en-IN')} </td>
                            </tr>
                            <tr>
                                <td>Geo coords</td>
                                <td> [ {weather?.city.coord.lat},{weather?.city.coord.lon} ]</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div className=' chartCount'>
                <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "100%", width: "100%" } }} options={options} />
            </div>
        </div >
    )
}
export default WeatherCondition;