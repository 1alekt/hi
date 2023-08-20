"use client"
import { useState, useEffect } from "react";
import database from "./firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { Line } from 'react-chartjs-2';

export default function Home() {
  const [data, setData] = useState({});
  const [dataHistory, setDataHistory] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const dataRef = ref(database, "datos/");

    const handleData = (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        setData(value);
        setDataHistory(prevDataHistory => [...prevDataHistory, value]);
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
        }, 1000);
      } else {
        setData({});
      }
    };

    onValue(dataRef, handleData);

    return () => {
      onValue(dataRef, null);
    };
  }, []);

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + dataHistory.map(entry => `${entry.timestamp},${entry.ph},${entry.temp}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historial.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-500 p-8"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-5xl font-bold text-purple-800 mb-8 text-center">
          Nero01
        </h1>
        <div className="overflow-x-auto">
          <table className={`table-auto w-full text-center ${showAnimation ? 'animate-fade-in' : ''}`}>
            {/* Table content */}
          </table>
        </div>
        <div className="mt-4">
          <Line
            data={{
              labels: dataHistory.map(entry => entry.timestamp),
              datasets: [
                {
                  label: 'PH',
                  data: dataHistory.map(entry => entry.ph),
                  borderColor: 'rgba(255, 99, 132, 1)',
                  fill: false,
                },
                {
                  label: 'Temperatura',
                  data: dataHistory.map(entry => entry.temp),
                  borderColor: 'rgba(54, 162, 235, 1)',
                  fill: false,
                },
              ],
            }}
          />
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded mt-4"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Ocultar Historial' : 'Mostrar Historial'}
          </button>
          {showHistory && (
            <div>
              <h2 className="text-xl font-semibold my-4">Historial de Datos:</h2>
              {/* Mostrar el historial aquí */}
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded mt-2"
                onClick={exportData}
              >
                Exportar Historial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
