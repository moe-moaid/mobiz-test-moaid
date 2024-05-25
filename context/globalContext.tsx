import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { fetchProducts } from "@/services/products"; // Adjust the import path as needed
import { SingleProduct } from "@/types/types";

interface GlobalContextType {
  allProducts: SingleProduct[] | null;
  setAllProducts: React.Dispatch<React.SetStateAction<SingleProduct[] | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [allProducts, setAllProducts] = useState<SingleProduct[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setAllProducts(productsData);
      } catch (error) {
        let errorMessage = "Failed to fetch products";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        allProducts: allProducts,
        setAllProducts: setAllProducts,
        loading,
        setLoading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
