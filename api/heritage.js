export default async function handler(req, res) {
  // CORS 헤더 설정 (모든 도메인에서 접속 허용)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const SERVICE_KEY = "2008def8c582bb2831be28ce30353e4bfc83e0254b42f281e0e6f20954573be9";
  // 국가유산 Open API 실제 서버 주소 호출
  const targetUrl = `https://www.heritage.go.kr/heri/openapi/openApiUnv.do?serviceKey=${SERVICE_KEY}&pageIndex=1&pageUnit=10`;

  try {
    const apiRes = await fetch(targetUrl);
    const data = await apiRes.text();
    
    // 국가유산청 서버에서 받아온 XML/JSON 데이터를 그대로 클라이언트에 전달
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}