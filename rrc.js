function getSeason(num) {
  const seasonObj = {
    winter: [12, 1, 2],
    spring: [3,4,5],
    summer: [6,7,8],
    fall: [9,10,11]
  }

  for(const key of seasonObj) {
    if(seasonObj[key].includes(num)) return seasonObj[num]
  }
  return 'invalid'
}
