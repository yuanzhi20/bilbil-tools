
// 简单的路由系统
const app = document.getElementById('app');

// 导航函数（index.html的onclick调用）
function showTool(name) {
  renderTool(name);
  app.scrollIntoView({ behavior: 'smooth' });
}
function renderTool(name) {
  const tools = {
    json: `<div style="max-width:800px;margin:2rem auto;padding:0 1rem"><h2>📋 JSON 格式化/验证</h2>
<textarea id="jsonInput" rows="10" style="width:100%;font-family:monospace;font-size:14px;padding:1rem;border:1px solid #ddd;border-radius:8px" placeholder="粘贴JSON数据..."></textarea>
<div style="margin:1rem 0;display:flex;gap:.5rem">
<button onclick="formatJSON()" style="padding:.6rem 1.5rem;background:#667eea;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">格式化</button>
<button onclick="compressJSON()" style="padding:.6rem 1.5rem;background:#764ba2;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">压缩</button>
<button onclick="copyJSON()" style="padding:.6rem 1.5rem;background:#48bb78;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">复制</button>
</div>
<pre id="jsonOutput" style="background:#1e1e1e;color:#d4d4d4;padding:1rem;border-radius:8px;overflow-x:auto;min-height:100px;font-size:14px"></pre>
</div>`,
    image: `<div style="max-width:800px;margin:2rem auto;padding:0 1rem"><h2>🖼️ 图片压缩</h2>
<p style="margin:1rem 0;color:#666">拖拽或选择图片，所有处理在浏览器本地完成</p>
<input type="file" id="imgInput" accept="image/*" multiple style="margin-bottom:1rem">
<div style="margin:1rem 0"><label>质量: <input type="range" id="imgQuality" min="10" max="100" value="70"> <span id="qualityVal">70</span>%</label></div>
<button onclick="compressImg()" style="padding:.6rem 1.5rem;background:#667eea;color:#fff;border:none;border-radius:6px;cursor:pointer">压缩并下载</button>
<div id="imgResult" style="margin-top:1rem"></div></div>`,
    base64: `<div style="max-width:800px;margin:2rem auto;padding:0 1rem"><h2>🔤 Base64 编解码</h2>
<textarea id="b64Input" rows="6" style="width:100%;font-family:monospace;padding:1rem;border:1px solid #ddd;border-radius:8px;margin:1rem 0" placeholder="输入文本或Base64..."></textarea>
<div style="margin:1rem 0;display:flex;gap:.5rem">
<button onclick="encodeB64()" style="padding:.6rem 1.5rem;background:#667eea;color:#fff;border:none;border-radius:6px;cursor:pointer">编码</button>
<button onclick="decodeB64()" style="padding:.6rem 1.5rem;background:#764ba2;color:#fff;border:none;border-radius:6px;cursor:pointer">解码</button>
<button onclick="copyText('b64Output')" style="padding:.6rem 1.5rem;background:#48bb78;color:#fff;border:none;border-radius:6px;cursor:pointer">复制</button>
</div>
<textarea id="b64Output" rows="6" style="width:100%;font-family:monospace;padding:1rem;border:1px solid #ddd;border-radius:8px" readonly></textarea></div>`,
    qrcode: `<div style="max-width:800px;margin:2rem auto;padding:0 1rem"><h2>📱 二维码生成</h2>
<input id="qrInput" style="width:100%;padding:.8rem 1rem;border:1px solid #ddd;border-radius:8px;margin:1rem 0;font-size:16px" placeholder="输入文字或网址...">
<div style="margin:1rem 0;display:flex;gap:.5rem;align-items:center">
<label>大小: <input type="number" id="qrSize" value="256" min="128" max="512" step="64" style="width:80px;padding:.3rem"> px</label>
</div>
<button onclick="generateQR()" style="padding:.6rem 1.5rem;background:#667eea;color:#fff;border:none;border-radius:6px;cursor:pointer">生成</button>
<div id="qrResult" style="margin-top:1rem;text-align:center"></div></div>`,
    url: `<div style="max-width:800px;margin:2rem auto;padding:0 1rem"><h2>🔗 URL 编解码</h2>
<textarea id="urlInput" rows="4" style="width:100%;font-family:monospace;padding:1rem;border:1px solid #ddd;border-radius:8px;margin:1rem 0" placeholder="输入URL..."></textarea>
<div style="margin:1rem 0;display:flex;gap:.5rem">
<button onclick="encodeURL()" style="padding:.6rem 1.5rem;background:#667eea;color:#fff;border:none;border-radius:6px;cursor:pointer">编码</button>
<button onclick="decodeURL()" style="padding:.6rem 1.5rem;background:#764ba2;color:#fff;border:none;border-radius:6px;cursor:pointer">解码</button>
</div>
<textarea id="urlOutput" rows="4" style="width:100%;font-family:monospace;padding:1rem;border:1px solid #ddd;border-radius:8px" readonly></textarea></div>`,
    timestamp: `<div style="max-width:800px;margin:2rem auto;padding:0 1rem"><h2>⏰ 时间戳转换</h2>
<div style="margin:1rem 0;padding:1rem;background:#f0f4ff;border-radius:8px">
<p>当前时间戳: <strong id="currentTs"></strong></p>
<p>当前时间: <strong id="currentTime"></strong></p>
</div>
<h3 style="margin:1rem 0">时间戳 → 日期</h3>
<input id="ts2date" style="width:100%;padding:.8rem;border:1px solid #ddd;border-radius:8px;margin-bottom:.5rem" placeholder="输入时间戳...">
<button onclick="tsToDate()" style="padding:.5rem 1rem;background:#667eea;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-bottom:1rem">转换</button>
<p id="ts2dateResult" style="color:#666"></p>
<h3 style="margin:1rem 0">日期 → 时间戳</h3>
<input id="date2ts" type="datetime-local" style="width:100%;padding:.8rem;border:1px solid #ddd;border-radius:8px;margin-bottom:.5rem">
<button onclick="dateToTs()" style="padding:.5rem 1rem;background:#764ba2;color:#fff;border:none;border-radius:6px;cursor:pointer">转换</button>
<p id="date2tsResult" style="color:#666"></p></div>`,
    hash: `<div style="max-width:800px;margin:2rem auto;padding:0 1rem"><h2>🔐 哈希计算</h2>
<textarea id="hashInput" rows="4" style="width:100%;font-family:monospace;padding:1rem;border:1px solid #ddd;border-radius:8px;margin:1rem 0" placeholder="输入文本..."></textarea>
<div style="margin:1rem 0">
<label>算法: <select id="hashAlgo" style="padding:.3rem .5rem"><option>SHA-256</option><option>SHA-1</option><option>SHA-384</option><option>SHA-512</option></select></label>
<button onclick="calcHash()" style="padding:.5rem 1rem;background:#667eea;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-left:.5rem">计算</button>
</div>
<div id="hashResult" style="background:#f0f4ff;padding:1rem;border-radius:8px;font-family:monospace;word-break:break-all"></div></div>`,
    color: `<div style="max-width:800px;margin:2rem auto;padding:0 1rem"><h2>🎨 颜色转换</h2>
<div style="margin:1rem 0;display:flex;gap:1rem;flex-wrap:wrap">
<div style="flex:1;min-width:200px"><label>HEX: <input id="hexInput" value="#667eea" style="width:120px;padding:.3rem;border:1px solid #ddd;border-radius:4px"></label></div>
<div style="flex:1;min-width:200px"><label>RGB: <input id="rgbInput" placeholder="102,126,234" style="width:180px;padding:.3rem;border:1px solid #ddd;border-radius:4px"></label></div>
</div>
<div style="margin:1rem 0"><input type="color" id="colorPicker" value="#667eea" style="width:80px;height:80px;border:none;cursor:pointer"></div>
<div id="colorPreview" style="width:100%;height:100px;border-radius:8px;background:#667eea;margin:1rem 0"></div>
<p id="colorAll" style="font-family:monospace;color:#666"></p></div>`,
  };
  if(tools[name]) {
    app.innerHTML = tools[name];
    if(name==='timestamp') updateTimestamp();
    if(name==='color') setupColor();
  }
}
// JSON tools
function formatJSON(){try{document.getElementById('jsonOutput').textContent=JSON.stringify(JSON.parse(document.getElementById('jsonInput').value),null,2)}catch(e){document.getElementById('jsonOutput').textContent='❌ '+e.message}}
function compressJSON(){try{document.getElementById('jsonOutput').textContent=JSON.stringify(JSON.parse(document.getElementById('jsonInput').value))}catch(e){document.getElementById('jsonOutput').textContent='❌ '+e.message}}
function copyJSON(){navigator.clipboard.writeText(document.getElementById('jsonOutput').textContent)}
// Base64
function encodeB64(){document.getElementById('b64Output').value=btoa(unescape(encodeURIComponent(document.getElementById('b64Input').value)))}
function decodeB64(){try{document.getElementById('b64Output').value=decodeURIComponent(escape(atob(document.getElementById('b64Input').value)))}catch(e){document.getElementById('b64Output').value='❌ 无效的Base64'}}
// URL
function encodeURL(){document.getElementById('urlOutput').value=encodeURIComponent(document.getElementById('urlInput').value)}
function decodeURL(){try{document.getElementById('urlOutput').value=decodeURIComponent(document.getElementById('urlInput').value)}catch(e){document.getElementById('urlOutput').value='❌ '+e.message}}
// Timestamp
function updateTimestamp(){const now=Date.now();document.getElementById('currentTs').textContent=Math.floor(now/1000);document.getElementById('currentTime').textContent=new Date().toLocaleString('zh-CN')}
function tsToDate(){const ts=document.getElementById('ts2date').value;const s=ts.length>10?parseInt(ts):parseInt(ts)*1000;document.getElementById('ts2dateResult').textContent=new Date(s).toLocaleString('zh-CN')}
function dateToTs(){const d=new Date(document.getElementById('date2ts').value);document.getElementById('date2tsResult').textContent=Math.floor(d.getTime()/1000)}
// Hash
async function calcHash(){const data=new TextEncoder().encode(document.getElementById('hashInput').value);const hash=await crypto.subtle.digest(document.getElementById('hashAlgo').value.replace('-',''),data);document.getElementById('hashResult').textContent=Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('')}
// Color
function setupColor(){const p=document.getElementById('colorPicker');p.addEventListener('input',e=>{document.getElementById('hexInput').value=e.target.value;updateColor(e.target.value)});document.getElementById('hexInput').addEventListener('input',e=>{if(/^#[0-9a-f]{6}$/i.test(e.target.value)){p.value=e.target.value;updateColor(e.target.value)}})}
function updateColor(hex){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);document.getElementById('rgbInput').value=`${r},${g},${b}`;document.getElementById('colorPreview').style.background=hex;document.getElementById('colorAll').textContent=`HEX: ${hex} | RGB: rgb(${r},${g},${b}) | HSL: hsl(${Math.round(rgbToHsl(r,g,b)[0])},${Math.round(rgbToHsl(r,g,b)[1])}%,${Math.round(rgbToHsl(r,g,b)[2])}%)`}
function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0}else{const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break}}return[h*360,s*100,l*100]}
// QR Code - simple canvas based
function generateQR(){const text=document.getElementById('qrInput').value;if(!text){alert('请输入内容');return}const size=parseInt(document.getElementById('qrSize').value)||256;const c=document.createElement('canvas');c.width=c.height=size;const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,size,size);ctx.fillStyle='#333';const modules=qrGen(text);const mc=modules.length;const ms=size/(mc+8);const ox=4*ms;for(let y=0;y<mc;y++)for(let x=0;x<mc;x++)if(modules[y][x])ctx.fillRect(ox+x*ms,ox+y*ms,ms,ms);document.getElementById('qrResult').innerHTML='';const a=document.createElement('a');a.download='qrcode.png';a.href=c.toDataURL();a.appendChild(c);document.getElementById('qrResult').appendChild(a);const br=document.createElement('br');const btn=document.createElement('a');btn.textContent='下载';btn.download='qrcode.png';btn.href=c.toDataURL();btn.style.cssText='display:inline-block;margin-top:.5rem;padding:.5rem 1rem;background:#667eea;color:#fff;text-decoration:none;border-radius:6px';document.getElementById('qrResult').appendChild(btn)}
// Minimal QR encoder
function qrGen(text){const d=qrEncode(text);const s=d.length;const ms=qrSize(s);const m=Array.from({length:ms},()=>Array(ms).fill(false));qrPlace(m,ms,d,s);return m}
function qrEncode(text){const v=[0];for(let i=0;i<text.length;i++){let c=text.charCodeAt(i);if(c<128)v.push(c);else if(c<2048){v.push(192|(c>>6));v.push(128|(c&63))}else{v.push(224|(c>>12));v.push(128|((c>>6)&63));v.push(128|(c&63))}}v.push(0);return v}
function qrSize(d){if(d<=17)return 21;if(d<=32)return 25;if(d<=53)return 29;return 33}
function qrPlace(m,ms,data,len){for(let i=0;i<7&&i<len;i++){m[0][6]=!(i&1);m[6][0]=!(i&2);m[ms-7][8]=!(i&4);m[8][ms-8]=!(i&8)}qrFinder(m,0,0);qrFinder(m,ms-7,0);qrFinder(m,0,ms-7);qrTiming(m,ms);let px=8,py=ms-8;for(let i=0;i<len;i++){if(i>0&&i%8===0){py-=2;px=8}if(m[py][px]){i--;px+=2;continue}m[py][px]=!!(data[i]&128);m[py][px+1]=!!(data[i]&64);m[py-1][px]=!!(data[i]&32);m[py-1][px+1]=!!(data[i]&16);m[py-2][px]=!!(data[i]&8);m[py-2][px+1]=!!(data[i]&4);m[py-3][px]=!!(data[i]&2);m[py-3][px+1]=!!(data[i]&1);px+=2;if(px>=ms-8){px=8;py-=4}}}
function qrFinder(m,r,c){for(let i=-1;i<=7;i++)for(let j=-1;j<=7;j++){if(r+i<0||c+j<0||r+i>=m.length||c+j>=m[0].length)continue;m[r+i][c+j]=(i>=0&&i<=6&&(j===0||j===6))||(j>=0&&j<=6&&(i===0||i===6))||(i>=2&&i<=4&&j>=2&&j<=4)}}
function qrTiming(m,ms){for(let i=8;i<ms-8;i++){m[6][i]=i%2===0;m[i][6]=i%2===0}}
// Image compress
document.getElementById('imgQuality')?.addEventListener('input',e=>document.getElementById('qualityVal').textContent=e.target.value);
function compressImg(){const files=document.getElementById('imgInput').files;const q=document.getElementById('imgQuality').value/100;const result=document.getElementById('imgResult');result.innerHTML='';for(const f of files){const reader=new FileReader();reader.onload=e=>{const img=new Image();img.onload=()=>{const c=document.createElement('canvas');c.width=img.width;c.height=img.height;c.getContext('2d').drawImage(img,0,0);const a=document.createElement('a');a.download='compressed_'+f.name;a.href=c.toDataURL('image/jpeg',q);a.textContent=`${f.name}: ${(f.size/1024).toFixed(1)}KB → ${(a.href.length*3/4/1024).toFixed(1)}KB`;a.style.cssText='display:block;margin:.5rem 0;color:#667eea';result.appendChild(a)};img.src=e.target.result};reader.readAsDataURL(f)}}
function copyText(id){navigator.clipboard.writeText(document.getElementById(id).value)}
// Router
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h)renderTool(h);else app.innerHTML=''});
const h=location.hash.slice(1);if(h)renderTool(h);
