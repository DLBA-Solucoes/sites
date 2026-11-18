// Junta captura do site antigo e do novo lado a lado, com faixas "ANTES" e "DEPOIS".
// Uso: node tools/antes-depois.cjs <antes.png> <depois.png> <saida.png> <largura> <altura>
const sharp=require('sharp');
const [a,b,out,w,h]=process.argv.slice(2);
const lab=(t,w,cor)=>Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="90"><rect width="100%" height="100%" fill="${cor}"/><text x="32" y="58" font-family="Arial" font-weight="700" font-size="34" fill="#fff">${t}</text></svg>`);
(async()=>{const W=+w,H=+h,g=40;
const A=await sharp(a).resize(W,H,{fit:'cover',position:'top'}).toBuffer();
const B=await sharp(b).resize(W,H,{fit:'cover',position:'top'}).toBuffer();
await sharp({create:{width:W*2+g*3,height:H+90+g*2,channels:3,background:'#0b0c0d'}}).composite([{input:lab('ANTES  ·  site atual (17/11/2026)',W,'#55595e'),left:g,top:g},{input:A,left:g,top:g+90},{input:lab('DEPOIS  ·  proposta',W,'#d41920'),left:W+g*2,top:g},{input:B,left:W+g*2,top:g+90}]).png().toFile(out);})();
