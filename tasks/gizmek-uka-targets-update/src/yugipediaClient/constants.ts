const gizmekUkaTaregtsSmwQuery = `[[Medium::TCG||OCG]][[Misc::Equal ATK and DEF]][[Belongs to::Main Deck]][[Summoning::Can be Special Summoned]]|?ATK|?DEF|?Attribute|?Type|?Stars string|?Summoning|?Primary type|limit=1000`;

const gizmekUkaTaregtsQuery = new URLSearchParams({
  action: 'ask',
  query: gizmekUkaTaregtsSmwQuery,
  format: 'json',
});

export { gizmekUkaTaregtsQuery };
