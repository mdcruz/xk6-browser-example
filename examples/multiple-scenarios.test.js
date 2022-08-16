import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      exec: 'contacts',
      vus: 50,
      duration: '30s',
    },
    news: {
      executor: 'per-vu-iterations',
      exec: 'news',
      vus: 50,
      iterations: 100,
      startTime: '30s',
      maxDuration: '1m',
    },
  },
};

export function contacts() {
  http.get('https://test.k6.io/contacts.php', {
    tags: { my_custom_tag: 'contacts' },
  });
}

export function news() {
  http.get('https://test.k6.io/news.php', { tags: { my_custom_tag: 'news' } });
}
