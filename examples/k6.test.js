import http from 'k6/http'
import { check } from 'k6'

export const options = {
  stages: [
    { duration: '10m', target: 30 },
    { duration: '10m', target: 30 },
    { duration: '10m', target: 5 }
  ],
  thresholds: {
    'http_req_duration{load_zone:amazon:us:ashburn}': ['p(95)<500'],
    'http_req_duration{load_zone:amazon:ie:dublin}': ['p(95)<800'],
  },
  ext: {
    loadimpact: {
      projectID: 3026,
      distribution: {
        distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
        distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 }
      },
      note: 'Marie test'
    }
  }
}

export default function () {
  const res = http.get('https://test.k6.io/news.php')
  check(res, {
    'response code is 200': res => res.status == 200
  })
}