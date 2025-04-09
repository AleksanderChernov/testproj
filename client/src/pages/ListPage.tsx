import React, { useEffect, useMemo, useState } from "react";
import { ListItem } from "./components";
import useData from "./useData";
import useSort from "./useSort";

const SubTitle: React.FC<any> = ({ children }) => (
  <h2 className={"list-subtitle"}>Active Item ID: {children}</h2>
);

function ListPage() {
  const items = useData();
  const [sortedItems, sortBy, handleSortClick] = useSort(items);

  const [activeItemId, setActiveItemId] = useState<any>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [query, setQuery] = useState<string>("");

  // Зависимость для UseMemo забыли
  const activeItemText = useMemo(
    () => (activeItemId ? activeItemId : "Empty"),
    [activeItemId]
  );

  // Слишком много карточек. Давайте покажем по кусочкам?
  const clickShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleItemClick = (id: any) => {
    setActiveItemId(id);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setFilteredItems(sortedItems);
  }, [sortedItems]);

  // Лишняя зависисимость filteredItems, застревали в цикле
  useEffect(() => {
    if (query.length > 0) {
      setFilteredItems(
        filteredItems.filter((item) =>
          `${item.id}`.includes(
            query
              .toLowerCase()
              .trimStart()
              .trimEnd()
              .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          )
        )
      );
    }
  }, [query]);

  return (
    <div className={"list-wrapper"}>
      <div className="list-header">
        <h1 className={"list-title"}>Items List</h1>
        <SubTitle>{activeItemText}</SubTitle>
        <button onClick={handleSortClick}>
          Sort ({sortBy === "ASC" ? "ASC" : "DESC"})
        </button>
        <input
          type="text"
          placeholder={"Filter by ID"}
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <div className="list-container">
        <div className="list">
          {filteredItems.length === 0 && <span>Loading...</span>}
          {filteredItems.slice(0, visibleCount).map((item, index) => (
            <ListItem
              key={index}
              isactive={activeItemId === item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              onClick={handleItemClick}
            />
          ))}
        </div>
        <div className="button-load-more-wrapper">
          <button className="button-load-more" onClick={() => clickShowMore()}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
