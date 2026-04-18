// e2e-tests/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      collectInternalHrefs(selector: string, options?: { excludeHrefs?: (string | RegExp)[]; excludeText?: (string | RegExp)[] }): Chainable<string[]>;
      assertInternalUrlOk(url: string): Chainable<Cypress.Response<any>>;
      visitAndAssertOk(path: string): Chainable<void>;
    }
  }
}

function normalizeInternalPath(href: string, baseUrl: string): string | null {
  if (!href) return null;
  const trimmed = href.trim();
  if (trimmed.startsWith('#') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('javascript:')) return null;
  if (/^https?:\/\//i.test(trimmed)) {
    try { const u = new URL(trimmed); const b = new URL(baseUrl); if (u.origin === b.origin) return u.pathname + (u.search || '') + (u.hash || ''); return null; } catch { return null; }
  }
  return trimmed.startsWith('/') ? trimmed : '/' + trimmed;
}

Cypress.Commands.add('collectInternalHrefs', (selector, options) => {
  const baseUrl = Cypress.config('baseUrl') as string;
  return cy.get(selector).then(($els) => {
    const hrefs = Array.from($els)
      .map((el) => { const a = el as HTMLAnchorElement; return { href: a.getAttribute('href') || '', text: (a.textContent || '').trim() }; })
      .filter(({ href, text }) => {
        if (options?.excludeHrefs?.some((p) => typeof p === 'string' ? href === p : p.test(href))) return false;
        if (options?.excludeText?.some((p) => typeof p === 'string' ? text === p : p.test(text))) return false;
        return true;
      })
      .map(({ href }) => normalizeInternalPath(href, baseUrl))
      .filter((v): v is string => Boolean(v));
    return Array.from(new Set(hrefs));
  });
});

Cypress.Commands.add('assertInternalUrlOk', (urlOrPath) => {
  const baseUrl = Cypress.config('baseUrl') as string;
  const url = /^https?:\/\//i.test(urlOrPath) ? urlOrPath : `${baseUrl}${urlOrPath}`;
  return cy.request({ url, failOnStatusCode: false, followRedirect: true }).then((res) => {
    expect(res.status, `GET ${url} status`).to.be.within(200, 399);
    if (typeof res.body === 'string') expect(res.body.toLowerCase()).not.to.include('page not found');
    return res;
  });
});

Cypress.Commands.add('visitAndAssertOk', (path) => {
  const cleanPath = path.split('?')[0];
  return cy.visit(path).then(() => {
    return cy.location('pathname').should('include', cleanPath).then(() => {
      return cy.get('body').then(($b) => {
        const text = $b.text().toLowerCase();
        expect(text).not.to.include('page not found');
        expect(text).not.to.include('404 page');
        return undefined;
      });
    });
  });
});

export {};
