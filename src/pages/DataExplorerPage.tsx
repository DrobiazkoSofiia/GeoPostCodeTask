import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DataExplorerPage.css';
import Header from '../components/Header';

interface Country {
  name: string;
  continent: string;
  iso: string;
  url: string;
}

interface CountriesByContinent {
  [key: string]: Country[];
}

const DataExplorerPage: React.FC = () => {
  const [countries, setCountries] = useState<CountriesByContinent>({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/GeoPostcodes/technical-test/main/front-end/data/countries.json'
        );
        const data = response.data;

        const groupedByContinent: CountriesByContinent = data.reduce((acc: CountriesByContinent, country: Country) => {
          const continent = country.continent;
          if (!acc[continent]) {
            acc[continent] = [];
          }
          acc[continent].push(country);
          return acc;
        }, {});

        const sortedGroupedByContinent = Object.keys(groupedByContinent)
          .sort()
          .reduce((acc, continent) => {
            acc[continent] = groupedByContinent[continent].sort((a, b) => a.name.localeCompare(b.name));
            return acc;
          }, {} as CountriesByContinent);

        setCountries(sortedGroupedByContinent);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <Header />
      <h1 style={{ paddingLeft: 20 }}>Data Explorer</h1>
      <div className="data-set-panel">
        <p>Index of Countries</p>
      </div>
      <div className="country-list">
        {Object.keys(countries).sort().map((continent) => (
          <div key={continent}>
            <h2>{continent}</h2>
            <ul>
              {countries[continent].map((country) => (
                <li key={country.url} style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={`https://flagcdn.com/w320/${country.iso.toLowerCase()}.png`}
                    alt={`${country.name} flag`}
                    style={{ width: 20, height: 15, marginRight: 10 }}
                  />
                  <Link to={`/data-explorer/${country.url}`}>{country.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataExplorerPage;
