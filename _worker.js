// 部署完成后在网址后面加上这个，获取订阅器默认节点，/auto

let mytoken = ['pages123']; //快速订阅访问入口, 留空则不启动快速订阅

// 设置优选地址，不带端口号默认443，TLS订阅生成
let addresses = [
    'icook.tw:2053#官方优选域名',
    'cloudflare.cfgo.cc#优选官方线路',
];

// 设置优选地址api接口
let addressesapi = [
    '', //可参考内容格式 自行搭建。
    //'https://raw.githubusercontent.com/cmliu/WorkerVless2sub/main/addressesipv6api.txt', //IPv6优选内容格式 自行搭建。
];

// 设置优选地址，不带端口号默认80，noTLS订阅生成
let addressesnotls = [
    'www.visa.com.sg#官方优选域名',
    'www.wto.org:8080#官方优选域名',
    'www.who.int:8880#官方优选域名',
];

// 设置优选noTLS地址api接口
let addressesnotlsapi = [
    '',
];

let DLS = 5; //速度下限
let addressescsv = [
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-HKG.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-AMS.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-BUF.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-FRA.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-IAD.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-KIX.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-LAX.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-NRT.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-SIN.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-SJC.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-SYD.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-TPE.csv?token=pages123',
    'https://cf-workers-text2kv-92d.pages.dev/AS0-0-YYZ.csv?token=pages123', //'https://raw.githubusercontent.com/cmliu/WorkerVless2sub/main/addressescsv.csv', //iptest测速结果文件。
];

let subconverter = "url.v1.mk"; //在线订阅转换后端，目前使用肥羊的订阅转换功能。支持自建psub 可自行搭建https://github.com/bulianglin/psub
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_Full_MultiMode.ini"; //订阅配置文件
let noTLS = 'true'; // false
let BotToken = ''; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
let ChatID = ''; //可以为空，或者@userinfobot中获取，/start
let vmessLinks = [ //本地CFcdnVmess节点池
    '', //'vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIk5MIiwNCiAgImFkZCI6ICJjZi4wOTAyMjcueHl6IiwNCiAgInBvcnQiOiAiNDQzIiwNCiAgImlkIjogIjA2MTk1YjViLTM4MTUtNGEwNy05NmY3LTQ3ZWVmYmIxYjE0MyIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJub25lIiwNCiAgImhvc3QiOiAidXJueGV3enZoLnNpdGUiLA0KICAicGF0aCI6ICIva3dobXZ3cyIsDQogICJ0bHMiOiAidGxzIiwNCiAgInNuaSI6ICJ1cm54ZXd6dmguc2l0ZSIsDQogICJhbHBuIjogIiIsDQogICJmcCI6ICIiDQp9',
];
let vmessLinksURL = 'https://raw.githubusercontent.com/cmliu/CFcdnVmess2sub/main/vmesslinks'; //CFcdnVmess节点池URL
let proxyhosts = [//本地代理域名池
    //'ppfv2tl9veojd-maillazy.pages.dev',
];
let proxyhostsURL = 'https://raw.githubusercontent.com/cmliu/CFcdnVmess2sub/main/proxyhosts'; //在线代理域名池URL
let FileName = 'CFcdnVmess2sub';
let SUBUpdateTime = 6;
let total = 99; //PB
let timestamp = 4102329600000; //2099-12-31
const regex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[.*\]):?(\d+)?#?(.*)?$/;

function utf8ToBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

async function sendMessage(type, ip, add_data = "") {
    if (BotToken !== '' && ChatID !== '') {
        let msg = "";
        const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
        if (response.status == 200) {
            const ipInfo = await response.json();
            msg = `${type}\nIP: ${ip}\n国家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n组织: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
        } else {
            msg = `${type}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
        }

        let url = "https://api.telegram.org/bot" + BotToken + "/sendMessage?chat_id=" + ChatID + "&parse_mode=HTML&text=" + encodeURIComponent(msg);

        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
            }
        });
    }
}
let MamaJustKilledAMan = ['telegram', 'twitter', 'miaoko'];

async function getAddressesapi(api) {
    if (!api || api.length === 0) {
        return [];
    }

    let newapi = "";
    try {
        const responses = await Promise.allSettled(api.map(apiUrl => fetch(apiUrl, {
            method: 'get',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;',
                'User-Agent': 'cmliu/CFcdnVmess2sub'
            }
        }).then(response => response.ok ? response.text() : Promise.reject())));

        for (const response of responses) {
            if (response.status === 'fulfilled') {
                const content = await response.value;
                newapi += content + '\n';
            }
        }
    } catch (error) {
        console.error(error);
    }
    const newAddressesapi = await ADD(newapi);

    return newAddressesapi;
}

async function getAddressescsv(tls) {
    if (!addressescsv || addressescsv.length === 0) {
        return [];
    }

    let newAddressescsv = [];

    for (const csvUrl of addressescsv) {
        try {
            const response = await fetch(csvUrl);

            if (!response.ok) {
                console.error('获取CSV地址时出错:', response.status, response.statusText);
                continue;
            }

            const text = await response.text(); // 使用正确的字符编码解析文本内容
            let lines;
            if (text.includes('\r\n')) {
                lines = text.split('\r\n');
            } else {
                lines = text.split('\n');
            }

            // 检查CSV头部是否包含必需字段
            const header = lines[0].split(',');
            const tlsIndex = header.indexOf('TLS');
            const speedIndex = header.length - 1; // 最后一个字段

            const ipAddressIndex = 0; // IP地址在 CSV 头部的位置
            const portIndex = 1; // 端口在 CSV 头部的位置
            const dataCenterIndex = tlsIndex + 1; // 数据中心在 CSV 头部的位置
            const locationIndex = dataCenterIndex + 1; // 地理位置在 CSV 头部的位置
            const weightIndex = speedIndex; // 权重在 CSV 头部的位置

            if (tlsIndex === -1) {
                console.error('CSV文件头部缺少TLS字段');
                continue;
            }

            for (let i = 1; i < lines.length; i++) {
                const row = lines[i].split(',');
                const tlsValue = row[tlsIndex];
                const speedValue = row[speedIndex];

                if (tls === 'true' && tlsValue !== 'TLS') {
                    continue;
                }

                if (tls !== 'true' && tlsValue === 'TLS') {
                    continue;
                }

                if (Number(speedValue) < DLS) {
                    continue;
                }

                const address = `${row[ipAddressIndex]}:${row[portIndex]}#${row[locationIndex]} ${row[dataCenterIndex]} ${speedValue}`;
                newAddressescsv.push(address);
            }
        } catch (error) {
            console.error('获取CSV地址时出错:', error);
        }
    }

    return newAddressescsv;
}

async function ADD(rawAddresses) {
    let addressesArray = rawAddresses.split('\n').map(address => address.trim()).filter(address => address.length > 0);
    let validAddresses = [];

    for (let address of addressesArray) {
        let match = regex.exec(address);
        if (match) {
            let ip = match[1];
            let port = match[2] || (noTLS === 'true' ? 80 : 443);
            let tag = match[3] || "default";

            validAddresses.push(`${ip}:${port}#${tag}`);
        } else {
            console.warn(`Invalid address: ${address}`);
        }
    }

    return validAddresses;
}

async function GET(rawAddresses, urls, tls) {
    let newapi = await getAddressesapi(urls);
    let newAddressescsv = await getAddressescsv(tls);

    let mergedAddresses = [...rawAddresses, ...newapi, ...newAddressescsv];
    let uniqueAddresses = Array.from(new Set(mergedAddresses));

    return uniqueAddresses;
}

async function fetchProxyHosts() {
    try {
        let proxyList = [];
        if (proxyhostsURL !== '') {
            const response = await fetch(proxyhostsURL, {
                method: 'get',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;',
                    'User-Agent': 'cmliu/CFcdnVmess2sub'
                }
            });
            if (response.ok) {
                proxyList = await response.text();
                proxyList = proxyList.split('\n').filter(host => host.trim().length > 0);
            }
        }

        return [...proxyhosts, ...proxyList];
    } catch (error) {
        console.error('Error fetching proxy hosts:', error);
        return proxyhosts;
    }
}

async function fetchVmessLinks() {
    try {
        let vmessList = [];
        if (vmessLinksURL !== '') {
            const response = await fetch(vmessLinksURL, {
                method: 'get',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;',
                    'User-Agent': 'cmliu/CFcdnVmess2sub'
                }
            });
            if (response.ok) {
                vmessList = await response.text();
                vmessList = vmessList.split('\n').filter(link => link.trim().length > 0);
            }
        }

        return [...vmessLinks, ...vmessList];
    } catch (error) {
        console.error('Error fetching Vmess links:', error);
        return vmessLinks;
    }
}

async function CFcdnVmess2subTLS(request) {
    let rawAddresses = await GET(addresses, addressesapi, 'true');
    let proxyhostsList = await fetchProxyHosts();
    let vmessLinksList = await fetchVmessLinks();

    const url = new URL(request.url);

    if (url.pathname === '/auto') {
        let defaultSub = `
[proxy]
type = urltest
  names = ${proxyhostsList.join(',')}
  url = http://www.gstatic.com/generate_204
  interval = 300

`;

        defaultSub += `[proxies]\n${vmessLinksList.join('\n')}`;

        let encodedSub = utf8ToBase64(defaultSub);
        let encodedSubURL = `${subconverter}/sub?target=clash&new_name=true&url=${encodedSub}&config=${subconfig}`;

        return new Response(encodedSubURL);
    }

    return new Response('404 Not Found', { status: 404 });
}

addEventListener('fetch', event => {
    event.respondWith(CFcdnVmess2subTLS(event.request));
});
