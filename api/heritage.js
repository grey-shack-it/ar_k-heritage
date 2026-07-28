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
  
  // ODCloud API 엔드포인트 URL
  const endpoint = "https://api.odcloud.kr/api/15147467/v1/uddi:e8729783-a7a5-4a61-86a1-e3856025ee38";
  const targetUrl = `${endpoint}?page=1&perPage=10&serviceKey=${SERVICE_KEY}`;

  try {
    const apiRes = await fetch(targetUrl);
    
    if (!apiRes.ok) {
      throw new Error(`ODCloud API Status Error: ${apiRes.status}`);
    }

    const jsonData = await apiRes.json();
    
    // 깔끔한 JSON 형태로 클라이언트에 전달
    res.status(200).json(jsonData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}