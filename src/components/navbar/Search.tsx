"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    console.log("Search:", query);

    // এখানে তুমি API call বা router push করতে পারো
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 border rounded px-2 py-2 w-80 shadow-sm"
    >
      <SearchIcon size={18} className="text-gray-500" />

      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="border-none focus-visible:ring-0 shadow-none"
      />

      <Button type="submit" size="sm" className="rounded">
        Search
      </Button>
    </form>
  );
};

export default Search;
