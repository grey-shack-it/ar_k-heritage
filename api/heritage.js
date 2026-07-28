export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const SERVICE_KEY = "2008def8c582bb2831be28ce30353e4bfc83e0254b42f281e0e6f20954573be9";
  
  // 국가유산청 유물 목록 조회 API (국보/보물 유물 검색 파라미터 추가)
  // ccbaKdcd: 종목코드 (11: 국보, 12: 보물)
  const targetUrl = `https://www.heritage.go.kr/heri/openapi/openApiUnv.do?serviceKey=${SERVICE_KEY}&pageIndex=1&pageUnit=15&ccbaKdcd=11`;

  try {
    const apiRes = await fetch(targetUrl);
    
    if (!apiRes.ok) {
      throw new Error(`National Heritage Server Error: ${apiRes.status}`);
    }

    const data = await apiRes.text();
    
    // 클라이언트에 XML 데이터 반환
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}