import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await fetch(`${process.env.API_URL}/items/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ItemType = await response.json();
        setItem(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError("Failed to load item. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <a href="/">Go to the list</a>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="detail">
        <Link to={"/"}>Go Back</Link>
        <h2>Item Details</h2>
        <p>ID: {item?.id}</p>
        <p>Name: {item?.name}</p>
        <p>Description: {item?.description}</p>
      </div>
    </ErrorBoundary>
  );
}

export default SinglePage;
