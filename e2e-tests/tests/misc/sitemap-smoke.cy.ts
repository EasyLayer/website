// e2e-tests/tests/misc/sitemap-smoke.cy.ts
import { XMLParser } from 'fast-xml-parser';

function toArray(x) { if (!x) return []; return Array.isArray(x) ? x : [x]; }

describe('Sitemap smoke', () => {
  it('sitemap.xml reachable and valid', () => {
    cy.request('/sitemap.xml').then((res) => {
      expect(res.status).to.eq(200);
      const parser = new XMLParser({ ignoreAttributes: false });
      const xml = parser.parse(res.body);
      const urls = toArray(xml?.urlset?.url).map((u) => u?.loc).filter(Boolean);
      expect(urls.length).to.be.greaterThan(0);
    });
  });
  it('all sitemap URLs return 2xx', () => {
    const baseUrl = Cypress.config('baseUrl');
    cy.request('/sitemap.xml').then((res) => {
      const parser = new XMLParser({ ignoreAttributes: false });
      const xml = parser.parse(res.body);
      const urls = toArray(xml?.urlset?.url).map((u) => u?.loc).filter(Boolean);
      const paths = urls.map((loc) => {
        try { const u = new URL(loc); const b = new URL(baseUrl); if (u.origin !== b.origin) return null; return u.pathname + (u.search || ''); } catch { return null; }
      }).filter(Boolean);
      for (const p of paths) cy.assertInternalUrlOk(p);
    });
  });
});
