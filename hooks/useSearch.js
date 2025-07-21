import {useState} from 'react'

export function useSearch(items, fields) {
  const [query, setQuery] = useState('');
  const filtered = items.filter(
    (item) => fields.some(
      (f) => item[f]?.toLowerCase().includes(query.toLowerCase())
    )
  );
  return { query, setQuery, filtered };
}
