'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Define a interface para um Ativo
interface Asset {
  name: string;
  value: number;
}

// URL do endpoint de ativos no seu backend
const API_URL = 'http://localhost:3333/api/v1/assets';

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        setAssets(response.data);
        setError(null);
      } catch (err) {
        setError('Falha ao buscar ativos. Verifique se o backend está rodando.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []); // O array vazio [] garante que a busca seja feita apenas uma vez

  if (isLoading) return <div className="p-4 text-center">Carregando ativos...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Ativos Financeiros</h1>
        <p className="text-md text-gray-500 mt-2">
          Esta é uma lista de ativos com valores estáticos para visualização (somente leitura).
        </p>
      </div>

      {/* Grid para exibir os ativos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset.name} className="border bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h2 className="font-semibold text-xl text-gray-800">{asset.name}</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {/* Formata o valor como moeda brasileira (BRL) */}
              {asset.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}