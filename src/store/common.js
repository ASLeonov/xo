    // use proxy for fix CORS problem in dev mode
const proxyApi_CORS = 'https://cors-anywhere.herokuapp.com/'
export const apiWay = window.location.hostname !== "localhost" ?
                        'http://xo.leonovlab.ru/api/results.php' :
                            proxyApi_CORS + 'http://xo.leonovlab.ru/api/results.php'