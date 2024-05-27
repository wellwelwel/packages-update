export const getIndentation = (jsonString: string): number => {
  const match = jsonString.match(/^[ \t]+/m);

  return (match ? match[0]?.length : 2) || 2;
};

export const getLargerString = (items: string[]) =>
  items.reduce((acc, cur) => (acc.length > cur.length ? acc : cur), '');
