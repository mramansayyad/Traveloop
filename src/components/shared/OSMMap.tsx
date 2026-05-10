"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface MapProps {
  cityName: string;
}

export default function OSMMap({ cityName }: MapProps) {
  const [bbox, setBbox] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      setLoading(true);
      setError(false);
      try {
        // Use OpenStreetMap's Nominatim API for free geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`,
          {
            headers: {
              "User-Agent": "Traveloop-Hackathon-App",
            },
          }
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const item = data[0];
          // Nominatim returns [south, north, west, east]
          const [south, north, west, east] = item.boundingbox;
          // OSM iframe expects bbox=west,south,east,north
          setBbox(`${west},${south},${east},${north}`);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching map coordinates:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchCoords();
    }
  }, [cityName]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <MapPin className="text-indigo-600" size={18} />
        Route Map
      </h3>
      
      <div className="bg-slate-100 h-64 rounded-xl flex flex-col items-center justify-center text-slate-400 font-medium border border-slate-200 overflow-hidden relative">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
            <p className="text-sm">Loading map for {cityName}...</p>
          </div>
        ) : error || !bbox ? (
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <MapPin size={32} className="text-slate-300 mb-2" />
            <p className="text-sm">Map unavailable for "{cityName}"</p>
            <p className="text-xs text-slate-400 mt-1">We couldn't locate this city on the map.</p>
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${bbox.split(',')[0]},${bbox.split(',')[1]}`}
            className="absolute inset-0"
          ></iframe>
        )}
      </div>
      <div className="mt-2 text-xs text-slate-400 text-center">
        Powered by OpenStreetMap
      </div>
    </div>
  );
}
