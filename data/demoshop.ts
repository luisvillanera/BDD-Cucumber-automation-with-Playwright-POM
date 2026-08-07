/** Test data helpers for Demo Web Shop */

export function uniqueEmail(prefix = 'pw.user'): string {
  return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 1000)}@example.com`;
}

export const DEMO_USERS = {
  invalid: {
    email: 'not-registered@example.com',
    password: 'WrongPass123!',
  },
  newUser: () => ({
    gender: 'male' as const,
    firstName: 'Play',
    lastName: 'Wright',
    email: uniqueEmail(),
    password: 'Password123!',
  }),
};

export const DEMO_PRODUCTS = {
  laptop: {
    name: '14.1-inch Laptop',
    slug: '141-inch-laptop',
  },
  book: {
    name: 'Computing and Internet',
    category: 'books',
  },
  searchTerm: 'laptop',
  emptySearch: 'zzzxxyynoproduct999',
};
