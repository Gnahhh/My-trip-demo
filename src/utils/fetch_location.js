export const fetchCityName = async (latitude, longitude) => {
  const key = import.meta.env.VITE_MAP_API_KEY;    
  const url = `https://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${longitude},${latitude}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === '1') {
      const city = data.regeocode.addressComponent.city;
      return city.length === 0 ? '未知城市' : city;
    } else {
      return '获取城市失败';
    }
  } catch (error) {
    console.error('获取城市名称失败:', error);
    return '获取失败';
  }
};