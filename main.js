var request = require('request')
var cookie = require('cookie')
var decode = require('urlencode')

var str = 'http://www.spike-chunsoft.co.jp/monomono-machine/gacha?u='

next()

function next(){
	// request todaymedal without any header, so that it takes you as first time visited the site and gives you 5 medal
	request('http://www.spike-chunsoft.co.jp/monomono-machine/todaymedal?u=1482150015368', (err, res, body) => {
		var jar = cookie.serialize(res.headers['set-cookie']);
		var setcookie = cookie.serialize(res.headers['set-cookie'])
		setcookie = setcookie.substr(setcookie.indexOf('=') + 1)
		setcookie = setcookie.substr(0, setcookie.indexOf(';'))
		var datas = {
			url : str + base.toString(),
			headers : {
				'Cookie' : 'sound_muted=%7B%22_v%22%3Afalse%7D; nlbi_346135=bbqMdD9BQi3H1mOPNPXIJAAAAADuGshpKojiQsiZHRblUzZg; incap_ses_573_346135=CsJPWASGNGCzmLAAfrTzB1fLV1gAAAAA3V8JVluO5Bdb4LA15OXYRA==; incap_ses_571_346135=Dg8mfmuNEF/dFebsgpnsBxLMV1gAAAAArC0zN8f76GOkTs27N8Btxw==; AWSELB=6D3B5F6F021FBAC18FD480463C44188E9DF91D875BC9885BE24C2144BCDC4373595AD48091A215AA71A8B1033F41EB2C570BC6229EAC38DB32F083AD64BE1946058303DE2E; visid_incap_346135=en/SzxLQQh+wEc1A74XP2FfLV1gAAAAAQUIPAAAAAACob56qXcpvSc2TSLMdPPhx; incap_ses_576_346135=gNgxbfK2yQDJ1T33+Vz+B3XNV1gAAAAAsHUFDgpjwnaPJY9uMim1Kg==; _gat=1; drv3_userid='
				+ setcookie + '; _ga=GA1.3.1800313649.1482149239'
			}
		}
		request(datas, (err, res, body) => {			
			var str = body.toString()
			str = str.substr(str.indexOf('</div>') + 6)
			var data = JSON.parse(str)
			console.log(data.data.image);
			if(data.data.image.indexOf('thumb_sns_18') != -1){
				// Found thumb_sns_18!
				console.log('Found!')
				console.log(datas);
				process.exit()
			}
			else{
				next()
			}
		})
	})
}
