const MODE = import.meta.env.MODE // 环境变量
console.log(MODE,'MODE');
export const baseUrl = MODE == 'baseUrl' ? '/api' : 'http://api.chennick.wang';